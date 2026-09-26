from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.database import get_db
from app.models.entities import User, Profile
from app.schemas.schemas import GitHubAnalyzeRequest
from app.services.auth_service import get_current_user
from app.services.github_service import github_service

router = APIRouter(prefix="/github", tags=["GitHub Analyzer"])

@router.post("/analyze", response_model=Dict[str, Any])
async def analyze_github_profile(data: GitHubAnalyzeRequest, current_user: User = Depends(get_current_user)):
    if not data.username_or_url.strip():
        raise HTTPException(status_code=400, detail="GitHub username or repository URL required")
    result = await github_service.analyze_github_profile(data.username_or_url)
    return result

@router.post("/approve", response_model=Dict[str, Any])
def approve_github_evidence(
    data: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    repo_data = data.get("repo_data", {})
    action = data.get("action", "approve")

    if action == "reject":
        return {"status": "REJECTED", "message": f"Repository '{repo_data.get('name')}' rejected from profile import."}

    res = github_service.approve_github_evidence(
        db=db,
        profile_id=profile.id,
        repo_data=repo_data,
        edited_title=data.get("edited_title"),
        edited_description=data.get("edited_description"),
        technologies=data.get("technologies")
    )
    return res
