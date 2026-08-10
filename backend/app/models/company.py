from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.shared.database.base import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(255), nullable=False)

    website = Column(String(255))

    industry = Column(String(100))

    location = Column(String(150))

    notes = Column(Text)

    recruiters = relationship(
        "Recruiter",
        back_populates="company",
        cascade="all, delete-orphan",
    )