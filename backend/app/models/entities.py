import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Text, Boolean, Integer, Float, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid() -> str:
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    is_demo = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    headline = Column(String(255), default="Aspiring Software Engineer")
    summary = Column(Text, default="")
    location = Column(String(255), default="")
    phone = Column(String(50), default="")
    email_contact = Column(String(255), default="")
    linkedin = Column(String(255), default="")
    github = Column(String(255), default="")
    portfolio = Column(String(255), default="")
    student_mode = Column(Boolean, default=True)
    experience_level = Column(String(50), default="entry_level")  # student, entry_level, experienced
    target_role = Column(String(255), default="Software Engineer Intern")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")
    educations = relationship("Education", back_populates="profile", cascade="all, delete-orphan")
    experiences = relationship("Experience", back_populates="profile", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="profile", cascade="all, delete-orphan")
    skills = relationship("Skill", back_populates="profile", cascade="all, delete-orphan")
    certifications = relationship("Certification", back_populates="profile", cascade="all, delete-orphan")
    achievements = relationship("Achievement", back_populates="profile", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="profile", cascade="all, delete-orphan")
    evidence_items = relationship("Evidence", back_populates="profile", cascade="all, delete-orphan")
    job_descriptions = relationship("JobDescription", back_populates="profile", cascade="all, delete-orphan")
    resume_versions = relationship("ResumeVersion", back_populates="profile", cascade="all, delete-orphan")
    roadmap_items = relationship("RoadmapItem", back_populates="profile", cascade="all, delete-orphan")
    skill_gaps = relationship("SkillGap", back_populates="profile", cascade="all, delete-orphan")


class Education(Base):
    __tablename__ = "educations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    institution = Column(String(255), nullable=False)
    degree = Column(String(255), nullable=False)
    field_of_study = Column(String(255), default="")
    grade = Column(String(50), default="")  # GPA or percentage
    start_date = Column(String(50), default="")
    end_date = Column(String(50), default="")
    current = Column(Boolean, default=False)
    coursework = Column(JSON, default=list)  # list of subjects
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="educations")


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    company = Column(String(255), nullable=False)
    position = Column(String(255), nullable=False)
    location = Column(String(255), default="")
    start_date = Column(String(50), default="")
    end_date = Column(String(50), default="")
    current = Column(Boolean, default=False)
    description = Column(Text, default="")
    is_internship = Column(Boolean, default=False)
    technologies = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="experiences")


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    repository_url = Column(String(255), default="")
    live_url = Column(String(255), default="")
    technologies = Column(JSON, default=list)
    architecture = Column(Text, default="")
    highlights = Column(JSON, default=list)
    start_date = Column(String(50), default="")
    end_date = Column(String(50), default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="projects")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)
    category = Column(String(50), default="Technical")  # Languages, Frameworks, Databases, Tools, Soft Skills
    proficiency = Column(String(50), default="Intermediate")
    verified = Column(Boolean, default=False)
    source = Column(String(100), default="user")  # github, document, user, certificate
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="skills")


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    issuer = Column(String(255), nullable=False)
    issue_date = Column(String(50), default="")
    expiration_date = Column(String(50), default="")
    credential_id = Column(String(100), default="")
    credential_url = Column(String(255), default="")
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="certifications")


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    date = Column(String(50), default="")
    organization = Column(String(255), default="")
    category = Column(String(50), default="Hackathon")  # Hackathon, Competition, Leadership, Award
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="achievements")


class Document(Base):
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)  # pdf, docx, txt
    file_path = Column(String(500), nullable=False)
    extracted_text = Column(Text, default="")
    metadata_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="documents")


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    evidence_type = Column(String(50), nullable=False)  # github_repo, git_commit, source_code, document_snippet, certificate, benchmark, user_claim
    source_identifier = Column(String(255), default="")  # EV-001, repo name, doc filename
    source_url = Column(String(500), default="")
    snippet = Column(Text, default="")
    page_number = Column(Integer, nullable=True)
    verification_status = Column(String(50), default="UNVERIFIED")  # VERIFIED, USER_CONFIRMED, INFERRED, UNVERIFIED, REJECTED
    confidence_score = Column(Float, default=1.0)
    metadata_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="evidence_items")
    links = relationship("EvidenceLink", back_populates="evidence", cascade="all, delete-orphan")
    bullet_links = relationship("BulletEvidence", back_populates="evidence", cascade="all, delete-orphan")


class EvidenceLink(Base):
    __tablename__ = "evidence_links"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    evidence_id = Column(String(36), ForeignKey("evidence.id", ondelete="CASCADE"), nullable=False)
    entity_type = Column(String(50), nullable=False)  # project, experience, skill, certification, achievement
    entity_id = Column(String(36), nullable=False)
    relationship_type = Column(String(50), default="supports")  # supports, demonstrates, validates
    created_at = Column(DateTime, default=datetime.utcnow)

    evidence = relationship("Evidence", back_populates="links")


class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    company = Column(String(255), default="")
    location = Column(String(255), default="")
    raw_text = Column(Text, nullable=False)
    source_url = Column(String(500), default="")
    must_have_skills = Column(JSON, default=list)
    preferred_skills = Column(JSON, default=list)
    responsibilities = Column(JSON, default=list)
    keywords = Column(JSON, default=list)
    education_reqs = Column(JSON, default=list)
    experience_reqs = Column(String(255), default="")
    parsed_data = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="job_descriptions")
    resumes = relationship("ResumeVersion", back_populates="job_description")


class RoleFingerprint(Base):
    __tablename__ = "role_fingerprints"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    role_title = Column(String(255), nullable=False, index=True)
    level = Column(String(50), default="Intern / Entry Level")
    core_skills = Column(JSON, default=list)
    supporting_skills = Column(JSON, default=list)
    project_patterns = Column(JSON, default=list)
    responsibilities = Column(JSON, default=list)
    keyword_clusters = Column(JSON, default=dict)
    market_source = Column(String(255), default="Aggregate Market Intelligence")
    created_at = Column(DateTime, default=datetime.utcnow)


class MarketResearch(Base):
    __tablename__ = "market_research"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    role_title = Column(String(255), nullable=False, index=True)
    source_url = Column(String(500), default="")
    title = Column(String(255), nullable=False)
    source_type = Column(String(100), default="Industry Skill Report")  # Public JD, Developer Survey, Career Guide
    excerpt = Column(Text, default="")
    extracted_facts = Column(JSON, default=list)
    confidence = Column(Float, default=0.95)
    timestamp = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)


class ResumeVersion(Base):
    __tablename__ = "resume_versions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    job_description_id = Column(String(36), ForeignKey("job_descriptions.id", ondelete="SET NULL"), nullable=True)
    target_role = Column(String(255), nullable=False)
    version_name = Column(String(255), default="Version 1")
    template_name = Column(String(50), default="classic_ats")  # classic_ats, modern_tech, student_fresher, minimal_exec
    is_active = Column(Boolean, default=True)
    status = Column(String(50), default="COMPILED")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    profile = relationship("Profile", back_populates="resume_versions")
    job_description = relationship("JobDescription", back_populates="resumes")
    sections = relationship("ResumeSection", back_populates="resume_version", cascade="all, delete-orphan", order_by="ResumeSection.order_index")
    bullets = relationship("ResumeBullet", back_populates="resume_version", cascade="all, delete-orphan", order_by="ResumeBullet.order_index")
    analysis_runs = relationship("AnalysisRun", back_populates="resume_version", cascade="all, delete-orphan")


class ResumeSection(Base):
    __tablename__ = "resume_sections"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    resume_version_id = Column(String(36), ForeignKey("resume_versions.id", ondelete="CASCADE"), nullable=False)
    section_type = Column(String(50), nullable=False)  # header, summary, education, experience, projects, skills, certifications, achievements
    title = Column(String(100), nullable=False)
    order_index = Column(Integer, default=0)
    is_visible = Column(Boolean, default=True)
    content_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    resume_version = relationship("ResumeVersion", back_populates="sections")


class ResumeBullet(Base):
    __tablename__ = "resume_bullets"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    resume_version_id = Column(String(36), ForeignKey("resume_versions.id", ondelete="CASCADE"), nullable=False)
    section_type = Column(String(50), default="projects")  # projects, experience
    item_id = Column(String(36), nullable=True)  # project_id or experience_id
    text = Column(Text, nullable=False)
    action_verb = Column(String(50), default="")
    built_object = Column(String(255), default="")
    technologies_used = Column(JSON, default=list)
    metric_claim = Column(String(255), nullable=True)  # e.g. "31% query latency"
    audit_status = Column(String(50), default="VERIFIED")  # VERIFIED, USER_CONFIRMED, NEEDS_REVIEW, UNSUPPORTED
    audit_reason = Column(Text, default="")
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    resume_version = relationship("ResumeVersion", back_populates="bullets")
    evidence_links = relationship("BulletEvidence", back_populates="bullet", cascade="all, delete-orphan")
    interview_questions = relationship("InterviewQuestion", back_populates="bullet", cascade="all, delete-orphan")


class BulletEvidence(Base):
    __tablename__ = "bullet_evidence"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    resume_bullet_id = Column(String(36), ForeignKey("resume_bullets.id", ondelete="CASCADE"), nullable=False)
    evidence_id = Column(String(36), ForeignKey("evidence.id", ondelete="CASCADE"), nullable=False)
    strength_score = Column(Float, default=1.0)
    relevance_reason = Column(String(255), default="Direct source code or repository match")
    created_at = Column(DateTime, default=datetime.utcnow)

    bullet = relationship("ResumeBullet", back_populates="evidence_links")
    evidence = relationship("Evidence", back_populates="bullet_links")


class SkillGap(Base):
    __tablename__ = "skill_gaps"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    target_role = Column(String(255), nullable=False)
    skill_name = Column(String(100), nullable=False)
    match_status = Column(String(50), default="MISSING")  # VERIFIED_MATCH, PARTIAL_MATCH, TRANSFERABLE, MISSING, UNRELATED
    importance = Column(String(50), default="Must Have")  # Must Have, Preferred, Optional
    reasoning = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="skill_gaps")


class RoadmapItem(Base):
    __tablename__ = "roadmap_items"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, default="")
    priority = Column(Integer, default=1)
    category = Column(String(50), default="Project Blueprint")  # Project Blueprint, Skill Acquisition, Certification, Open Source
    suggested_stack = Column(JSON, default=list)
    learning_outcome = Column(Text, default="")
    evidence_generated = Column(JSON, default=list)  # list of skills/evidence this will produce
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    profile = relationship("Profile", back_populates="roadmap_items")


class InterviewQuestion(Base):
    __tablename__ = "interview_questions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    resume_bullet_id = Column(String(36), ForeignKey("resume_bullets.id", ondelete="CASCADE"), nullable=True)
    category = Column(String(50), default="Technical")  # Technical, Project, System Design, CS Fundamentals, Behavioral, HR
    question = Column(Text, nullable=False)
    context = Column(Text, default="")  # Claim or background context
    suggested_answer_framework = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)

    bullet = relationship("ResumeBullet", back_populates="interview_questions")


class AnalysisRun(Base):
    __tablename__ = "analysis_runs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    profile_id = Column(String(36), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    resume_version_id = Column(String(36), ForeignKey("resume_versions.id", ondelete="CASCADE"), nullable=True)
    run_type = Column(String(50), nullable=False)  # ats_parse, recruiter_review, technical_review, claim_audit
    score = Column(Float, default=100.0)
    metrics_json = Column(JSON, default=dict)
    diagnostics_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

    resume_version = relationship("ResumeVersion", back_populates="analysis_runs")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), nullable=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(50), default="")
    entity_id = Column(String(36), default="")
    details_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class LeadCapture(Base):
    __tablename__ = "lead_captures"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), nullable=False, index=True)
    source = Column(String(100), default="cover_resume_unlock")
    metadata_json = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)


class SharedResume(Base):
    __tablename__ = "shared_resumes"

    id = Column(String(64), primary_key=True, index=True)
    candidate_handle = Column(String(255), index=True)
    resume_data = Column(JSON, nullable=False)
    expires_at = Column(DateTime, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

