from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.entities import Evidence, EvidenceLink, Project, Experience, Certification, Achievement, Skill
import uuid

class EvidenceService:
    def create_evidence(
        self,
        db: Session,
        profile_id: str,
        title: str,
        evidence_type: str,
        description: str = "",
        source_identifier: str = "",
        source_url: str = "",
        snippet: str = "",
        page_number: Optional[int] = None,
        verification_status: str = "UNVERIFIED",
        confidence_score: float = 1.0,
        metadata_json: Optional[Dict[str, Any]] = None,
        linked_entity_type: Optional[str] = None,
        linked_entity_id: Optional[str] = None
    ) -> Evidence:
        if not source_identifier:
            # Generate sequential/human-readable evidence ID like EV-012
            count = db.query(Evidence).filter(Evidence.profile_id == profile_id).count()
            source_identifier = f"EV-{count + 1:03d}"

        evidence = Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile_id,
            title=title,
            description=description,
            evidence_type=evidence_type,
            source_identifier=source_identifier,
            source_url=source_url,
            snippet=snippet,
            page_number=page_number,
            verification_status=verification_status,
            confidence_score=confidence_score,
            metadata_json=metadata_json or {}
        )
        db.add(evidence)
        db.flush()

        if linked_entity_type and linked_entity_id:
            link = EvidenceLink(
                id=str(uuid.uuid4()),
                evidence_id=evidence.id,
                entity_type=linked_entity_type,
                entity_id=linked_entity_id,
                relationship_type="supports"
            )
            db.add(link)

        db.commit()
        db.refresh(evidence)
        return evidence

    def get_profile_evidence(self, db: Session, profile_id: str) -> List[Evidence]:
        return db.query(Evidence).filter(Evidence.profile_id == profile_id).order_by(Evidence.created_at.desc()).all()

    def update_verification_status(
        self,
        db: Session,
        evidence_id: str,
        status: str,
        user_notes: Optional[str] = None
    ) -> Optional[Evidence]:
        evidence = db.query(Evidence).filter(Evidence.id == evidence_id).first()
        if not evidence:
            return None

        valid_statuses = ["VERIFIED", "USER_CONFIRMED", "INFERRED", "UNVERIFIED", "REJECTED"]
        if status in valid_statuses:
            evidence.verification_status = status
            if user_notes:
                meta = dict(evidence.metadata_json or {})
                meta["user_notes"] = user_notes
                evidence.metadata_json = meta
            db.commit()
            db.refresh(evidence)
        return evidence

    def build_evidence_graph(self, db: Session, profile_id: str) -> Dict[str, Any]:
        """Traverse candidate entities and compile the complete Career Evidence Graph."""
        projects = db.query(Project).filter(Project.profile_id == profile_id).all()
        experiences = db.query(Experience).filter(Experience.profile_id == profile_id).all()
        certifications = db.query(Certification).filter(Certification.profile_id == profile_id).all()
        achievements = db.query(Achievement).filter(Achievement.profile_id == profile_id).all()
        skills = db.query(Skill).filter(Skill.profile_id == profile_id).all()
        evidences = db.query(Evidence).filter(Evidence.profile_id == profile_id).all()
        links = db.query(EvidenceLink).join(Evidence).filter(Evidence.profile_id == profile_id).all()

        evidence_map = {e.id: e for e in evidences}

        nodes = []
        edges = []

        # Root Candidate node
        nodes.append({"id": "candidate_root", "label": "Candidate Career Evidence", "type": "root"})

        # Project nodes
        for p in projects:
            p_node_id = f"project_{p.id}"
            nodes.append({
                "id": p_node_id,
                "label": p.title,
                "type": "project",
                "technologies": p.technologies
            })
            edges.append({"source": "candidate_root", "target": p_node_id, "label": "built"})

            # Tech subnodes
            for tech in (p.technologies or []):
                t_node_id = f"tech_{tech}"
                if not any(n["id"] == t_node_id for n in nodes):
                    nodes.append({"id": t_node_id, "label": tech, "type": "technology"})
                edges.append({"source": p_node_id, "target": t_node_id, "label": "uses"})

        # Experience nodes
        for exp in experiences:
            exp_node_id = f"exp_{exp.id}"
            nodes.append({
                "id": exp_node_id,
                "label": f"{exp.position} at {exp.company}",
                "type": "experience"
            })
            edges.append({"source": "candidate_root", "target": exp_node_id, "label": "worked_at"})

        # Certification nodes
        for cert in certifications:
            cert_node_id = f"cert_{cert.id}"
            nodes.append({
                "id": cert_node_id,
                "label": f"{cert.name} ({cert.issuer})",
                "type": "certification"
            })
            edges.append({"source": "candidate_root", "target": cert_node_id, "label": "certified_by"})

        # Evidence nodes & Links
        for ev in evidences:
            ev_node_id = f"ev_{ev.id}"
            nodes.append({
                "id": ev_node_id,
                "label": f"[{ev.source_identifier}] {ev.title}",
                "type": "evidence",
                "evidence_type": ev.evidence_type,
                "verification_status": ev.verification_status,
                "source_url": ev.source_url
            })

        for link in links:
            source_entity_id = f"{link.entity_type}_{link.entity_id}"
            target_ev_id = f"ev_{link.evidence_id}"
            edges.append({
                "source": source_entity_id,
                "target": target_ev_id,
                "label": link.relationship_type
            })

        return {
            "summary": {
                "total_evidence_items": len(evidences),
                "verified_count": sum(1 for e in evidences if e.verification_status == "VERIFIED"),
                "user_confirmed_count": sum(1 for e in evidences if e.verification_status == "USER_CONFIRMED"),
                "unverified_count": sum(1 for e in evidences if e.verification_status in ["UNVERIFIED", "INFERRED"]),
                "rejected_count": sum(1 for e in evidences if e.verification_status == "REJECTED")
            },
            "nodes": nodes,
            "edges": edges
        }

evidence_service = EvidenceService()
