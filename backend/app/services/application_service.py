from sqlalchemy.orm import Session

from app.models.application import Application


class ApplicationService:

    @staticmethod
    def get_all(db: Session):
        return db.query(Application).order_by(Application.id).all()

    @staticmethod
    def get_by_id(db: Session, application_id: int):
        return (
            db.query(Application)
            .filter(Application.id == application_id)
            .first()
        )

    @staticmethod
    def create(db: Session, application_data):

        application = Application(**application_data.model_dump())

        db.add(application)
        db.commit()
        db.refresh(application)

        return application

    @staticmethod
    def update(db: Session, application_id: int, application_data):

        application = ApplicationService.get_by_id(db, application_id)

        if not application:
            return None

        for key, value in application_data.model_dump().items():
            setattr(application, key, value)

        db.commit()
        db.refresh(application)

        return application

    @staticmethod
    def delete(db: Session, application_id: int):

        application = ApplicationService.get_by_id(db, application_id)

        if not application:
            return False

        db.delete(application)
        db.commit()

        return True