from sqlalchemy.orm import Session

from app.models.company import Company


class CompanyService:

    @staticmethod
    def get_all(db: Session):
        return db.query(Company).order_by(Company.name).all()

    @staticmethod
    def create(db: Session, data):
        company = Company(**data.model_dump())

        db.add(company)
        db.commit()
        db.refresh(company)

        return company