from fastapi import APIRouter

from pydantic import BaseModel

from app.services.ai_service import AIService


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    answer: str


@router.post(
    "/chat",
    response_model=ChatResponse,
)
def chat(request: ChatRequest):

    answer = AIService.chat(request.message)

    return ChatResponse(answer=answer)