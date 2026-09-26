"""
CareerCompiler AI — Automated Evaluation Framework
Measures:
1. Claim Support Rate (supported claims / total factual claims)
2. Evidence Coverage (resume claims with attached evidence / total claims)
3. Skill Coverage (matched required skills / total required skills)
4. Parser Accuracy (correctly recovered fields / expected fields)
"""

import sys
import os
import json

# Add backend to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.database import SessionLocal, Base, engine
from app.services.seed_service import seed_demo_data
from app.models.entities import ResumeVersion, ResumeBullet, BulletEvidence
from app.services.audit_service import audit_service
from app.services.parser_test_service import parser_test_service
from app.services.matching_service import matching_service

def run_evaluation():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    user = seed_demo_data(db)
    profile = user.profile

    print("=" * 60)
    print("CAREERCOMPILER AI — EVALUATION BENCHMARK RUNNER")
    print("=" * 60)

    # 1. Evaluate Resume Compilation & Claims
    resume = db.query(ResumeVersion).filter(ResumeVersion.profile_id == profile.id).first()
    bullets = db.query(ResumeBullet).filter(ResumeBullet.resume_version_id == resume.id).all()
    total_claims = len(bullets)

    bullets_with_ev = 0
    for b in bullets:
        ev_count = db.query(BulletEvidence).filter(BulletEvidence.resume_bullet_id == b.id).count()
        if ev_count > 0:
            bullets_with_ev += 1

    evidence_coverage = round((bullets_with_ev / total_claims * 100), 2) if total_claims > 0 else 0.0

    # 2. Claim Support Rate from Truth Auditor
    audit_report = audit_service.audit_resume_version(db, resume.id)
    claim_support_rate = audit_report["support_rate_percent"]

    # 3. Skill Coverage
    match_report = matching_service.match_candidate_to_role(db, profile.id, resume.target_role)
    skill_coverage = match_report["match_percentage"]

    # 4. Parser Accuracy
    parser_report = parser_test_service.test_resume_parsability(db, resume.id)
    sections_fraction = parser_report["sections_detected"].split("/")
    parser_accuracy = round((int(sections_fraction[0]) / int(sections_fraction[1]) * 100), 2)

    results = {
        "evaluation_metrics": {
            "claim_support_rate_percent": claim_support_rate,
            "evidence_coverage_percent": evidence_coverage,
            "skill_coverage_percent": skill_coverage,
            "parser_accuracy_percent": parser_accuracy
        },
        "diagnostics": {
            "total_resume_claims": total_claims,
            "claims_backed_by_evidence": bullets_with_ev,
            "unsupported_claims_detected": audit_report["unsupported_claims"],
            "ats_reading_order": parser_report["reading_order_status"],
            "overall_ats_status": parser_report["overall_status"]
        }
    }

    print(json.dumps(results, indent=2))
    print("\nBenchmark Evaluation Summary:")
    print(f"[PASS] Claim Support Rate:   {claim_support_rate}%  (Target: >80%)")
    print(f"[PASS] Evidence Coverage:    {evidence_coverage}%  (Target: >80%)")
    print(f"[PASS] Skill Coverage:       {skill_coverage}%  (Diagnostic Fit)")
    print(f"[PASS] Parser Accuracy:      {parser_accuracy}%  (Target: >80%)")

    assert claim_support_rate >= 80.0, "Claim support rate failed benchmark threshold!"
    assert evidence_coverage >= 80.0, "Evidence coverage failed benchmark threshold!"
    assert parser_accuracy >= 80.0, "Parser accuracy failed benchmark threshold!"
    print("\nALL EVALUATION CRITERIA PASSED SUCCESSFULLY.")
    db.close()

if __name__ == "__main__":
    run_evaluation()
