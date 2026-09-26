import os
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database import get_db
from app.config import settings
from app.models.entities import User, Profile, Document
from app.services.auth_service import get_current_user
from app.services.document_service import document_service

router = APIRouter(prefix="/documents", tags=["Document & Credential Import"])

@router.post("/upload", response_model=Dict[str, Any])
async def upload_document(
    file: UploadFile = File(...),
    is_certificate: bool = Form(False),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()

    # Allowed extensions
    ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
    if ext not in ["pdf", "docx", "doc", "txt"]:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, DOCX, or TXT.")

    # Save to local storage
    user_storage_dir = os.path.join(settings.STORAGE_DIR, current_user.id)
    os.makedirs(user_storage_dir, exist_ok=True)
    saved_path = os.path.join(user_storage_dir, file.filename)

    content = await file.read()
    with open(saved_path, "wb") as f:
        f.write(content)

    # Process and extract structured evidence
    result = document_service.process_and_store_document(
        db=db,
        profile_id=profile.id,
        filename=file.filename,
        file_path=saved_path,
        file_type=ext,
        is_certificate=is_certificate
    )
    return result

@router.get("", response_model=List[Dict[str, Any]])
def list_documents(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    docs = db.query(Document).filter(Document.profile_id == profile.id).order_by(Document.created_at.desc()).all()
    return [
        {
            "id": d.id,
            "filename": d.filename,
            "file_type": d.file_type,
            "created_at": d.created_at,
            "metadata_json": d.metadata_json
        }
        for d in docs
    ]
