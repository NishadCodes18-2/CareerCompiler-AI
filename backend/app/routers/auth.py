from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.entities import User, Profile
from app.schemas.schemas import UserRegister, UserLogin, Token, UserOut
from app.services.auth_service import hash_password, verify_password, create_access_token, get_current_user
from app.services.seed_service import seed_demo_data
import uuid

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        id=str(uuid.uuid4()),
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
        full_name=user_data.full_name,
        is_demo=False
    )
    db.add(user)
    db.flush()

    # Create empty profile
    profile = Profile(
        id=str(uuid.uuid4()),
        user_id=user.id,
        email_contact=user.email,
        headline="Aspiring Software Engineer",
        student_mode=True,
        experience_level="student"
    )
    db.add(profile)
    db.commit()

    token = create_access_token({"sub": user.id, "email": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "is_demo": False
    }

@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token({"sub": user.id, "email": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "is_demo": user.is_demo
    }

@router.post("/demo-login", response_model=Token)
def demo_login(db: Session = Depends(get_db)):
    demo_user = seed_demo_data(db)
    token = create_access_token({"sub": demo_user.id, "email": demo_user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": demo_user.id,
        "email": demo_user.email,
        "full_name": demo_user.full_name,
        "is_demo": True
    }

@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
