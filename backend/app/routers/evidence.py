from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database import get_db
from app.models.entities import User, Profile, Evidence
from app.schemas.schemas import EvidenceOut, EvidenceCreate, EvidenceVerificationUpdate
from app.services.auth_service import get_current_user
from app.services.evidence_service import evidence_service

router = APIRouter(prefix="/evidence", tags=["Career Evidence Engine"])

@router.get("", response_model=List[EvidenceOut])
def get_evidence_list(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    return evidence_service.get_profile_evidence(db, profile.id)

@router.post("", response_model=EvidenceOut)
def create_evidence(data: EvidenceCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    ev = evidence_service.create_evidence(
        db=db,
        profile_id=profile.id,
        title=data.title,
        evidence_type=data.evidence_type,
        description=data.description,
        source_identifier=data.source_identifier,
        source_url=data.source_url,
        snippet=data.snippet,
        page_number=data.page_number,
        verification_status=data.verification_status,
        confidence_score=data.confidence_score,
        metadata_json=data.metadata_json,
        linked_entity_type=data.linked_entity_type,
        linked_entity_id=data.linked_entity_id
    )
    return ev

@router.get("/graph", response_model=Dict[str, Any])
def get_evidence_graph(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    return evidence_service.build_evidence_graph(db, profile.id)

@router.put("/{evidence_id}/verification", response_model=EvidenceOut)
def update_verification_status(
    evidence_id: str,
    data: EvidenceVerificationUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ev = evidence_service.update_verification_status(db, evidence_id, data.verification_status, data.user_notes)
    if not ev:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return ev
