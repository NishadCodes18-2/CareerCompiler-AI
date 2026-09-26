from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.entities import Skill, Evidence, Project, SkillGap, RoadmapItem, JobDescription
from app.services.research_service import research_service
import uuid

# Transferable skill equivalents map
TRANSFERABLE_MAP = {
    "PostgreSQL": ["MySQL", "SQLite", "SQL"],
    "MySQL": ["PostgreSQL", "SQLite", "SQL"],
    "FastAPI": ["Flask", "Django", "Express"],
    "Flask": ["FastAPI", "Django"],
    "Go": ["C++", "Rust", "Java"],
    "Docker": ["Containerization", "Kubernetes", "Podman"],
    "Redis": ["Memcached", "In-Memory Cache"],
    "Kafka": ["RabbitMQ", "Message Queues", "Event Streams"]
}

class MatchingService:
    def match_candidate_to_role(
        self,
        db: Session,
        profile_id: str,
        target_role: str,
        job_description_id: str = None
    ) -> Dict[str, Any]:
        """Diagnostic skill matching and gap calculation."""
        # 1. Fetch candidate skills & verified evidence
        candidate_skills = db.query(Skill).filter(Skill.profile_id == profile_id).all()
        candidate_skill_names = {s.name.lower(): s for s in candidate_skills}

        # 2. Fetch required skills from JD or Role Fingerprint
        rf = research_service.get_or_create_role_fingerprint(db, target_role)
        required_skills = list(rf.core_skills)
        preferred_skills = list(rf.supporting_skills)

        if job_description_id:
            jd = db.query(JobDescription).filter(JobDescription.id == job_description_id).first()
            if jd:
                if jd.must_have_skills:
                    required_skills = jd.must_have_skills
                if jd.preferred_skills:
                    preferred_skills = jd.preferred_skills

        all_target_skills = []
        for s in required_skills:
            all_target_skills.append({"name": s, "importance": "Must Have"})
        for s in preferred_skills:
            if not any(ts["name"].lower() == s.lower() for ts in all_target_skills):
                all_target_skills.append({"name": s, "importance": "Preferred"})

        # 3. Classify each target skill
        match_items = []
        verified_match_count = 0
        critical_gaps = []
        strong_areas = []

        # Clear old skill gaps for clean state
        db.query(SkillGap).filter(SkillGap.profile_id == profile_id, SkillGap.target_role == target_role).delete()

        for item in all_target_skills:
            name = item["name"]
            importance = item["importance"]
            name_lower = name.lower()

            status = "MISSING"
            reasoning = ""
            support_ev_ids = []

            # Check direct match
            matched_skill = None
            for c_name, c_obj in candidate_skill_names.items():
                if c_name in name_lower or name_lower in c_name:
                    matched_skill = c_obj
                    break

            if matched_skill:
                if matched_skill.verified:
                    status = "VERIFIED_MATCH"
                    reasoning = f"Direct verified match. Evidence backed by {matched_skill.source} verification."
                    verified_match_count += 1
                    strong_areas.append(name)
                else:
                    status = "PARTIAL_MATCH"
                    reasoning = "Claimed in candidate profile, but lacks direct repository or certificate evidence."
            else:
                # Check transferable
                transferable_match = None
                for base_tech, equivalents in TRANSFERABLE_MAP.items():
                    if base_tech.lower() in name_lower:
                        for eq in equivalents:
                            if eq.lower() in candidate_skill_names:
                                transferable_match = eq
                                break

                if transferable_match:
                    status = "TRANSFERABLE"
                    reasoning = f"Direct requirement '{name}' not found, but candidate has proven experience in comparable technology '{transferable_match}'."
                else:
                    status = "MISSING"
                    reasoning = f"No profile records or repository evidence found for '{name}'."
                    if importance == "Must Have":
                        critical_gaps.append(name)

            match_items.append({
                "skill_name": name,
                "match_status": status,
                "importance": importance,
                "reasoning": reasoning,
                "supporting_evidence_ids": support_ev_ids
            })

            # Save in DB
            gap_record = SkillGap(
                id=str(uuid.uuid4()),
                profile_id=profile_id,
                target_role=target_role,
                skill_name=name,
                match_status=status,
                importance=importance,
                reasoning=reasoning
            )
            db.add(gap_record)

        db.commit()

        total = len(all_target_skills)
        pct = round((verified_match_count / total * 100), 1) if total > 0 else 0.0

        return {
            "target_role": target_role,
            "total_required_skills": total,
            "matched_skills_count": verified_match_count,
            "match_percentage": pct,
            "skill_matches": match_items,
            "strong_areas": strong_areas,
            "critical_gaps": critical_gaps,
            "diagnostic_disclaimer": "Diagnostic fit analysis only. Not an automated hiring decision or probability prediction."
        }

    def generate_project_recommendations(self, db: Session, profile_id: str, target_role: str) -> List[Dict[str, Any]]:
        """Generate concrete project blueprints for missing skills."""
        gaps = db.query(SkillGap).filter(
            SkillGap.profile_id == profile_id,
            SkillGap.target_role == target_role,
            SkillGap.match_status.in_(["MISSING", "PARTIAL_MATCH"])
        ).all()

        missing_names = [g.skill_name for g in gaps]
        blueprints = []

        if any("docker" in n.lower() or "ci/cd" in n.lower() or "github actions" in n.lower() for n in missing_names):
            blueprints.append({
                "title": "CI/CD & Containerized Service Pipeline",
                "description": "Build an end-to-end automated pipeline running linting, pytest matrix, and multi-stage Docker image builds on GitHub Actions.",
                "suggested_stack": ["GitHub Actions", "Docker", "Pytest", "FastAPI"],
                "learning_outcome": "Demonstrates deployment automation, container packaging, and testing discipline expected in production engineering.",
                "evidence_generated": ["Docker", "CI/CD", "GitHub Actions", "Testing"]
            })

        if any("redis" in n.lower() or "cache" in n.lower() for n in missing_names):
            blueprints.append({
                "title": "High-Throughput Redis Rate Limiter & Cache",
                "description": "Design a token-bucket rate limiter middleware using Redis atomic Lua scripts to protect API endpoints from burst traffic.",
                "suggested_stack": ["Python", "FastAPI", "Redis", "Lua", "Docker"],
                "learning_outcome": "Demonstrates distributed caching, atomic operations, and resilience patterns.",
                "evidence_generated": ["Redis", "Rate Limiting", "Lua Scripting", "API Security"]
            })

        if any("kafka" in n.lower() or "message" in n.lower() or "queue" in n.lower() for n in missing_names):
            blueprints.append({
                "title": "Asynchronous Event-Driven Order Processing Worker",
                "description": "Construct an event publisher and consumer using Kafka/RabbitMQ with idempotent database writes and dead-letter queues.",
                "suggested_stack": ["Python", "Kafka", "PostgreSQL", "Docker Compose"],
                "learning_outcome": "Demonstrates event-driven architecture, decoupled microservices, and message delivery guarantees.",
                "evidence_generated": ["Kafka", "Event-Driven Architecture", "PostgreSQL", "Microservices"]
            })

        # Generic default project if none of specific tech matched
        if not blueprints:
            blueprints.append({
                "title": f"Production-Grade {target_role} Benchmark Project",
                "description": "Architect a modular REST API with full integration test coverage, Docker compose orchestration, and documented OpenAPI endpoints.",
                "suggested_stack": ["FastAPI", "PostgreSQL", "Docker", "Pytest"],
                "learning_outcome": "Provides verifiable repository evidence covering backend design and automated testing.",
                "evidence_generated": ["REST APIs", "PostgreSQL", "Docker", "Pytest"]
            })

        return blueprints

matching_service = MatchingService()
