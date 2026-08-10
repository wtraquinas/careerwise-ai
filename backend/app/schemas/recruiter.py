from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RecruiterBase(BaseModel):
    name: str
    email: str | None = None
    linkedin_url: str | None = None
    phone: str | None = None
    notes: str | None = None
    company_id: int | None = None


class RecruiterCreate(RecruiterBase):
    pass


class RecruiterUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    linkedin_url: str | None = None
    phone: str | None = None
    notes: str | None = None
    company_id: int | None = None


class RecruiterResponse(RecruiterBase):
    id: int

    model_config = ConfigDict(from_attributes=True)