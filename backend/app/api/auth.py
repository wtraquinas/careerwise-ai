from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.features.auth.models import User

from app.schemas.auth import (
    UserRegister,
    UserLogin,
    ChangePasswordRequest,
)

from app.services.auth_service import AuthService

from app.core.security import (
    hash_password,
    verify_password,
)


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


@router.get("/me")
def get_me(
    current_user = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role,
    }


@router.post("/change-password")
def change_password(
    password_data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not verify_password(
        password_data.current_password,
        current_user.hashed_password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect",
        )

    if password_data.current_password == password_data.new_password:
        raise HTTPException(
            status_code=400,
            detail="New password must be different from current password",
        )

    current_user.hashed_password = hash_password(
        password_data.new_password
    )

    db.commit()

    return {
        "message": "Password changed successfully"
    }