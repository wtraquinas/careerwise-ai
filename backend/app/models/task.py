from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from app.shared.database.base import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    title = Column(
        String(255),
        nullable=False,
    )

    description = Column(
        Text,
        nullable=True,
    )

    status = Column(
        String(50),
        nullable=False,
        default="pending",
    )

    priority = Column(
        String(50),
        nullable=False,
        default="medium",
    )

    due_date = Column(
        Date,
        nullable=True,
    )

    application_id = Column(
        Integer,
        ForeignKey("applications.id"),
        nullable=True,
    )

    recruiter_id = Column(
        Integer,
        ForeignKey("recruiters.id"),
        nullable=True,
    )