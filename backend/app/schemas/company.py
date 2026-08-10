from pydantic import BaseModel, ConfigDict


class RecruiterSummary(BaseModel):
    id: int
    name: str
    email: str | None = None
    linkedin_url: str | None = None

    model_config = ConfigDict(from_attributes=True)


class CompanyCreate(BaseModel):
    name: str
    website: str | None = None
    industry: str | None = None
    location: str | None = None
    notes: str | None = None


class CompanyUpdate(CompanyCreate):
    pass


class CompanyResponse(BaseModel):
    name: str
    website: str | None = None
    industry: str | None = None
    location: str | None = None
    notes: str | None = None
    id: int

    recruiters: list[RecruiterSummary] = []

    model_config = ConfigDict(from_attributes=True)