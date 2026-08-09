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
    def get_application_context(
        db: Session,
        application_id: int,
    ) -> str:

        application = (
            db.query(Application)
            .filter(Application.id == application_id)
            .first()
        )

        if not application:
            return ""

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

        return f"""
    APPLICATION:

    Application ID: {application.id}
    Company: {company_name}
    Position: {application.position}
    Status: {application.status}
    Salary: {application.salary or "Not specified"}
    Applied date: {application.applied_date or "Not specified"}
    Job URL: {application.job_url or "Not specified"}
    Notes: {application.notes or "None"}
    """


    @staticmethod
    def analyze_application(
        db: Session,
        application_id: int,
    ) -> dict:

        context = AIService.get_application_context(
            db,
            application_id,
        )

        if not context:
            return {
                "error": "Application not found."
            }

        system_prompt = """
    You are CareerWise AI Coach.

    Analyze the job application provided by the user.

    Give practical, concise career advice.

    Your response MUST be valid JSON.

    Use exactly these fields:

    {
        "summary": "short assessment",
        "priority": "high, medium, or low",
        "reason": "why this priority was assigned",
        "next_steps": [
            "action 1",
            "action 2",
            "action 3"
        ],
        "interview_preparation": [
            "preparation item 1",
            "preparation item 2"
        ],
        "follow_up": "recommended follow-up action"
    }

    Do not include markdown.
    Do not include ```json.
    Do not include any text outside the JSON object.

    If the application is not at interview stage,
    interview_preparation can be an empty list.
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
                    "content": context,
                },
            ],
            max_completion_tokens=2000,
        )

        print("========== APPLICATION ANALYSIS RESPONSE ==========")
        print(response)
        print("====================================================")

        content = response.choices[0].message.content

        if not content:
            return {
                "error": "The AI returned an empty response."
            }

        import json

        try:
            return json.loads(content)

        except json.JSONDecodeError:

            print("AI returned invalid JSON:")
            print(content)

            return {
                "error": "The AI returned an invalid analysis response.",
                "raw_response": content,
            }

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

Write naturally and clearly.

Use proper spacing between words.
Do not concatenate words.
Use short paragraphs and bullet points where appropriate.
Do not include unnecessary meta-commentary.

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


    @staticmethod
    def analyze(db: Session) -> dict:

        career_context = AIService.get_career_context(db)

        system_prompt = f"""
    You are CareerWise AI Career Insights.

    You analyze a user's current job application pipeline
    and provide practical career recommendations.

    Use ONLY the CareerWise data provided below when making
    claims about the user's applications.

    Do not invent applications, companies, statuses, dates,
    salaries, recruiter interactions, or other career data.

    Analyze:

    - Application status
    - Application dates
    - Companies
    - Positions
    - Salary information
    - Notes

    Identify which applications deserve the most attention.

    Return your answer as valid JSON with exactly this structure:

    {{
        "summary": "Short overall assessment of the current pipeline.",
        "priorities": [
            {{
                "application_id": 0,
                "priority": "high",
                "reason": "Why this application deserves attention.",
                "action": "What the user should do next."
            }}
        ],
        "recommendations": [
            "Practical recommendation 1",
            "Practical recommendation 2"
        ]
    }}

    Priority must be one of:

    - high
    - medium
    - low

    Keep the analysis concise and practical.

    ## CURRENT CAREERWISE DATA

    {career_context}
    """

        response = client.chat.completions.create(
            model="gpt-5-mini",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                }
            ],
            max_completion_tokens=1500,
            response_format={
                "type": "json_object"
            },
        )

        content = response.choices[0].message.content

        if not content:
            raise ValueError("OpenAI returned an empty analysis.")

        import json

        return json.loads(content)



        print("========== OPENAI RESPONSE ==========")
        print(response)
        print("======================================")

        return response.choices[0].message.content or ""