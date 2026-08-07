from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI Coach"],
)


# -------------------------
# Request Schema
# -------------------------

class ChatRequest(BaseModel):
    message: str


# -------------------------
# Response Schema
# -------------------------

class ChatResponse(BaseModel):
    answer: str


# -------------------------
# AI Chat Endpoint
# -------------------------
from app.services.ai_service import AIService

@router.post(
    "/chat",
    response_model=ChatResponse,
)
def chat(request: ChatRequest):

    answer = AIService.chat(request.message)

    return ChatResponse(
        answer=answer,
    )