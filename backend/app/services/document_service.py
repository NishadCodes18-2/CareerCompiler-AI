import os
import re
from typing import Dict, Any, List, Optional
from pypdf import PdfReader
import docx
from sqlalchemy.orm import Session
from app.models.entities import Document, Evidence, EvidenceLink, Skill, Project, Education, Experience
from app.services.ai_client import ai_client
import uuid

class DocumentService:
    def parse_pdf(self, file_path: str) -> List[Dict[str, Any]]:
        """Extract text from PDF while recording exact page numbers."""
        pages_content = []
        reader = PdfReader(file_path)
        for idx, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            pages_content.append({"page_number": idx + 1, "text": text})
        return pages_content

    def parse_docx(self, file_path: str) -> List[Dict[str, Any]]:
        doc = docx.Document(file_path)
        full_text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
        return [{"page_number": 1, "text": full_text}]

    def parse_txt(self, file_path: str) -> List[Dict[str, Any]]:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
        return [{"page_number": 1, "text": text}]

    def extract_structured_entities(self, pages: List[Dict[str, Any]], filename: str) -> Dict[str, Any]:
        full_text = "\n".join([p["text"] for p in pages])

        # 1. Contact info
        email_match = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", full_text)
        phone_match = re.search(r"(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}", full_text)
        github_match = re.search(r"(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)", full_text)
        linkedin_match = re.search(r"(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)", full_text)

        # 2. Extract technical skills
        skills = ai_client.extract_keywords_and_skills(full_text)

        # 3. Detect sections and their page locations
        section_locations = {}
        for p in pages:
            p_num = p["page_number"]
            p_text = p["text"].lower()
            if "education" in p_text and "education" not in section_locations:
                section_locations["Education"] = p_num
            if ("project" in p_text or "technical projects" in p_text) and "Projects" not in section_locations:
                section_locations["Projects"] = p_num
            if ("experience" in p_text or "internship" in p_text) and "Experience" not in section_locations:
                section_locations["Experience"] = p_num
            if "skills" in p_text and "Skills" not in section_locations:
                section_locations["Skills"] = p_num
            if ("certification" in p_text or "certificate" in p_text) and "Certifications" not in section_locations:
                section_locations["Certifications"] = p_num

        return {
            "contact": {
                "email": email_match.group(0) if email_match else "",
                "phone": phone_match.group(0) if phone_match else "",
                "github": f"https://github.com/{github_match.group(1)}" if github_match else "",
                "linkedin": f"https://linkedin.com/in/{linkedin_match.group(1)}" if linkedin_match else ""
            },
            "skills": skills,
            "section_locations": section_locations,
            "pages_count": len(pages),
            "preview_text": full_text[:800]
        }

    def process_and_store_document(
        self,
        db: Session,
        profile_id: str,
        filename: str,
        file_path: str,
        file_type: str,
        is_certificate: bool = False
    ) -> Dict[str, Any]:
        # 1. Parse pages
        if file_type.lower() == "pdf":
            pages = self.parse_pdf(file_path)
        elif file_type.lower() in ["docx", "doc"]:
            pages = self.parse_docx(file_path)
        else:
            pages = self.parse_txt(file_path)

        full_text = "\n".join([p["text"] for p in pages])
        extracted = self.extract_structured_entities(pages, filename)

        # 2. Store document record
        doc = Document(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            filename=filename,
            file_type=file_type,
            file_path=file_path,
            extracted_text=full_text,
            metadata_json=extracted
        )
        db.add(doc)
        db.flush()

        # 3. Create structured Evidence entries with page references
        created_evidences = []
        count = db.query(Evidence).filter(Evidence.profile_id == profile_id).count()

        if is_certificate:
            ev_id = f"EV-{count + 1:03d}"
            ev = Evidence(
                id=str(uuid.uuid4()),
                profile_id=profile_id,
                title=f"Credential Document: {filename}",
                description="Verified certificate / achievement PDF provided by candidate.",
                evidence_type="certificate",
                source_identifier=ev_id,
                source_url=f"internal://documents/{filename}",
                snippet=full_text[:400],
                page_number=1,
                verification_status="USER_CONFIRMED",
                confidence_score=0.95,
                metadata_json={"document_id": doc.id, "filename": filename}
            )
            db.add(ev)
            created_evidences.append(ev_id)
        else:
            # Create evidence for extracted skills & sections with page tracking
            for skill_name in extracted["skills"][:8]:
                count += 1
                ev_id = f"EV-{count:03d}"
                skill_page = extracted["section_locations"].get("Skills", 1)
                ev = Evidence(
                    id=str(uuid.uuid4()),
                    profile_id=profile_id,
                    title=f"Skill Evidence: {skill_name}",
                    description=f"Extracted from {filename} under technical profile.",
                    evidence_type="document_snippet",
                    source_identifier=ev_id,
                    source_url=f"internal://documents/{filename}",
                    snippet=f"Document '{filename}' explicitly references competency in {skill_name}.",
                    page_number=skill_page,
                    verification_status="USER_CONFIRMED",
                    confidence_score=0.90,
                    metadata_json={"document_id": doc.id, "skill": skill_name, "page": skill_page}
                )
                db.add(ev)
                created_evidences.append(ev_id)

                # Add skill to candidate if not already present
                existing_skill = db.query(Skill).filter(
                    Skill.profile_id == profile_id,
                    Skill.name.ilike(skill_name)
                ).first()
                if not existing_skill:
                    new_skill = Skill(
                        id=str(uuid.uuid4()),
                        profile_id=profile_id,
                        name=skill_name,
                        category="Technical",
                        proficiency="Intermediate",
                        verified=True,
                        source="document"
                    )
                    db.add(new_skill)

        db.commit()
        return {
            "document_id": doc.id,
            "filename": filename,
            "file_type": file_type,
            "pages_parsed": len(pages),
            "evidence_created": created_evidences,
            "extracted_data": extracted
        }

document_service = DocumentService()
