from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.database import get_db
from app.models.entities import User
from app.schemas.schemas import ATSParsingReport, RecruiterReviewReport, TechnicalReviewReport, ClaimAuditReport
from app.services.auth_service import get_current_user
from app.services.parser_test_service import parser_test_service
from app.services.review_service import review_service
from app.services.audit_service import audit_service

router = APIRouter(prefix="/analysis", tags=["ATS Validation & AI Reviews"])

@router.get("/{resume_id}/ats-test", response_model=ATSParsingReport)
def run_ats_parsing_test(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return parser_test_service.test_resume_parsability(db, resume_id)

@router.get("/{resume_id}/recruiter-review", response_model=RecruiterReviewReport)
def run_recruiter_review(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return review_service.run_recruiter_review(db, resume_id)

@router.get("/{resume_id}/technical-review", response_model=TechnicalReviewReport)
def run_technical_review(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return review_service.run_technical_review(db, resume_id)

@router.get("/{resume_id}/claim-audit", response_model=ClaimAuditReport)
def run_claim_audit(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return audit_service.audit_resume_version(db, resume_id)

@router.post("/resolve-claim")
def resolve_flagged_claim(
    bullet_id: str = Body(..., embed=True),
    action: str = Body(..., embed=True),
    new_text: str = Body(None, embed=True),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return audit_service.resolve_claim(db, bullet_id, action, new_text)
