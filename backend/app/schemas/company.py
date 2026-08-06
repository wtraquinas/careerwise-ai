from pydantic import BaseModel


class CompanyCreate(BaseModel):
    name: str
    website: str | None = None
    industry: str | None = None
    location: str | None = None
    notes: str | None = None


class CompanyUpdate(CompanyCreate):
    pass


class CompanyResponse(CompanyCreate):
    id: int

    class Config:
        from_attributes = True