from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str = "user"


class UserUpdate(BaseModel):
    full_name: str
    email: EmailStr
    role: str