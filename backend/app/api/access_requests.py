from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.access_request import AccessRequest

from app.schemas.access_request import (
    AccessRequestCreate,
    AccessRequestResponse,
)


router = APIRouter(
    prefix="/api/v1/access-requests",
    tags=["Access Requests"],
)


@router.post(
    "",
    response_model=AccessRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_access_request(
    request: AccessRequestCreate,
    db: Session = Depends(get_db),
):

    existing_request = (
        db.query(AccessRequest)
        .filter(
            AccessRequest.email == request.email
        )
        .first()
    )

    if existing_request:

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "An access request already exists "
                "for this email address."
            ),
        )

    access_request = AccessRequest(
        name=request.name,
        email=request.email,
        status="pending",
    )

    db.add(access_request)

    db.commit()

    db.refresh(access_request)

    return access_request
