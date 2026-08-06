from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.auth import UserRegister
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db),
):

    try:
        created = AuthService.register(db, user)

        return {
            "id": created.id,
            "full_name": created.full_name,
            "email": created.email,
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )