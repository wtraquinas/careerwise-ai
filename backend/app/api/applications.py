from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.features.auth.models import User

from app.schemas.application import (
    ApplicationCreate,
    ApplicationResponse,
)

from app.services.application_service import ApplicationService


router = APIRouter(
    prefix="/api/v1/applications",
    tags=["Applications"],
)


@router.get(
    "",
    response_model=list[ApplicationResponse],
)
def get_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ApplicationService.get_all(
        db,
        current_user,
    )


@router.post(
    "",
    response_model=ApplicationResponse,
)
def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    created = ApplicationService.create(
        db,
        application,
        current_user,
    )

    if not created:
        raise HTTPException(
            status_code=404,
            detail="Company not found or not accessible",
        )

    return created


@router.get(
    "/{application_id}",
    response_model=ApplicationResponse,
)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    application = ApplicationService.get_by_id(
        db,
        application_id,
        current_user,
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )

    return application


@router.put(
    "/{application_id}",
    response_model=ApplicationResponse,
)
def update_application(
    application_id: int,
    application: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated = ApplicationService.update(
        db,
        application_id,
        application,
        current_user,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Application not found or company not accessible",
        )

    return updated


@router.delete(
    "/{application_id}",
)
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = ApplicationService.delete(
        db,
        application_id,
        current_user,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Application not found",
        )

    return {
        "success": True,
    }