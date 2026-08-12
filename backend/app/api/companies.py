from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user

from app.features.auth.models import User

from app.schemas.company import (
    CompanyCreate,
    CompanyResponse,
)

from app.services.company_service import CompanyService


router = APIRouter(
    prefix="/api/v1/companies",
    tags=["Companies"],
)


@router.get(
    "",
    response_model=list[CompanyResponse],
)
def get_companies(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return CompanyService.get_all(
        db,
        current_user,
    )


@router.post(
    "",
    response_model=CompanyResponse,
)
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return CompanyService.create(
        db,
        company,
        current_user,
    )


@router.get(
    "/{company_id}",
    response_model=CompanyResponse,
)
def get_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    company = CompanyService.get_by_id(
        db,
        company_id,
        current_user,
    )

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found",
        )

    return company


@router.put(
    "/{company_id}",
    response_model=CompanyResponse,
)
def update_company(
    company_id: int,
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated = CompanyService.update(
        db,
        company_id,
        company,
        current_user,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Company not found",
        )

    return updated


@router.delete(
    "/{company_id}",
)
def delete_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = CompanyService.delete(
        db,
        company_id,
        current_user,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Company not found",
        )

    return {
        "success": True,
    }