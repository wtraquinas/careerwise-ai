from datetime import date

from pydantic import BaseModel


class ApplicationBase(BaseModel):
    company_id: int
    position: str
    status: str
    salary: str | None = None
    job_url: str | None = None
    applied_date: date | None = None
    notes: str | None = None


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(ApplicationBase):
    pass


class ApplicationResponse(ApplicationBase):
    id: int

    class Config:
        from_attributes = True