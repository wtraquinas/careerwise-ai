from openai import OpenAI

from app.core.config import settings


client = OpenAI(
    api_key=settings.OPENAI_API_KEY
)


SYSTEM_PROMPT = """
You are CareerWise AI Coach.

You are an expert career coach helping software engineers,
AI engineers, data scientists and IT professionals.

You help users:

- improve resumes
- prepare interviews
- negotiate salary
- improve LinkedIn profiles
- analyse job descriptions
- generate cover letters
- improve job applications

Always answer professionally.

Use markdown formatting.

Keep answers practical and actionable.
"""


class AIService:

    @staticmethod
    def chat(message: str):

        response = client.chat.completions.create(

            model="gpt-5.5",

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