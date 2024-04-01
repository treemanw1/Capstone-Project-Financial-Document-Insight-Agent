from dotenv import load_dotenv
load_dotenv()
from DuRAG.reranker import Reranker
from DuRAG.retriever.data_models import QueryObj
from DuRAG.rds import db
from DuRAG.pipelines.rag_pipeline import RAGpipeline
import weaviate
from tqdm import tqdm
import os
import json
from psycopg2 import pool



BGE_QUERY_PREFIX = "Represent this sentence for searching relevant passages: "


def pipeline(query, filters):

    # rag_response = { 
    #     "message": "This is a dummy response", 
    #     "chunks": [ 
    #         {"text": "I don't want to live in a world", "page_num": 1, "pdf_id": 1, "score": 1.5}, 
    #         {"text": "bla bla bla", "page_num": 20, "pdf_id": 1, "score": 1} 
    #         ] 
    #     }
    query = QueryObj(query=query, filters = filters)
    rag = RAGpipeline()
    rag_response = {}
    response_object = rag.pipeline(query,alpha=0.5,limit=5,retrieve_type='swr')
    rag_response["message"] = response_object.message
    response_chunks = response_object.chunks

    with db.get_cursor() as cur:
        proc_chunks = []

        for c in response_chunks:
            print(c)
            chunk = {}
            chunk["text"] = c.chunk
            chunk["page_num"] = c.pdf_page_num
            chunk["pdf_id"] = c.pdf_id
            chunk["score"] = c.score
            proc_chunks.append(chunk)

        rag_response["chunks"] = proc_chunks
        print(proc_chunks)
        print(json.dumps(rag_response, indent=4))
        
        return rag_response