from app.models.application import Application
from app.services.ai_service import AIService


def cover_letter_agent(
    application: Application,
    profile_data: dict | None = None,
    cv_text: str | None = None,
) -> str:
    """
    Generate a personalized cover letter for an application.
    """

    profile_data = profile_data or {}
    cv_text = cv_text or ""

    application_context = {
        "application": {
            "id": application.id,
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
            "company": (
                application.company.name
                if application.company
                else None
            ),
        },
        "profile": {
            "skills": profile_data.get("skills", []),
            "projects": profile_data.get("projects", []),
            "experience": profile_data.get("experience", []),
            "education": profile_data.get("education", []),
            "target_roles": profile_data.get(
                "target_roles",
                [],
            ),
        },
    }

    return AIService.generate_cover_letter(
        application_context=application_context,
        profile_data=profile_data,
        cv_text=cv_text,
    )