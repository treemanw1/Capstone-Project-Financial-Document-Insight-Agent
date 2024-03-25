from DuRAG.reranker import Reranker
from DuRAG.retriever.swr.swr_retriever import SentenceWindowRetriever
from DuRAG.generator import Generator
import weaviate
from dotenv import load_dotenv
from rds import db
from tqdm import tqdm
import os
import json
from psycopg2 import pool

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

    with db.get_cursor() as cur:
        cur.execute(
            """SELECT pdf_document_name FROM "EXTRACTED_PDF" WHERE id IN %s """, (tuple(filters),)
        )

        pdf_names = cur.fetchall()
        names = [name for (name,) in pdf_names]
        print(names)

        map = {names[i]: filters[i] for i in range(len(filters))}

        rag_response = {}
        client = weaviate.connect_to_local()
        reranker = Reranker()
        swr_retriever = SentenceWindowRetriever(client)
        filter_params = swr_retriever._get_filter_param(names, mode="or", property_name="pdf_name")
        generator = Generator()
        bge_query = BGE_QUERY_PREFIX + query
        retrieval_response = swr_retriever.hybrid_search(bge_query, limit=10, filter_params=filter_params)
        sentence_windows = swr_retriever.get_sentence_windows(retrieval_response.objects)
        results = swr_retriever.get_rerank_format(bge_query, sentence_windows)
        reranked_results = reranker.rerank_top_k(results, 5)
        reranked_context = [reranked_results[i][0][2] for i in range(len(reranked_results))]
        response = generator.response_synthesis(reranked_context, query)
        rag_response["message"] = response
        proc_chunks = []

        print("Sentence Window response: \n\n")
        for result in reranked_results:
            print("-" * 100)
            print(result)
            # print(str(result[0][0]))
            # print(result[1])
            chunk = {}
            chunk["text"] = result[0][2]
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
            chunk["pdf_id"] = map[result[0][3]]
            chunk["score"] = result[1]
            # chunk["chunk_id"] = str(result[0][0])
            # print(chunk)
            # proc_chunks.append(chunk)
            proc_chunks.append(chunk)

        rag_response["chunks"] = proc_chunks
        # json.parse(rag_response)
        print(json.dumps(rag_response, indent=4))
        
        return rag_response