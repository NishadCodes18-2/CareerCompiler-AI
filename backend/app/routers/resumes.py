import uuid
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Query, Response
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from app.database import get_db
from app.models.entities import User, Profile, ResumeVersion, ResumeBullet, BulletEvidence, ResumeSection, SharedResume
from app.schemas.schemas import CompileResumeRequest, ResumeVersionOut, ResumeBulletOut, ResumeBulletUpdate
from app.services.auth_service import get_current_user
from app.services.compiler_service import compiler_service
from app.services.export_service import export_service

router = APIRouter(prefix="/resumes", tags=["Resume Compiler"])

@router.post("/compile", response_model=Dict[str, Any])
def compile_targeted_resume(
    data: CompileResumeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    compiled_version = compiler_service.compile_resume(
        db=db,
        profile_id=profile.id,
        target_role=data.target_role,
        job_description_id=data.job_description_id,
        template_name=data.template_name,
        version_name=data.version_name
    )
    return {
        "status": "SUCCESS",
        "resume_id": compiled_version.id,
        "version_name": compiled_version.version_name,
        "target_role": compiled_version.target_role,
        "template_name": compiled_version.template_name,
        "message": f"Successfully compiled evidence-backed resume for '{data.target_role}'."
    }

@router.get("", response_model=List[Dict[str, Any]])
def list_resumes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    resumes = db.query(ResumeVersion).filter(ResumeVersion.profile_id == profile.id).order_by(ResumeVersion.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "target_role": r.target_role,
            "version_name": r.version_name,
            "template_name": r.template_name,
            "is_active": r.is_active,
            "status": r.status,
            "created_at": r.created_at
        }
        for r in resumes
    ]

@router.get("/{resume_id}", response_model=Dict[str, Any])
def get_resume_version(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(ResumeVersion).filter(ResumeVersion.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume version not found")

    sections = db.query(ResumeSection).filter(ResumeSection.resume_version_id == resume_id).order_by(ResumeSection.order_index).all()
    bullets = db.query(ResumeBullet).filter(ResumeBullet.resume_version_id == resume_id).order_by(ResumeBullet.order_index).all()

    bullets_with_ev = []
    for b in bullets:
        links = db.query(BulletEvidence).filter(BulletEvidence.resume_bullet_id == b.id).all()
        ev_items = []
        for l in links:
            ev = l.evidence
            ev_items.append({
                "evidence_id": ev.id,
                "source_identifier": ev.source_identifier,
                "title": ev.title,
                "evidence_type": ev.evidence_type,
                "verification_status": ev.verification_status,
                "source_url": ev.source_url,
                "snippet": ev.snippet,
                "strength_score": l.strength_score,
                "relevance_reason": l.relevance_reason
            })
        bullets_with_ev.append({
            "id": b.id,
            "section_type": b.section_type,
            "item_id": b.item_id,
            "text": b.text,
            "action_verb": b.action_verb,
            "built_object": b.built_object,
            "technologies_used": b.technologies_used,
            "metric_claim": b.metric_claim,
            "audit_status": b.audit_status,
            "audit_reason": b.audit_reason,
            "order_index": b.order_index,
            "evidence_items": ev_items
        })

    return {
        "id": resume.id,
        "profile_id": resume.profile_id,
        "target_role": resume.target_role,
        "version_name": resume.version_name,
        "template_name": resume.template_name,
        "is_active": resume.is_active,
        "status": resume.status,
        "created_at": resume.created_at,
        "sections": [
            {
                "id": s.id,
                "section_type": s.section_type,
                "title": s.title,
                "order_index": s.order_index,
                "is_visible": s.is_visible,
                "content_json": s.content_json
            }
            for s in sections
        ],
        "bullets": bullets_with_ev
    }

@router.put("/bullets/{bullet_id}")
def update_bullet(
    bullet_id: str,
    data: ResumeBulletUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    bullet = db.query(ResumeBullet).filter(ResumeBullet.id == bullet_id).first()
    if not bullet:
        raise HTTPException(status_code=404, detail="Bullet not found")

    if data.text is not None:
        bullet.text = data.text
    if data.audit_status is not None:
        bullet.audit_status = data.audit_status
    if data.audit_reason is not None:
        bullet.audit_reason = data.audit_reason

    db.commit()
    db.refresh(bullet)
    return {"status": "UPDATED", "bullet_id": bullet.id, "text": bullet.text, "audit_status": bullet.audit_status}

@router.get("/{resume_id}/proof-view")
def get_proof_view(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Proof View: Click any resume bullet and show exact supporting evidence from the Career Evidence Graph."""
    bullets = db.query(ResumeBullet).filter(ResumeBullet.resume_version_id == resume_id).order_by(ResumeBullet.order_index).all()
    proof_mappings = []

    for b in bullets:
        b_evs = db.query(BulletEvidence).filter(BulletEvidence.resume_bullet_id == b.id).all()
        proof_mappings.append({
            "bullet_id": b.id,
            "bullet_text": b.text,
            "action_verb": b.action_verb,
            "built_object": b.built_object,
            "technologies": b.technologies_used,
            "audit_status": b.audit_status,
            "audit_reason": b.audit_reason,
            "proof_count": len(b_evs),
            "evidence_chain": [
                {
                    "source_identifier": be.evidence.source_identifier,
                    "title": be.evidence.title,
                    "evidence_type": be.evidence.evidence_type,
                    "verification_status": be.evidence.verification_status,
                    "source_url": be.evidence.source_url,
                    "snippet": be.evidence.snippet,
                    "strength_score": be.strength_score,
                    "relevance_reason": be.relevance_reason
                }
                for be in b_evs
            ]
        })

    return {
        "resume_id": resume_id,
        "total_bullets": len(bullets),
        "verified_proof_count": sum(1 for p in proof_mappings if p["audit_status"] == "VERIFIED"),
        "proof_mappings": proof_mappings
    }

@router.get("/{resume_id}/pre-export-check")
def check_export_readiness(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return export_service.pre_export_check(db, resume_id)

@router.get("/{resume_id}/export")
def export_resume_html(
    resume_id: str,
    template: str = Query("classic_ats"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    html_content = export_service.generate_html_resume(db, resume_id, template)
    return Response(content=html_content, media_type="text/html")


class ShareResumeRequest(BaseModel):
    handle: Optional[str] = "candidate"
    resume_data: Dict[str, Any]
    duration_hours: Optional[int] = 168  # 7 days default


@router.post("/share")
def create_shared_resume(req: ShareResumeRequest, db: Session = Depends(get_db)):
    """Create a securely shared, hosted resume link with deterministic expiration."""
    clean_handle = (req.handle or "candidate").lower().strip().replace(" ", "-")
    clean_handle = "".join(c for c in clean_handle if c.isalnum() or c == "-") or "candidate"
    
    unique_suffix = str(uuid.uuid4())[:8]
    share_id = f"{clean_handle}-{unique_suffix}"
    
    # Calculate precise expiration timestamp
    hours = max(1, req.duration_hours or 168)
    expires_at = datetime.utcnow() + timedelta(hours=hours)
    
    shared = SharedResume(
        id=share_id,
        candidate_handle=clean_handle,
        resume_data=req.resume_data,
        expires_at=expires_at
    )
    db.add(shared)
    db.commit()
    db.refresh(shared)
    
    return {
        "status": "success",
        "share_id": shared.id,
        "candidate_handle": shared.candidate_handle,
        "expires_at": shared.expires_at.isoformat(),
        "expires_timestamp_ms": int(shared.expires_at.timestamp() * 1000),
        "duration_hours": hours,
        "message": f"Resume share link generated with validity until {shared.expires_at.strftime('%Y-%m-%d %H:%M UTC')}."
    }


@router.get("/share/{share_id}")
def get_shared_resume(share_id: str, db: Session = Depends(get_db)):
    """Retrieve shared resume and verify expiration."""
    shared = db.query(SharedResume).filter(SharedResume.id == share_id).first()
    if not shared:
        # Fallback check by candidate handle prefix
        shared = db.query(SharedResume).filter(SharedResume.candidate_handle == share_id).order_by(SharedResume.created_at.desc()).first()
        
    if not shared:
        raise HTTPException(status_code=404, detail="Shared resume link not found or has been removed.")
        
    now = datetime.utcnow()
    is_expired = now > shared.expires_at
    seconds_remaining = max(0, int((shared.expires_at - now).total_seconds()))
    days_remaining = max(0, seconds_remaining // 86400)
    
    if is_expired:
        return {
            "expired": True,
            "share_id": shared.id,
            "candidate_handle": shared.candidate_handle,
            "expires_at": shared.expires_at.isoformat(),
            "expires_timestamp_ms": int(shared.expires_at.timestamp() * 1000),
            "message": f"This shared resume link expired on {shared.expires_at.strftime('%Y-%m-%d at %H:%M UTC')}."
        }
        
    return {
        "expired": False,
        "share_id": shared.id,
        "candidate_handle": shared.candidate_handle,
        "data": shared.resume_data,
        "expires_at": shared.expires_at.isoformat(),
        "expires_timestamp_ms": int(shared.expires_at.timestamp() * 1000),
        "seconds_remaining": seconds_remaining,
        "days_remaining": days_remaining,
        "created_at": shared.created_at.isoformat()
    }
