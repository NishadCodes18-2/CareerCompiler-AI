from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database import get_db
from app.models.entities import User, ResumeBullet, InterviewQuestion
from app.schemas.schemas import InterviewQuestionOut
from app.services.auth_service import get_current_user
from app.services.interview_service import interview_service

router = APIRouter(prefix="/interview", tags=["Interview Preparation & Defend My Resume"])

@router.get("/{resume_id}/questions", response_model=List[Dict[str, Any]])
def get_resume_interview_questions(resume_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bullets = db.query(ResumeBullet).filter(ResumeBullet.resume_version_id == resume_id).all()
    all_questions = []

    for b in bullets:
        qs = interview_service.generate_interview_questions_for_bullet(db, b.id)
        for q in qs:
            all_questions.append({
                "id": q.id,
                "bullet_id": b.id,
                "bullet_text": b.text,
                "category": q.category,
                "question": q.question,
                "context": q.context,
                "suggested_answer_framework": q.suggested_answer_framework,
                "created_at": q.created_at
            })

    return all_questions

@router.get("/defend/{bullet_id}", response_model=Dict[str, Any])
def defend_bullet_claim(bullet_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Defend My Resume drilldown: Claim -> Evidence -> Likely Interview Questions -> Answer Framework."""
    return interview_service.get_defend_my_resume_data(db, bullet_id)
