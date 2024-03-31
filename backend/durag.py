from dotenv import load_dotenv
load_dotenv()
from DuRAG.reranker import Reranker
from DuRAG.retriever.swr.swr_retriever import SentenceWindowRetriever
from DuRAG.retriever.data_models import QueryObj
from DuRAG.pipelines.rag_amr import amr_pipeline
from DuRAG.rds import db
from DuRAG.pipelines.rag_swr import swr_pipeline
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
    rag_response = {}
    print(filters)
    response_object = swr_pipeline(QueryObj(query=query, filters = filters))
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
        print(json.dumps(rag_response, indent=4))
        
        return rag_response