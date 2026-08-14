from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    func,
)

from app.shared.database.base import Base


class AccessRequest(Base):

    __tablename__ = "access_requests"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    email = Column(
        String,
        nullable=False,
        unique=True,
        index=True,
    )

    status = Column(
        String,
        nullable=False,
        default="pending",
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

