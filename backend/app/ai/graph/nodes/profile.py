from sqlalchemy.orm import Session

from app.models.user_profile import UserProfile
from app.shared.database.session import SessionLocal


def get_user_profile(state: dict) -> dict:
    """
    Retrieve the authenticated user's structured CV profile.
    """

    user_id = state.get("user_id")

    if not user_id:
        raise ValueError(
            "get_user_profile requires an authenticated user_id"
        )

    db: Session = SessionLocal()

    try:
        profile = (
            db.query(UserProfile)
            .filter(UserProfile.user_id == user_id)
            .first()
        )

        if not profile:
            return {
                "profile_data": {}
            }

        return {
            "profile_data": profile.profile_data or {}
        }

    finally:
        db.close()