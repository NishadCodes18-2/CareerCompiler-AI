import re
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.entities import ResumeVersion, ResumeBullet, BulletEvidence

class AuditService:
    def audit_resume_version(self, db: Session, resume_version_id: str) -> Dict[str, Any]:
        """Audit all bullets in a resume version for unsupported claims, invented metrics, or buzzwords."""
        bullets = db.query(ResumeBullet).filter(ResumeBullet.resume_version_id == resume_version_id).all()

        flagged = []
        verified_count = 0
        user_confirmed_count = 0
        unsupported_count = 0
        needs_review_count = 0

        # Pattern for suspicious metrics (e.g. "improved by 72%", "increased 300%")
        metric_pattern = re.compile(r"(\b\d{1,3}%\b|\b\d+x\b|\b\d+k\b|\breduced by \d+|\bincreased by \d+)", re.IGNORECASE)
        # Vague buzzwords that should be replaced with concrete engineering facts
        buzzword_pattern = re.compile(r"\b(synergy|rockstar|ninja|world-class|spearheaded|guru|game-changer|visionary)\b", re.IGNORECASE)

        for b in bullets:
            # Check attached evidence
            evidence_links = db.query(BulletEvidence).filter(BulletEvidence.resume_bullet_id == b.id).all()
            has_evidence = len(evidence_links) > 0

            # Detect metrics
            metric_matches = metric_pattern.findall(b.text)
            buzzwords = buzzword_pattern.findall(b.text)

            bullet_status = b.audit_status
            reasons = []
            suggested_action = "none"

            if metric_matches and not has_evidence:
                bullet_status = "UNSUPPORTED"
                reasons.append(f"Unverified quantitative metric claimed: '{', '.join(metric_matches)}' without supporting benchmark or repository evidence.")
                suggested_action = "REWRITE_WITHOUT_METRIC"
            elif buzzwords:
                bullet_status = "NEEDS_REVIEW"
                reasons.append(f"Vague buzzword detected: '{', '.join(buzzwords)}'. Replace with concrete engineering deliverables.")
                suggested_action = "REPLACE_BUZZWORD"
            elif not has_evidence and b.audit_status not in ["USER_CONFIRMED", "VERIFIED"]:
                bullet_status = "NEEDS_REVIEW"
                reasons.append("Claim lacks direct evidence link in the Career Evidence Graph.")
                suggested_action = "PROVIDE_EVIDENCE"

            # Update bullet status in database
            b.audit_status = bullet_status
            if reasons:
                b.audit_reason = " ".join(reasons)

            if bullet_status == "VERIFIED":
                verified_count += 1
            elif bullet_status == "USER_CONFIRMED":
                user_confirmed_count += 1
            elif bullet_status == "UNSUPPORTED":
                unsupported_count += 1
                flagged.append({
                    "bullet_id": b.id,
                    "text": b.text,
                    "status": bullet_status,
                    "issues": reasons,
                    "suggested_action": suggested_action,
                    "available_actions": ["Provide Evidence", "Rewrite Without Metric", "Remove"]
                })
            elif bullet_status == "NEEDS_REVIEW":
                needs_review_count += 1
                flagged.append({
                    "bullet_id": b.id,
                    "text": b.text,
                    "status": bullet_status,
                    "issues": reasons,
                    "suggested_action": suggested_action,
                    "available_actions": ["Confirm Claim", "Edit Bullet", "Remove"]
                })

        db.commit()

        total = len(bullets)
        support_rate = round(((verified_count + user_confirmed_count) / total * 100), 1) if total > 0 else 100.0

        return {
            "total_claims": total,
            "verified_claims": verified_count,
            "user_confirmed_claims": user_confirmed_count,
            "unsupported_claims": unsupported_count,
            "needs_review_claims": needs_review_count,
            "support_rate_percent": support_rate,
            "flagged_bullets": flagged
        }

    def resolve_claim(self, db: Session, bullet_id: str, action: str, new_text: str = None) -> Dict[str, Any]:
        """Resolve a flagged claim: Rewrite without metric, confirm, or remove."""
        bullet = db.query(ResumeBullet).filter(ResumeBullet.id == bullet_id).first()
        if not bullet:
            raise ValueError("Bullet not found")

        if action == "REWRITE" and new_text:
            bullet.text = new_text
            bullet.audit_status = "USER_CONFIRMED"
            bullet.audit_reason = "Rewritten by candidate to remove unsupported metric claim."
        elif action == "CONFIRM":
            bullet.audit_status = "USER_CONFIRMED"
            bullet.audit_reason = "Explicitly confirmed by candidate as accurate."
        elif action == "REMOVE":
            db.delete(bullet)
            db.commit()
            return {"status": "DELETED", "message": "Bullet removed from resume."}

        db.commit()
        db.refresh(bullet)
        return {"status": "RESOLVED", "bullet_id": bullet.id, "audit_status": bullet.audit_status}

audit_service = AuditService()
