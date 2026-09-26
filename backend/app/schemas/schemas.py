from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Auth Schemas ---
class UserRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str = Field(..., min_length=2)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    full_name: str
    is_demo: bool

class UserOut(BaseModel):
    id: str
    email: str
    full_name: str
    is_demo: bool
    created_at: datetime
    class Config:
        from_attributes = True

# --- Profile Item Schemas ---
class EducationBase(BaseModel):
    institution: str
    degree: str
    field_of_study: str = ""
    grade: str = ""
    start_date: str = ""
    end_date: str = ""
    current: bool = False
    coursework: List[str] = []

class EducationCreate(EducationBase):
    pass

class EducationOut(EducationBase):
    id: str
    profile_id: str
    class Config:
        from_attributes = True

class ExperienceBase(BaseModel):
    company: str
    position: str
    location: str = ""
    start_date: str = ""
    end_date: str = ""
    current: bool = False
    description: str = ""
    is_internship: bool = False
    technologies: List[str] = []

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceOut(ExperienceBase):
    id: str
    profile_id: str
    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    description: str = ""
    repository_url: str = ""
    live_url: str = ""
    technologies: List[str] = []
    architecture: str = ""
    highlights: List[str] = []
    start_date: str = ""
    end_date: str = ""

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: str
    profile_id: str
    class Config:
        from_attributes = True

class SkillBase(BaseModel):
    name: str
    category: str = "Technical"
    proficiency: str = "Intermediate"
    verified: bool = False
    source: str = "user"

class SkillCreate(SkillBase):
    pass

class SkillOut(SkillBase):
    id: str
    profile_id: str
    class Config:
        from_attributes = True

class CertificationBase(BaseModel):
    name: str
    issuer: str
    issue_date: str = ""
    expiration_date: str = ""
    credential_id: str = ""
    credential_url: str = ""
    verified: bool = False

class CertificationCreate(CertificationBase):
    pass

class CertificationOut(CertificationBase):
    id: str
    profile_id: str
    class Config:
        from_attributes = True

class AchievementBase(BaseModel):
    title: str
    description: str = ""
    date: str = ""
    organization: str = ""
    category: str = "Hackathon"

class AchievementCreate(AchievementBase):
    pass

class AchievementOut(AchievementBase):
    id: str
    profile_id: str
    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    headline: Optional[str] = None
    summary: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    email_contact: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    student_mode: Optional[bool] = None
    experience_level: Optional[str] = None
    target_role: Optional[str] = None

class ProfileOut(BaseModel):
    id: str
    user_id: str
    headline: str
    summary: str
    location: str
    phone: str
    email_contact: str
    linkedin: str
    github: str
    portfolio: str
    student_mode: bool
    experience_level: str
    target_role: str
    educations: List[EducationOut] = []
    experiences: List[ExperienceOut] = []
    projects: List[ProjectOut] = []
    skills: List[SkillOut] = []
    certifications: List[CertificationOut] = []
    achievements: List[AchievementOut] = []
    class Config:
        from_attributes = True

# --- Evidence Engine Schemas ---
class EvidenceCreate(BaseModel):
    title: str
    description: str = ""
    evidence_type: str  # github_repo, git_commit, source_code, document_snippet, certificate, benchmark, user_claim
    source_identifier: str = ""
    source_url: str = ""
    snippet: str = ""
    page_number: Optional[int] = None
    verification_status: str = "UNVERIFIED"  # VERIFIED, USER_CONFIRMED, INFERRED, UNVERIFIED, REJECTED
    confidence_score: float = 1.0
    metadata_json: Dict[str, Any] = {}
    linked_entity_type: Optional[str] = None
    linked_entity_id: Optional[str] = None

class EvidenceOut(BaseModel):
    id: str
    profile_id: str
    title: str
    description: str
    evidence_type: str
    source_identifier: str
    source_url: str
    snippet: str
    page_number: Optional[int]
    verification_status: str
    confidence_score: float
    metadata_json: Dict[str, Any]
    created_at: datetime
    class Config:
        from_attributes = True

class EvidenceVerificationUpdate(BaseModel):
    verification_status: str  # VERIFIED, USER_CONFIRMED, REJECTED
    user_notes: Optional[str] = None

# --- GitHub Analyzer Schemas ---
class GitHubAnalyzeRequest(BaseModel):
    username_or_url: str

class GitHubRepoSummary(BaseModel):
    name: str
    description: Optional[str]
    html_url: str
    languages: List[str]
    frameworks: List[str]
    topics: List[str]
    stars: int
    forks: int
    commits_count: int
    readme_snippet: str
    suggested_evidence: str
    status: str = "USER_REVIEW_REQUIRED"

class GitHubApprovalRequest(BaseModel):
    repo_name: str
    action: str  # approve, edit, reject
    edited_title: Optional[str] = None
    edited_description: Optional[str] = None
    technologies: List[str] = []

# --- Document Parser Schemas ---
class DocumentOut(BaseModel):
    id: str
    filename: str
    file_type: str
    extracted_text_preview: str
    created_at: datetime
    metadata_json: Dict[str, Any]
    class Config:
        from_attributes = True

# --- Job & Role Schemas ---
class JobDescriptionCreate(BaseModel):
    title: str
    company: str = ""
    location: str = ""
    raw_text: str
    source_url: str = ""

class JobDescriptionOut(BaseModel):
    id: str
    title: str
    company: str
    location: str
    raw_text: str
    must_have_skills: List[str]
    preferred_skills: List[str]
    responsibilities: List[str]
    keywords: List[str]
    education_reqs: List[str]
    experience_reqs: str
    created_at: datetime
    class Config:
        from_attributes = True

class RoleFingerprintOut(BaseModel):
    role_title: str
    level: str
    core_skills: List[str]
    supporting_skills: List[str]
    project_patterns: List[str]
    responsibilities: List[str]
    keyword_clusters: Dict[str, List[str]]
    market_source: str

class MarketResearchOut(BaseModel):
    id: str
    role_title: str
    source_url: str
    title: str
    source_type: str
    excerpt: str
    extracted_facts: List[str]
    confidence: float
    timestamp: datetime
    class Config:
        from_attributes = True

# --- Skill Gap & Matching Schemas ---
class SkillMatchItem(BaseModel):
    skill_name: str
    match_status: str  # VERIFIED_MATCH, PARTIAL_MATCH, TRANSFERABLE, MISSING, UNRELATED
    importance: str    # Must Have, Preferred, Optional
    reasoning: str
    supporting_evidence_ids: List[str] = []

class CandidateMatchReport(BaseModel):
    target_role: str
    total_required_skills: int
    matched_skills_count: int
    match_percentage: float
    skill_matches: List[SkillMatchItem]
    strong_areas: List[str]
    critical_gaps: List[str]
    diagnostic_disclaimer: str = "Diagnostic fit analysis only. Not an automated hiring decision or probability prediction."

# --- Roadmap Schemas ---
class RoadmapItemCreate(BaseModel):
    title: str
    description: str = ""
    priority: int = 1
    category: str = "Project Blueprint"
    suggested_stack: List[str] = []
    learning_outcome: str = ""
    evidence_generated: List[str] = []

class RoadmapItemOut(BaseModel):
    id: str
    title: str
    description: str
    priority: int
    category: str
    suggested_stack: List[str]
    learning_outcome: str
    evidence_generated: List[str]
    is_completed: bool
    created_at: datetime
    class Config:
        from_attributes = True

# --- Resume Compiler Schemas ---
class CompileResumeRequest(BaseModel):
    target_role: str
    job_description_id: Optional[str] = None
    template_name: str = "classic_ats"  # classic_ats, modern_tech, student_fresher, minimal_exec
    version_name: Optional[str] = None

class BulletEvidenceOut(BaseModel):
    evidence_id: str
    title: str
    evidence_type: str
    verification_status: str
    source_url: str
    snippet: str
    strength_score: float
    relevance_reason: str

class ResumeBulletOut(BaseModel):
    id: str
    section_type: str
    item_id: Optional[str]
    text: str
    action_verb: str
    built_object: str
    technologies_used: List[str]
    metric_claim: Optional[str]
    audit_status: str  # VERIFIED, USER_CONFIRMED, NEEDS_REVIEW, UNSUPPORTED
    audit_reason: str
    order_index: int
    evidence_items: List[BulletEvidenceOut] = []
    class Config:
        from_attributes = True

class ResumeBulletUpdate(BaseModel):
    text: Optional[str] = None
    audit_status: Optional[str] = None
    audit_reason: Optional[str] = None

class ResumeSectionOut(BaseModel):
    id: str
    section_type: str
    title: str
    order_index: int
    is_visible: bool
    content_json: Dict[str, Any]

class ResumeVersionOut(BaseModel):
    id: str
    profile_id: str
    target_role: str
    version_name: str
    template_name: str
    is_active: bool
    status: str
    created_at: datetime
    sections: List[ResumeSectionOut] = []
    bullets: List[ResumeBulletOut] = []
    class Config:
        from_attributes = True

# --- Analysis & Reviews ---
class ATSParsingReport(BaseModel):
    overall_status: str
    sections_detected: str  # e.g. "7/7"
    contact_detected: Dict[str, bool]
    dates_detected: str
    skills_detected: str
    links_detected: str
    reading_order_status: str
    extracted_text_sample: str
    detected_sections: List[str]
    missing_elements: List[str]
    recommendations: List[str]

class RecruiterReviewReport(BaseModel):
    scanability_score: int
    relevance_score: int
    clarity_score: int
    strengths: List[str]
    concerns: List[str]
    actionable_suggestions: List[str]
    disclaimer: str

class TechnicalReviewReport(BaseModel):
    tech_depth_score: int
    credibility_score: int
    architecture_clarity: str
    technical_claims_reviewed: List[Dict[str, Any]]
    recommendations: List[str]

class ClaimAuditReport(BaseModel):
    total_claims: int
    verified_claims: int
    user_confirmed_claims: int
    unsupported_claims: int
    needs_review_claims: int
    support_rate_percent: float
    flagged_bullets: List[Dict[str, Any]]

# --- Interview Prep Schemas ---
class InterviewQuestionOut(BaseModel):
    id: str
    bullet_id: Optional[str]
    bullet_text: Optional[str]
    category: str
    question: str
    context: str
    suggested_answer_framework: str
    created_at: datetime
    class Config:
        from_attributes = True
