from datetime import datetime
from pydantic import BaseModel

class DocumentBase(BaseModel):
    filename: str
    file_size: int
    content_type: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int
    file_path: str
    uploaded_by: int
    created_at: datetime

    class Config:
        orm_mode = True
