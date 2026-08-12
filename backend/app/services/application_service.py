from sqlalchemy.orm import Session

from app.models.application import Application
from app.models.company import Company


class ApplicationService:

    @staticmethod
    def get_all(
        db: Session,
        current_user,
    ):
        query = db.query(Application)

        if current_user.role != "admin":
            query = query.filter(
                Application.user_id == current_user.id
            )

        return (
            query
            .order_by(Application.id)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        application_id: int,
        current_user,
    ):
        query = (
            db.query(Application)
            .filter(Application.id == application_id)
        )

        if current_user.role != "admin":
            query = query.filter(
                Application.user_id == current_user.id
            )

        return query.first()

    @staticmethod
    def create(
        db: Session,
        application_data,
        current_user,
    ):
        # Make sure the selected company belongs
        # to the current user, unless the user is admin.
        company_query = db.query(Company).filter(
            Company.id == application_data.company_id
        )

        if current_user.role != "admin":
            company_query = company_query.filter(
                Company.user_id == current_user.id
            )

        company = company_query.first()

        if not company:
            return None

        application = Application(
            **application_data.model_dump(),
            user_id=current_user.id,
        )

        db.add(application)
        db.commit()
        db.refresh(application)

        return application

    @staticmethod
    def update(
        db: Session,
        application_id: int,
        application_data,
        current_user,
    ):
        application = ApplicationService.get_by_id(
            db,
            application_id,
            current_user,
        )

        if not application:
            return None

        # Validate company ownership too.
        company_query = db.query(Company).filter(
            Company.id == application_data.company_id
        )

        if current_user.role != "admin":
            company_query = company_query.filter(
                Company.user_id == current_user.id
            )

        company = company_query.first()

        if not company:
            return None

        for key, value in application_data.model_dump().items():
            setattr(application, key, value)

        db.commit()
        db.refresh(application)

        return application

    @staticmethod
    def delete(
        db: Session,
        application_id: int,
        current_user,
    ):
        application = ApplicationService.get_by_id(
            db,
            application_id,
            current_user,
        )

        if not application:
            return False

        db.delete(application)
        db.commit()

        return True