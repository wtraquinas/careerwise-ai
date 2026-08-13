from sqlalchemy import Column, ForeignKey, Integer, String, Text, JSON
from sqlalchemy.orm import relationship

from app.shared.database.base import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True,
        index=True,
    )

    cv_filename = Column(
        String,
        nullable=True,
    )

    cv_text = Column(
        Text,
        nullable=True,
    )

    profile_data = Column(
        JSON,
        nullable=True,
    )

    user = relationship(
        "User",
        back_populates="profile",
    )