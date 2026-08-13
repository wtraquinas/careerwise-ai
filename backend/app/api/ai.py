from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)

from app.dependencies import (
    get_db,
    get_current_user,
)

from app.features.auth.models import User
from app.models.application import Application

from app.services.ai_service import AIService
from sqlalchemy.orm import Session

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


@router.post("/analyze/{application_id}")
def analyze_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    application = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.user_id == current_user.id,
        )
        .first()
    )

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found",
        )

    return AIService.analyze_application(
        db,
        application_id,
    )