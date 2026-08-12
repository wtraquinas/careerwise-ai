from pydantic import BaseModel, Field


class AIQuestionRequest(BaseModel):
    question: str = Field(
        min_length=1,
        max_length=1000,
    )


class AIQuestionResponse(BaseModel):
    question: str
    intent: str
    answer: str