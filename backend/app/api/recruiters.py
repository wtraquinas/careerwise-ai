from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.shared.database.session import get_db
from app.models.recruiter import Recruiter
from app.models.company import Company
from app.schemas.recruiter import (
    RecruiterCreate,
    RecruiterUpdate,
    RecruiterResponse,
)

router = APIRouter(
    prefix="/api/v1/recruiters",
    tags=["Recruiters"],
)


@router.get(
    "",
    response_model=list[RecruiterResponse],
)
def get_recruiters(
    db: Session = Depends(get_db),
):
    return (
        db.query(Recruiter)
        .order_by(Recruiter.name)
        .all()
    )


@router.get(
    "/{recruiter_id}",
    response_model=RecruiterResponse,
)
def get_recruiter(
    recruiter_id: int,
    db: Session = Depends(get_db),
):
    recruiter = (
        db.query(Recruiter)
        .filter(Recruiter.id == recruiter_id)
        .first()
    )

    if not recruiter:
        raise HTTPException(
            status_code=404,
            detail="Recruiter not found",
        )

    return recruiter


@router.post(
    "",
    response_model=RecruiterResponse,
    status_code=201,
)
def create_recruiter(
    recruiter_data: RecruiterCreate,
    db: Session = Depends(get_db),
):
    if recruiter_data.company_id is not None:
        company = (
            db.query(Company)
            .filter(Company.id == recruiter_data.company_id)
            .first()
        )

        if not company:
            raise HTTPException(
                status_code=404,
                detail="Company not found",
            )

    recruiter = Recruiter(
        **recruiter_data.model_dump()
    )

    db.add(recruiter)
    db.commit()
    db.refresh(recruiter)

    return recruiter


@router.put(
    "/{recruiter_id}",
    response_model=RecruiterResponse,
)
def update_recruiter(
    recruiter_id: int,
    recruiter_data: RecruiterUpdate,
    db: Session = Depends(get_db),
):
    recruiter = (
        db.query(Recruiter)
        .filter(Recruiter.id == recruiter_id)
        .first()
    )

    if not recruiter:
        raise HTTPException(
            status_code=404,
            detail="Recruiter not found",
        )

    data = recruiter_data.model_dump(
        exclude_unset=True
    )

    if "company_id" in data and data["company_id"] is not None:
        company = (
            db.query(Company)
            .filter(Company.id == data["company_id"])
            .first()
        )

        if not company:
            raise HTTPException(
                status_code=404,
                detail="Company not found",
            )

    for field, value in data.items():
        setattr(recruiter, field, value)

    db.commit()
    db.refresh(recruiter)

    return recruiter


@router.delete(
    "/{recruiter_id}",
    status_code=204,
)
def delete_recruiter(
    recruiter_id: int,
    db: Session = Depends(get_db),
):
    recruiter = (
        db.query(Recruiter)
        .filter(Recruiter.id == recruiter_id)
        .first()
    )

    if not recruiter:
        raise HTTPException(
            status_code=404,
            detail="Recruiter not found",
        )

    db.delete(recruiter)
    db.commit()

    return None