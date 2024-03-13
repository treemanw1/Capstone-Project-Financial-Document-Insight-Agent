from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy import insert
from fastapi import HTTPException

from sql_app import models, schemas
from hash import hash_password
from typing import List

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCredentials):
    hashed_password = hash_password(user.password)
    db_user = models.User(username=user.username, password=hashed_password)
    db.add(db_user)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail=e)
    db.refresh(db_user)
    return db_user

def create_session(db: Session, user_id: int):
    db_session = models.Session(user_id=user_id)
    db.add(db_session)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail=e)
    db.refresh(db_session)
    return db_session

def link_session_pdfs(db: Session, session_id: int, pdf_ids: List[int]):
    db.bulk_insert_mappings(models.SessionPDFs, [{"session_id": session_id, "pdf_id": pdf_id} for pdf_id in pdf_ids])
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail=e)

def get_session_ids(db: Session, user_id: int):
    return db.query(models.Session.id).filter(models.Session.user_id == user_id).all()

def create_chat_message(db: Session, chat_message: schemas.ChatMessage):
    db_chat_message = models.ChatHistory(**chat_message.dict())
    db.add(db_chat_message)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail=e)
    db.refresh(db_chat_message)
    return db_chat_message

def get_chat_history(db: Session, session_id: int):
    return db.query(models.ChatHistory).filter(models.ChatHistory.session_id == session_id).all()

def get_pdf_ids(db: Session, session_id: int):
    return db.query(models.SessionPDFs.pdf_id).filter(models.SessionPDFs.session_id == session_id).all()

def get_pdfs(db: Session, pdf_ids: List[int]):
    return db.query(models.PDF).filter(models.PDF.id.in_(pdf_ids)).all()

def get_pdf(db: Session, query: schemas.SearchQuery):
    return db.query(models.PDF).filter(models.PDF.document_type == query.document_type).first()

def create_pdf(db: Session, pdf: schemas.PDF):
    db_pdf = models.PDF(data=pdf.data)
    db.add(db_pdf)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail=e)
    db.refresh(db_pdf)
    return db_pdf


# dummy methods (to be deleted later)
def get_five_pdfs(db: Session):
    return db.query(models.PDF).limit(5).all()
