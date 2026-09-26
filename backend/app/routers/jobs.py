from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from app.database import get_db
from app.models.entities import User, Profile, JobDescription
from app.schemas.schemas import JobDescriptionCreate, JobDescriptionOut, RoleFingerprintOut, MarketResearchOut
from app.services.auth_service import get_current_user
from app.services.job_service import job_service
from app.services.research_service import research_service

router = APIRouter(prefix="/jobs", tags=["Job Description Analyzer & Role Intelligence"])

@router.post("/analyze", response_model=JobDescriptionOut)
def analyze_job(data: JobDescriptionCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    jd = job_service.save_job_description(
        db=db,
        profile_id=profile.id,
        title=data.title,
        raw_text=data.raw_text,
        company=data.company,
        location=data.location,
        source_url=data.source_url
    )
    return jd

@router.get("", response_model=List[JobDescriptionOut])
def list_jobs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    return db.query(JobDescription).filter(JobDescription.profile_id == profile.id).order_by(JobDescription.created_at.desc()).all()

@router.get("/role-fingerprint", response_model=RoleFingerprintOut)
def get_role_fingerprint(role: str = Query("Software Engineer Intern"), db: Session = Depends(get_db)):
    rf = research_service.get_or_create_role_fingerprint(db, role)
    return {
        "role_title": rf.role_title,
        "level": rf.level,
        "core_skills": rf.core_skills,
        "supporting_skills": rf.supporting_skills,
        "project_patterns": rf.project_patterns,
        "responsibilities": rf.responsibilities,
        "keyword_clusters": rf.keyword_clusters,
        "market_source": rf.market_source
    }

@router.get("/market-citations", response_model=List[MarketResearchOut])
def get_market_citations(role: str = Query("Backend Developer Intern"), db: Session = Depends(get_db)):
    return research_service.get_market_citations(db, role)
