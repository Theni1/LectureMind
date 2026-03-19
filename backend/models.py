from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey    
from pgvector.sqlalchemy import Vector                           
from sqlalchemy.orm import declarative_base 

Base = declarative_base()

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key = True)
    filename = Column(Text, nullable = False)
    created_at = Column(DateTime)

class Chunk(Base):
    __tablename__ = "chunks"
    id = Column(Integer, primary_key = True)
    document_id = Column(Integer, ForeignKey("documents.id") )
    text = Column(Text, nullable = False)
    embedding = Column(Vector(1536) )

