from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import (
    User, Profile, Project, Skill, Education, Experience, Certification, Achievement
)
from app.schemas.schemas import (
    ProfileOut, ProfileUpdate, ProjectCreate, ProjectOut, SkillCreate, SkillOut,
    EducationCreate, EducationOut, ExperienceCreate, ExperienceOut,
    CertificationCreate, CertificationOut, AchievementCreate, AchievementOut
)
from app.services.auth_service import get_current_user
import uuid

router = APIRouter(prefix="/profile", tags=["Master Career Profile"])

@router.get("", response_model=ProfileOut)
def get_master_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        profile = Profile(
            id=str(uuid.uuid4()),
            user_id=current_user.id,
            email_contact=current_user.email,
            headline="Aspiring Software Engineer"
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("", response_model=ProfileOut)
def update_profile(data: ProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    update_dict = data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile

# Projects
@router.post("/projects", response_model=ProjectOut)
def add_project(data: ProjectCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    proj = Project(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        **data.model_dump()
    )
    db.add(proj)
    db.commit()
    db.refresh(proj)
    return proj

@router.delete("/projects/{project_id}")
def delete_project(project_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    proj = db.query(Project).filter(Project.id == project_id, Project.profile_id == profile.id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(proj)
    db.commit()
    return {"status": "DELETED"}

# Skills
@router.post("/skills", response_model=SkillOut)
def add_skill(data: SkillCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    skill = Skill(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        **data.model_dump()
    )
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    skill = db.query(Skill).filter(Skill.id == skill_id, Skill.profile_id == profile.id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return {"status": "DELETED"}

# Educations
@router.post("/educations", response_model=EducationOut)
def add_education(data: EducationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    edu = Education(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        **data.model_dump()
    )
    db.add(edu)
    db.commit()
    db.refresh(edu)
    return edu

# Experiences
@router.post("/experiences", response_model=ExperienceOut)
def add_experience(data: ExperienceCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    exp = Experience(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        **data.model_dump()
    )
    db.add(exp)
    db.commit()
    db.refresh(exp)
    return exp

# Certifications
@router.post("/certifications", response_model=CertificationOut)
def add_certification(data: CertificationCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    cert = Certification(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        **data.model_dump()
    )
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert

# Achievements
@router.post("/achievements", response_model=AchievementOut)
def add_achievement(data: AchievementCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profile = db.query(Profile).filter(Profile.user_id == current_user.id).first()
    ach = Achievement(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        **data.model_dump()
    )
    db.add(ach)
    db.commit()
    db.refresh(ach)
    return ach
