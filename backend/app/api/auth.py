from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.auth import UserRegister
from app.services.auth_service import AuthService

from app.schemas.auth import UserLogin

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.post("/login")
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):

    token = AuthService.login(
        db,
        credentials.email,
        credentials.password,
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    return {
        "access_token": token,
        "token_type": "bearer",
    }


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