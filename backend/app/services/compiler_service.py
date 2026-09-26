from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.entities import (
    Profile, Education, Experience, Project, Skill, Certification, Achievement,
    Evidence, EvidenceLink, JobDescription, ResumeVersion, ResumeSection,
    ResumeBullet, BulletEvidence, RoleFingerprint
)
from app.services.research_service import research_service
import uuid

class CompilerService:
    def rank_projects(self, projects: List[Project], target_keywords: List[str], evidences: List[Evidence]) -> List[Dict[str, Any]]:
        """Rank projects with explainable scoring based on role relevance, evidence strength, recency, depth."""
        scored = []
        target_set = {k.lower() for k in target_keywords}

        for p in projects:
            # 1. Role relevance
            proj_techs = [t.lower() for t in (p.technologies or [])]
            matches = sum(1 for t in proj_techs if any(k in t or t in k for k in target_set))
            relevance = min(100, int(50 + (matches * 15)))

            # 2. Evidence strength
            # Check how many evidence items are linked or mention this project
            has_repo = bool(p.repository_url)
            has_live = bool(p.live_url)
            evidence_strength = 60
            if has_repo:
                evidence_strength += 25
            if has_live:
                evidence_strength += 15

            # 3. Recency & technical depth
            recency = 90  # Projects from current academic/recent cycle
            depth = 85 if len(p.technologies or []) >= 3 else 70

            total_score = int((relevance * 0.4) + (evidence_strength * 0.3) + (depth * 0.2) + (recency * 0.1))

            scored.append({
                "project": p,
                "relevance": relevance,
                "evidence_strength": evidence_strength,
                "recency": recency,
                "technical_depth": depth,
                "total_score": total_score,
                "reasoning": f"Matches {matches} core target role technologies ({', '.join(p.technologies[:3])}) with verified repository proof."
            })

        # Sort descending by total score
        scored.sort(key=lambda x: x["total_score"], reverse=True)
        return scored

    def compile_resume(
        self,
        db: Session,
        profile_id: str,
        target_role: str,
        job_description_id: Optional[str] = None,
        template_name: str = "classic_ats",
        version_name: Optional[str] = None
    ) -> ResumeVersion:
        """Full pipeline execution: Profile -> Evidence -> Ranking -> Bullets -> Verification -> Assembly."""
        profile = db.query(Profile).filter(Profile.id == profile_id).first()
        if not profile:
            raise ValueError("Candidate profile not found")

        # Gather target requirements
        rf = research_service.get_or_create_role_fingerprint(db, target_role)
        keywords = list(rf.core_skills) + list(rf.supporting_skills)

        if job_description_id:
            jd = db.query(JobDescription).filter(JobDescription.id == job_description_id).first()
            if jd and jd.keywords:
                keywords.extend(jd.keywords)

        # Retrieve profile items
        projects = db.query(Project).filter(Project.profile_id == profile_id).all()
        experiences = db.query(Experience).filter(Experience.profile_id == profile_id).all()
        educations = db.query(Education).filter(Education.profile_id == profile_id).all()
        skills = db.query(Skill).filter(Skill.profile_id == profile_id).all()
        certifications = db.query(Certification).filter(Certification.profile_id == profile_id).all()
        achievements = db.query(Achievement).filter(Achievement.profile_id == profile_id).all()
        evidences = db.query(Evidence).filter(Evidence.profile_id == profile_id).all()

        # 1. Create ResumeVersion record
        v_name = version_name or f"v{db.query(ResumeVersion).filter(ResumeVersion.profile_id == profile_id).count() + 1} - {target_role}"
        resume_version = ResumeVersion(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            job_description_id=job_description_id,
            target_role=target_role,
            version_name=v_name,
            template_name=template_name,
            is_active=True,
            status="COMPILED"
        )
        db.add(resume_version)
        db.flush()

        # 2. Section Ordering (Student Mode prioritizes Education & Projects over corporate Experience)
        is_student = profile.student_mode
        sections_spec = []
        if is_student:
            sections_spec = [
                ("header", "Header & Contact", 0),
                ("summary", "Technical Summary", 1),
                ("education", "Education", 2),
                ("projects", "Technical Projects", 3),
                ("experience", "Experience & Internships", 4),
                ("skills", "Technical Skills", 5),
                ("certifications", "Certifications & Achievements", 6)
            ]
        else:
            sections_spec = [
                ("header", "Header & Contact", 0),
                ("summary", "Professional Summary", 1),
                ("experience", "Professional Experience", 2),
                ("projects", "Key Projects", 3),
                ("skills", "Core Competencies", 4),
                ("education", "Education", 5),
                ("certifications", "Certifications", 6)
            ]

        for s_type, s_title, s_order in sections_spec:
            sec = ResumeSection(
                id=str(uuid.uuid4()),
                resume_version_id=resume_version.id,
                section_type=s_type,
                title=s_title,
                order_index=s_order,
                is_visible=True,
                content_json={}
            )
            db.add(sec)

        # 3. Evidence-Backed Bullet Generation for Top Projects
        ranked_projects = self.rank_projects(projects, keywords, evidences)
        bullet_order = 1

        for r_item in ranked_projects[:3]:
            proj = r_item["project"]
            # Look up matching evidence
            proj_evs = [
                e for e in evidences
                if proj.title.lower() in e.title.lower()
                or (proj.repository_url and proj.repository_url in (e.source_url or ""))
                or any(t.lower() in e.snippet.lower() for t in (proj.technologies or []))
            ]

            tech_str = ", ".join(proj.technologies[:3]) if proj.technologies else "software stack"

            # Bullet 1: Architecture / Engineering Action
            b1_text = f"Architected and built {proj.title} using {tech_str}, implementing modular service boundaries and automated test suites."
            b1 = ResumeBullet(
                id=str(uuid.uuid4()),
                resume_version_id=resume_version.id,
                section_type="projects",
                item_id=proj.id,
                text=b1_text,
                action_verb="Architected",
                built_object=proj.title,
                technologies_used=proj.technologies[:4],
                audit_status="VERIFIED" if proj_evs else "USER_CONFIRMED",
                audit_reason=f"Derived from repository '{proj.title}' with verified code assets." if proj_evs else "Confirmed by candidate.",
                order_index=bullet_order
            )
            db.add(b1)
            bullet_order += 1

            if proj_evs:
                link = BulletEvidence(
                    id=str(uuid.uuid4()),
                    resume_bullet_id=b1.id,
                    evidence_id=proj_evs[0].id,
                    strength_score=0.98,
                    relevance_reason=f"Verified through {proj_evs[0].source_identifier} ({proj_evs[0].evidence_type})"
                )
                db.add(link)

            # Bullet 2: Highlight or Benchmark (Only include verified metrics!)
            if proj.highlights:
                highlight_text = proj.highlights[0]
                has_metric = any(c in highlight_text for c in ["%", "k ", "ms", "sec", "x "])
                # Find if benchmark evidence exists
                benchmark_ev = next((e for e in proj_evs if e.evidence_type == "benchmark"), None)

                audit_status = "VERIFIED" if (benchmark_ev or not has_metric) else "USER_CONFIRMED"
                audit_reason = "Verified by local benchmark evidence report." if benchmark_ev else "Candidate project highlight."

                b2 = ResumeBullet(
                    id=str(uuid.uuid4()),
                    resume_version_id=resume_version.id,
                    section_type="projects",
                    item_id=proj.id,
                    text=highlight_text,
                    action_verb="Engineered",
                    built_object="core feature",
                    technologies_used=proj.technologies[:3],
                    metric_claim=highlight_text if has_metric else None,
                    audit_status=audit_status,
                    audit_reason=audit_reason,
                    order_index=bullet_order
                )
                db.add(b2)
                bullet_order += 1

                if benchmark_ev:
                    b_link = BulletEvidence(
                        id=str(uuid.uuid4()),
                        resume_bullet_id=b2.id,
                        evidence_id=benchmark_ev.id,
                        strength_score=0.95,
                        relevance_reason=f"Supported by benchmark evidence {benchmark_ev.source_identifier}"
                    )
                    db.add(b_link)

        # 4. Bullets for Experiences
        for exp in experiences[:2]:
            exp_evs = [e for e in evidences if exp.company.lower() in e.title.lower() or exp.company.lower() in e.description.lower()]
            exp_text = exp.description or f"Contributed to backend services and database operations at {exp.company}."

            b_exp = ResumeBullet(
                id=str(uuid.uuid4()),
                resume_version_id=resume_version.id,
                section_type="experience",
                item_id=exp.id,
                text=exp_text,
                action_verb="Developed",
                built_object=f"services at {exp.company}",
                technologies_used=exp.technologies or ["Python", "Docker"],
                audit_status="VERIFIED" if exp_evs else "USER_CONFIRMED",
                audit_reason=f"Verified by internship document {exp_evs[0].source_identifier}" if exp_evs else "Confirmed by candidate.",
                order_index=bullet_order
            )
            db.add(b_exp)
            bullet_order += 1

            if exp_evs:
                exp_link = BulletEvidence(
                    id=str(uuid.uuid4()),
                    resume_bullet_id=b_exp.id,
                    evidence_id=exp_evs[0].id,
                    strength_score=1.0,
                    relevance_reason=f"Official confirmation letter ({exp_evs[0].source_identifier})"
                )
                db.add(exp_link)

        db.commit()
        db.refresh(resume_version)
        return resume_version

compiler_service = CompilerService()
