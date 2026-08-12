from sqlalchemy.orm import Session

from app.shared.database import models
from app.models.application import Application
from app.models.company import Company


def career_crm_agent(state, db: Session):
    """
    Retrieve career data belonging only to the authenticated user.

    The agent returns clean structured data for downstream LangGraph
    agents. Database relationships are resolved here so that downstream
    agents do not need to understand the database schema.
    """

    user_id = state.get("user_id")

    if user_id is None:
        raise ValueError(
            "career_crm_agent requires an authenticated user_id"
        )

    # -------------------------------------------------
    # User's companies
    # -------------------------------------------------

    companies = (
        db.query(Company)
        .filter(Company.user_id == user_id)
        .order_by(Company.id)
        .all()
    )

    company_lookup = {
        company.id: company.name
        for company in companies
    }

    # -------------------------------------------------
    # User's applications
    # -------------------------------------------------

    applications = (
        db.query(Application)
        .filter(Application.user_id == user_id)
        .order_by(Application.id)
        .all()
    )

    application_data = [
        {
            "id": application.id,
            "company_id": application.company_id,
            "company": company_lookup.get(
                application.company_id,
                "Unknown company",
            ),
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

    # -------------------------------------------------
    # Company data
    # -------------------------------------------------

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