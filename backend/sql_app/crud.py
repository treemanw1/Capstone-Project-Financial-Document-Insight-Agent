from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, joinedload, aliased
from sqlalchemy import insert, and_, func, delete
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

def get_sessions(db: Session, user_id: int):
    sessions =  db.query(models.Session.id, models.Session.name, models.Session.created_at).filter(models.Session.user_id == user_id).all()
    return sessions


def get_company_names(db: Session):
    return db.query(models.PDF.company).distinct().all()

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

def get_session_user_messages(db: Session, session_id: int):
    Chat = aliased(models.ChatHistory)
    return db.query(Chat.id, Chat.role, Chat.message, Chat.created_at, Chat.session_id).\
        filter(Chat.session_id == session_id).\
        filter(Chat.role == "user").\
        all()

def get_bot_messages(db: Session, session_id: int):
    Chat = aliased(models.ChatHistory)
    return db.query(Chat.id, Chat.role, Chat.message, Chat.created_at, Chat.session_id).\
        filter(Chat.session_id == session_id).\
        filter(Chat.role == "bot").\
        all()

def get_session_chunks(db: Session, session_id: int):
    Chunk = aliased(models.Chunk)
    Chat = aliased(models.ChatHistory)
    PDFs = aliased(models.PDF)
    return db.query(Chat.id, Chunk.chat_history_id , Chunk.text, Chunk.page_num, Chunk.pdf_id, Chunk.score, PDFs.pdf_document_name).\
        select_from(Chunk).\
        join(Chat, Chat.id == Chunk.chat_history_id).\
        join(PDFs, Chunk.pdf_id == PDFs.id).\
        filter(Chat.session_id == session_id, Chat.role == 'bot').\
        all()

def create_chunks(db: Session, chunks: List[schemas.Chunk]):
    db.bulk_insert_mappings(models.Chunk, [chunk.dict() for chunk in chunks])
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail=e)
    

def get_pdf_ids(db: Session, session_id: int):
    return db.query(models.SessionPDFs.pdf_id).filter(models.SessionPDFs.session_id == session_id).all()

def get_pdfs(db: Session, pdf_ids: List[int]):
    return db.query(models.PDF).filter(models.PDF.id.in_(pdf_ids)).all()

def get_all_pdfs(db: Session):
    columns_desired = (models.PDF.id, models.PDF.pdf_document_name, models.PDF.company, models.PDF.num_pages, models.PDF.filepath)
    return db.query(*columns_desired).filter(models.PDF.document_type == 'AR').all()

def filter_pdfs(db: Session, query: schemas.SearchQuery):
    return db.query(models.PDF)\
        .filter(models.PDF.company.in_(query.companies))\
        .filter(and_(models.PDF.date >= query.start_date, models.PDF.date <= query.end_date, models.PDF.document_type == "AR"))\
        .all()

def filter_pdfs_by_date(db: Session, query: schemas.SearchQuery):
    return db.query(models.PDF)\
        .filter(and_(models.PDF.date >= query.start_date, models.PDF.date <= query.end_date, models.PDF.document_type == "AR"))\
        .all()

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

def update_session_name(db: Session, session_id: int, name: str):
    db.query(models.Session).filter(models.Session.id == session_id).update({"name": name})
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        print("An unexpected error occurred:", e)
        raise HTTPException(status_code=400, detail=e)

def get_num_messages(db: Session, session_id: int):
    return db.query(func.count(models.ChatHistory.id)).filter(models.ChatHistory.session_id == session_id).scalar()

def delete_session(db: Session, session_id: int):
    delete_session_pdfs = delete(models.SessionPDFs).where(models.SessionPDFs.session_id == session_id)
    db.execute(delete_session_pdfs)
    delete_chat_messages = delete(models.ChatHistory).where(models.ChatHistory.session_id == session_id)
    db.execute(delete_chat_messages)
    delete_session = delete(models.Session).where(models.Session.id == session_id)
    db.execute(delete_session)
    try:
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        print("Error deleting session {session_id}:", e)
        raise HTTPException(status_code=400, detail=e)


# testing functions
def get_chat_message_time(db: Session, chat_id: int):
    chat_message = (
        db.query(models.ChatHistory.created_at)
        .filter(models.ChatHistory.id == chat_id)
        .first()
    )
    return chat_message.created_at if chat_message else None
