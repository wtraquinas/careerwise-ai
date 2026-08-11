from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: str
    email: EmailStr