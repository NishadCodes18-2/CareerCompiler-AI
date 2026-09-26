import re
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.entities import JobDescription
from app.services.ai_client import ai_client
import uuid

class JobService:
    def parse_job_description(self, raw_text: str, title: str = "", company: str = "", location: str = "", source_url: str = "") -> Dict[str, Any]:
        """Analyze job description text and structure into must-have, preferred, responsibilities, and keywords."""
        lines = [line.strip() for line in raw_text.split("\n") if line.strip()]

        # Infer title if missing
        if not title:
            for line in lines[:5]:
                if any(w in line.lower() for w in ["engineer", "developer", "intern", "analyst", "architect"]):
                    title = line.replace("#", "").strip()
                    break
            if not title:
                title = "Software Engineer"

        # Extract all technical skills
        all_skills = ai_client.extract_keywords_and_skills(raw_text)

        # Distinguish between Must Have and Preferred based on section headers
        must_have = []
        preferred = []
        responsibilities = []

        # Classify lines into section buckets
        must_have_lines = []
        preferred_lines = []
        current_section = "must_have"
        for line in lines:
            lower = line.lower()
            if any(h in lower for h in ["preferred", "nice to have", "plus", "bonus", "desirable"]):
                current_section = "preferred"
                continue
            elif any(h in lower for h in ["requirement", "required", "qualification", "what you need", "must have", "qualifications"]):
                current_section = "must_have"
                continue
            elif any(h in lower for h in ["responsibilities", "what you will do", "role overview", "day in the life"]):
                current_section = "responsibilities"
                continue

            if current_section == "responsibilities" and (line.startswith("-") or line.startswith("•") or line.startswith("*")):
                responsibilities.append(line.lstrip("-•* ").strip())
            elif current_section == "must_have":
                must_have_lines.append(line)
            elif current_section == "preferred":
                preferred_lines.append(line)

        # If responsibilities list is small, pick candidate bullet lines
        if not responsibilities:
            responsibilities = [l.lstrip("-•* ").strip() for l in lines if (l.startswith("-") or l.startswith("•"))][:5]

        must_text = " ".join(must_have_lines).lower()
        pref_text = " ".join(preferred_lines).lower()

        for skill in all_skills:
            skill_lower = skill.lower()
            if skill_lower in must_text:
                must_have.append(skill)
            elif skill_lower in pref_text:
                preferred.append(skill)
            else:
                must_have.append(skill)

        # Remove duplicates while preserving order
        must_have = list(dict.fromkeys(must_have))
        preferred = [p for p in list(dict.fromkeys(preferred)) if p not in must_have]

        # Detect education requirements
        edu_reqs = []
        for line in lines:
            if any(e in line.lower() for e in ["bachelor", "b.tech", "be", "degree", "computer science", "master", "stem", "diploma"]):
                edu_reqs.append(line.lstrip("-•* ").strip())

        return {
            "title": title,
            "company": company or "Tech Company",
            "location": location or "Remote / On-site",
            "must_have_skills": must_have,
            "preferred_skills": preferred,
            "responsibilities": responsibilities[:6] if responsibilities else [
                "Design and implement clean, testable software components",
                "Collaborate with engineering team on system architecture and code reviews",
                "Maintain automated unit and integration tests"
            ],
            "keywords": all_skills,
            "education_reqs": edu_reqs[:2] if edu_reqs else ["Bachelor's / B.Tech in Computer Science or related technical field"],
            "experience_reqs": "0-2 years (Entry-Level / Internship)"
        }

    def save_job_description(
        self,
        db: Session,
        profile_id: str,
        title: str,
        raw_text: str,
        company: str = "",
        location: str = "",
        source_url: str = ""
    ) -> JobDescription:
        parsed = self.parse_job_description(raw_text, title, company, location, source_url)

        jd = JobDescription(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            title=parsed["title"],
            company=parsed["company"],
            location=parsed["location"],
            raw_text=raw_text,
            source_url=source_url,
            must_have_skills=parsed["must_have_skills"],
            preferred_skills=parsed["preferred_skills"],
            responsibilities=parsed["responsibilities"],
            keywords=parsed["keywords"],
            education_reqs=parsed["education_reqs"],
            experience_reqs=parsed["experience_reqs"],
            parsed_data=parsed
        )
        db.add(jd)
        db.commit()
        db.refresh(jd)
        return jd

job_service = JobService()
