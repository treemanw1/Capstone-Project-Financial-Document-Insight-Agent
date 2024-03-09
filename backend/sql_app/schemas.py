from pydantic import BaseModel

class StatusResponse(BaseModel):
    success: bool
    message: str

class UserCredentials(BaseModel):
    username: str
    password: str

class User(BaseModel):
    username: str
    hashed_password: str
    id: int
    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    id: int
    username: str

class Session(BaseModel):
    id: int

class Query(BaseModel):
    id: int
    text: str

class PDF(BaseModel):
    id: int
