from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    ForeignKey,
    Text,
)

from sqlalchemy.orm import relationship

from app.shared.database.base import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    company_id = Column(
        Integer,
        ForeignKey("companies.id"),
        nullable=False,
    )

    position = Column(String, nullable=False)

    status = Column(String, default="Applied")

    salary = Column(String)

    job_url = Column(String)

    applied_date = Column(Date)

    notes = Column(Text)

    company = relationship("Company")