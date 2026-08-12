from sqlalchemy.orm import Session

from app.shared.database import models
from app.models.application import Application
from app.models.company import Company


def career_crm_agent(state, db: Session):
    """
    Retrieve career data belonging only to the authenticated user.
    """

    user_id = state["user_id"]

    applications = (
        db.query(Application)
        .filter(Application.user_id == user_id)
        .order_by(Application.id)
        .all()
    )

    companies = (
        db.query(Company)
        .filter(Company.user_id == user_id)
        .order_by(Company.id)
        .all()
    )

    application_data = [
        {
            "id": application.id,
            "company_id": application.company_id,
            "position": application.position,
            "status": application.status,
            "salary": application.salary,
            "job_url": application.job_url,
            "applied_date": (
                application.applied_date.isoformat()
                if application.applied_date
                else None
            ),
            "notes": application.notes,
        }
        for application in applications
    ]

    company_data = [
        {
            "id": company.id,
            "name": company.name,
            "website": company.website,
            "industry": company.industry,
            "location": company.location,
            "notes": company.notes,
        }
        for company in companies
    ]

    return {
        "applications": application_data,
        "companies": company_data,
    }