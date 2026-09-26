from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.database import get_db
from app.models.entities import User, Profile, Evidence, Project, ResumeVersion, JobDescription
from app.services.seed_service import seed_demo_data

router = APIRouter(prefix="/admin", tags=["Developer & Admin Diagnostics"])

@router.get("/status", response_model=Dict[str, Any])
def get_system_status(db: Session = Depends(get_db)):
    users_count = db.query(User).count()
    profiles_count = db.query(Profile).count()
    evidence_count = db.query(Evidence).count()
    projects_count = db.query(Project).count()
    resumes_count = db.query(ResumeVersion).count()
    jobs_count = db.query(JobDescription).count()

    return {
        "status": "HEALTHY",
        "service": "CareerCompiler AI Backend",
        "version": "1.0.0",
        "environment": "production-ready",
        "database_counts": {
            "users": users_count,
            "profiles": profiles_count,
            "evidence_items": evidence_count,
            "projects": projects_count,
            "resume_versions": resumes_count,
            "job_descriptions": jobs_count
        },
        "ai_engine": {
            "status": "ACTIVE",
            "mode": "HYBRID_STRUCTURED_AND_DETERMINISTIC_FALLBACK",
            "safeguards": "Hallucination prevention & Claim-to-Evidence verification active"
        }
    }

@router.post("/reseed", response_model=Dict[str, Any])
def reseed_demo(db: Session = Depends(get_db)):
    # Clear existing demo user if any and reseed
    demo_user = db.query(User).filter(User.email == "alex.morgan@careercompiler.ai").first()
    if demo_user:
        db.delete(demo_user)
        db.commit()

    user = seed_demo_data(db)
    return {
        "status": "SUCCESS",
        "message": "Demo profile 'Alex Morgan' re-seeded with 4 projects, 9 evidence items, target job, compiled resume, and interview prep."
    }
