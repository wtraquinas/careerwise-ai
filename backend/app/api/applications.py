from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.application import ApplicationCreate, ApplicationResponse
from app.services.application_service import ApplicationService

router = APIRouter(
    prefix="/api/v1/applications",
    tags=["Applications"],
)


@router.get("/", response_model=list[ApplicationResponse])
def get_applications(db: Session = Depends(get_db)):
    return ApplicationService.get_all(db)


@router.post("/", response_model=ApplicationResponse)
def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db),
):
    return ApplicationService.create(db, application)

@router.get("/{application_id}", response_model=ApplicationResponse)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
):
    return ApplicationService.get_by_id(db, application_id)


@router.put("/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: int,
    application: ApplicationCreate,
    db: Session = Depends(get_db),
):
    return ApplicationService.update(
        db,
        application_id,
        application,
    )


@router.delete("/{application_id}")
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
):
    ApplicationService.delete(db, application_id)

    return {
        "success": True,
    }