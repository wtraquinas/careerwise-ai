from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.core.security import hash_password


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
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user