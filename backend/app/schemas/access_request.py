from datetime import datetime

from pydantic import BaseModel, EmailStr


class AccessRequestCreate(BaseModel):

    name: str

    email: EmailStr


class AccessRequestResponse(BaseModel):

    id: int

    name: str

    email: EmailStr

    status: str

    created_at: datetime

    class Config:

        from_attributes = True

