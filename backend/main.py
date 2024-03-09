from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from hash import verify_password

from sqlalchemy.orm import Session
from sql_app import crud, schemas
from sql_app.database import SessionLocal
from typing import List

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

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend"}

@app.post("/create-user", response_model=schemas.StatusResponse)
async def create_user(credentials: schemas.UserCredentials, db: Session = Depends(get_db)):
    crud.create_user(db, user=credentials)
    return {"success": True, "message": "User successfully created!"}

@app.post("/login", response_model=schemas.UserResponse)
async def validate_credentials(credentials: schemas.UserCredentials, db: Session = Depends(get_db)):
    user = crud.get_user(db, username=credentials.username)
    if not user or not verify_password(credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    # token = generate_auth_token(user)
    return {"id": user.id, "username": user.username}

@app.post("/get-session", response_model=schemas.User)
async def get_session(session_id: str, db: Session = Depends(get_db)):
    return {
        "response": {
            "text": "This is a dummy response",
        },
        "chunks": [
            {
                "id": 0,
                "text": "Wind extinguishes a candle and energizes fire",
                "pageNum": 16,
            },
            {
                "id": 1,
                "text": "I want to live happily in a world I don’t understand.",
                "pageNum": 20,
            },
        ]
    }

