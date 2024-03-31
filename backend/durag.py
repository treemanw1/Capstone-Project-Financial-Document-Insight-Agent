from DuRAG.reranker import Reranker
from DuRAG.retriever.swr.swr_retriever import SentenceWindowRetriever
from DuRAG.retriever.data_models import QueryObj
# from DuRAG.pipelines.rag_amr import amr_pipeline
from DuRAG.pipelines.rag_swr import swr_pipeline
import weaviate
from dotenv import load_dotenv, find_dotenv
from rds import db
from tqdm import tqdm
import os
import json
from psycopg2 import pool

print(find_dotenv())
load_dotenv()

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
    response_object = swr_pipeline(QueryObj(query, filters))
    rag_response["message"] = response_object["message"]
    response_chunks = response_object["chunks"]

    with db.get_cursor() as cur:
        proc_chunks = []

        for c in response_chunks:
            # print(str(result[0][0]))
            # print(result[1])
            chunk = {}
            chunk["text"] = c[0][2]
            cur.execute(
                """SELECT pdf_page_id FROM "chunked_128_sentence_window" WHERE chunk_id = %s """, (str(result[0][0]),)
            )
            pdf_page_id = cur.fetchall()
            print(pdf_page_id)
            cur.execute(
                """SELECT page_num FROM "EXTRACTED_PDF_PAGE" WHERE id = %s """, (str(pdf_page_id[0][0]),)
            )
            page_num = cur.fetchall()
            # print(result[1])
            # chunk["pdf_page_id"] = pdf_page_id[0][0]
            chunk["page_num"] = page_num[0][0]
            chunk["pdf_id"] = map[c[0][3]]
            chunk["score"] = c[1]
            # chunk["chunk_id"] = str(result[0][0])
            # print(chunk)
            # proc_chunks.append(chunk)
            proc_chunks.append(chunk)

        rag_response["chunks"] = proc_chunks
        # json.parse(rag_response)
        print(json.dumps(rag_response, indent=4))
        
        return rag_response