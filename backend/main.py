from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class Query(BaseModel):
    id: int
    text: str

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend"}

@app.post("/query")
async def process_query(query: Query):
    return {
        "response": {
            "id": query.id + 1,
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