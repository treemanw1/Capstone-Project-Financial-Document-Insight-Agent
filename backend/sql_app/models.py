from sqlalchemy import Column, ForeignKey, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(30), nullable=False, unique=True)
    password = Column(String(97), nullable=False)

    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    def __repr__(self):
        return f"User(id={self.id!r}, username={self.name!r})"

class PDF(Base):
    __tablename__ = "EXTRACTED_PDF"
    id = Column(Integer, primary_key=True)
    pdf_document_name = Column(String(122), nullable=False)
    document_type = Column(String(30), nullable=False)
    company_name = Column(String(100), nullable=False)
    filepath = Column(Text, nullable=False)

    sessionPDF = relationship("SessionPDFs", back_populates="pdfs")
    def __repr__(self):
        return f"PDF(id={self.id!r}, title={self.pdf_document_name!r})"

class SessionPDFs(Base):
    __tablename__ = "session_pdfs"
    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    pdf_id = Column(Integer, ForeignKey("EXTRACTED_PDF.id"), nullable=False, unique=True)

    pdfs = relationship("PDF", back_populates="sessionPDF")
    session = relationship("Session", back_populates="sessionPDF")
    def __repr__(self):
        return f"SessionPDFs(id={self.id!r}, session_id={self.session_id!r}, pdf_id={self.pdf_id!r})"

class Session(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)

    user = relationship("User", back_populates="sessions")
    sessionPDF = relationship("SessionPDFs", back_populates="session", cascade="all, delete-orphan")
    chat_history = relationship("ChatHistory", back_populates="session")
    def __repr__(self):
        return f"Session(id={self.id!r}, created_at={self.created_at!r})"

class ChatHistory(Base): 
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("sessions.id"), nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    role = Column(String(4), nullable=False) # user | bot
    message = Column(String(500), nullable=False)
    # chunk_id = Column(Integer, ForeignKey("chunks.id"), nullable=True)
    
    session = relationship("Session", back_populates="chat_history")
    def __repr__(self):
        return f"ChatHistory(id={self.id!r}, message={self.message!r})"
