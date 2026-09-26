# CareerCompiler AI — System Architecture & Specification

## 1. System Architecture Diagram

```mermaid
flowchart TB
    subgraph Client["Next.js Frontend (TypeScript + Tailwind)"]
        UI["Landing & Dashboard"]
        ProfileUI["Master Career Profile UI"]
        EvidenceUI["Evidence Engine & Graph"]
        GitHubUI["GitHub Analyzer UI"]
        DocUI["Document Importer UI"]
        JobUI["Job Description & Role Intelligence UI"]
        CompilerUI["Resume Compiler (Split-Screen & Proof View)"]
        AuditUI["Claim Auditor & Parser Test UI"]
        InterviewUI["Defend My Resume (Interview Prep)"]
    end

    subgraph API["FastAPI Backend Services"]
        AuthRouter["/api/v1/auth"]
        ProfileRouter["/api/v1/profile"]
        EvidenceRouter["/api/v1/evidence"]
        GitHubRouter["/api/v1/github"]
        DocRouter["/api/v1/documents"]
        JobRouter["/api/v1/jobs"]
        ResearchRouter["/api/v1/research"]
        CompilerRouter["/api/v1/resumes"]
        AuditRouter["/api/v1/analysis"]
        InterviewRouter["/api/v1/interview"]
        RoadmapRouter["/api/v1/roadmap"]
    end

    subgraph Engine["Core Domain Engines"]
        EvidenceEngine["Career Evidence Engine & Claim Graph"]
        GitHubService["GitHub Repository & Tech Analyzer"]
        DocParser["Document (PDF/DOCX) Extraction Service"]
        JobAnalyzer["Job Description & Keyword Extractor"]
        MarketEngine["Role Intelligence & Market Research Engine"]
        Matcher["Candidate-to-Role Hybrid Matcher"]
        CompilerEngine["Evidence-Backed Resume Compiler"]
        ClaimAuditor["Resume Truth & Claim Auditor"]
        ParserValidator["ATS Reverse Parser Validation Engine"]
        InterviewPrep["Claim-to-Question Generation Engine"]
    end

    subgraph Storage["Persistence & External Services"]
        DB[("PostgreSQL / SQLite Database\n(Normalized Tables + Vector Embeddings)")]
        GitHubAPI["GitHub Public REST API"]
        WebResearch["Public Job Search / Role Intelligence"]
        AIClient["Centralized Structured AI Client\n(Deterministic Fallback + LLM Providers)"]
    end

    Client -->|REST API / JSON| API
    API --> Engine
    Engine --> Storage
```

---

## 2. Evidence Graph Diagram

```mermaid
graph TD
    Candidate["Candidate / Master Profile"] --> Project["Project: Inventory Management System"]
    Candidate --> Achievement["Achievement: Smart India Hackathon Finalist"]
    Candidate --> Education["Education: B.Tech Computer Science"]
    Candidate --> Experience["Internship: Backend Engineering Intern"]

    Project --> Tech1["Technology: Python / Flask"]
    Project --> Tech2["Technology: MySQL"]
    Project --> Tech3["Technology: REST API"]

    Tech1 --> Ev1["Evidence EV-01: GitHub Repo: inventory-management-system"]
    Tech2 --> Ev2["Evidence EV-02: models.py & SQL schema migrations"]
    Tech3 --> Ev3["Evidence EV-03: api_routes.py endpoints"]

    Achievement --> Ev4["Evidence EV-04: Certificate PDF (Page 1)"]
    Experience --> Ev5["Evidence EV-05: Internship Completion Letter"]

    Ev1 --> Status1["Status: VERIFIED (Source code & commits)"]
    Ev2 --> Status2["Status: VERIFIED (Local files)"]
    Ev3 --> Status3["Status: USER_CONFIRMED"]
    Ev4 --> Status4["Status: USER_CONFIRMED (Document page ref)"]
    Ev5 --> Status5["Status: VERIFIED"]

    Bullet["Resume Bullet:\n'Engineered Flask REST API with MySQL schema handling inventory transactions'"]
    Bullet -.->|Traced to| Ev1
    Bullet -.->|Traced to| Ev2
    Bullet -.->|Traced to| Ev3
```

---

## 3. Resume Compilation Pipeline

```mermaid
flowchart TD
    A["1. Master Career Profile & Evidence Graph"] --> B["2. Target Role Selection & Job Description Input"]
    B --> C["3. Role Fingerprint Synthesis (Core/Supporting Skills & Themes)"]
    C --> D["4. Evidence Ranking (Relevance, Strength, Recency, Depth)"]
    D --> E["5. Section & Item Selection (Student vs Experienced Mode)"]
    E --> F["6. Evidence-Backed Bullet Generation (Action + Built + Tech + Verified Result)"]
    F --> G["7. Claim Verification & Audit Check (Flag Unverified Metrics)"]
    G --> H["8. Resume Layout Assembly (ATS Single Column, Modern Tech, Minimal)"]
    H --> I["9. ATS Reverse-Parser Validation (Text Extraction & Field Audit)"]
    I --> J["10. Final Compiled Resume (Ready for PDF/DOCX Export & Proof View)"]
```

---

## 4. RAG & Semantic Retrieval Pipeline

```mermaid
flowchart LR
    JD["Job Description & Target Role"] --> EmbedJD["Generate Query Vector & Extract Keywords"]
    EvidenceDB["Evidence Store & Profile Artifacts"] --> EmbedEv["Evidence Vector Index + Keywords"]

    EmbedJD --> HybridRetrieval["Hybrid Retrieval Engine\n(Keyword BM25 / ILIKE + Cosine Similarity)"]
    EmbedEv --> HybridRetrieval

    HybridRetrieval --> RankedEvidence["Top-K Evidence Items with Relevance Scores"]
    RankedEvidence --> ContextInjector["Context-Constrained Prompt Injector\n(Strict: No Hallucinations Allowed)"]
    ContextInjector --> StructuredOutput["Pydantic Verified Resume Bullets & Proof Mappings"]
```

---

## 5. GitHub Analysis Pipeline

```mermaid
flowchart TD
    Input["Input: GitHub Username or Repository URL"] --> Fetch["GitHub REST API: Fetch Public Repos, Metadata, Languages"]
    Fetch --> ReadmeFetch["Retrieve README.md & Project Structure"]
    ReadmeFetch --> TechDetect["Detect Frameworks, Libraries, Endpoints, Dependencies"]
    TechDetect --> EvidenceExtract["Synthesize Candidate Evidence Candidates"]
    EvidenceExtract --> ReviewUI["User Evidence Review Panel:\n[Approve] [Edit] [Reject]"]
    ReviewUI -->|Approved| MasterProfile["Integrated into Master Career Profile with Evidence EV IDs"]
```

---

## 6. Job-Market Research & Role Intelligence Pipeline

```mermaid
flowchart TD
    RoleInput["Target Role Input (e.g. Backend Developer Intern)"] --> SearchSource["Public Market Queries & Role Intelligence Catalog"]
    SearchSource --> SkillAggregator["Extract Frequency Distribution:\n- Must Have (High Freq)\n- Preferred (Mid Freq)\n- Emerging / Optional"]
    SkillAggregator --> ThemeExtractor["Identify Industry Project Themes & Common Architectures"]
    ThemeExtractor --> Citations["Attach Source URLs, Excerpts, Confidence & Timestamps"]
    Citations --> RoleFingerprint["Role Fingerprint & Candidate Skill Gap Diagnostic"]
```

---

## 7. Database ER Diagram

```mermaid
erDiagram
    USERS ||--o{ PROFILES : owns
    PROFILES ||--o{ EXPERIENCES : contains
    PROFILES ||--o{ EDUCATIONS : contains
    PROFILES ||--o{ PROJECTS : contains
    PROFILES ||--o{ SKILLS : contains
    PROFILES ||--o{ CERTIFICATIONS : contains
    PROFILES ||--o{ DOCUMENTS : uploads
    PROFILES ||--o{ EVIDENCE : owns
    PROFILES ||--o{ RESUME_VERSIONS : creates
    PROFILES ||--o{ ROADMAP_ITEMS : tracks

    PROJECTS ||--o{ EVIDENCE_LINKS : referenced_by
    EXPERIENCES ||--o{ EVIDENCE_LINKS : referenced_by
    CERTIFICATIONS ||--o{ EVIDENCE_LINKS : referenced_by
    DOCUMENTS ||--o{ EVIDENCE : extracts_to

    EVIDENCE ||--o{ EVIDENCE_LINKS : links
    RESUME_VERSIONS ||--o{ RESUME_BULLETS : contains
    RESUME_BULLETS ||--o{ BULLET_EVIDENCE : verified_by
    EVIDENCE ||--o{ BULLET_EVIDENCE : supports

    RESUME_BULLETS ||--o{ INTERVIEW_QUESTIONS : inspires
    JOB_DESCRIPTIONS ||--o{ ROLE_FINGERPRINTS : generates
    ROLE_FINGERPRINTS ||--o{ RESUME_VERSIONS : targets
```

---

## 8. Authentication & Authorization Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Candidate / Guest
    participant Frontend as Next.js Web App
    participant AuthAPI as FastAPI /auth Router
    participant DB as Database (User Store)

    User->>Frontend: Enter Credentials or Click "Demo Mode"
    alt Demo Mode
        Frontend->>AuthAPI: POST /api/v1/auth/demo-login
        AuthAPI->>DB: Fetch/Seed Alex Morgan Candidate Profile
        AuthAPI-->>Frontend: Return Demo JWT Token & Profile Context
    else Standard Login / Signup
        Frontend->>AuthAPI: POST /api/v1/auth/login (email + password)
        AuthAPI->>DB: Validate Bcrypt Hash
        AuthAPI-->>Frontend: Return Secure JWT Bearer Token
    end
    Frontend->>Frontend: Store Token in Session & HTTP Authorization Header
    Frontend->>AuthAPI: Authenticated Request (Bearer Token)
    AuthAPI->>AuthAPI: Verify Signature, Expiry & Role Claims
    AuthAPI-->>Frontend: Authorized JSON Response
```

---

## 9. Export & Validation Flow

```mermaid
flowchart TD
    UserExport["User Requests Resume Export (PDF / DOCX)"] --> AuditCheck["1. Claim Auditor Verification"]
    AuditCheck -->|Has Unverified/Unsupported Claims| Warn["Display Warning Modal:\n'Unverified Claims Found — Proceed or Fix?'"]
    AuditCheck -->|Clean| ParserTest["2. Reverse ATS Document Parser Test"]
    Warn -->|User Confirms / Fixes| ParserTest
    ParserTest --> CheckFields["Validate Name, Contact, Headings, Dates, Skills & Reading Order"]
    CheckFields --> GenerateReport["Attach Parsing Accuracy Diagnostic Report"]
    GenerateReport --> RenderDoc["3. High-Fidelity Machine-Readable PDF / DOCX Generation"]
    RenderDoc --> Download["Serve Downloadable Artifact to User with Proof Audit Stamp"]
```
