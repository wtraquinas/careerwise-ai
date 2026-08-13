from io import BytesIO

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from pypdf import PdfReader
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.features.auth.models import User
from app.models.user_profile import UserProfile
from app.services.cv_parser import extract_cv_profile


router = APIRouter(
    prefix="/api/v1/profile",
    tags=["Profile"],
)


@router.get("")
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    profile = (
        db.query(UserProfile)
        .filter(UserProfile.user_id == current_user.id)
        .first()
    )

    return {
        "user_id": current_user.id,
        "email": current_user.email,
        "cv_filename": profile.cv_filename if profile else None,
        "has_cv": profile is not None and bool(profile.cv_text),
        "profile_data": profile.profile_data if profile else {},
    }



@router.post("/cv")
async def upload_cv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # -----------------------------------------
    # Validate file
    # -----------------------------------------

    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided",
        )

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported",
        )

    # -----------------------------------------
    # Read file
    # -----------------------------------------

    file_bytes = await file.read()

    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File is too large. Maximum size is 10 MB.",
        )

    if not file_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty",
        )

    # -----------------------------------------
    # Extract PDF text
    # -----------------------------------------

    try:
        reader = PdfReader(BytesIO(file_bytes))

        cv_text = "\n".join(
            page.extract_text() or ""
            for page in reader.pages
        ).strip()

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not read PDF: {str(e)}",
        )

    if not cv_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "No text could be extracted from this PDF. "
                "Please upload a text-based PDF."
            ),
        )

    # -----------------------------------------
    # Extract structured CV profile data
    # -----------------------------------------

    try:
        profile_data = extract_cv_profile(cv_text)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not extract profile data: {str(e)}",
        )

    # -----------------------------------------
    # Find existing profile
    # -----------------------------------------

    profile = (
        db.query(UserProfile)
        .filter(UserProfile.user_id == current_user.id)
        .first()
    )

    # -----------------------------------------
    # Create or update profile
    # -----------------------------------------

    if profile:
        profile.cv_filename = file.filename
        profile.cv_text = cv_text
        profile.profile_data = profile_data

    else:
        profile = UserProfile(
            user_id=current_user.id,
            cv_filename=file.filename,
            cv_text=cv_text,
            profile_data=profile_data,
        )

        db.add(profile)

    # -----------------------------------------
    # Save changes
    # -----------------------------------------

    db.commit()
    db.refresh(profile)

    # -----------------------------------------
    # Return result
    # -----------------------------------------

    return {
        "message": "CV uploaded successfully",
        "filename": profile.cv_filename,
        "characters_extracted": len(profile.cv_text),
        "profile_data": profile.profile_data,
    }