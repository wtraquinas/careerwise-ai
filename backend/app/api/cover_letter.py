from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_current_user, get_db
from app.features.auth.models import User
from app.models.application import Application
from app.models.user_profile import UserProfile
from app.ai.agents.cover_letter import cover_letter_agent


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"],
)


@router.post("/cover-letter/{application_id}")
def generate_cover_letter(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate personalized cover letter context
    for one application.
    """

    # -----------------------------------------
    # Get application
    # -----------------------------------------

    application = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.user_id == current_user.id,
        )
        .first()
    )

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

    # -----------------------------------------
    # Get user profile
    # -----------------------------------------

    profile = (
        db.query(UserProfile)
        .filter(
            UserProfile.user_id == current_user.id
        )
        .first()
    )

    profile_data = {}

    cv_text = ""

    if profile:
        profile_data = profile.profile_data or {}
        cv_text = profile.cv_text or ""

    # -----------------------------------------
    # Generate cover letter context
    # -----------------------------------------

    cover_letter = cover_letter_agent(
    application=application,
    profile_data=profile_data,
    cv_text=cv_text,
    )

    return {
        "application_id": application.id,
        "position": application.position,
        "company": (
            application.company.name
            if application.company
            else None
        ),
        "cover_letter": cover_letter,
    }