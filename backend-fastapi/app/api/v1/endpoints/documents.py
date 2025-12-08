from typing import List
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.models.document import Document
from app.schemas.document import Document as DocumentSchema
from app.services import file_manager

router = APIRouter()

@router.post("/upload", response_model=DocumentSchema)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    # Save file to disk
    try:
        file_path = await file_manager.save_upload_file(file)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")

    # Save metadata to DB
    file_size = file_manager.get_file_size(file_path)
    db_document = Document(
        filename=file.filename,
        file_path=file_path,
        file_size=file_size,
        content_type=file.content_type,
        uploaded_by=current_user.id
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@router.get("/", response_model=List[DocumentSchema])
def read_documents(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    documents = db.query(Document).offset(skip).limit(limit).all()
    return documents
