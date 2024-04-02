from dotenv import load_dotenv
load_dotenv()
from DuRAG.retriever.data_models import QueryObj
import json



BGE_QUERY_PREFIX = "Represent this sentence for searching relevant passages: "


def pipeline(rag_obj, query, filters ):

    # rag_response = { 
    #     "message": "This is a dummy response", 
    #     "chunks": [ 
    #         {"text": "I don't want to live in a world", "page_num": 1, "pdf_id": 1, "score": 1.5}, 
    #         {"text": "bla bla bla", "page_num": 20, "pdf_id": 1, "score": 1} 
    #         ] 
    #     }
    query = QueryObj(query=query, filters = filters)
    
    rag_response = {}

    response_object = rag_obj.pipeline(query,alpha=0.5,limit=5,retrieve_type='swr')
    rag_response["message"] = response_object.message
    response_chunks = response_object.chunks 
    proc_chunks = []

    for c in response_chunks:
        chunk = {}
        chunk["text"] = c.chunk
        chunk["page_num"] = c.pdf_page_num
        chunk["pdf_name"] = c.pdf_name
        chunk["pdf_id"] = c.pdf_id
        chunk["score"] = c.score
        proc_chunks.append(chunk)

    rag_response["chunks"] = proc_chunks
    # print(proc_chunks)
    print(json.dumps(rag_response, indent=4))
    
    return rag_response