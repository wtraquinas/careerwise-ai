from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.ai import AIChatRequest, AIChatResponse
from app.services.ai_service import AIService


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI Coach"],
)


@router.post("/chat", response_model=AIChatResponse)
def chat(
    request: AIChatRequest,
    db: Session = Depends(get_db),
):
    answer = AIService.chat(
        db,
        request.message,
    )

    return {
        "answer": answer,
    }