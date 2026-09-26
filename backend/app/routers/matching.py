from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from app.database import get_db
from app.models.entities import User, Profile, RoadmapItem
from app.schemas.schemas import CandidateMatchReport, RoadmapItemCreate, RoadmapItemOut
from app.services.auth_service import get_current_user
from app.services.matching_service import matching_service
import uuid

router = APIRouter(prefix="/matching", tags=["Matching & Career Roadmap"])

@router.get("/diagnostic", response_model=CandidateMatchReport)
def get_matching_diagnostic(
    target_role: str = Query("Backend Developer Intern"),
    job_description_id: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    report = matching_service.match_candidate_to_role(
        db=db,
        profile_id=profile.id,
        target_role=target_role,
        job_description_id=job_description_id
    )
    return report

@router.get("/roadmap", response_model=Dict[str, Any])
def get_career_roadmap(
    target_role: str = Query("Backend Developer Intern"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    items = db.query(RoadmapItem).filter(RoadmapItem.profile_id == profile.id).order_by(RoadmapItem.priority.asc()).all()
    blueprints = matching_service.generate_project_recommendations(db, profile.id, target_role)

    return {
        "target_role": target_role,
        "active_items": items,
        "recommended_blueprints": blueprints
    }

@router.post("/roadmap", response_model=RoadmapItemOut)
def add_roadmap_item(data: RoadmapItemCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    item = RoadmapItem(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        **data.model_dump()
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.put("/roadmap/{item_id}/toggle", response_model=RoadmapItemOut)
def toggle_roadmap_item(item_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    item = db.query(RoadmapItem).filter(RoadmapItem.id == item_id, RoadmapItem.profile_id == profile.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Roadmap item not found")
    item.is_completed = not item.is_completed
    db.commit()
    db.refresh(item)
    return item
