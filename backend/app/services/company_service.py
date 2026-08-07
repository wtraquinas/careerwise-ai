from sqlalchemy.orm import Session

from app.models.company import Company


class CompanyService:

    @staticmethod
    def get_all(db: Session):
        return db.query(Company).order_by(Company.name).all()

    @staticmethod
    def get_by_id(db: Session, company_id: int):
        return (
            db.query(Company)
            .filter(Company.id == company_id)
            .first()
        )

    @staticmethod
    def create(db: Session, company_data):

        company = Company(**company_data.model_dump())

        db.add(company)
        db.commit()
        db.refresh(company)

        return company

    @staticmethod
    def update(db: Session, company_id: int, company_data):

        company = CompanyService.get_by_id(db, company_id)

        if not company:
            return None

        for key, value in company_data.model_dump().items():
            setattr(company, key, value)

        db.commit()
        db.refresh(company)

        return company

    @staticmethod
    def delete(db: Session, company_id: int):

        company = CompanyService.get_by_id(db, company_id)

        if not company:
            return False

        db.delete(company)
        db.commit()

        return True