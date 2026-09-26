from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings
import os

# Prepare storage directory
os.makedirs(settings.STORAGE_DIR, exist_ok=True)

connect_args = {}
db_url = settings.DATABASE_URL

if db_url.startswith("sqlite"):
    connect_args = {"check_same_thread": False}
else:
    # Handle Neon PostgreSQL URL format (postgres:// -> postgresql://)
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    
    # Neon Serverless PostgreSQL requires SSL
    if "sslmode" not in db_url:
        separator = "&" if "?" in db_url else "?"
        db_url = f"{db_url}{separator}sslmode=require"

engine = create_engine(
    db_url,
    connect_args=connect_args,
    pool_pre_ping=True,
    pool_recycle=300
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
