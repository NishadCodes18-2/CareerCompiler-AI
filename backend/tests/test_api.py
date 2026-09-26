import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal
from app.services.seed_service import seed_demo_data

client = TestClient(app)

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    seed_demo_data(db)
    db.close()
    yield

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "CareerCompiler AI"
    assert "version" in data

def test_demo_login():
    response = client.post("/api/v1/auth/demo-login")
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["is_demo"] is True
    assert data["email"] == "alex.morgan@careercompiler.ai"

def test_get_master_profile():
    # Login as demo user
    login_res = client.post("/api/v1/auth/demo-login")
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = client.get("/api/v1/profile", headers=headers)
    assert response.status_code == 200
    profile = response.json()
    assert profile["headline"] is not None
    assert len(profile["projects"]) >= 3
    assert len(profile["skills"]) >= 8
    assert len(profile["educations"]) >= 1

def test_evidence_graph():
    login_res = client.post("/api/v1/auth/demo-login")
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = client.get("/api/v1/evidence/graph", headers=headers)
    assert response.status_code == 200
    graph = response.json()
    assert "nodes" in graph
    assert "edges" in graph
    assert graph["summary"]["total_evidence_items"] >= 5
    assert graph["summary"]["verified_count"] >= 3

def test_job_description_analyzer():
    login_res = client.post("/api/v1/auth/demo-login")
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    jd_payload = {
        "title": "Backend Engineering Intern",
        "company": "ScaleFin Cloud",
        "location": "Remote",
        "raw_text": """Looking for Backend Intern.
Requirements:
- Strong Python or Go skills
- Experience with PostgreSQL and SQL indexing
- REST API design and Git workflow
- Docker containerization
Preferred:
- Redis caching
- Pytest automated test suites"""
    }
    response = client.post("/api/v1/jobs/analyze", json=jd_payload, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "Python" in data["must_have_skills"] or "SQL" in data["must_have_skills"]
    assert len(data["must_have_skills"]) > 0

def test_matching_diagnostic():
    login_res = client.post("/api/v1/auth/demo-login")
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    response = client.get("/api/v1/matching/diagnostic?target_role=Backend%20Developer%20Intern", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "skill_matches" in data
    assert data["match_percentage"] > 0
    assert any(s["match_status"] == "VERIFIED_MATCH" for s in data["skill_matches"])

def test_resume_compilation_and_proof_view():
    login_res = client.post("/api/v1/auth/demo-login")
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    compile_payload = {
        "target_role": "Backend Developer Intern",
        "template_name": "modern_tech",
        "version_name": "Test Compiled Version"
    }
    compile_res = client.post("/api/v1/resumes/compile", json=compile_payload, headers=headers)
    assert compile_res.status_code == 200
    resume_id = compile_res.json()["resume_id"]

    # Test Proof View
    proof_res = client.get(f"/api/v1/resumes/{resume_id}/proof-view", headers=headers)
    assert proof_res.status_code == 200
    proof_data = proof_res.json()
    assert proof_data["total_bullets"] > 0
    assert len(proof_data["proof_mappings"]) > 0
    first_proof = proof_data["proof_mappings"][0]
    assert "bullet_text" in first_proof
    assert "audit_status" in first_proof

def test_ats_parser_and_claim_audit():
    login_res = client.post("/api/v1/auth/demo-login")
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Fetch existing resumes
    list_res = client.get("/api/v1/resumes", headers=headers)
    assert list_res.status_code == 200
    resumes = list_res.json()
    assert len(resumes) > 0
    resume_id = resumes[0]["id"]

    # Test ATS Parsing Test
    ats_res = client.get(f"/api/v1/analysis/{resume_id}/ats-test", headers=headers)
    assert ats_res.status_code == 200
    ats_data = ats_res.json()
    assert "sections_detected" in ats_data
    assert ats_data["contact_detected"]["email"] is True

    # Test Claim Audit
    audit_res = client.get(f"/api/v1/analysis/{resume_id}/claim-audit", headers=headers)
    assert audit_res.status_code == 200
    audit_data = audit_res.json()
    assert audit_data["total_claims"] > 0
    assert audit_data["support_rate_percent"] >= 70.0

def test_interview_prep_and_defend():
    login_res = client.post("/api/v1/auth/demo-login")
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    list_res = client.get("/api/v1/resumes", headers=headers)
    resume_id = list_res.json()[0]["id"]

    # Fetch resume detail to grab a bullet id
    detail_res = client.get(f"/api/v1/resumes/{resume_id}", headers=headers)
    bullets = detail_res.json()["bullets"]
    assert len(bullets) > 0
    bullet_id = bullets[0]["id"]

    # Test Defend My Resume
    defend_res = client.get(f"/api/v1/interview/defend/{bullet_id}", headers=headers)
    assert defend_res.status_code == 200
    defend_data = defend_res.json()
    assert "claim_text" in defend_data
    assert "interview_questions" in defend_data
    assert len(defend_data["interview_questions"]) > 0
