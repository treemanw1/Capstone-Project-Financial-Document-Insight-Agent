from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String(30), nullable=False, unique=True)
    password = Column(String(97), nullable=False)

    # sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    def __repr__(self):
        return f"User(id={self.id!r}, username={self.name!r})"

class Session(Base):
    __tablename__ = "SESSIONS"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)

    # user = relationship("User", back_populates="sessions")
    # pdfs = relationship("SessionPDFs", back_populates="session", cascade="all, delete-orphan")
    def __repr__(self):
        return f"Session(id={self.id!r}, created_at={self.created_at!r})"

class PDF(Base):
    __tablename__ = "PDF"
    id = Column(Integer, primary_key=True)

    # session = relationship("SessionPDFs", back_populates="pdfs")
    def __repr__(self):
        return f"PDF(id={self.id!r}, title={self.title!r})"

class SessionPDFs(Base):
    __tablename__ = "SESSION_PDFS"
    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("session.id"), nullable=False)
    pdf_id = Column(Integer, ForeignKey("pdf.id"), nullable=False, unique=True)

    # session = relationship("Session", back_populates="pdfs")
    # pdfs = relationship("PDF", back_populates="session", cascade="all, delete-orphan")
    def __repr__(self):
        return f"SessionPDFs(id={self.id!r}, session_id={self.session_id!r}, pdf_id={self.pdf_id!r})"

class ChatHistory(Base): 
    __tablename__ = "CHAT_HISTORY"
    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("session.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)
    username = Column(String(500), nullable=False)
    type = Column(String(4), nullable=False)

    # session = relationship("Session", back_populates="pdfs")
    def __repr__(self):
        return f"ChatHistory(id={self.id!r}, message={self.message!r})"

