from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.entities import ResumeBullet, InterviewQuestion, BulletEvidence, Evidence
import uuid

class InterviewService:
    def generate_interview_questions_for_bullet(self, db: Session, bullet_id: str) -> List[InterviewQuestion]:
        bullet = db.query(ResumeBullet).filter(ResumeBullet.id == bullet_id).first()
        if not bullet:
            raise ValueError("Bullet not found")

        # Check existing questions
        existing = db.query(InterviewQuestion).filter(InterviewQuestion.resume_bullet_id == bullet_id).all()
        if existing:
            return existing

        questions = []
        text_lower = bullet.text.lower()
        techs = [t.lower() for t in (bullet.technologies_used or [])]

        if "raft" in text_lower or "distributed" in text_lower:
            questions.append(InterviewQuestion(
                id=str(uuid.uuid4()),
                profile_id=bullet.resume_version.profile_id,
                resume_bullet_id=bullet.id,
                category="System Design",
                question="How does your Raft implementation handle a partitioned leader when the partition heals?",
                context=bullet.text,
                suggested_answer_framework="1. Explain terms: The isolated leader cannot achieve a quorum (majority) for new log entries.\n2. In the other partition, a new leader with a higher term is elected.\n3. When partition reconnects, the old leader receives an RPC with a higher term, steps down to follower, and overwrites uncommitted entries with the true leader's log."
            ))
            questions.append(InterviewQuestion(
                id=str(uuid.uuid4()),
                profile_id=bullet.resume_version.profile_id,
                resume_bullet_id=bullet.id,
                category="CS Fundamentals",
                question="What is the difference between linearizable consistency and eventual consistency in this system?",
                context=bullet.text,
                suggested_answer_framework="1. Define Linearizability: Every read returns the value of the most recent write in real-time order.\n2. In Raft, reads must query the leader, and leader must verify with majority before replying to prevent stale reads."
            ))

        if "packet" in text_lower or "scapy" in text_lower or "sniffer" in text_lower:
            questions.append(InterviewQuestion(
                id=str(uuid.uuid4()),
                profile_id=bullet.resume_version.profile_id,
                resume_bullet_id=bullet.id,
                category="Technical",
                question="Why can Python be a bottleneck for high-throughput packet processing, and how did you circumvent it?",
                context=bullet.text,
                suggested_answer_framework="1. Bottleneck: Python's Global Interpreter Lock (GIL) and user-space memory copies.\n2. Solution: Offload socket polling to OS ring buffer / C-bindings, and decouple packet collection from deep payload inspection via a bounded worker pool."
            ))

        if "redis" in text_lower or "cache" in text_lower:
            questions.append(InterviewQuestion(
                id=str(uuid.uuid4()),
                profile_id=bullet.resume_version.profile_id,
                resume_bullet_id=bullet.id,
                category="Technical",
                question="How do you handle cache invalidation and prevent cache stampede / thundering herd?",
                context=bullet.text,
                suggested_answer_framework="1. Invalidation: Write-through cache invalidates or updates key synchronously when database record changes.\n2. Stampede prevention: Implement mutex locks (singleflight) so only one worker queries the DB on cache miss while others wait."
            ))

        if "mysql" in text_lower or "lock" in text_lower or "transaction" in text_lower:
            questions.append(InterviewQuestion(
                id=str(uuid.uuid4()),
                profile_id=bullet.resume_version.profile_id,
                resume_bullet_id=bullet.id,
                category="Technical",
                question="What transaction isolation level did you use in MySQL, and what anomalies does it prevent?",
                context=bullet.text,
                suggested_answer_framework="1. Default InnoDB level: REPEATABLE READ with Next-Key Locks.\n2. Prevents dirty reads, non-repeatable reads, and phantom reads.\n3. Used SELECT ... FOR UPDATE for explicit row-level locks on stock counters."
            ))

        # Generic question if specific tech didn't trigger
        if not questions:
            questions.append(InterviewQuestion(
                id=str(uuid.uuid4()),
                profile_id=bullet.resume_version.profile_id,
                resume_bullet_id=bullet.id,
                category="Project",
                question=f"What was the most challenging technical roadblock you encountered while building this?",
                context=bullet.text,
                suggested_answer_framework="1. Context: Briefly state the component goal.\n2. Problem: Describe the bug, latency bottleneck, or concurrency edge case.\n3. Resolution: Show how you debugged using logs/benchmarks and verified the fix."
            ))
            questions.append(InterviewQuestion(
                id=str(uuid.uuid4()),
                profile_id=bullet.resume_version.profile_id,
                resume_bullet_id=bullet.id,
                category="Behavioral",
                question="How did you test and validate this implementation before claiming it in your portfolio?",
                context=bullet.text,
                suggested_answer_framework="1. Emphasize verification: Unit tests, automated integration tests, and reproducible benchmarks.\n2. Mention verifiable repository code."
            ))

        db.add_all(questions)
        db.commit()
        return questions

    def get_defend_my_resume_data(self, db: Session, bullet_id: str) -> Dict[str, Any]:
        """Compile the complete Defend My Resume evidence-to-interview drilldown."""
        bullet = db.query(ResumeBullet).filter(ResumeBullet.id == bullet_id).first()
        if not bullet:
            raise ValueError("Bullet not found")

        # Fetch attached evidence
        bullet_evs = db.query(BulletEvidence).filter(BulletEvidence.resume_bullet_id == bullet_id).all()
        ev_details = []
        for be in bullet_evs:
            ev = be.evidence
            ev_details.append({
                "source_identifier": ev.source_identifier,
                "title": ev.title,
                "evidence_type": ev.evidence_type,
                "verification_status": ev.verification_status,
                "source_url": ev.source_url,
                "snippet": ev.snippet,
                "relevance_reason": be.relevance_reason
            })

        questions = self.generate_interview_questions_for_bullet(db, bullet_id)

        return {
            "bullet_id": bullet.id,
            "claim_text": bullet.text,
            "action_verb": bullet.action_verb,
            "technologies": bullet.technologies_used,
            "audit_status": bullet.audit_status,
            "audit_reason": bullet.audit_reason,
            "evidence_chain": ev_details,
            "interview_questions": [
                {
                    "category": q.category,
                    "question": q.question,
                    "context": q.context,
                    "suggested_answer_framework": q.suggested_answer_framework
                }
                for q in questions
            ]
        }

interview_service = InterviewService()
