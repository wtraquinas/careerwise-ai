from openai import OpenAI
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.application import Application
from app.models.company import Company


client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


class AIService:

    @staticmethod
    def get_career_context(db: Session) -> str:

        applications = (
            db.query(Application)
            .order_by(Application.id)
            .all()
        )

        if not applications:
            return "No job applications are currently stored."

        context = []

        context.append("CURRENT CAREERWISE APPLICATIONS:")

        for application in applications:

            company = (
                db.query(Company)
                .filter(Company.id == application.company_id)
                .first()
            )

            company_name = (
                company.name
                if company
                else "Unknown company"
            )

            context.append(
                f"""
Application ID: {application.id}
Company: {company_name}
Position: {application.position}
Status: {application.status}
Salary: {application.salary or "Not specified"}
Applied date: {application.applied_date or "Not specified"}
Job URL: {application.job_url or "Not specified"}
Notes: {application.notes or "None"}
"""
            )

        return "\n".join(context)


    @staticmethod
    def chat(
        db: Session,
        message: str,
    ) -> str:

        career_context = (
            AIService.get_career_context(db)
        )

        system_prompt = f"""
You are CareerWise AI Coach.

You are an AI career assistant inside CareerWise,
a Career Operating System that helps users manage
their job search and career development.

You have access to the user's CareerWise application
data below.

Use this data when it is relevant to the user's question.

Do not invent applications, companies, statuses,
dates, salaries or other career information.

If the available data does not contain the information
needed to answer a question, say so clearly.

Be practical, concise and actionable.

CURRENT CAREERWISE DATA
-----------------------

{career_context}

-----------------------

Your responsibilities include:

- Career advice
- Job search strategy
- Application follow-up recommendations
- Application pipeline analysis
- Interview preparation
- Career planning
- Skills development
- Salary discussions
- CV and LinkedIn advice

When analyzing applications, pay attention to:

- Application status
- How long ago the application was submitted
- Companies
- Positions
- Salary information
- Notes

If the user asks about their applications,
use the actual CareerWise data above.
"""

        response = client.chat.completions.create(
            model="gpt-5-mini",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": message,
                },
            ],
            max_completion_tokens=3000,
        )

        print("========== OPENAI RESPONSE ==========")
        print(response)
        print("======================================")

        return response.choices[0].message.content or ""