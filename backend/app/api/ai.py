from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.services.ai_service import AIService

from app.schemas.ai import (
    AIChatRequest,
    AIAnalysisRequest,
    AIChatResponse,
)

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

@router.post("/analyze")
def analyze_career(
    request: AIAnalysisRequest,
    db: Session = Depends(get_db),
):
    return AIService.analyze(db)