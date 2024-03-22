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
    company: str
    num_pages: int
    filepath: str

class SearchQuery(BaseModel):
    start_date: datetime
    end_date: datetime
    companies: List[str]

class AdvancedSearchQuery(BaseModel):
    document_type: str
    query: str
    status: str
    start_date: date
    end_date: date

class Chunk(BaseModel):
    text: str
    page_num: int
    pdf_id: int
    chat_history_id: int
    score: float

class ChatMessage(BaseModel):
    session_id: int
    role: str # user | bot
    message: str

class BotMessage(ChatMessage):
    chunks: List[Chunk]

class Session(BaseModel):
    id: int
    name: str
    created_at: datetime

class CreateSession(BaseModel):
    user_id: int
    pdf_ids: List[int]