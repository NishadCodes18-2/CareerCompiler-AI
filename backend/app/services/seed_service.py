from sqlalchemy.orm import Session
from app.models.entities import (
    User, Profile, Education, Experience, Project, Skill, Certification,
    Achievement, Evidence, EvidenceLink, JobDescription, RoleFingerprint,
    MarketResearch, ResumeVersion, ResumeSection, ResumeBullet, BulletEvidence,
    SkillGap, RoadmapItem, InterviewQuestion
)
from app.services.auth_service import hash_password
import uuid

def seed_demo_data(db: Session) -> User:
    # Check if demo user already exists
    existing_user = db.query(User).filter(User.email == "alex.morgan@careercompiler.ai").first()
    if existing_user:
        return existing_user

    # 1. Create Demo User
    demo_user = User(
        id=str(uuid.uuid4()),
        email="alex.morgan@careercompiler.ai",
        hashed_password=hash_password("DemoPassword123!"),
        full_name="Alex Morgan",
        is_demo=True,
        is_active=True
    )
    db.add(demo_user)
    db.flush()

    # 2. Create Master Profile
    profile = Profile(
        id=str(uuid.uuid4()),
        user_id=demo_user.id,
        headline="Computer Science Senior | Distributed Systems & Backend Engineering",
        summary="Final-year Computer Science undergraduate specializing in backend architecture, distributed systems, and API design. Built open-source network analysis tools and high-throughput microservices backed by verified GitHub commits and benchmarks.",
        location="Seattle, WA / Remote",
        phone="+1 (555) 234-5678",
        email_contact="alex.morgan@careercompiler.ai",
        linkedin="https://linkedin.com/in/alexmorgan-cs",
        github="https://github.com/alexmorgan-dev",
        portfolio="https://alexmorgan.dev",
        student_mode=True,
        experience_level="student",
        target_role="Backend Developer Intern"
    )
    db.add(profile)
    db.flush()

    # 3. Educations
    edu = Education(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        institution="Pacific Institute of Technology",
        degree="B.Tech in Computer Science and Engineering",
        field_of_study="Distributed Systems & Software Engineering",
        grade="3.88 / 4.00 GPA",
        start_date="2022",
        end_date="2026",
        current=True,
        coursework=[
            "Data Structures & Algorithms",
            "Distributed Systems",
            "Database Management Systems",
            "Computer Networks",
            "Operating Systems",
            "Cloud Computing"
        ]
    )
    db.add(edu)

    # 4. Internships / Experiences
    exp1 = Experience(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        company="CloudScale Infrastructure Labs",
        position="Backend Engineering Intern",
        location="Seattle, WA",
        start_date="June 2024",
        end_date="Aug 2024",
        current=False,
        is_internship=True,
        description="Developed asynchronous telemetry ingestion pipelines handling 50k+ logs/sec. Optimized PostgreSQL queries and containerized services using Docker.",
        technologies=["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "Kafka"]
    )
    exp2 = Experience(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        company="Distributed Systems Research Group",
        position="Undergraduate Research Assistant",
        location="Campus",
        start_date="Jan 2024",
        end_date="May 2024",
        current=False,
        is_internship=True,
        description="Assisted in benchmarking Raft consensus protocol under network partitions. Wrote automated chaos-testing scripts in Python.",
        technologies=["Python", "Go", "Docker", "Linux", "Pytest"]
    )
    db.add_all([exp1, exp2])
    db.flush()

    # 5. Projects
    proj1 = Project(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="Network Traffic Packet Analyzer",
        description="High-performance asynchronous packet sniffer and protocol analyzer with real-time stream decoding, anomaly detection, and SQLite persistence.",
        repository_url="https://github.com/alexmorgan-dev/network-traffic-analyzer",
        live_url="https://traffic-analyzer-demo.alexmorgan.dev",
        technologies=["Python", "Scapy", "Flask", "SQLite", "REST API", "Pytest"],
        architecture="Layered architecture with asynchronous packet capture threads feeding an event queue, persistent SQLite storage, and Flask REST reporting endpoints.",
        highlights=[
            "Built packet sniffing engine capturing up to 10k packets/second with zero packet drop",
            "Implemented custom TCP/UDP stream reassembly and protocol header parsing",
            "Developed REST API with 12 endpoints for protocol distribution and traffic summaries"
        ],
        start_date="Sep 2024",
        end_date="Nov 2024"
    )
    proj2 = Project(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="Distributed Key-Value Store with Raft",
        description="Fault-tolerant, consistent in-memory key-value database implementing Raft consensus for leader election, log replication, and heartbeat monitoring.",
        repository_url="https://github.com/alexmorgan-dev/raft-kv-store",
        technologies=["Go", "Python", "Docker", "REST API", "Pytest"],
        architecture="Raft consensus finite-state machine with RPC transport layer, persistent write-ahead logging (WAL), and snapshot compaction.",
        highlights=[
            "Implemented leader election, log replication, and safety invariants matching Raft spec",
            "Containerized multi-node cluster configuration using Docker Compose for local partition simulation",
            "Maintained 99.9% read-after-write consistency under node failure test scenarios"
        ],
        start_date="Jan 2024",
        end_date="Apr 2024"
    )
    proj3 = Project(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="Inventory Management & Telemetry API",
        description="Production-grade RESTful inventory tracking service featuring optimistic concurrency, MySQL transactions, Redis caching, and automated integration suites.",
        repository_url="https://github.com/alexmorgan-dev/inventory-mgmt-api",
        technologies=["Python", "Flask", "MySQL", "Redis", "REST API", "Docker", "Pytest"],
        architecture="Domain-driven MVC service layer with repository pattern, SQLAlchemy ORM, Redis write-through cache, and Alembic migrations.",
        highlights=[
            "Engineered Flask REST API handling concurrent inventory allocations with row-level locks",
            "Cached frequently queried catalog items in Redis, reducing database read query load by 40%",
            "Authored 35+ end-to-end integration tests achieving 92% code coverage"
        ],
        start_date="Feb 2024",
        end_date="May 2024"
    )
    proj4 = Project(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="Algorithmic Code Complexity Auditor",
        description="Static analysis CLI and web dashboard that parses ASTs using Python Tree-sitter to compute cyclomatic complexity, Halstead metrics, and maintainability index.",
        repository_url="https://github.com/alexmorgan-dev/code-complexity-auditor",
        technologies=["Python", "FastAPI", "React", "Tree-sitter", "SQLite"],
        architecture="Parser worker executing Tree-sitter AST queries, calculating complexity vectors, and exposing JSON metrics via FastAPI.",
        highlights=[
            "Constructed AST visitor traversing Python and C++ source trees to identify deeply nested branches",
            "Delivered sub-100ms response time for repositories containing up to 50,000 lines of code"
        ],
        start_date="Oct 2023",
        end_date="Dec 2023"
    )
    db.add_all([proj1, proj2, proj3, proj4])
    db.flush()

    # 6. Technical Skills
    skills_data = [
        ("Python", "Languages", "Advanced", True, "github"),
        ("Go", "Languages", "Intermediate", True, "github"),
        ("SQL (PostgreSQL / MySQL)", "Databases", "Advanced", True, "github"),
        ("REST APIs", "Frameworks", "Advanced", True, "github"),
        ("Flask & FastAPI", "Frameworks", "Advanced", True, "github"),
        ("Docker", "DevOps & Cloud", "Intermediate", True, "github"),
        ("Redis", "Databases", "Intermediate", True, "github"),
        ("Git & GitHub", "Tools", "Advanced", True, "github"),
        ("Linux & Shell", "Tools", "Intermediate", True, "user"),
        ("Pytest & Testing", "Tools", "Advanced", True, "github"),
        ("Distributed Systems", "Technical", "Intermediate", True, "document")
    ]
    for name, cat, prof, ver, src in skills_data:
        s = Skill(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            name=name,
            category=cat,
            proficiency=prof,
            verified=ver,
            source=src
        )
        db.add(s)

    # 7. Certifications
    cert1 = Certification(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        name="AWS Certified Cloud Practitioner",
        issuer="Amazon Web Services (AWS)",
        issue_date="August 2024",
        expiration_date="August 2027",
        credential_id="AWS-CCP-9872145",
        credential_url="https://aws.amazon.com/verification/AWS-CCP-9872145",
        verified=True
    )
    cert2 = Certification(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        name="Meta Database Engineer Professional Certificate",
        issuer="Meta / Coursera",
        issue_date="April 2024",
        credential_id="COURSERA-META-DB-4412",
        credential_url="https://coursera.org/verify/COURSERA-META-DB-4412",
        verified=True
    )
    cert3 = Certification(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        name="Postman API Fundamentals Student Expert",
        issuer="Postman",
        issue_date="March 2024",
        credential_id="POSTMAN-SE-8812",
        credential_url="https://badgr.com/public/assertions/POSTMAN-SE-8812",
        verified=True
    )
    db.add_all([cert1, cert2, cert3])

    # 8. Achievements
    ach1 = Achievement(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="Smart India Hackathon Finalist",
        organization="Ministry of Education / AICTE",
        date="December 2023",
        category="Hackathon",
        description="Selected in the top 5 teams out of 1,200+ submissions nationwide for building an automated public grievance classification API."
    )
    ach2 = Achievement(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="1st Place - University TechFest Hackathon",
        organization="Pacific Institute of Technology",
        date="March 2024",
        category="Hackathon",
        description="Won 1st prize for building a decentralized peer-to-peer file sharing protocol with chunk verification."
    )
    ach3 = Achievement(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="Dean's Academic Merit List",
        organization="School of Computer Science",
        date="2023 - 2024",
        category="Award",
        description="Recognized for sustaining a cumulative GPA above 3.85 across 4 consecutive semesters."
    )
    db.add_all([ach1, ach2, ach3])
    db.flush()

    # 9. Evidence Engine Artifacts (EV-001 to EV-010)
    evidences = [
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="GitHub Repository: network-traffic-analyzer",
            description="Public GitHub repository containing 48 commits, README documentation, and Python Scapy sniffer source code.",
            evidence_type="github_repo",
            source_identifier="EV-001",
            source_url="https://github.com/alexmorgan-dev/network-traffic-analyzer",
            snippet="import scapy.all as scapy\nclass PacketSniffer:\n    def start_capture(self, interface='eth0'): ...",
            verification_status="VERIFIED",
            confidence_score=0.98,
            metadata_json={"repo": "alexmorgan-dev/network-traffic-analyzer", "stars": 14, "language": "Python"}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="Benchmark Report: Network Packet Sniffer Latency",
            description="Local benchmark script results showing sustained throughput of 10,000 packets/second under test traffic generation.",
            evidence_type="benchmark",
            source_identifier="EV-002",
            source_url="https://github.com/alexmorgan-dev/network-traffic-analyzer/blob/main/benchmarks/results.md",
            snippet="Benchmarked with tcpreplay: 10,000 pkts/sec across 60s without buffer overflow or packet loss.",
            verification_status="VERIFIED",
            confidence_score=0.95,
            metadata_json={"benchmark_type": "packet_throughput", "tool": "tcpreplay"}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="GitHub Repository: raft-kv-store",
            description="Go repository with Raft consensus implementation including leader election, log replication, and RPC handling.",
            evidence_type="source_code",
            source_identifier="EV-003",
            source_url="https://github.com/alexmorgan-dev/raft-kv-store",
            snippet="type RaftNode struct {\n    currentTerm int\n    votedFor string\n    log []LogEntry\n    state NodeState\n}",
            verification_status="VERIFIED",
            confidence_score=0.99,
            metadata_json={"repo": "alexmorgan-dev/raft-kv-store", "language": "Go", "commits": 62}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="Docker Compose Multi-Node Raft Configuration",
            description="docker-compose.yml defining 3-node and 5-node cluster topologies for network partition chaos testing.",
            evidence_type="source_code",
            source_identifier="EV-004",
            source_url="https://github.com/alexmorgan-dev/raft-kv-store/blob/main/docker-compose.yml",
            snippet="services:\n  raft-node-1:\n    image: raft-kv:latest\n    environment:\n      - NODE_ID=1\n      - PEERS=raft-node-2:8002,raft-node-3:8003",
            verification_status="VERIFIED",
            confidence_score=0.97,
            metadata_json={"file": "docker-compose.yml"}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="GitHub Repository: inventory-mgmt-api",
            description="Flask REST API with MySQL schema, Alembic migrations, Redis caching, and automated integration tests.",
            evidence_type="github_repo",
            source_identifier="EV-005",
            source_url="https://github.com/alexmorgan-dev/inventory-mgmt-api",
            snippet="@app.route('/api/v1/inventory/allocate', methods=['POST'])\ndef allocate_inventory(): ...",
            verification_status="VERIFIED",
            confidence_score=0.96,
            metadata_json={"repo": "alexmorgan-dev/inventory-mgmt-api", "language": "Python", "tests_count": 35}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="Redis Query Cache Latency Profile",
            description="Pytest benchmark measuring read query response times before and after Redis caching implementation.",
            evidence_type="benchmark",
            source_identifier="EV-006",
            source_url="https://github.com/alexmorgan-dev/inventory-mgmt-api/blob/main/benchmarks/redis_cache.txt",
            snippet="Average DB query response time reduced from 42ms to 25ms (approx 40% reduction) on top-50 requested catalog items.",
            verification_status="USER_CONFIRMED",
            confidence_score=0.92,
            metadata_json={"cache_metric": "40% latency reduction"}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="CloudScale Internship Completion & Recommendation Letter",
            description="Formal internship verification letter confirming work on telemetry ingestion pipelines and Docker containerization.",
            evidence_type="document_snippet",
            source_identifier="EV-007",
            source_url="internal://documents/cloudscale_internship_letter.pdf",
            snippet="Alex Morgan demonstrated proficiency in Python, PostgreSQL query tuning, and Docker deployment during the summer internship.",
            page_number=1,
            verification_status="VERIFIED",
            confidence_score=1.0,
            metadata_json={"doc": "cloudscale_internship_letter.pdf", "issuer": "CloudScale Infrastructure Labs"}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="AWS Certified Cloud Practitioner Credential Verification",
            description="Online digital badge validation on AWS Certification verification portal.",
            evidence_type="certificate",
            source_identifier="EV-008",
            source_url="https://aws.amazon.com/verification/AWS-CCP-9872145",
            snippet="Credential ID: AWS-CCP-9872145. Status: Active. Holder: Alex Morgan.",
            verification_status="VERIFIED",
            confidence_score=1.0,
            metadata_json={"credential_id": "AWS-CCP-9872145"}
        ),
        Evidence(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="Smart India Hackathon Certificate of Merit",
            description="Scanned finalist certificate issued by AICTE and Ministry of Education.",
            evidence_type="certificate",
            source_identifier="EV-009",
            source_url="internal://documents/sih_2023_certificate.pdf",
            snippet="Awarded to Alex Morgan for outstanding project in the Public Sector Problem Category.",
            page_number=1,
            verification_status="VERIFIED",
            confidence_score=1.0,
            metadata_json={"doc": "sih_2023_certificate.pdf"}
        )
    ]
    db.add_all(evidences)
    db.flush()

    # Link evidence to projects & experiences
    db.add_all([
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[0].id, entity_type="project", entity_id=proj1.id, relationship_type="supports"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[1].id, entity_type="project", entity_id=proj1.id, relationship_type="validates"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[2].id, entity_type="project", entity_id=proj2.id, relationship_type="supports"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[3].id, entity_type="project", entity_id=proj2.id, relationship_type="validates"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[4].id, entity_type="project", entity_id=proj3.id, relationship_type="supports"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[5].id, entity_type="project", entity_id=proj3.id, relationship_type="validates"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[6].id, entity_type="experience", entity_id=exp1.id, relationship_type="validates"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[7].id, entity_type="certification", entity_id=cert1.id, relationship_type="validates"),
        EvidenceLink(id=str(uuid.uuid4()), evidence_id=evidences[8].id, entity_type="achievement", entity_id=ach1.id, relationship_type="validates")
    ])

    # 10. Seed Target Job Description
    jd = JobDescription(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        title="Backend Developer Intern",
        company="Stripe / Fintech Cloud Platform",
        location="Remote / San Francisco, CA",
        raw_text="""We are looking for a passionate Backend Developer Intern to join our Core Services team. 
You will design, build, and maintain high-throughput REST APIs and distributed microservices.

Requirements:
- Strong programming fundamentals in Python or Go
- Solid understanding of SQL and database indexing (PostgreSQL or MySQL)
- Practical experience designing and documenting RESTful APIs
- Familiarity with Git version control and collaborative development
- Working knowledge of Docker containerization and Linux environments
- Passion for writing clean, testable code with unit and integration tests

Preferred:
- Experience with in-memory caching solutions like Redis
- Understanding of distributed systems principles (consensus, consistency, replication)
- Familiarity with CI/CD pipelines (GitHub Actions)
- Contributions to open-source software or substantive portfolio projects

Responsibilities:
- Build backend endpoints handling financial transaction workflows
- Optimize database queries and schema migrations
- Collaborate with senior engineers on system design and code reviews
- Write comprehensive test suites (Pytest / Go testing)""",
        source_url="https://stripe.com/jobs/backend-intern-sample",
        must_have_skills=["Python", "SQL", "REST APIs", "Git", "Docker", "Testing"],
        preferred_skills=["Redis", "Distributed Systems", "Go", "CI/CD", "PostgreSQL"],
        responsibilities=[
            "Build and maintain REST APIs for financial workflows",
            "Optimize database schema and query execution times",
            "Write comprehensive unit and integration test suites",
            "Collaborate on distributed system architectures and code reviews"
        ],
        keywords=["Python", "Go", "PostgreSQL", "MySQL", "REST", "Docker", "Redis", "Distributed Systems", "Pytest", "Git"],
        education_reqs=["B.Tech/BE or Master's in Computer Science or related STEM field (in progress or recent grad)"],
        experience_reqs="0-1 years / Internship level"
    )
    db.add(jd)
    db.flush()

    # 11. Role Fingerprint
    rf = RoleFingerprint(
        id=str(uuid.uuid4()),
        role_title="Backend Developer Intern",
        level="Intern / Entry Level",
        core_skills=["Python", "Java/Go", "SQL (PostgreSQL/MySQL)", "RESTful API Design", "Git"],
        supporting_skills=["Docker", "Redis", "Pytest / Unit Testing", "Linux CLI", "CI/CD Pipelines"],
        project_patterns=[
            "RESTful API Web Services with database persistence",
            "Data Pipeline or Telemetry Ingestion Services",
            "Distributed Key-Value or Consensus Prototypes",
            "CLI Static Analysis and Automation Tooling"
        ],
        responsibilities=[
            "Developing and maintaining reliable HTTP REST endpoints",
            "Writing relational database queries, transactions, and indexing",
            "Containerizing local microservices with Docker Compose",
            "Maintaining unit and integration test coverage"
        ],
        keyword_clusters={
            "Core Backend": ["REST API", "Endpoints", "HTTP", "FastAPI", "Flask", "JSON"],
            "Databases": ["PostgreSQL", "MySQL", "Transactions", "Indexing", "ACID", "ORM", "Redis"],
            "DevOps": ["Docker", "Linux", "Git", "GitHub Actions", "CI/CD", "Bash"],
            "Reliability": ["Pytest", "Integration Testing", "Error Handling", "Logging", "Monitoring"]
        },
        market_source="Aggregate Tech Internship Market Analysis 2024-2026"
    )
    db.add(rf)

    # 12. Market Research Citations
    mr1 = MarketResearch(
        id=str(uuid.uuid4()),
        role_title="Backend Developer Intern",
        source_url="https://stackoverflow.co/developer-survey/backend-skills-trends",
        title="2024 Global Developer Survey: Backend Technologies in High Demand",
        source_type="Developer Survey & Industry Benchmark",
        excerpt="Python and Go represent the fastest growing languages for cloud-native backend services, with over 78% of backend job postings requiring SQL proficiency and 64% listing Docker as an essential skill.",
        extracted_facts=[
            "SQL is required in 78% of backend postings",
            "Docker containerization is requested in 64% of entry-level engineering roles",
            "Automated testing (Pytest/Go test) is cited by 71% of engineering managers as the #1 differentiator for student portfolios"
        ],
        confidence=0.96
    )
    mr2 = MarketResearch(
        id=str(uuid.uuid4()),
        role_title="Backend Developer Intern",
        source_url="https://github.blog/2024-open-source-software-talent-report",
        title="GitHub Engineering Report: Key Differentiators in Junior Developer Resumes",
        source_type="Public Engineering Report",
        excerpt="Candidates who present verified GitHub commit histories, reproducible README instructions, and clear architectural diagrams are 3.4x more likely to clear preliminary technical screenings compared to applicants with generic bullet points.",
        extracted_facts=[
            "Verified GitHub evidence reduces recruiter screening time by 45%",
            "Quantified performance claims without supporting test files or benchmarks trigger scrutiny during technical rounds"
        ],
        confidence=0.94
    )
    db.add_all([mr1, mr2])
    db.flush()

    # 13. Pre-Compiled Resume Version with Evidence-Backed Bullets
    resume_ver = ResumeVersion(
        id=str(uuid.uuid4()),
        profile_id=profile.id,
        job_description_id=jd.id,
        target_role="Backend Developer Intern",
        version_name="v1 - Backend & Distributed Systems Focus",
        template_name="modern_tech",
        is_active=True,
        status="COMPILED"
    )
    db.add(resume_ver)
    db.flush()

    # Resume Sections (Student Mode: Education -> Projects -> Experience -> Skills -> Certifications)
    sec_edu = ResumeSection(id=str(uuid.uuid4()), resume_version_id=resume_ver.id, section_type="education", title="Education", order_index=1, is_visible=True, content_json={"institution": edu.institution, "degree": edu.degree, "grade": edu.grade, "dates": f"{edu.start_date} - {edu.end_date}"})
    sec_proj = ResumeSection(id=str(uuid.uuid4()), resume_version_id=resume_ver.id, section_type="projects", title="Technical Projects", order_index=2, is_visible=True, content_json={})
    sec_exp = ResumeSection(id=str(uuid.uuid4()), resume_version_id=resume_ver.id, section_type="experience", title="Experience & Internships", order_index=3, is_visible=True, content_json={})
    sec_skills = ResumeSection(id=str(uuid.uuid4()), resume_version_id=resume_ver.id, section_type="skills", title="Technical Skills", order_index=4, is_visible=True, content_json={})
    sec_certs = ResumeSection(id=str(uuid.uuid4()), resume_version_id=resume_ver.id, section_type="certifications", title="Certifications & Honors", order_index=5, is_visible=True, content_json={})
    db.add_all([sec_edu, sec_proj, sec_exp, sec_skills, sec_certs])
    db.flush()

    # Resume Bullets with evidence links
    bullet1 = ResumeBullet(
        id=str(uuid.uuid4()),
        resume_version_id=resume_ver.id,
        section_type="projects",
        item_id=proj1.id,
        text="Engineered an asynchronous packet sniffer using Python and Scapy capable of capturing 10,000 packets/sec without buffer overflow.",
        action_verb="Engineered",
        built_object="asynchronous packet sniffer",
        technologies_used=["Python", "Scapy", "SQLite"],
        metric_claim="10,000 packets/sec based on local tcpreplay benchmark",
        audit_status="VERIFIED",
        audit_reason="Verified by EV-001 (GitHub repository) and EV-002 (tcpreplay benchmark report).",
        order_index=1
    )
    bullet2 = ResumeBullet(
        id=str(uuid.uuid4()),
        resume_version_id=resume_ver.id,
        section_type="projects",
        item_id=proj1.id,
        text="Developed 12 REST API endpoints using Flask to compute real-time TCP/UDP traffic distributions and protocol anomaly alerts.",
        action_verb="Developed",
        built_object="12 REST API endpoints",
        technologies_used=["Python", "Flask", "REST API"],
        audit_status="VERIFIED",
        audit_reason="Verified by EV-001 routes definition.",
        order_index=2
    )
    bullet3 = ResumeBullet(
        id=str(uuid.uuid4()),
        resume_version_id=resume_ver.id,
        section_type="projects",
        item_id=proj2.id,
        text="Implemented a fault-tolerant in-memory key-value database in Go with Raft consensus for leader election and log replication.",
        action_verb="Implemented",
        built_object="in-memory key-value database",
        technologies_used=["Go", "Raft", "Distributed Systems"],
        audit_status="VERIFIED",
        audit_reason="Verified by EV-003 source files (raft_node.go).",
        order_index=3
    )
    bullet4 = ResumeBullet(
        id=str(uuid.uuid4()),
        resume_version_id=resume_ver.id,
        section_type="projects",
        item_id=proj2.id,
        text="Simulated network partitions across 3-node and 5-node clusters using Docker Compose to validate Raft safety invariants.",
        action_verb="Simulated",
        built_object="network partition cluster tests",
        technologies_used=["Docker", "Docker Compose", "Go"],
        audit_status="VERIFIED",
        audit_reason="Verified by EV-004 docker-compose.yml configuration.",
        order_index=4
    )
    bullet5 = ResumeBullet(
        id=str(uuid.uuid4()),
        resume_version_id=resume_ver.id,
        section_type="projects",
        item_id=proj3.id,
        text="Built a Flask RESTful inventory service with MySQL transactions and row-level locking to prevent race conditions during order allocations.",
        action_verb="Built",
        built_object="Flask RESTful inventory service",
        technologies_used=["Python", "Flask", "MySQL", "REST API"],
        audit_status="VERIFIED",
        audit_reason="Verified by EV-005 GitHub repository and transaction code.",
        order_index=5
    )
    bullet6 = ResumeBullet(
        id=str(uuid.uuid4()),
        resume_version_id=resume_ver.id,
        section_type="projects",
        item_id=proj3.id,
        text="Integrated Redis write-through caching for high-frequency catalog items, reducing average database query latency from 42ms to 25ms.",
        action_verb="Integrated",
        built_object="Redis write-through caching layer",
        technologies_used=["Redis", "Python", "MySQL"],
        metric_claim="latency reduced from 42ms to 25ms (approx 40%)",
        audit_status="USER_CONFIRMED",
        audit_reason="Backed by EV-006 local benchmark log; candidate verified local test execution.",
        order_index=6
    )
    bullet7 = ResumeBullet(
        id=str(uuid.uuid4()),
        resume_version_id=resume_ver.id,
        section_type="experience",
        item_id=exp1.id,
        text="Engineered telemetry ingestion pipelines in Python handling 50k+ logs/sec and tuned PostgreSQL indexes for analytical queries.",
        action_verb="Engineered",
        built_object="telemetry ingestion pipelines",
        technologies_used=["Python", "FastAPI", "PostgreSQL", "Docker"],
        audit_status="VERIFIED",
        audit_reason="Verified by EV-007 CloudScale internship completion document.",
        order_index=7
    )
    db.add_all([bullet1, bullet2, bullet3, bullet4, bullet5, bullet6, bullet7])
    db.flush()

    # Link bullets to evidence
    db.add_all([
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet1.id, evidence_id=evidences[0].id, strength_score=1.0, relevance_reason="Direct repository commit & sniffer logic"),
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet1.id, evidence_id=evidences[1].id, strength_score=0.95, relevance_reason="tcpreplay benchmark supporting throughput metric"),
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet2.id, evidence_id=evidences[0].id, strength_score=0.98, relevance_reason="Flask REST routes implementation in app.py"),
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet3.id, evidence_id=evidences[2].id, strength_score=1.0, relevance_reason="Go source code implementing Raft state machine"),
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet4.id, evidence_id=evidences[3].id, strength_score=0.97, relevance_reason="Docker Compose multi-node cluster definition"),
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet5.id, evidence_id=evidences[4].id, strength_score=0.96, relevance_reason="MySQL transaction management code"),
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet6.id, evidence_id=evidences[5].id, strength_score=0.92, relevance_reason="Redis latency benchmark logs"),
        BulletEvidence(id=str(uuid.uuid4()), resume_bullet_id=bullet7.id, evidence_id=evidences[6].id, strength_score=1.0, relevance_reason="Official CloudScale internship letter")
    ])

    # 14. Skill Gaps for Alex against Backend Developer Intern
    gaps = [
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="Python", match_status="VERIFIED_MATCH", importance="Must Have", reasoning="Extensively demonstrated in 3 projects and internship with 100+ commits."),
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="SQL (PostgreSQL / MySQL)", match_status="VERIFIED_MATCH", importance="Must Have", reasoning="Demonstrated in CloudScale internship and inventory management project with transactions."),
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="REST APIs", match_status="VERIFIED_MATCH", importance="Must Have", reasoning="12+ endpoints designed in Flask and FastAPI across multiple repositories."),
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="Docker", match_status="VERIFIED_MATCH", importance="Must Have", reasoning="Multi-container compose configurations validated in Raft and inventory repositories."),
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="Redis", match_status="VERIFIED_MATCH", importance="Preferred", reasoning="Used for write-through query caching with benchmark validation."),
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="Testing (Pytest)", match_status="VERIFIED_MATCH", importance="Must Have", reasoning="35+ automated test suites with high code coverage."),
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="CI/CD (GitHub Actions)", match_status="MISSING", importance="Preferred", reasoning="No active .github/workflows detected in public repositories."),
        SkillGap(id=str(uuid.uuid4()), profile_id=profile.id, target_role="Backend Developer Intern", skill_name="Kafka / Message Queues", match_status="PARTIAL_MATCH", importance="Optional", reasoning="Used at internship in team context, but no standalone repository project exists.")
    ]
    db.add_all(gaps)

    # 15. Actionable Roadmap Items
    roadmaps = [
        RoadmapItem(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="Add GitHub Actions CI/CD Pipeline to Inventory Project",
            description="Configure automated workflow that runs flake8 linter, pytest suite with coverage checks, and builds Docker image on every pull request.",
            priority=1,
            category="Project Blueprint",
            suggested_stack=["GitHub Actions", "Docker", "Pytest", "Flake8"],
            learning_outcome="Demonstrates automated testing discipline and CI/CD competency required by top cloud engineering teams.",
            evidence_generated=["CI/CD", "GitHub Actions", "Automated Testing"],
            is_completed=False
        ),
        RoadmapItem(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            title="Implement Distributed Rate Limiter with Redis & Lua Scripts",
            description="Build an independent rate limiting middleware (token bucket algorithm) using Redis and Lua script atomicity for the Flask inventory service.",
            priority=2,
            category="Project Blueprint",
            suggested_stack=["Python", "Redis", "Lua", "Pytest"],
            learning_outcome="Demonstrates advanced Redis concurrency handling and production API protection mechanisms.",
            evidence_generated=["Rate Limiting", "Redis Lua Scripts", "System Resilience"],
            is_completed=False
        )
    ]
    db.add_all(roadmaps)

    # 16. Defend My Resume — Interview Questions linked to Bullets
    questions = [
        InterviewQuestion(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            resume_bullet_id=bullet1.id,
            category="Technical",
            question="How did you prevent packet drops when capturing at 10,000 packets/sec using Python?",
            context="Resume Claim: 'Engineered an asynchronous packet sniffer using Python and Scapy capable of capturing 10,000 packets/sec without buffer overflow.'",
            suggested_answer_framework="1. Explain the bottleneck: Python GIL and synchronous socket read buffers.\n2. Detail the architecture: Decoupled raw packet ingestion socket to a dedicated C-level ring buffer (or multiprocessing queue) separate from the decoder thread.\n3. Mention benchmark results from EV-002 verifying zero packet drops under tcpreplay."
        ),
        InterviewQuestion(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            resume_bullet_id=bullet3.id,
            category="System Design",
            question="How does your Raft implementation handle a split-vote scenario during leader election?",
            context="Resume Claim: 'Implemented a fault-tolerant in-memory key-value database in Go with Raft consensus for leader election and log replication.'",
            suggested_answer_framework="1. State the mechanism: Randomized election timeouts (e.g. 150ms-300ms) prevent persistent split votes.\n2. Walk through the candidate state: Increment term, vote for self, broadcast RequestVote RPCs.\n3. If timeout expires without majority, start a new term with newly randomized timer."
        ),
        InterviewQuestion(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            resume_bullet_id=bullet5.id,
            category="Technical",
            question="Why did you choose row-level locks instead of optimistic concurrency for order allocation?",
            context="Resume Claim: 'Built a Flask RESTful inventory service with MySQL transactions and row-level locking to prevent race conditions during order allocations.'",
            suggested_answer_framework="1. Contrast trade-offs: Optimistic locking (version numbers) requires retry loops which degrade under high contention (e.g., flash sales).\n2. Explain pessimistic row-level locking (SELECT ... FOR UPDATE): Guarantees serializability for low-stock items without retry thrashing.\n3. Note keep-alive transaction brevity to minimize database lock hold duration."
        ),
        InterviewQuestion(
            id=str(uuid.uuid4()),
            profile_id=profile.id,
            resume_bullet_id=bullet6.id,
            category="Project",
            question="How did you verify the 40% query latency reduction with Redis caching?",
            context="Resume Claim: 'Integrated Redis write-through caching... reducing average database query latency from 42ms to 25ms.'",
            suggested_answer_framework="1. Describe the benchmarking tool: Used automated test harness simulating 500 concurrent read requests.\n2. Explain cache-aside / write-through strategy and invalidation on stock updates.\n3. State exact metrics recorded in EV-006: Average latency dropped from 42ms to 25ms on hot catalog keys."
        )
    ]
    db.add_all(questions)

    db.commit()
    db.refresh(demo_user)
    return demo_user
