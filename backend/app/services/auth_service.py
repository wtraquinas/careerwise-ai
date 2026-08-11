from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


class AuthService:

    @staticmethod
    def register(db: Session, user_data):

        existing = (
            db.query(User)
            .filter(User.email == user_data.email)
            .first()
        )

        if existing:
            raise ValueError("Email already exists")

        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            hashed_password=hash_password(user_data.password),
            role="user",
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def login(db: Session, email: str, password: str):

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if user is None:
            return None

        if not verify_password(password, user.hashed_password):
            return None

        token = create_access_token(
            {
                "sub": user.email,
            }
        )

        return token