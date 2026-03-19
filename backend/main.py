from fastapi import FastAPI, UploadFile
from database import SessionLocal, engine                                                        
from models import Base, Document, Chunk
from pydantic import BaseModel  
import fitz            
import openai                                                                                    
import os                                                                                        
from dotenv import load_dotenv 

load_dotenv()                                                                                    
app = FastAPI()
Base.metadata.create_all(bind=engine)
openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest (BaseModel):
    document_id: int
    question: str

@app.post("/upload")
async def upload(file: UploadFile):
    contents = await file.read()
    db = SessionLocal()
    doc = Document(filename = file.filename)
    db.add(doc)
    db.commit()
    doc_id = doc.id
    db.refresh(doc)
    pdf = fitz.open(stream = contents, filetype = "pdf")
    full_text = ""
    for page in pdf:
        full_text += page.get_text()

    chunk_size = 500              
    words = full_text.split()
    chunks = [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    for chunk_text in chunks:
        response = openai_client.embeddings.create(
            input=chunk_text,
            model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
        chunk = Chunk(document_id=doc.id, text=chunk_text, embedding=embedding)
        db.add(chunk)

    db.commit()
    db.close()

    return {"document_id": doc_id} 

@app.post("/chat")
def read_root(request: ChatRequest):
    response = openai_client.embeddings.create(
        input = request.question,
        model = "text-embedding-3-small"
    )
    question_embedding = response.data[0].embedding
    db = SessionLocal()
    chunks = db.query(Chunk).filter(                                                             
        Chunk.document_id == request.document_id                                                 
    ).order_by(                                                                                  
        Chunk.embedding.l2_distance(question_embedding)                                          
    ).limit(5).all()  
    context = "\n\n".join([c.text for c in chunks])                                                                                                                                       
    chat_response = openai_client.chat.completions.create(                                       
        model="gpt-4o-mini",                                                                     
        messages=[                                                                               
            {"role": "system", "content": "You are a helpful study assistant. Answer questions based on the provided context."},                                                                
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {request.question}"}
        ]                                                                                        
    )                                                                                                          
    db.close()  
    return {"answer": chat_response.choices[0].message.content}

