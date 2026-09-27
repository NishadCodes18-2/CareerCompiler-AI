from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any
from app.database import get_db
from app.models.entities import LeadCapture

router = APIRouter(prefix="/leads", tags=["Leads"])

class LeadCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "cover_resume_unlock"
    metadata_json: Optional[Dict[str, Any]] = None

@router.post("", status_code=status.HTTP_201_CREATED)
def capture_lead(lead_in: LeadCreate, db: Session = Depends(get_db)):
    """Save an email captured on the cover page or unlock modal into the database."""
    lead = LeadCapture(
        email=lead_in.email,
        source=lead_in.source or "cover_resume_unlock",
        metadata_json=lead_in.metadata_json or {}
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return {"status": "success", "id": lead.id, "email": lead.email, "message": "Email stored successfully"}

@router.get("", status_code=status.HTTP_200_OK)
def list_leads(db: Session = Depends(get_db)):
    """List recent captured leads."""
    leads = db.query(LeadCapture).order_by(LeadCapture.created_at.desc()).limit(100).all()
    return [{"id": l.id, "email": l.email, "source": l.source, "created_at": l.created_at} for l in leads]
