from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from durag import pipeline
from DuRAG.generator import Generator
from DuRAG.pipelines.rag_pipeline import RAGpipeline
from typing import Annotated, List
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sql_app import crud, schemas
from sql_app.database import SessionLocal
import pytz


import os


from hash import verify_password, hash_password



SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120

app = FastAPI()
rag = RAGpipeline()

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

def utc_to_sg_time(d : datetime):
    utc_timezone = pytz.timezone('UTC')
    sg_timezone = pytz.timezone('Asia/Singapore')
    return d.replace(tzinfo=utc_timezone).astimezone(sg_timezone)

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

@app.get("/api")
async def root():
    return {"message": "Welcome to FastAPI Backend"}

@app.get("/api/get-company-names", response_model=List[str])
async def get_company_names(status: Annotated[schemas.User, Depends(get_login_status)], db: Session = Depends(get_db)):
    company_names = crud.get_company_names(db)
    return [company[0] for company in company_names]

@app.get("/api/get-all-pdfs", response_model=List[schemas.PDF])
async def get_all_pdfs(status: Annotated[schemas.User, Depends(get_login_status)], db: Session = Depends(get_db)):
    pdfs = crud.get_all_pdfs(db)
    return pdfs

@app.post("/api/create-user", response_model=schemas.StatusResponse)
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

@app.post("/api/search", response_model=List[schemas.PDF])
async def pdf_search(status: Annotated[schemas.User, Depends(get_login_status)],
                     query: schemas.SearchQuery, 
                     db: Session = Depends(get_db)):
    if not query.start_date or query.start_date == "":
        query.start_date = datetime.min
    if not query.end_date or query.end_date == "":
        query.end_date = datetime.max
    if query.companies:
        pdfs = crud.filter_pdfs(db, query=query)
    else:
        pdfs = crud.filter_pdfs_by_date(db, query=query)
    return pdfs

@app.post("/api/create-session", response_model=int)
async def create_session(user_id: Annotated[schemas.User, Depends(get_current_user_id)],
                        pdf_ids: List[int], 
                        token: Annotated[str, Depends(get_login_status)],
                        db: Session = Depends(get_db)):
    session = crud.create_session(db, user_id)
    crud.link_session_pdfs(db, session.id, pdf_ids)
    return session.id

@app.get("/api/get-sessions", response_model=List[schemas.Session])
async def get_sessions(user_id: Annotated[schemas.User, Depends(get_current_user_id)], db: Session = Depends(get_db)):
    sessions = crud.get_sessions(db, user_id)
    return sessions

@app.get("/api/get-chat-history/{session_id}", response_model=List[schemas.EitherMessage])
async def get_chat_history(session_id: int,
                        # token: Annotated[str, Depends(get_login_status)],
                        db: Session = Depends(get_db)):
    user_messages = crud.get_session_user_messages(db, session_id)
    user_messages = [msg._mapping for msg in user_messages]
    bot_messages = crud.get_bot_messages(db, session_id)
    chunks = crud.get_session_chunks(db, session_id)

    id_to_chunks = {}
    for msg in chunks:
        chunk = schemas.Chunk(text=msg.text, chat_history_id=msg.chat_history_id ,page_num=msg.page_num, pdf_id=msg.pdf_id, score=msg.score, pdf_name=msg.pdf_document_name)
        if msg.id not in id_to_chunks:
            id_to_chunks[msg.id] = [chunk]
        else:
            id_to_chunks[msg.id].append(chunk)
    bot_messages = [msg._mapping for msg in bot_messages]
    bot_messages = [{**msg, "chunks": sorted(id_to_chunks.get(msg.id, []), key=lambda x: x.score, reverse=True)} for msg in bot_messages]
    chat_history = user_messages + bot_messages
    chat_history.sort(key=lambda x: x['created_at'])
    # return chat_history
    chat_history = [{**msg, 'created_at': utc_to_sg_time(msg['created_at'])} for msg in chat_history]
    return chat_history

@app.get("/api/get-pdfs/{session_id}", response_model=List[schemas.PDF])
async def get_pdfs(session_id: int, token: Annotated[str, Depends(get_login_status)], db: Session = Depends(get_db)):
    pdf_ids = crud.get_pdf_ids(db, session_id)
    return crud.get_pdfs(db, [id[0] for id in pdf_ids])

@app.get("/test/get-time/{chat_id}", response_model=datetime)
async def get_time(chat_id: int, db: Session = Depends(get_db)):
    created_at =  crud.get_chat_message_time(db, chat_id)
    utc_timezone = pytz.timezone('UTC')
    sg_timezone = pytz.timezone('Asia/Singapore')
    sg_time = created_at.replace(tzinfo=utc_timezone).astimezone(sg_timezone)
    return sg_time


@app.post("/api/query", response_model=schemas.BotMessage)
async def query(query: schemas.UserQuery, token: Annotated[str, Depends(get_login_status)], db: Session = Depends(get_db)):
    generated_session_name = None
    if crud.get_num_messages(db, session_id=query.session_id) == 0:
        generator = Generator()
        generated_session_name = generator.query_summary(query.query)
        crud.update_session_name(db, query.session_id, generated_session_name);
    crud.create_chat_message(db, schemas.ChatMessageCreation(session_id=query.session_id, role="user", message=query.query))


    pdf_ids = [item[0] for item in crud.get_pdf_ids(db, query.session_id)]
    rag_response = pipeline(rag, query.query, pdf_ids)
    # rag_response = {'message': "Dhanush and Chia Yu hurry up",
    #                 "chunks": [
    #                     {"text": "dummy text hehehehehehe", "page_num": 1, 'pdf_id': 245, "chat_history_id": 261, "score": 5, "pdf_name": "dummy pdf name 1"},
    #                     {"text": "dummy text hehehehehehe", "page_num": 2, 'pdf_id': 245, "chat_history_id": 261, "score": 4, "pdf_name": "dummy pdf name 1"},
    #                     {"text": "dummy text hehehehehehe", "page_num": 3, 'pdf_id': 245, "chat_history_id": 261, "score": 3, "pdf_name": "dummy pdf name 1"},
    #                     {"text": "dummy text hehehehehehe", "page_num": 4, 'pdf_id': 245, "chat_history_id": 261, "score": 2, "pdf_name": "dummy pdf name 1"},
    #                     {"text": "dummy text hehehehehehe", "page_num": 5, 'pdf_id': 245, "chat_history_id": 261, "score": 1, "pdf_name": "dummy pdf name 1"},
    #                     ]
    #                 }

    bot_message = crud.create_chat_message(db, schemas.ChatMessageCreation(session_id=query.session_id, role="bot", message=rag_response["message"]))
    for chunk in rag_response["chunks"]:
        chunk["chat_history_id"] = bot_message.id
    
    crud.create_chunks(db, [schemas.ChunkCreation(**chunk) for chunk in rag_response["chunks"]])
    response = {
        "session_name": generated_session_name,
        "session_id": query.session_id,
        "role": "bot",
        "created_at": bot_message.created_at,
        "message": rag_response["message"],
        "chunks": rag_response["chunks"]
    }
    return response

@app.get("/api/delete-session/{session_id}", response_model=bool)
async def delete_session(session_id: int, user_id: Annotated[schemas.User, Depends(get_current_user_id)], db: Session = Depends(get_db)):
    return crud.delete_session(db, session_id)

