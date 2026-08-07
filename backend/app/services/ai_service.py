from openai import OpenAI

from app.core.config import settings


client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


SYSTEM_PROMPT = """
You are CareerWise AI Coach.

You are a senior career coach specialised in

• Software Engineering
• AI Engineering
• Machine Learning
• Data Science
• Cloud Engineering
• DevOps

Your goals are to help users:

- land interviews
- improve resumes
- improve LinkedIn
- prepare interviews
- negotiate salaries
- evaluate job offers
- write cover letters
- improve career growth

Always:

• be encouraging

• explain WHY

• give examples

• use bullet points

• use markdown

• keep answers actionable

Never invent user experience.

Never exaggerate.

If information is missing, ask follow-up questions.
"""


class AIService:

    @staticmethod
    def chat(message: str):

        response = client.chat.completions.create(

            model="gpt-4o-mini",

            messages=[

                {
                    "role": "system",
                    "content": SYSTEM_PROMPT,
                },

                {
                    "role": "user",
                    "content": message,
                },

            ],

            temperature=0.7,

            max_tokens=1000,

        )

        return response.choices[0].message.content