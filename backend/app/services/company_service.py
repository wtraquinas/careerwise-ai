from sqlalchemy.orm import Session

from app.models.company import Company


class CompanyService:

    @staticmethod
    def get_all(
        db: Session,
        current_user,
    ):
        query = db.query(Company)

        # Admins can see all companies.
        # Regular users only see their own.
        if current_user.role != "admin":
            query = query.filter(
                Company.user_id == current_user.id
            )

        return query.order_by(Company.name).all()

    @staticmethod
    def get_by_id(
        db: Session,
        company_id: int,
        current_user,
    ):
        query = db.query(Company).filter(
            Company.id == company_id
        )

        if current_user.role != "admin":
            query = query.filter(
                Company.user_id == current_user.id
            )

        return query.first()

    @staticmethod
    def create(
        db: Session,
        company_data,
        current_user,
    ):
        company = Company(
            **company_data.model_dump(),
            user_id=current_user.id,
        )

        db.add(company)
        db.commit()
        db.refresh(company)

        return company

    @staticmethod
    def update(
        db: Session,
        company_id: int,
        company_data,
        current_user,
    ):
        company = CompanyService.get_by_id(
            db,
            company_id,
            current_user,
        )

        if not company:
            return None

        for key, value in company_data.model_dump().items():
            setattr(company, key, value)

        db.commit()
        db.refresh(company)

        return company

    @staticmethod
    def delete(
        db: Session,
        company_id: int,
        current_user,
    ):
        company = CompanyService.get_by_id(
            db,
            company_id,
            current_user,
        )

        if not company:
            return False

        db.delete(company)
        db.commit()

        return True