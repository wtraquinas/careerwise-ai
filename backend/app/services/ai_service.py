from openai import OpenAI
from app.core.config import settings


class AIService:

    @staticmethod
    def chat(message: str):

        client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are CareerWise AI Coach."
                },
                {
                    "role": "user",
                    "content": message
                },
            ],
        )

        return response.choices[0].message.content