from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from durag import pipeline
from typing import Annotated, List
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sql_app import crud, schemas
from sql_app.database import SessionLocal

import os
from dotenv import load_dotenv

from hash import verify_password, hash_password

load_dotenv()

SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

app = FastAPI()

origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)
timeout_error = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Session has timed out",
    headers={"WWW-Authenticate": "Bearer"},
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, username: str, password: str):
    user = crud.get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

async def get_login_status(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise credentials_exception

async def get_current_user_id(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user.id

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend"}

@app.get("/get-company-names", response_model=List[str])
async def get_company_names(status: Annotated[schemas.User, Depends(get_login_status)], db: Session = Depends(get_db)):
    company_names = crud.get_company_names(db)
    return [company[0] for company in company_names]

@app.post("/create-user", response_model=schemas.StatusResponse)
async def create_user(credentials: schemas.UserCredentials, db: Session = Depends(get_db)):
    crud.create_user(db, user=credentials)
    return {"success": True, "message": "User successfully created!"}

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)
) -> schemas.Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return schemas.Token(access_token=access_token, token_type="bearer")

@app.post("/search", response_model=List[schemas.PDF])
async def pdf_search(status: Annotated[schemas.User, Depends(get_login_status)],
                     query: schemas.SearchQuery, 
                     db: Session = Depends(get_db)):
    pdfs = crud.filter_pdfs(db, query=query)
    print("pdfs:", pdfs)
    return pdfs

@app.post("/create-session", response_model=int)
async def create_session(user_id: Annotated[schemas.User, Depends(get_current_user_id)],
                        pdf_ids: List[int], 
                        token: Annotated[str, Depends(get_login_status)],
                        db: Session = Depends(get_db)):
    session = crud.create_session(db, user_id)
    crud.link_session_pdfs(db, session.id, pdf_ids)
    return session.id

@app.get("/get-sessions", response_model=List[schemas.Session])
async def get_sessions(user_id: Annotated[schemas.User, Depends(get_current_user_id)], db: Session = Depends(get_db)):
    sessions = crud.get_sessions(db, user_id)
    return sessions

@app.get("/get-chat-history/{session_id}", response_model=List[schemas.ChatMessage])
async def get_chat_history(session_id: int, token: Annotated[str, Depends(get_login_status)], db: Session = Depends(get_db)):
    user_messages = crud.get_user_messages(db, session_id)
    bot_messages = crud.get_bot_messages(db, session_id)
    chat_history = user_messages + bot_messages
    chat_history.sort(key=lambda x: x.created_at)
    return chat_history

@app.get("/get-pdfs/{session_id}", response_model=List[schemas.PDF])
async def get_pdfs(session_id: int, token: Annotated[str, Depends(get_login_status)], db: Session = Depends(get_db)):
    pdf_ids = crud.get_pdf_ids(db, session_id)
    return crud.get_pdfs(db, [id[0] for id in pdf_ids])

@app.post("/query", response_model=schemas.BotMessage)
async def query(query: str, session_id: int, token: Annotated[str, Depends(get_login_status)], db: Session = Depends(get_db)):
    user_message = crud.create_chat_message(db, schemas.ChatMessage(session_id=session_id, role="user", message=query))

    # VICTORIA REPLACE THIS DUMMY DATA WITH THE ACTUAL RAG API CALL (user_message.message)
    # rag_response = {
    #     "message": "This is a dummy response",
    #     "chunks": [
    #         {"text": "dummy_chunk1 text", "page_num": 1, "pdf_id": 1, "score": 1.5},
    #         {"text": "dummy_chunk2 text", "page_num": 20, "pdf_id": 1, "score": 1}
    #     ]
    # }
    rag_response = pipeline(query, [item[0] for item in crud.get_pdf_ids(db, session_id)])
    
    bot_message = crud.create_chat_message(db, schemas.ChatMessage(session_id=session_id, role="bot", message=rag_response["message"]))
    for chunk in rag_response["chunks"]:
        chunk["chat_history_id"] = bot_message.id
        
    crud.create_chunks(db, [schemas.Chunk(**chunk) for chunk in rag_response["chunks"]])
    response = {
        "session_id": session_id,
        "role": "bot",
        "message": rag_response["message"],
        "chunks": rag_response["chunks"]
    }
    return response
