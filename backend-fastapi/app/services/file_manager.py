import shutil
import os
from fastapi import UploadFile, HTTPException

UPLOAD_DIR = "uploads"

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

async def save_upload_file(upload_file: UploadFile) -> str:
    # 1. Validate file type
    allowed_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
    if upload_file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    # 2. Generate safe filename
    # In production, use UUIDs. Here simplified.
    file_path = os.path.join(UPLOAD_DIR, upload_file.filename)
    
    # 3. Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    return file_path

def get_file_size(file_path: str) -> int:
    return os.path.getsize(file_path)
