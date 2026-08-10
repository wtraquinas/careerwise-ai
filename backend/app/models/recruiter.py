from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.shared.database.base import Base


class Recruiter(Base):
    __tablename__ = "recruiters"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(150), nullable=False)

    email = Column(String(255), nullable=True)

    linkedin_url = Column(String(500), nullable=True)

    phone = Column(String(50), nullable=True)

    notes = Column(Text, nullable=True)

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=True,
    )

    company = relationship(
        "Company",
        back_populates="recruiters",
    )