import json

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

        context = ["CURRENT CAREERWISE APPLICATIONS:"]

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

    # ---------------------------------------------------------
    # SINGLE APPLICATION CONTEXT
    # ---------------------------------------------------------

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

    # ---------------------------------------------------------
    # AI ANALYSIS OF ONE APPLICATION
    # ---------------------------------------------------------

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

        print(
            "========== APPLICATION ANALYSIS RESPONSE =========="
        )
        print(response)
        print(
            "===================================================="
        )

        content = response.choices[0].message.content

        if not content:
            return {
                "error": "The AI returned an empty response."
            }

        try:
            return json.loads(content)

        except json.JSONDecodeError:

            print("AI returned invalid JSON:")
            print(content)

            return {
                "error": "The AI returned an invalid analysis response.",
                "raw_response": content,
            }

    # ---------------------------------------------------------
    # AI COACH CHAT
    # ---------------------------------------------------------

    @staticmethod
    def chat(
        db: Session,
        message: str,
    ) -> str:

        career_context = AIService.get_career_context(db)

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

## CURRENT CAREERWISE DATA

{career_context}

---

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

        print("========== OPENAI CHAT RESPONSE ==========")
        print(response)
        print("==========================================")

        content = response.choices[0].message.content

        if not content:
            return (
                "I wasn't able to generate a response right now. "
                "Please try your question again."
            )

        return content

    # ---------------------------------------------------------
    # CAREER PIPELINE ANALYSIS
    # ---------------------------------------------------------

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
                },
                {
                    "role": "user",
                    "content": (
                        "Analyze my current application pipeline "
                        "and give me practical career recommendations."
                    ),
                },
            ],
            max_completion_tokens=2000,
        )

        print("========== OPENAI PIPELINE ANALYSIS ==========")
        print(response)
        print("===============================================")

        content = response.choices[0].message.content

        if not content:
            return {
                "error": "I wasn't able to generate a career analysis right now."
            }

        try:
            return json.loads(content)

        except json.JSONDecodeError:

            print("AI returned invalid JSON:")
            print(content)

            return {
                "error": "The AI returned an invalid analysis response.",
                "raw_response": content,
            }


    # ---------------------------------------------------------
    # COVER LETTER GENERATION
    # ---------------------------------------------------------

    @staticmethod
    def generate_cover_letter(
        application_context: dict,
        profile_data: dict,
        cv_text: str = "",
    ) -> str:
        """
        Generate a personalized cover letter using application
        information and the user's career profile.
        """

        application = application_context.get(
            "application",
            {}
        )

        profile = application_context.get(
            "profile",
            profile_data or {}
        )

        position = (
            application.get("position")
            or "the position"
        )

        company = (
            application.get("company")
            or "the company"
        )

        notes = (
            application.get("notes")
            or "No additional job description or notes provided."
        )

        skills = profile.get("skills", [])
        projects = profile.get("projects", [])
        experience = profile.get("experience", [])
        education = profile.get("education", [])
        target_roles = profile.get(
            "target_roles",
            [],
        )

        system_prompt = """
    You are CareerWise AI, an expert career assistant.

    Your task is to write a personalized, professional cover letter.

    Use ONLY information provided in the candidate profile,
    CV, and application context.

    IMPORTANT RULES:

    - Do not invent skills.
    - Do not invent employers.
    - Do not invent projects.
    - Do not invent degrees or education.
    - Do not invent achievements, metrics, certifications,
    responsibilities, or years of experience.
    - Do not claim that the candidate has experience that is
    not supported by the provided information.
    - Select only the information that is most relevant to the
    position.
    - Do not simply list every skill or project.
    - If information about the job requirements is limited,
    focus on the position title and available application notes.
    - Write naturally and professionally.
    - Avoid exaggerated or overly generic language.
    - Keep the letter concise, approximately 250–350 words.
    - Use a standard cover letter structure.
    - Start with "Dear Hiring Manager,".
    - Do not include placeholders such as [Your Name].
    - Do not add commentary before or after the cover letter.
    - Return only the finished cover letter.
    """

        user_prompt = f"""
    ## APPLICATION

    Company:
    {company}

    Position:
    {position}

    Application status:
    {application.get("status") or "Not specified"}

    Application notes / job information:
    {notes}

    ---

    ## CANDIDATE PROFILE

    Target roles:
    {", ".join(target_roles) if target_roles else "Not specified"}

    Skills:
    {", ".join(skills) if skills else "Not specified"}

    Projects:
    {json.dumps(projects, indent=2) if projects else "Not specified"}

    Experience:
    {json.dumps(experience, indent=2) if experience else "Not specified"}

    Education:
    {json.dumps(education, indent=2) if education else "Not specified"}

    ---

    ## SUPPORTING CV INFORMATION

    {cv_text[:6000] if cv_text else "No CV text available."}

    ---

    Write a personalized cover letter for this application.
    Prioritize the strongest and most relevant evidence from the
    candidate's profile.
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
                    "content": user_prompt,
                },
            ],
            max_completion_tokens=1200,
        )

        content = response.choices[0].message.content

        if not content:
            return (
                "I wasn't able to generate a cover letter "
                "right now. Please try again."
            )

        return content