from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.company import CompanyCreate, CompanyResponse
from app.services.company_service import CompanyService

router = APIRouter(
    prefix="/api/v1/companies",
    tags=["Companies"],
)


@router.get("", response_model=list[CompanyResponse])
def get_companies(db: Session = Depends(get_db)):
    return CompanyService.get_all(db)


@router.post("", response_model=CompanyResponse)
def create_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
):
    return CompanyService.create(db, company)

@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(
    company_id: int,
    db: Session = Depends(get_db),
):
    return CompanyService.get_by_id(db, company_id)


@router.put("/{company_id}", response_model=CompanyResponse)
def update_company(
    company_id: int,
    company: CompanyCreate,
    db: Session = Depends(get_db),
):
    return CompanyService.update(
        db,
        company_id,
        company,
    )


@router.delete("/{company_id}")
def delete_company(
    company_id: int,
    db: Session = Depends(get_db),
):
    CompanyService.delete(db, company_id)

    return {
        "success": True,
    }