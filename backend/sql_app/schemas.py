from pydantic import BaseModel
from typing import List
from datetime import date, datetime

class StatusResponse(BaseModel):
    success: bool
    message: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class UserCredentials(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
    password: str
    # class Config:
    #     orm_mode = True

class UserResponse(BaseModel):
    id: int
    username: str

class PDF(BaseModel):
    id: int
    pdf_document_name: str
    company_name: str
    filepath: str

class SearchQuery(BaseModel):
    document_type: str
    query: str

class AdvancedSearchQuery(BaseModel):
    document_type: str
    query: str
    status: str
    start_date: date
    end_date: date

class LLMResponse(BaseModel):
    response: str
    chunk: str

class ChatMessage(BaseModel):
    session_id: int
    role: str # user | bot
    message: str

