from fastapi import APIRouter, Depends

from app.ai.graph.workflow import build_graph
from app.ai.schemas import (
    AIQuestionRequest,
    AIQuestionResponse,
)

from app.dependencies import get_current_user
from app.features.auth.models import User


router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"],
)


graph = build_graph()


@router.post(
    "/ask",
    response_model=AIQuestionResponse,
)
def ask_ai(
    request: AIQuestionRequest,
    current_user: User = Depends(get_current_user),
):
    """
    Ask the CareerWise AI Coach.

    The authenticated user's ID is injected into the
    LangGraph state and never comes from the frontend.
    """

    result = graph.invoke(
        {
            "user_id": current_user.id,
            "question": request.question,
        }
    )

    return {
        "question": request.question,
        "intent": result["intent"],
        "answer": result["final_answer"],
    }