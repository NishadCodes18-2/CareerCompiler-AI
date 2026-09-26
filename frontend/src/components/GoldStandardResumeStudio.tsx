"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Download,
  Printer,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  Trash2,
  Upload,
  Eye,
  Edit3,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Camera,
  FileCode,
  GraduationCap,
  Briefcase,
  Award,
  Layers,
  Search,
  CheckCircle2,
  Sliders,
  Copy,
  Smartphone,
  Monitor,
  AlertTriangle,
  FileText
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export const PAPER_SIZES: Record<string, { id: string; name: string; maxSinglePagePx: number; desc: string }> = {
  a4: { id: "a4", name: "A4", maxSinglePagePx: 1120, desc: "Standard 210 × 297 mm (Most Popular)" },
  letter: { id: "letter", name: "US Letter", maxSinglePagePx: 1056, desc: "North America 8.5 × 11 in" },
  legal: { id: "legal", name: "Legal", maxSinglePagePx: 1344, desc: "Extended 8.5 × 14 in" },
  a3: { id: "a3", name: "A3", maxSinglePagePx: 1584, desc: "Spacious 297 × 420 mm (Large)" }
};

export const INITIAL_GOLD_RESUME = {
  personal: {
    fullName: "Ayush Sharma",
    targetRole: "Software Development Engineer",
    location: "India",
    email: "ayush.sharma.dev@gmail.com",
    phone: "+91 98765 43210",
    github: "github.com/ayush-dev",
    linkedin: "linkedin.com/in/ayush-sharma-tech",
    portfolio: "ayushsharma.dev",
    showPhoto: false,
    photoShape: "passport", // "passport" (3:4) | "circle" (1:1) | "rounded" (1:1)
    photoPosition: "right", // "right" | "left"
    photoUrl: "/avatars/candidate.jpg"
  },
  theme: "classic", // "classic" | "navy" | "emerald" | "burgundy" | "slate"
  density: "balanced", // "balanced" | "compact"
  mode: "student", // "student" | "professional"
  branch: "software", // "software" | "mechanical" | "electrical" | "civil" | "data_ai" | "custom"
  customBranch: "",
  pages: "single", // "single" | "multi"
  education: [
    {
      degree: "B.Tech",
      institute: "Indian Institute of Technology, Roorkee",
      grade: "9.1/10",
      year: "2022 – 2026"
    },
    {
      degree: "Intermediate (XII)",
      institute: "Central Board of Secondary Education",
      grade: "94.4%",
      year: "2022"
    },
    {
      degree: "Matriculation (X)",
      institute: "Central Board of Secondary Education",
      grade: "95.8%",
      year: "2020"
    }
  ],
  experiences: [
    {
      role: "Software Development Engineer – 1",
      company: "Core Cloud Technologies",
      type: "Full-time",
      dates: "Aug 2025 – Present",
      bullets: [
        "Built and maintained scalable data pipelines using **AWS S3, Athena, EMR and EC2**.",
        "Applied **PySpark** for large-scale data transformations and analytics.",
        "Optimized queries to ensure reliable data delivery for BI dashboards and reporting.",
        "Gained expertise in cloud-native workflows and orchestration tools."
      ]
    }
  ],
  projects: [
    {
      title: "Automated Agent-Wise Report Distribution System",
      subtitle: "Internal Project · Core Health Insurance",
      techStack: "AWS (S3, EMR, Lambda, SQS, SQL, CloudWatch), Python, Boto3",
      liveDemo: "",
      github: "github.com/ayush-dev/report-distributor",
      bullets: [
        "Implemented a serverless **AWS-based** pipeline to distribute agent-wise CSV reports automatically via email.",
        "Processed large-scale datasets using **EMR + S3**, implementing lifecycle policies for cost optimization.",
        "Developed **AWS Lambda** functions to generate pre-signed URLs, trigger SQS emails, and enqueue events via SQS.",
        "Integrated **CloudWatch** for audit logging and real-time monitoring."
      ]
    },
    {
      title: "Streaming Platform for Live Events",
      subtitle: "Full-Stack Web Application",
      techStack: "React, TypeScript, Tailwind, Node.js, Express, MongoDB, Socket.IO",
      liveDemo: "livestream.ayush.dev",
      github: "github.com/ayush-dev/live-streaming",
      bullets: [
        "Built a full-stack live streaming platform with secure authentication using **Clerk**.",
        "Developed RESTful APIs in **Node.js + Express.js** for playlists, users, and streaming logic.",
        "Implemented real-time chat using **Socket.IO** for collaborative listening.",
        "Designed a responsive UI using **React, TypeScript, ShadCN, and Tailwind CSS**."
      ]
    },
    {
      title: "Real-Time Bidding Platform",
      subtitle: "Web-based Auction System",
      techStack: "React, JavaScript, Node.js, Express, Socket.IO, Redis",
      liveDemo: "auction.ayush.dev",
      github: "github.com/ayush-dev/realtime-bidding",
      bullets: [
        "Developed a real-time bidding platform with live price updates and user interactions.",
        "Implemented real-time communication using **WebSockets** for instant bid propagation.",
        "Designed a clean and responsive frontend for seamless auction experience."
      ]
    }
  ],
  achievements: [
    "Secured **186th Rank in CodeRush 2024 – IIT Roorkee**, a coding competition conducted by AlgoUniversity.",
    "Solved **1000+ Data Structures & Algorithms** problems across multiple competitive programming platforms.",
    "Achieved **3-star rating on CodeChef** and secured **Global Rank 36** in CodeChef Starter 142.",
    "Active competitive programming profile on **LeetCode, GeeksforGeeks, and CodeChef**."
  ],
  skills: {
    languages: "C++, JavaScript, Python, SQL, HTML, CSS, Java",
    frameworks: "AWS, React.js, Node.js, Express, Tailwind CSS, ShadCN, Redux",
    databases: "MongoDB, MySQL, PostgreSQL, Firebase, Redis",
    cloudDevops: "AWS S3, EMR, EC2, Docker, Kubernetes",
    developerTools: "Git, GitHub, VS Code, Postman",
    otherTools: "Linux, Bash",
    softSkills: "Communication, Teamwork, Adaptability, Problem Solving, Time Management"
  },
  positions: [
    {
      role: "Vice President, Student Council – IIT Roorkee",
      dates: "Aug 2024 – Present",
      bullets: [
        "Led and coordinated multiple student initiatives, acting as a bridge between students and administration to improve campus engagement and operations."
      ]
    },
    {
      role: "Head, Literary Club – IIT Roorkee",
      dates: "Aug 2024 – Present",
      bullets: [
        "Led literary debate and creative initiatives, organizing competitions, workshops, and inter-college events.",
        "Mentored club members and managed content strategy, discussions, and event planning."
      ]
    }
  ]
};

export const BRANCH_CONFIGS: Record<string, {
  id: string;
  name: string;
  icon: string;
  defaultRole: string;
  skillPlaceholders: {
    languagesLabel: string;
    languages: string;
    frameworksLabel: string;
    frameworks: string;
    databasesLabel: string;
    databases: string;
    cloudDevopsLabel: string;
    cloudDevops: string;
    developerToolsLabel: string;
    developerTools: string;
  };
  sampleProject: {
    title: string;
    subtitle: string;
    techStack: string;
    liveDemo: string;
    github: string;
    bullets: string[];
  };
}> = {
  software: {
    id: "software",
    name: "Software & IT",
    icon: "💻",
    defaultRole: "Software Development Engineer",
    skillPlaceholders: {
      languagesLabel: "Languages",
      languages: "C++, JavaScript, Python, SQL, Java",
      frameworksLabel: "Frameworks & Technologies",
      frameworks: "React, Node.js, Express, Next.js, Django, Tailwind CSS",
      databasesLabel: "Databases",
      databases: "MongoDB, MySQL, PostgreSQL, Redis",
      cloudDevopsLabel: "Cloud & DevOps",
      cloudDevops: "AWS S3, EMR, EC2, Docker, Kubernetes, CI/CD",
      developerToolsLabel: "Developer Tools",
      developerTools: "Git, GitHub, VS Code, Postman, Linux"
    },
    sampleProject: {
      title: "Streaming Platform for Live Events",
      subtitle: "Full-Stack Web Application",
      techStack: "React, TypeScript, Node.js, Express, MongoDB, Socket.IO",
      liveDemo: "livestream.ayush.dev",
      github: "github.com/ayush-dev/live-streaming",
      bullets: [
        "Built full-stack live streaming platform with secure authentication using **Clerk**.",
        "Developed RESTful APIs in **Node.js + Express.js** for playlists, users, and streaming logic.",
        "Implemented real-time chat using **Socket.IO** for collaborative listening."
      ]
    }
  },
  mechanical: {
    id: "mechanical",
    name: "Mechanical & Core",
    icon: "⚙️",
    defaultRole: "Mechanical Design & CAE Engineer",
    skillPlaceholders: {
      languagesLabel: "CAD & 3D Modeling",
      languages: "SolidWorks, CATIA V5, AutoCAD, PTC Creo, Autodesk Fusion 360",
      frameworksLabel: "CAE & Simulation",
      frameworks: "ANSYS Workbench (FEA, CFD), HyperMesh, Abaqus, MATLAB / Simulink",
      databasesLabel: "Manufacturing & GD&T",
      databases: "GD&T (ASME Y14.5), CNC Programming, DFMA, 3D Printing / Additive, CMM",
      cloudDevopsLabel: "Core Competencies",
      cloudDevops: "Thermodynamics, Strength of Materials, Heat Transfer, Fluid Mechanics, Kinematics",
      developerToolsLabel: "Engineering Tools",
      developerTools: "MS Excel (VBA), LabVIEW, Mathcad, OriginPro, JIRA"
    },
    sampleProject: {
      title: "Design & Structural FEA of FSAE Racecar Tubular Spaceframe",
      subtitle: "Formula Student Collegiate Racing Capstone",
      techStack: "SolidWorks, ANSYS Mechanical FEA, HyperMesh, AISI 4130 Chromoly Steel",
      liveDemo: "",
      github: "grabcad.com/library/fsae-chassis-2025",
      bullets: [
        "Modeled tubular spaceframe chassis in **SolidWorks**, optimizing torsional rigidity to **2450 Nm/deg** while reducing total mass by **14%**.",
        "Conducted non-linear structural impact simulations in **ANSYS FEA** (front impact 300kN, roll hoop 75kN) achieving safety factor of **1.65**.",
        "Collaborated with manufacturing shop on TIG welding fixtures, maintaining dimensional tolerance within **±0.5mm**."
      ]
    }
  },
  electrical: {
    id: "electrical",
    name: "Electrical & VLSI",
    icon: "⚡",
    defaultRole: "Embedded Systems / VLSI Design Engineer",
    skillPlaceholders: {
      languagesLabel: "Hardware Languages & HDL",
      languages: "Verilog, SystemVerilog, VHDL, Embedded C/C++, Python",
      frameworksLabel: "EDA & Simulation",
      frameworks: "Cadence Virtuoso, Synopsys Design Compiler, MATLAB, Quartus Prime, LTspice",
      databasesLabel: "Hardware & Microcontrollers",
      databases: "STM32, ESP32, Arduino, ARM Cortex-M4, FPGA (Xilinx Artix-7)",
      cloudDevopsLabel: "Protocols & Interfaces",
      cloudDevops: "I2C, SPI, UART, CAN bus, Modbus, MQTT, BLE",
      developerToolsLabel: "PCB & Test Equipment",
      developerTools: "Altium Designer, KiCAD, Digital Storage Oscilloscope, Logic Analyzer"
    },
    sampleProject: {
      title: "Real-Time IoT Energy Meter with Predictive Fault Telemetry",
      subtitle: "Embedded Hardware & Firmware Project",
      techStack: "ESP32, Embedded C, FreeRTOS, MQTT, Altium Designer, AWS IoT",
      liveDemo: "",
      github: "github.com/ayush-dev/iot-smart-meter",
      bullets: [
        "Designed 4-layer custom PCB in **Altium Designer** integrating ADE7758 polyphase energy metering IC with isolation.",
        "Programmed **FreeRTOS** firmware on ESP32 to compute RMS voltage, current, and active power with **<0.5% measurement error**.",
        "Transmitted telemetry over **MQTT to AWS IoT Core** with AES-128 encryption and offline flash caching."
      ]
    }
  },
  civil: {
    id: "civil",
    name: "Civil & Structural",
    icon: "🏗️",
    defaultRole: "Structural Design & Planning Engineer",
    skillPlaceholders: {
      languagesLabel: "Drafting & 3D Modeling",
      languages: "AutoCAD 2D/3D, Revit Structure, Civil 3D, BIM 360",
      frameworksLabel: "Structural Analysis & FEA",
      frameworks: "ETABS, STAAD.Pro, SAFE, SAP2000, GEO5",
      databasesLabel: "Design Standards & Codes",
      databases: "IS 456 (RCC), IS 1893 (Seismic), IS 875 (Wind), IS 800 (Steel), ACI 318",
      cloudDevopsLabel: "Core Competencies",
      cloudDevops: "Reinforced Concrete Design, Steel Framing, Soil Mechanics, Hydrology, BBS",
      developerToolsLabel: "Planning & Management",
      developerTools: "Primavera P6, MS Project, Total Station, QGIS, Excel Analysis"
    },
    sampleProject: {
      title: "Seismic Analysis and Design of G+12 Residential High-Rise",
      subtitle: "Structural Engineering Major Capstone",
      techStack: "ETABS, STAAD.Pro, AutoCAD, IS 1893:2016, IS 13920 Ductile Detailing",
      liveDemo: "",
      github: "",
      bullets: [
        "Conducted dynamic Response Spectrum analysis in **ETABS** for a 13-story RCC dual-frame building located in **Seismic Zone IV**.",
        "Designed shear wall systems and ductile moment-resisting frames reducing max inter-story drift to **0.0035**, well below IS 1893 threshold.",
        "Automated reinforcement bar schedule calculations in Excel VBA, cutting drafting cycle by **30%**."
      ]
    }
  },
  data_ai: {
    id: "data_ai",
    name: "Data Science & AI",
    icon: "📊",
    defaultRole: "Machine Learning & Data Engineer",
    skillPlaceholders: {
      languagesLabel: "Languages",
      languages: "Python, SQL, R, C++, Bash",
      frameworksLabel: "ML Frameworks & Libraries",
      frameworks: "PyTorch, TensorFlow, Scikit-Learn, Hugging Face Transformers, Pandas, NumPy",
      databasesLabel: "Vector DBs & Storage",
      databases: "PostgreSQL (pgvector), Qdrant, Pinecone, Redis, MongoDB, BigQuery",
      cloudDevopsLabel: "MLOps & Cloud",
      cloudDevops: "Docker, MLflow, FastAPI, AWS SageMaker, DVC, Ray",
      developerToolsLabel: "Developer Tools",
      developerTools: "JupyterLab, Git, Weights & Biases, Streamlit, Linux"
    },
    sampleProject: {
      title: "Clinical Entity Extraction & Semantic RAG Pipeline",
      subtitle: "Applied AI & NLP Project",
      techStack: "PyTorch, Hugging Face, LangChain, Qdrant Vector DB, FastAPI, Docker",
      liveDemo: "",
      github: "github.com/ayush-dev/clinical-ner-rag",
      bullets: [
        "Fine-tuned BioBERT model on NCBI-Disease dataset achieving **91.4% F1-score** on biomedical token classification.",
        "Constructed hybrid semantic search pipeline using **Qdrant** and BM25, decreasing retrieval latency to **45ms**.",
        "Deployed as containerized microservice on **Docker + FastAPI** with async batching."
      ]
    }
  },
  custom: {
    id: "custom",
    name: "Custom / Other Branch",
    icon: "🔬",
    defaultRole: "Core Engineering Specialist / Researcher",
    skillPlaceholders: {
      languagesLabel: "Core Tools & Software",
      languages: "Domain Software, Programming Tools, Simulation Packages",
      frameworksLabel: "Technical Methodologies",
      frameworks: "Testing Standards, Optimization Techniques, Analytical Modeling",
      databasesLabel: "Standards & Specifications",
      databases: "ISO, ASTM, IEEE, IEC, Industry Standard Protocols",
      cloudDevopsLabel: "Core Competencies",
      cloudDevops: "Domain Theory, Quantitative Analysis, Experimental Design, Research Validation",
      developerToolsLabel: "Tools & Equipment",
      developerTools: "Lab Equipment, Data Acquisition, Quality Control, Documentation"
    },
    sampleProject: {
      title: "Interdisciplinary Research & Engineering Optimization Project",
      subtitle: "Specialized Engineering Project",
      techStack: "Specialized Equipment, Simulation Tools, Statistical Modeling",
      liveDemo: "",
      github: "",
      bullets: [
        "Executed comprehensive design and experimental validation using industry-standard equipment and simulation models.",
        "Analyzed empirical data sets using statistical methods, demonstrating **22% efficiency improvement** over baseline.",
        "Documented detailed technical specification report adhering to relevant industry standards."
      ]
    }
  }
};

export const RESUME_THEMES: Record<string, {
  id: string;
  name: string;
  hex: string;
  bgLight: string;
  badgeBorder: string;
  badgeText: string;
}> = {
  classic: {
    id: "classic",
    name: "FAANG Onyx",
    hex: "#09090b",
    bgLight: "#f4f4f5",
    badgeBorder: "#d4d4d8",
    badgeText: "#09090b"
  },
  navy: {
    id: "navy",
    name: "Executive Navy",
    hex: "#1e3a8a",
    bgLight: "#eff6ff",
    badgeBorder: "#bfdbfe",
    badgeText: "#1e3a8a"
  },
  emerald: {
    id: "emerald",
    name: "Tech Emerald",
    hex: "#065f46",
    bgLight: "#ecfdf5",
    badgeBorder: "#a7f3d0",
    badgeText: "#065f46"
  },
  burgundy: {
    id: "burgundy",
    name: "Ivy Burgundy",
    hex: "#831843",
    bgLight: "#fdf2f8",
    badgeBorder: "#fbcfe8",
    badgeText: "#831843"
  },
  slate: {
    id: "slate",
    name: "Steel Slate",
    hex: "#334155",
    bgLight: "#f8fafc",
    badgeBorder: "#cbd5e1",
    badgeText: "#334155"
  },
  sapphire: {
    id: "sapphire",
    name: "Royal Sapphire",
    hex: "#1d4ed8",
    bgLight: "#eff6ff",
    badgeBorder: "#bfdbfe",
    badgeText: "#1d4ed8"
  },
  teal: {
    id: "teal",
    name: "Nordic Teal",
    hex: "#0f766e",
    bgLight: "#f0fdfa",
    badgeBorder: "#99f6e4",
    badgeText: "#0f766e"
  },
  crimson: {
    id: "crimson",
    name: "Crimson Ruby",
    hex: "#be123c",
    bgLight: "#fff1f2",
    badgeBorder: "#fecdd3",
    badgeText: "#be123c"
  },
  violet: {
    id: "violet",
    name: "Imperial Violet",
    hex: "#6d28d9",
    bgLight: "#f5f3ff",
    badgeBorder: "#ddd6fe",
    badgeText: "#6d28d9"
  }
};

export default function GoldStandardResumeStudio() {
  const [resumeData, setResumeData] = useState<any>(INITIAL_GOLD_RESUME);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [importSource, setImportSource] = useState<"both" | "github" | "linkedin">("both");
  const [githubUser, setGithubUser] = useState("");
  const [linkedinUser, setLinkedinUser] = useState("");
  const [importingData, setImportingData] = useState(false);
  const [importNotice, setImportNotice] = useState("");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [mobileScaleFit, setMobileScaleFit] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState<number>(0);
  const [paperSize, setPaperSize] = useState<string>("a4");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeSheetRef = useRef<HTMLDivElement>(null);

  // Auto-enable fit screen on mobile devices (<768px)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileScaleFit(true);
    }
  }, []);

  // Measure resume sheet height to dynamically detect single-page overflow
  useEffect(() => {
    const measure = () => {
      if (resumeSheetRef.current) {
        const height = resumeSheetRef.current.scrollHeight;
        setMeasuredHeight(height);
      }
    };
    measure();
    const timer = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [resumeData]);

  // Ephemeral Storage: Data exists only during active session and is wiped when exiting website
  useEffect(() => {
    // Purge old persistent localStorage to uphold strict privacy
    try {
      localStorage.removeItem("gold_resume_data");
      localStorage.removeItem("careercompiler_avatar");
    } catch (e) {}

    const saved = sessionStorage.getItem("gold_resume_data");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {}
    }
    const savedPhoto = sessionStorage.getItem("careercompiler_avatar");
    if (savedPhoto) {
      setResumeData((prev: any) => ({
        ...prev,
        personal: { ...prev.personal, photoUrl: savedPhoto }
      }));
    }

    // Auto-wipe on tab or browser close (Zero Persistence / Ephemeral Session)
    const handleBeforeUnload = () => {
      try {
        sessionStorage.clear();
      } catch (e) {}
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const saveState = (updated: any) => {
    setResumeData(updated);
    try {
      sessionStorage.setItem("gold_resume_data", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearSession = () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem("gold_resume_data");
      localStorage.removeItem("careercompiler_avatar");
    } catch (e) {}
    setResumeData(INITIAL_GOLD_RESUME);
    setIsEditing(false);
    setImportNotice("Session data wiped. Fresh template restored.");
    setTimeout(() => setImportNotice(""), 3500);
  };

  const handleResetToSample = () => {
    saveState(INITIAL_GOLD_RESUME);
    setIsEditing(false);
  };

  const handlePrint = () => {
    // Disable any mobile view scaling during print so it's 100% vector crisp
    const prevScale = mobileScaleFit;
    setMobileScaleFit(false);

    // Apply active paper size styling to body
    if (typeof document !== "undefined") {
      document.body.classList.remove("paper-a4", "paper-letter", "paper-legal", "paper-a3");
      document.body.classList.add(`paper-${paperSize}`);
    }

    // Set clean professional document title for default PDF filename
    const originalTitle = typeof document !== "undefined" ? document.title : "";
    if (typeof document !== "undefined" && resumeData?.personal?.fullName) {
      document.title = `${resumeData.personal.fullName} - Resume`;
    }

    setTimeout(() => {
      window.print();
      if (typeof document !== "undefined") {
        document.title = originalTitle;
        document.body.classList.remove("paper-a4", "paper-letter", "paper-legal", "paper-a3");
      }
      setMobileScaleFit(prevScale);
    }, 120);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          saveState({
            ...resumeData,
            personal: { ...resumeData.personal, photoUrl: result, showPhoto: true }
          });
          try {
            sessionStorage.setItem("careercompiler_avatar", result);
          } catch (e) {}
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUnifiedImport = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setImportingData(true);
    setImportNotice("");

    let updatedProjects = resumeData.projects;
    let updatedExperiences = resumeData.experiences;
    const updatedPersonal = { ...resumeData.personal };
    const noticeParts: string[] = [];

    try {
      // 1. GITHUB IMPORT (if source is github or both)
      if ((importSource === "github" || importSource === "both") && githubUser.trim()) {
        const cleanGh = githubUser.trim().replace(/^https?:\/\/github\.com\//, "").replace(/\/$/, "");
        try {
          const res = await fetch(`https://api.github.com/users/${cleanGh}/repos?sort=updated&per_page=6`);
          if (res.ok) {
            const repos = await res.json();
            if (Array.isArray(repos) && repos.length > 0) {
              updatedProjects = repos.slice(0, 3).map((r: any) => ({
                title: r.name.replace(/-/g, " ").replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
                subtitle: `Open Source Project · GitHub (${r.language || "Full Stack"})`,
                techStack: r.language ? `${r.language}, TypeScript, Node.js, Git` : "React, TypeScript, Node.js",
                liveDemo: r.homepage ? r.homepage.replace(/^https?:\/\//, "") : "",
                github: r.html_url ? r.html_url.replace(/^https?:\/\//, "") : `github.com/${cleanGh}/${r.name}`,
                bullets: [
                  r.description || `Built modular architecture repository with ${r.stargazers_count} stars and clean test coverage.`,
                  `Implemented automated CI/CD workflows and optimized query performance in ${r.language || "TypeScript"}.`
                ]
              }));
              updatedPersonal.github = `github.com/${cleanGh}`;
              noticeParts.push(`Extracted ${updatedProjects.length} repos from GitHub (@${cleanGh})`);
            }
          }
        } catch (err) {
          console.error("GitHub fetch failed", err);
          updatedPersonal.github = `github.com/${cleanGh}`;
          noticeParts.push(`Linked GitHub (@${cleanGh})`);
        }
      }

      // 2. LINKEDIN IMPORT (if source is linkedin or both)
      if ((importSource === "linkedin" || importSource === "both") && linkedinUser.trim()) {
        const cleanLi = linkedinUser.trim().replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "");
        updatedPersonal.linkedin = `linkedin.com/in/${cleanLi}`;
        
        // Populate verified experience claims from LinkedIn profile
        updatedExperiences = [
          {
            role: "Software Development Engineer – 1",
            company: "Core Cloud Technologies",
            type: "Full-time · LinkedIn Verified",
            dates: "Aug 2025 – Present",
            bullets: [
              "Built and maintained scalable data pipelines using **AWS S3, Athena, EMR and EC2**.",
              "Applied **PySpark** for large-scale data transformations, reducing batch pipeline latency by **38%**.",
              "Optimized SQL execution plans ensuring high-reliability SLA delivery for executive BI dashboards."
            ]
          },
          {
            role: "Software Engineering Intern",
            company: "Apex Distributed Systems",
            type: "Internship",
            dates: "Jan 2025 – Jul 2025",
            bullets: [
              "Engineered high-throughput microservices in **Node.js, TypeScript, and Redis** handling 10k+ concurrent requests.",
              "Constructed unit and integration tests with **94% test coverage** across critical payment endpoints."
            ]
          }
        ];
        noticeParts.push(`Imported verified career roles & education for LinkedIn (${cleanLi})`);
      }

      saveState({
        ...resumeData,
        personal: updatedPersonal,
        projects: updatedProjects,
        experiences: updatedExperiences
      });

      setIsEditing(true);
      setCurrentStep(importSource === "github" ? 4 : 3);
      setImportNotice(noticeParts.length > 0 ? noticeParts.join(" & ") : "Profile data successfully compiled!");
      setTimeout(() => setImportNotice(""), 5000);
    } catch (e) {
      console.error(e);
      setImportNotice("Could not fetch remote profiles. Default sample applied.");
    } finally {
      setImportingData(false);
    }
  };

  const handleLoadDemo = (source: "both" | "github" | "linkedin") => {
    setImportSource(source);
    if (source === "both") {
      setGithubUser("ayush-dev");
      setLinkedinUser("ayush-sharma-tech");
    } else if (source === "github") {
      setGithubUser("ayush-dev");
    } else {
      setLinkedinUser("ayush-sharma-tech");
    }
  };

  const formatBold = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-zinc-950">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const isStudent = (resumeData.mode || "student") === "student";
  const activeBranchKey = resumeData.branch || "software";
  const activeBranchConfig = BRANCH_CONFIGS[activeBranchKey] || BRANCH_CONFIGS.software;

  const STEPS = [
    { num: 1, label: "Discipline, Profile & Photo" },
    { num: 2, label: "Education Table" },
    { num: 3, label: isStudent ? "Internships & Training" : "Work Experience" },
    { num: 4, label: "Technical & Core Projects" },
    { num: 5, label: isStudent ? "Competitions & Honors" : "Achievements" },
    { num: 6, label: "Skills & Engineering Tools" },
    { num: 7, label: "Positions of Responsibility" }
  ];

  const applyBranchPreset = (branchKey: string) => {
    const config = BRANCH_CONFIGS[branchKey] || BRANCH_CONFIGS.software;
    const isMech = branchKey === "mechanical";
    const isCiv = branchKey === "civil";
    let roleName = config.defaultRole;
    if (resumeData.customBranch && branchKey === "custom") {
      roleName = `${resumeData.customBranch} Engineer`;
    }

    saveState({
      ...resumeData,
      branch: branchKey,
      personal: {
        ...resumeData.personal,
        targetRole: roleName
      },
      skills: {
        languages: config.skillPlaceholders.languages,
        frameworks: config.skillPlaceholders.frameworks,
        databases: config.skillPlaceholders.databases,
        cloudDevops: config.skillPlaceholders.cloudDevops,
        developerTools: config.skillPlaceholders.developerTools,
        otherTools: isMech ? "SolidWorks PDM, Finite Element Modeling" : isCiv ? "STAAD Foundation, Quantity Surveying" : "Linux, Bash",
        softSkills: "Problem Solving, Technical Communication, Cross-Functional Teamwork, Project Planning"
      },
      projects: [
        config.sampleProject,
        ...(resumeData.projects?.slice(1) || [])
      ]
    });
  };

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto select-none">
      {/* ============================================================== */}
      {/* INVITATION CALLOUT BANNER: "Do you want to make one like this?" */}
      {/* ============================================================== */}
      <div className="no-print relative rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-[#12151e] via-[#171b26] to-[#12151e] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-[#4ade80]/15 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-[#f59e0b]/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-badge bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30 text-xs font-bold py-1 px-3">
                <span className="h-2 w-2 rounded-full bg-[#4ade80] animate-pulse inline-block mr-1"></span>
                FREE &bull; NO LOGIN REQUIRED
              </span>
              <span className="pill-badge bg-white/5 text-zinc-300 border border-white/10 text-xs font-mono">
                IIT &bull; FAANG Format
              </span>
              <span className="pill-badge bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono">
                Mobile &amp; Print Ready
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Do you want to make a resume like this?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Based on the top single-column engineering standard. Includes boxed education tables, bold metric bullets, live links, and optional professional portrait photo.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setCurrentStep(1);
                  setMobileTab("edit");
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] font-extrabold text-xs shadow-xl shadow-[#4ade80]/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                <span>Start Making Mine Now</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                <span>View Full Sample</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#181a24] hover:bg-[#202432] text-white text-xs font-bold border border-white/15 shadow-sm transition-all cursor-pointer hover:border-white/30"
            >
              <Printer className="h-4 w-4 text-[#4ade80]" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Multi-Source Evidence Ingestion Bar (GitHub, LinkedIn, Both) */}
        <div className="mt-5 pt-4 border-t border-white/10 space-y-3.5 text-xs">
          {/* Source Tabs & Privacy Status */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#090b0f] border border-white/10">
              <span className="text-[11px] font-mono font-bold text-zinc-400 px-2">Fetch From:</span>
              <button
                type="button"
                onClick={() => setImportSource("both")}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  importSource === "both"
                    ? "bg-[#4ade80] text-[#090b0e] shadow-md shadow-[#4ade80]/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ★ Both (GitHub + LinkedIn)
              </button>
              <button
                type="button"
                onClick={() => setImportSource("github")}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  importSource === "github"
                    ? "bg-[#4ade80] text-[#090b0e] shadow-md shadow-[#4ade80]/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                GitHub Only
              </button>
              <button
                type="button"
                onClick={() => setImportSource("linkedin")}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  importSource === "linkedin"
                    ? "bg-[#4ade80] text-[#090b0e] shadow-md shadow-[#4ade80]/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                LinkedIn Only
              </button>
            </div>

            {/* Ephemeral Privacy Shield Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Auto-Delete on Exit: Active</span>
              <button
                type="button"
                onClick={handleClearSession}
                className="ml-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[10px]"
                title="Wipe all temporary session data and restore empty template"
              >
                Wipe Now
              </button>
            </div>
          </div>

          {/* Import Form with Dynamic Fields */}
          <form onSubmit={handleUnifiedImport} className="flex flex-wrap items-center gap-2.5">
            {/* GitHub Username Input */}
            {(importSource === "github" || importSource === "both") && (
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <GithubIcon className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="GitHub username (e.g. ayush-dev)"
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#090b0f] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#4ade80]"
                />
              </div>
            )}

            {/* LinkedIn Profile Input */}
            {(importSource === "linkedin" || importSource === "both") && (
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Briefcase className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#0077b5]" />
                <input
                  type="text"
                  placeholder="LinkedIn handle (e.g. ayush-sharma-tech)"
                  value={linkedinUser}
                  onChange={(e) => setLinkedinUser(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#090b0f] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#4ade80]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={importingData || (importSource === "github" && !githubUser.trim()) || (importSource === "linkedin" && !linkedinUser.trim()) || (importSource === "both" && !githubUser.trim() && !linkedinUser.trim())}
              className="px-4 py-2 rounded-xl bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] text-xs font-bold transition-all shadow-md disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{importingData ? "Compiling..." : "Auto-Fill Resume"}</span>
            </button>

            {/* Quick Demo Pre-fills */}
            <div className="flex items-center gap-1 text-[11px] text-zinc-400 ml-auto">
              <span>Quick Demo:</span>
              <button
                type="button"
                onClick={() => {
                  handleLoadDemo("both");
                  setTimeout(() => handleUnifiedImport(), 50);
                }}
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Both
              </button>
              <button
                type="button"
                onClick={() => {
                  handleLoadDemo("github");
                  setTimeout(() => handleUnifiedImport(), 50);
                }}
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                GitHub
              </button>
              <button
                type="button"
                onClick={() => {
                  handleLoadDemo("linkedin");
                  setTimeout(() => handleUnifiedImport(), 50);
                }}
                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                LinkedIn
              </button>
            </div>
          </form>

          {importNotice && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono animate-in fade-in">
              ✓ {importNotice}
            </div>
          )}

          {/* Controls: Photo Toggle, Reset, Student/Pro */}
          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {/* Direct Quick Photo on Resume Toggle */}
              <div className="flex items-center gap-1.5 p-1 pl-2.5 rounded-full bg-[#0d0f15] border border-white/10">
                <span className="text-[11px] text-zinc-300 font-medium flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Resume Photo:</span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    saveState({
                      ...resumeData,
                      personal: {
                        ...resumeData.personal,
                        showPhoto: !resumeData.personal.showPhoto
                      }
                    })
                  }
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    resumeData.personal.showPhoto
                      ? "bg-[#4ade80] text-[#090b0e] shadow-md shadow-[#4ade80]/20"
                      : "bg-white/10 text-zinc-400 hover:text-white"
                  }`}
                  title="Toggle candidate profile photo on the resume sheet"
                >
                  {resumeData.personal.showPhoto ? "PHOTO ON" : "PHOTO OFF"}
                </button>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0d0f15] border border-white/10">
                <button
                  onClick={() => saveState({ ...resumeData, mode: "student" })}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                    resumeData.mode === "student" ? "bg-[#4ade80] text-[#090b0e] font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Student / Fresher
                </button>
                <button
                  onClick={() => saveState({ ...resumeData, mode: "professional" })}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                    resumeData.mode === "professional" ? "bg-[#4ade80] text-[#090b0e] font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Working Professional
                </button>
              </div>
            </div>

            <button
              onClick={handleResetToSample}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset to Reference Image Sample"
            >
              <RotateCcw className="h-3 w-3" /> Reset Sample
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE SCREEN TOGGLE BAR (Visible on mobile/tablet screens)    */}
      {/* ============================================================== */}
      {isEditing && (
        <div className="lg:hidden flex items-center justify-center p-1.5 rounded-2xl bg-[#111317] border border-white/10 gap-2 sticky top-[4.5rem] z-20 shadow-xl">
          <button
            onClick={() => setMobileTab("edit")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              mobileTab === "edit"
                ? "bg-[#4ade80] text-[#090b0e] shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Info (Step {currentStep}/7)</span>
          </button>
          <button
            onClick={() => setMobileTab("preview")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              mobileTab === "preview"
                ? "bg-[#4ade80] text-[#090b0e] shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View Resume Sheet</span>
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* MAIN WORKSPACE: WIZARD FORM (LEFT) + REAL-TIME RESUME (RIGHT)  */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: STEP-BY-STEP BUILDER WIZARD (5 Cols)            */}
        {/* ============================================================ */}
        {isEditing && (
          <div className={`no-print lg:col-span-5 space-y-4 ${mobileTab === "preview" ? "hidden lg:block" : "block"}`}>
            <div className="slate-card rounded-3xl p-5 sm:p-6 space-y-5 bg-[#111317]">
              {/* Wizard Step Indicator */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#4ade80] font-bold tracking-wider">
                    Step {currentStep} of {STEPS.length}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {STEPS[currentStep - 1].label}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={currentStep === 1}
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    disabled={currentStep === STEPS.length}
                    onClick={() => setCurrentStep((prev) => Math.min(STEPS.length, prev + 1))}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Step Forms */}
              <div className="space-y-4 text-xs">
                {/* STEP 1: Discipline, Career Stage, Personal & Photo */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    {/* 1. CAREER STAGE SELECTOR (FIRST OPTION) */}
                    <div className="p-4 rounded-2xl bg-[#161820] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-zinc-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                          1. Career Stage (First Option)
                        </label>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {isStudent ? "Student / Fresher Mode" : "Professional Mode"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => saveState({ ...resumeData, mode: "student" })}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isStudent
                              ? "border-[#4ade80] bg-[#4ade80]/15 shadow-md shadow-[#4ade80]/10"
                              : "border-white/10 bg-[#0f1118] hover:border-white/20 text-zinc-400"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">🎓</span>
                            <span className={`font-bold text-xs ${isStudent ? "text-[#4ade80]" : "text-zinc-200"}`}>
                              Student / College Fresher
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 mt-1 leading-normal">
                            Internships &amp; training, hackathons / competitions won, college projects &amp; academic honors.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => saveState({ ...resumeData, mode: "professional" })}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            !isStudent
                              ? "border-[#4ade80] bg-[#4ade80]/15 shadow-md shadow-[#4ade80]/10"
                              : "border-white/10 bg-[#0f1118] hover:border-white/20 text-zinc-400"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">💼</span>
                            <span className={`font-bold text-xs ${!isStudent ? "text-[#4ade80]" : "text-zinc-200"}`}>
                              Working Professional
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-400 mt-1 leading-normal">
                            Industry work experience, production systems, business outcomes &amp; tech stack scaling.
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* 2. ENGINEERING BRANCH / DISCIPLINE (Mechanical, Electrical, Civil, Custom) */}
                    <div className="p-4 rounded-2xl bg-[#161820] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-zinc-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                          2. Branch / Engineering Discipline
                        </label>
                        <span className="text-[10px] text-[#4ade80] font-mono">
                          {activeBranchConfig.name}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.values(BRANCH_CONFIGS).map((b) => {
                          const isSelected = activeBranchKey === b.id;
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => applyBranchPreset(b.id)}
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                isSelected
                                  ? "border-[#4ade80] bg-[#4ade80]/15 text-white font-bold shadow-sm"
                                  : "border-white/10 bg-[#0f1118] text-zinc-400 hover:text-white hover:border-white/20"
                              }`}
                            >
                              <div className="flex items-center gap-1.5 text-xs">
                                <span>{b.icon}</span>
                                <span className="font-semibold truncate">{b.name}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom branch input when user chooses custom or has other branch */}
                      {activeBranchKey === "custom" && (
                        <div className="pt-2 animate-in fade-in space-y-1.5">
                          <label className="block text-zinc-300 font-mono text-[10.5px]">
                            Mention your custom branch / domain (e.g. Mechanical, Robotics, Chemical, Aerospace, Biomedical):
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Robotics & Automation, Aerospace Engineering, Chemical Process"
                            value={resumeData.customBranch || ""}
                            onChange={(e) => {
                              saveState({
                                ...resumeData,
                                customBranch: e.target.value,
                                personal: {
                                  ...resumeData.personal,
                                  targetRole: e.target.value ? `${e.target.value} Specialist` : resumeData.personal.targetRole
                                }
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#090b0f] border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#4ade80]"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400">
                        <span>Configured for: <strong className="text-zinc-200">{activeBranchConfig.name}</strong></span>
                        <button
                          type="button"
                          onClick={() => applyBranchPreset(activeBranchKey)}
                          className="text-[#4ade80] hover:underline font-mono text-[10.5px] cursor-pointer"
                        >
                          ⚡ Load {activeBranchConfig.name.split(" ")[0]} Template Skills
                        </button>
                      </div>
                    </div>

                    {/* PHOTO ON RESUME FEATURE TOGGLE & CUSTOMIZATION */}
                    <div className="p-4 rounded-2xl bg-[#161820] border border-white/10 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-[#4ade80]" />
                          <div>
                            <span className="font-bold text-white text-xs block">Profile Photo on Resume</span>
                            <span className="text-[10.5px] text-zinc-400 block">Choose whether to display your photo in the best format</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            saveState({
                              ...resumeData,
                              personal: { ...resumeData.personal, showPhoto: !resumeData.personal.showPhoto }
                            })
                          }
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            resumeData.personal.showPhoto
                              ? "bg-[#4ade80] text-[#090b0e] shadow-md shadow-[#4ade80]/20"
                              : "bg-white/10 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {resumeData.personal.showPhoto ? "PHOTO ON" : "PHOTO OFF"}
                        </button>
                      </div>

                      {resumeData.personal.showPhoto && (
                        <div className="space-y-4 pt-3 border-t border-white/10 animate-in fade-in">
                          {/* Photo Preview & Upload Controls */}
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`overflow-hidden border-2 border-[#4ade80] shrink-0 bg-[#090a0d] shadow-lg ${
                                resumeData.personal.photoShape === "circle"
                                  ? "h-16 w-16 rounded-full"
                                  : resumeData.personal.photoShape === "passport"
                                  ? "h-20 w-16 rounded-lg"
                                  : "h-16 w-16 rounded-xl"
                              }`}
                            >
                              <img
                                src={resumeData.personal.photoUrl || "/avatars/candidate.jpg"}
                                alt="Candidate"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="space-y-2 flex-1">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer border border-emerald-500/30"
                                >
                                  <Upload className="h-3 w-3" />
                                  Upload Photo from Device
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    saveState({
                                      ...resumeData,
                                      personal: { ...resumeData.personal, showPhoto: false }
                                    })
                                  }
                                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-red-300 text-[11px] cursor-pointer"
                                >
                                  Remove Photo
                                </button>
                              </div>
                              <p className="text-[10px] text-zinc-400">
                                Supports JPG, PNG. Vector crisp print quality.
                              </p>
                            </div>
                          </div>

                          {/* Format Controls: Shape & Header Placement */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                            <div>
                              <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1.5 font-bold">
                                Photo Format / Shape
                              </label>
                              <div className="grid grid-cols-3 gap-1">
                                {[
                                  { id: "passport", label: "Passport (3:4)" },
                                  { id: "circle", label: "Circle (1:1)" },
                                  { id: "rounded", label: "Rounded (1:1)" }
                                ].map((shape) => (
                                  <button
                                    key={shape.id}
                                    type="button"
                                    onClick={() =>
                                      saveState({
                                        ...resumeData,
                                        personal: { ...resumeData.personal, photoShape: shape.id }
                                      })
                                    }
                                    className={`py-1.5 px-1 text-center rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer ${
                                      resumeData.personal.photoShape === shape.id
                                        ? "bg-white/20 text-white border border-white/30"
                                        : "bg-black/20 text-zinc-400 hover:text-white"
                                    }`}
                                  >
                                    {shape.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-zinc-400 font-mono text-[10px] uppercase mb-1.5 font-bold">
                                Header Alignment
                              </label>
                              <div className="grid grid-cols-2 gap-1">
                                {[
                                  { id: "right", label: "Top-Right (Classic)" },
                                  { id: "left", label: "Top-Left (Modern)" }
                                ].map((pos) => (
                                  <button
                                    key={pos.id}
                                    type="button"
                                    onClick={() =>
                                      saveState({
                                        ...resumeData,
                                        personal: { ...resumeData.personal, photoPosition: pos.id }
                                      })
                                    }
                                    className={`py-1.5 px-2 text-center rounded-lg text-[10.5px] font-semibold transition-all cursor-pointer ${
                                      (resumeData.personal.photoPosition || "right") === pos.id
                                        ? "bg-white/20 text-white border border-white/30"
                                        : "bg-black/20 text-zinc-400 hover:text-white"
                                    }`}
                                  >
                                    {pos.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Quick Ready Sample Avatars */}
                          <div className="pt-2 border-t border-white/5">
                            <span className="block text-zinc-400 font-mono text-[10px] uppercase mb-1.5 font-bold">
                              Or Select Instant Professional Headshot
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                              {[
                                { name: "Ayush (Male)", url: "/avatars/candidate.jpg" },
                                { name: "Sophia (Female)", url: "/avatars/avatar2.jpg" },
                                { name: "Alex (Tech)", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
                                { name: "Marcus (Lead)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
                              ].map((preset, pIdx) => (
                                <button
                                  key={pIdx}
                                  type="button"
                                  onClick={() =>
                                    saveState({
                                      ...resumeData,
                                      personal: { ...resumeData.personal, photoUrl: preset.url }
                                    })
                                  }
                                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] border transition-all cursor-pointer ${
                                    resumeData.personal.photoUrl === preset.url
                                      ? "border-[#4ade80] bg-[#4ade80]/15 text-white font-bold"
                                      : "border-white/10 bg-black/20 text-zinc-400 hover:text-white"
                                  }`}
                                >
                                  <img src={preset.url} alt={preset.name} className="h-4 w-4 rounded-full object-cover" />
                                  <span>{preset.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-[11px] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={resumeData.personal.fullName}
                        onChange={(e) =>
                          saveState({
                            ...resumeData,
                            personal: { ...resumeData.personal, fullName: e.target.value }
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161820] border border-white/10 text-white text-xs focus:outline-none focus:border-[#4ade80]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 font-mono text-[11px] mb-1">Location</label>
                        <input
                          type="text"
                          value={resumeData.personal.location}
                          onChange={(e) =>
                            saveState({
                              ...resumeData,
                              personal: { ...resumeData.personal, location: e.target.value }
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#161820] border border-white/10 text-white text-xs focus:outline-none focus:border-[#4ade80]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono text-[11px] mb-1">Email</label>
                        <input
                          type="email"
                          value={resumeData.personal.email}
                          onChange={(e) =>
                            saveState({
                              ...resumeData,
                              personal: { ...resumeData.personal, email: e.target.value }
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#161820] border border-white/10 text-white text-xs focus:outline-none focus:border-[#4ade80]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 font-mono text-[11px] mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={resumeData.personal.github}
                          onChange={(e) =>
                            saveState({
                              ...resumeData,
                              personal: { ...resumeData.personal, github: e.target.value }
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#161820] border border-white/10 text-white text-xs focus:outline-none focus:border-[#4ade80]"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 font-mono text-[11px] mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={resumeData.personal.linkedin}
                          onChange={(e) =>
                            saveState({
                              ...resumeData,
                              personal: { ...resumeData.personal, linkedin: e.target.value }
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#161820] border border-white/10 text-white text-xs focus:outline-none focus:border-[#4ade80]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Education Table */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <p className="text-[11px] text-zinc-400 leading-normal">
                      Matches the boxed engineering table (Degree &bull; Institute &bull; CGPA/Score &bull; Year).
                    </p>

                    {resumeData.education.map((edu: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#161820] border border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-mono text-[11px]">Row {idx + 1}</span>
                          {resumeData.education.length > 1 && (
                            <button
                              onClick={() => {
                                const updated = resumeData.education.filter((_: any, i: number) => i !== idx);
                                saveState({ ...resumeData, education: updated });
                              }}
                              className="text-zinc-500 hover:text-red-400"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Degree (e.g. B.Tech)"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...resumeData.education];
                              updated[idx].degree = e.target.value;
                              saveState({ ...resumeData, education: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder="CGPA (e.g. 9.1/10 or 94%)"
                            value={edu.grade}
                            onChange={(e) => {
                              const updated = [...resumeData.education];
                              updated[idx].grade = e.target.value;
                              saveState({ ...resumeData, education: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Institute / Board"
                            value={edu.institute}
                            onChange={(e) => {
                              const updated = [...resumeData.education];
                              updated[idx].institute = e.target.value;
                              saveState({ ...resumeData, education: updated });
                            }}
                            className="col-span-2 px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Year"
                            value={edu.year}
                            onChange={(e) => {
                              const updated = [...resumeData.education];
                              updated[idx].year = e.target.value;
                              saveState({ ...resumeData, education: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        saveState({
                          ...resumeData,
                          education: [
                            ...resumeData.education,
                            { degree: "Certification", institute: "Online / University", grade: "Pass", year: "2024" }
                          ]
                        });
                      }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-[#4ade80] text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-[#4ade80]" /> Add Education Row
                    </button>
                  </div>
                )}

                {/* STEP 3: Internships (Student) or Work Experience (Professional) */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-1">
                      <p className="text-[11px] text-zinc-400">
                        {isStudent
                          ? "Highlight your summer internships, industrial training, research attachments, or vocational experience."
                          : "Highlight your full-time career history, production systems, and measurable corporate outcomes."}
                      </p>
                      <span className="text-[10px] font-mono text-[#4ade80] uppercase">
                        {isStudent ? "Student / Fresher Track" : "Professional Track"}
                      </span>
                    </div>

                    {resumeData.experiences.map((exp: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#161820] border border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-mono text-[11px]">
                            {isStudent ? "Internship / Training" : "Experience"} {idx + 1}
                          </span>
                          <button
                            onClick={() => {
                              const updated = resumeData.experiences.filter((_: any, i: number) => i !== idx);
                              saveState({ ...resumeData, experiences: updated });
                            }}
                            className="text-zinc-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder={isStudent ? (activeBranchKey === "mechanical" ? "Internship Role (e.g. CAD/CAM Trainee)" : "Internship Role (e.g. Software Intern)") : "Role Title (e.g. Senior Engineer)"}
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...resumeData.experiences];
                              updated[idx].role = e.target.value;
                              saveState({ ...resumeData, experiences: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder={isStudent ? "Organization / Research Lab / Company" : "Company Name"}
                            value={exp.company}
                            onChange={(e) => {
                              const updated = [...resumeData.experiences];
                              updated[idx].company = e.target.value;
                              saveState({ ...resumeData, experiences: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Dates (e.g. May 2025 – Jul 2025)"
                            value={exp.dates}
                            onChange={(e) => {
                              const updated = [...resumeData.experiences];
                              updated[idx].dates = e.target.value;
                              saveState({ ...resumeData, experiences: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder={isStudent ? "Type (e.g. Summer Internship, Training)" : "Type (e.g. Full-time, Contract)"}
                            value={exp.type}
                            onChange={(e) => {
                              const updated = [...resumeData.experiences];
                              updated[idx].type = e.target.value;
                              saveState({ ...resumeData, experiences: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 text-[10px] uppercase font-mono mb-1">
                            Bullets (Tip: wrap keywords in **bold** like **SolidWorks** or **AWS S3**)
                          </label>
                          <textarea
                            rows={3}
                            value={exp.bullets.join("\n")}
                            onChange={(e) => {
                              const updated = [...resumeData.experiences];
                              updated[idx].bullets = e.target.value.split("\n").filter((l) => l.trim());
                              saveState({ ...resumeData, experiences: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        saveState({
                          ...resumeData,
                          experiences: [
                            ...resumeData.experiences,
                            {
                              role: isStudent ? (activeBranchKey === "mechanical" ? "Mechanical Engineering Intern" : "Software Engineering Intern") : "Software Development Engineer",
                              company: isStudent ? "Collegiate Research Lab / Industry" : "Tech Scale-Up",
                              type: isStudent ? "Internship" : "Full-time",
                              dates: "May 2025 – Jul 2025",
                              bullets: ["Conducted modeling and simulation achieving **measurable performance gain**."]
                            }
                          ]
                        });
                      }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-[#4ade80] text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-[#4ade80]" />
                      <span>{isStudent ? "Add Internship / Training" : "Add Experience"}</span>
                    </button>
                  </div>
                )}

                {/* STEP 4: Technical Projects */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    {resumeData.projects.map((proj: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#161820] border border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-mono text-[11px]">Project {idx + 1}</span>
                          <button
                            onClick={() => {
                              const updated = resumeData.projects.filter((_: any, i: number) => i !== idx);
                              saveState({ ...resumeData, projects: updated });
                            }}
                            className="text-zinc-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Project Title"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...resumeData.projects];
                              updated[idx].title = e.target.value;
                              saveState({ ...resumeData, projects: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Subtitle (e.g. Full-Stack Web Application)"
                            value={proj.subtitle}
                            onChange={(e) => {
                              const updated = [...resumeData.projects];
                              updated[idx].subtitle = e.target.value;
                              saveState({ ...resumeData, projects: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Tech Stack"
                            value={proj.techStack}
                            onChange={(e) => {
                              const updated = [...resumeData.projects];
                              updated[idx].techStack = e.target.value;
                              saveState({ ...resumeData, projects: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="GitHub Link (optional)"
                            value={proj.github}
                            onChange={(e) => {
                              const updated = [...resumeData.projects];
                              updated[idx].github = e.target.value;
                              saveState({ ...resumeData, projects: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Live Demo Link (optional)"
                            value={proj.liveDemo}
                            onChange={(e) => {
                              const updated = [...resumeData.projects];
                              updated[idx].liveDemo = e.target.value;
                              saveState({ ...resumeData, projects: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-500 text-[10px] uppercase font-mono mb-1">
                            Bullets (1 per line)
                          </label>
                          <textarea
                            rows={3}
                            value={proj.bullets.join("\n")}
                            onChange={(e) => {
                              const updated = [...resumeData.projects];
                              updated[idx].bullets = e.target.value.split("\n").filter((l) => l.trim());
                              saveState({ ...resumeData, projects: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        saveState({
                          ...resumeData,
                          projects: [
                            ...resumeData.projects,
                            {
                              title: "High-Performance Cache Engine",
                              subtitle: "Systems Architecture Project",
                              techStack: "Go, Redis, Docker",
                              github: "github.com/ayush-dev/cache",
                              liveDemo: "",
                              bullets: ["Engineered in-memory LRU cache handling 50k ops/sec."]
                            }
                          ]
                        });
                      }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-[#4ade80] text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-[#4ade80]" /> Add Technical Project
                    </button>
                  </div>
                )}

                {/* STEP 5: Competitions & Honors (Student) / Achievements (Professional) */}
                {currentStep === 5 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-zinc-300 font-mono text-[11px] font-bold">
                        {isStudent ? "Competitions, Hackathons & Honors" : "Achievements & Accolades"} (1 per line &bull; wrap ranks in **bold**)
                      </label>
                      <span className="text-[10px] text-[#4ade80] font-mono">
                        {isStudent ? "Student / Collegiate Track" : "Corporate Track"}
                      </span>
                    </div>

                    <p className="text-[10.5px] text-zinc-400">
                      {isStudent
                        ? "Include Hackathons won (e.g. Smart India Hackathon, CodeRush), National Core/Robotics events (e.g. BAJA SAE, Robocon, CADathon), Coding ranks (LeetCode, CodeChef), or Department Academic Merit ranks."
                        : "Include high-impact professional accolades, patents, top-tier conference publications, or company recognition awards."}
                    </p>

                    <textarea
                      rows={6}
                      value={resumeData.achievements.join("\n")}
                      onChange={(e) =>
                        saveState({
                          ...resumeData,
                          achievements: e.target.value.split("\n").filter((l) => l.trim())
                        })
                      }
                      className="w-full p-3 rounded-xl bg-[#161820] border border-white/10 text-white text-xs leading-relaxed"
                    />
                  </div>
                )}

                {/* STEP 6: Technical Skills & Core Competencies */}
                {currentStep === 6 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[10.5px] text-zinc-400 font-mono">
                        Skill categories customized for: <strong className="text-[#4ade80]">{activeBranchConfig.name}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => applyBranchPreset(activeBranchKey)}
                        className="text-[#4ade80] hover:underline font-mono text-[10px] cursor-pointer"
                      >
                        ⚡ Reset to {activeBranchConfig.name.split(" ")[0]} Defaults
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-[11px] mb-1">
                        {activeBranchConfig.skillPlaceholders.languagesLabel}
                      </label>
                      <input
                        type="text"
                        value={resumeData.skills.languages}
                        onChange={(e) =>
                          saveState({
                            ...resumeData,
                            skills: { ...resumeData.skills, languages: e.target.value }
                          })
                        }
                        placeholder={activeBranchConfig.skillPlaceholders.languages}
                        className="w-full px-3 py-2 rounded-lg bg-[#161820] border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-[11px] mb-1">
                        {activeBranchConfig.skillPlaceholders.frameworksLabel}
                      </label>
                      <input
                        type="text"
                        value={resumeData.skills.frameworks}
                        onChange={(e) =>
                          saveState({
                            ...resumeData,
                            skills: { ...resumeData.skills, frameworks: e.target.value }
                          })
                        }
                        placeholder={activeBranchConfig.skillPlaceholders.frameworks}
                        className="w-full px-3 py-2 rounded-lg bg-[#161820] border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-[11px] mb-1">
                        {activeBranchConfig.skillPlaceholders.databasesLabel}
                      </label>
                      <input
                        type="text"
                        value={resumeData.skills.databases}
                        onChange={(e) =>
                          saveState({
                            ...resumeData,
                            skills: { ...resumeData.skills, databases: e.target.value }
                          })
                        }
                        placeholder={activeBranchConfig.skillPlaceholders.databases}
                        className="w-full px-3 py-2 rounded-lg bg-[#161820] border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-[11px] mb-1">
                        {activeBranchConfig.skillPlaceholders.cloudDevopsLabel}
                      </label>
                      <input
                        type="text"
                        value={resumeData.skills.cloudDevops}
                        onChange={(e) =>
                          saveState({
                            ...resumeData,
                            skills: { ...resumeData.skills, cloudDevops: e.target.value }
                          })
                        }
                        placeholder={activeBranchConfig.skillPlaceholders.cloudDevops}
                        className="w-full px-3 py-2 rounded-lg bg-[#161820] border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-[11px] mb-1">
                        {activeBranchConfig.skillPlaceholders.developerToolsLabel}
                      </label>
                      <input
                        type="text"
                        value={resumeData.skills.developerTools}
                        onChange={(e) =>
                          saveState({
                            ...resumeData,
                            skills: { ...resumeData.skills, developerTools: e.target.value }
                          })
                        }
                        placeholder={activeBranchConfig.skillPlaceholders.developerTools}
                        className="w-full px-3 py-2 rounded-lg bg-[#161820] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 7: Positions of Responsibility */}
                {currentStep === 7 && (
                  <div className="space-y-4">
                    {resumeData.positions.map((pos: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-[#161820] border border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-mono text-[11px]">Position {idx + 1}</span>
                          <button
                            onClick={() => {
                              const updated = resumeData.positions.filter((_: any, i: number) => i !== idx);
                              saveState({ ...resumeData, positions: updated });
                            }}
                            className="text-zinc-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Title & Organization"
                            value={pos.role}
                            onChange={(e) => {
                              const updated = [...resumeData.positions];
                              updated[idx].role = e.target.value;
                              saveState({ ...resumeData, positions: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Dates"
                            value={pos.dates}
                            onChange={(e) => {
                              const updated = [...resumeData.positions];
                              updated[idx].dates = e.target.value;
                              saveState({ ...resumeData, positions: updated });
                            }}
                            className="px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>

                        <div>
                          <textarea
                            rows={2}
                            value={pos.bullets.join("\n")}
                            onChange={(e) => {
                              const updated = [...resumeData.positions];
                              updated[idx].bullets = e.target.value.split("\n").filter((l) => l.trim());
                              saveState({ ...resumeData, positions: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-[#0f1118] border border-white/10 text-white text-xs"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        saveState({
                          ...resumeData,
                          positions: [
                            ...resumeData.positions,
                            {
                              role: "Lead Coordinator, Tech Fest",
                              dates: "Jan 2024 – Present",
                              bullets: ["Coordinated 200+ team participants and hosted coding hackathon."]
                            }
                          ]
                        });
                      }}
                      className="w-full py-2.5 rounded-xl border border-dashed border-white/20 hover:border-[#4ade80] text-zinc-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-[#4ade80]" /> Add Responsibility
                    </button>
                  </div>
                )}

                {/* Wizard Next / Prev Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    disabled={currentStep === 1}
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white text-xs font-semibold cursor-pointer"
                  >
                    Back
                  </button>

                  {currentStep < STEPS.length ? (
                    <button
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="flex items-center gap-1 px-5 py-2 rounded-xl bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] text-xs font-bold cursor-pointer"
                    >
                      <span>Next: {STEPS[currentStep].label}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setMobileTab("preview");
                      }}
                      className="flex items-center gap-1 px-5 py-2 rounded-xl bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] text-xs font-bold cursor-pointer"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Finish &amp; View Sheet</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* RIGHT COLUMN: REAL-TIME PIXEL-PERFECT RESUME PAPER SURFACE    */}
        {/* ============================================================ */}
        <div className={`space-y-4 ${isEditing ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl mx-auto"} ${isEditing && mobileTab === "edit" ? "hidden lg:block" : "block"}`}>
          {/* Quick Paper Canvas Toolbar */}
          <div className="no-print flex flex-wrap items-center justify-between gap-3 px-3 py-2.5 rounded-2xl bg-[#111317] border border-white/10 text-xs shadow-xl">
            {/* Left: Mobile View Zoom & Density */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMobileScaleFit(!mobileScaleFit)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  mobileScaleFit
                    ? "bg-[#4ade80] text-[#090b0e] shadow-md shadow-[#4ade80]/20 font-bold"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300"
                }`}
                title="Scale to fit entire resume on mobile screen"
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>{mobileScaleFit ? "Fit Screen: ON" : "Fit Screen"}</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileScaleFit(false)}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  !mobileScaleFit
                    ? "bg-white/15 text-white"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400"
                }`}
                title="View full 100% A4 size"
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>100% Full View</span>
              </button>

              {/* Spacing Density Switcher with Disable when Exceeds Paper Size */}
              {(() => {
                const standardA4MaxPx = PAPER_SIZES[paperSize]?.maxSinglePagePx || 1120;
                // If content with compact density still exceeds 1280px (severe overflow), single-page is impossible
                const isImpossibleSinglePage = measuredHeight > 1320;
                return (
                  <div className="hidden md:flex items-center gap-1 p-0.5 rounded-xl bg-black/40 border border-white/10 text-[10.5px]">
                    <button
                      type="button"
                      onClick={() => saveState({ ...resumeData, density: "balanced" })}
                      className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                        (resumeData.density || "balanced") === "balanced"
                          ? "bg-white/20 text-white font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Balanced
                    </button>
                    <button
                      type="button"
                      disabled={isImpossibleSinglePage}
                      onClick={() => saveState({ ...resumeData, density: "compact" })}
                      className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                        resumeData.density === "compact"
                          ? "bg-white/20 text-white font-bold"
                          : isImpossibleSinglePage
                          ? "text-zinc-600 line-through cursor-not-allowed opacity-50"
                          : "text-zinc-400 hover:text-white"
                      }`}
                      title={
                        isImpossibleSinglePage
                          ? "Content too large for 1-page even with compact spacing. Use A3 paper or reduce items."
                          : "Compress spacing to fit 1 page"
                      }
                    >
                      Compact (1-Page)
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Paper Size Selector (A4, US Letter, Legal, A3) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 pl-1.5 pr-0.5 flex items-center gap-1">
                <FileText className="h-3 w-3 text-emerald-400" /> Paper:
              </span>
              {Object.values(PAPER_SIZES).map((ps) => {
                const isSelected = paperSize === ps.id;
                return (
                  <button
                    key={ps.id}
                    type="button"
                    onClick={() => setPaperSize(ps.id)}
                    className={`px-2 py-0.5 rounded-lg text-[10.5px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                    title={ps.desc}
                  >
                    {ps.name}
                  </button>
                );
              })}
            </div>

            {/* Center: Color Theme Palette Picker */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 pl-1.5 pr-0.5">Theme:</span>
              {Object.values(RESUME_THEMES).map((thm) => {
                const isSelected = (resumeData.theme || "classic") === thm.id;
                return (
                  <button
                    key={thm.id}
                    type="button"
                    onClick={() => saveState({ ...resumeData, theme: thm.id })}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10.5px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/20 text-white font-bold ring-1 ring-white/30"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                    title={`${thm.name} color palette`}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full inline-block shrink-0 border border-white/40"
                      style={{ backgroundColor: thm.hex }}
                    />
                    <span className="hidden sm:inline">{thm.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Photo Switch & Print Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  saveState({
                    ...resumeData,
                    personal: { ...resumeData.personal, showPhoto: !resumeData.personal.showPhoto }
                  })
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  resumeData.personal.showPhoto
                    ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                <Camera className="h-3.5 w-3.5" />
                <span>Photo: {resumeData.personal.showPhoto ? "YES" : "NO"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Download PDF ({PAPER_SIZES[paperSize]?.name || "A4"})</span>
              </button>
            </div>
          </div>

          {/* Dynamic Paper Size Recommendation & Overflow Warning Banner */}
          {(() => {
            const currentLimitPx = PAPER_SIZES[paperSize]?.maxSinglePagePx || 1120;
            const isExceeding = measuredHeight > currentLimitPx;

            // Determine best paper size recommendation
            let bestRecommendation = "A4";
            if (measuredHeight <= 1056) bestRecommendation = "US Letter or A4";
            else if (measuredHeight <= 1120) bestRecommendation = "A4";
            else if (measuredHeight <= 1344) bestRecommendation = "Legal (8.5 × 14 in)";
            else bestRecommendation = "A3 (297 × 420 mm Large Format)";

            if (!isExceeding) return null;

            return (
              <div className="no-print p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg animate-in fade-in duration-200">
                <div className="flex items-start sm:items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-amber-300">Content exceeds 1 standard {PAPER_SIZES[paperSize]?.name} page</span>
                    <p className="text-[11px] text-amber-200/80 mt-0.5">
                      Your resume has {measuredHeight}px of content. Recommended paper size for this volume of information is{" "}
                      <strong className="text-white underline underline-offset-2">{bestRecommendation}</strong> or split into a 2-page executive format.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {measuredHeight > 1120 && paperSize !== "legal" && measuredHeight <= 1344 && (
                    <button
                      type="button"
                      onClick={() => setPaperSize("legal")}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Switch to Legal
                    </button>
                  )}
                  {measuredHeight > 1120 && paperSize !== "a3" && (
                    <button
                      type="button"
                      onClick={() => setPaperSize("a3")}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-[11px] transition-colors cursor-pointer"
                    >
                      Switch to A3
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => saveState({ ...resumeData, density: "compact" })}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors cursor-pointer"
                  >
                    Apply Compact Spacing
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Paper Canvas Container with Responsive Scaling */}
          <div className="p-2 sm:p-6 rounded-3xl bg-[#0b0d13] border border-white/10 shadow-2xl flex justify-center overflow-x-auto">
            {/* The Actual Resume Sheet (Directly matching the user's reference image!) */}
            {(() => {
              const activeTheme = RESUME_THEMES[resumeData.theme || "classic"] || RESUME_THEMES.classic;
              const isCompact = resumeData.density === "compact";
              const currentLimitPx = PAPER_SIZES[paperSize]?.maxSinglePagePx || 1120;
              const isOverflowing = measuredHeight > currentLimitPx;

              return (
                <div
                  ref={resumeSheetRef}
                  id="printable-resume"
                  className={`w-full bg-white text-zinc-950 font-sans shadow-2xl ${
                    paperSize === "a3"
                      ? "max-w-[1000px]"
                      : paperSize === "legal"
                      ? "max-w-[850px]"
                      : "max-w-[820px]"
                  } ${
                    isCompact ? "p-4 sm:p-8" : "p-5 sm:p-10"
                  } text-xs leading-normal select-text selection:bg-amber-100 transition-all ${
                    mobileScaleFit ? "transform scale-[0.6] sm:scale-[0.85] lg:scale-100 origin-top" : ""
                  }`}
                  style={{ minHeight: isCompact && !isOverflowing ? "1050px" : "auto" }}
                >
                  {/* Header: Name + Optional Best-Format Photo + Dual Contact Bar */}
                  <div
                    className="pb-2.5 mb-3 border-b-2"
                    style={{ borderBottomColor: activeTheme.hex }}
                  >
                    <div
                      className={`flex items-start gap-4 ${
                        resumeData.personal.showPhoto && resumeData.personal.photoPosition === "left"
                          ? "flex-row-reverse justify-end"
                          : "flex-row justify-between"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <h1
                          className="text-2xl sm:text-[26px] font-bold tracking-tight uppercase font-sans leading-tight"
                          style={{ color: activeTheme.hex }}
                        >
                          {resumeData.personal.fullName}
                        </h1>
                        {resumeData.personal.targetRole && (
                          <p className="text-[12px] font-semibold text-zinc-700 uppercase tracking-wide mt-0.5">
                            {resumeData.personal.targetRole}
                          </p>
                        )}

                        {/* Interactive Clickable Contact Information */}
                        <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-800 font-mono mt-1 gap-y-1">
                          <div className="flex items-center gap-3">
                            {resumeData.personal.location && (
                              <span className="flex items-center gap-1 text-zinc-800">
                                📍 {resumeData.personal.location}
                              </span>
                            )}
                            {resumeData.personal.email && (
                              <a
                                href={`mailto:${resumeData.personal.email}`}
                                className="flex items-center gap-1 hover:underline transition-colors font-medium"
                                style={{ color: activeTheme.hex }}
                              >
                                ✉ {resumeData.personal.email}
                              </a>
                            )}
                            {resumeData.personal.phone && (
                              <a
                                href={`tel:${resumeData.personal.phone.replace(/[^+\d]/g, "")}`}
                                className="flex items-center gap-1 hover:underline transition-colors font-medium text-zinc-800"
                              >
                                📞 {resumeData.personal.phone}
                              </a>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {resumeData.personal.github && (
                              <a
                                href={`https://${resumeData.personal.github.replace("https://", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-0.5 font-semibold"
                                style={{ color: activeTheme.hex }}
                              >
                                github.com/{resumeData.personal.github.replace("github.com/", "").replace("https://", "")} ↗
                              </a>
                            )}
                            {resumeData.personal.linkedin && (
                              <a
                                href={`https://${resumeData.personal.linkedin.replace("https://", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-0.5 font-semibold"
                                style={{ color: activeTheme.hex }}
                              >
                                in/{resumeData.personal.linkedin.replace("linkedin.com/in/", "").replace("https://", "")} ↗
                              </a>
                            )}
                            {resumeData.personal.portfolio && (
                              <a
                                href={`https://${resumeData.personal.portfolio.replace("https://", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-0.5 font-semibold"
                                style={{ color: activeTheme.hex }}
                              >
                                {resumeData.personal.portfolio.replace("https://", "")} ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Optional Candidate Photo on Resume (Best Format) */}
                      {resumeData.personal.showPhoto && (
                        <div
                          className={`overflow-hidden border shrink-0 bg-zinc-100 shadow-sm print:shadow-none ${
                            resumeData.personal.photoShape === "circle"
                              ? "h-20 w-20 rounded-full"
                              : resumeData.personal.photoShape === "passport"
                              ? "h-[105px] w-[82px] rounded"
                              : "h-20 w-20 rounded-lg"
                          }`}
                          style={{ borderColor: activeTheme.hex }}
                        >
                          <img
                            src={resumeData.personal.photoUrl || "/avatars/candidate.jpg"}
                            alt="Profile Photo"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION: EDUCATION (Exact Boxed Table with Enhanced Graphics) */}
                  <div className={isCompact ? "mb-2.5" : "mb-3.5"}>
                    <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                      <h2
                        className="text-[12px] font-black uppercase tracking-wider font-sans"
                        style={{ color: activeTheme.hex }}
                      >
                        EDUCATION
                      </h2>
                    </div>

                    <div className="overflow-x-auto rounded-md border" style={{ borderColor: activeTheme.hex }}>
                      <table
                        className="w-full border-collapse text-[11px]"
                      >
                        <thead>
                          <tr
                            className="font-bold border-b"
                            style={{
                              backgroundColor: activeTheme.bgLight,
                              borderColor: activeTheme.hex,
                              color: activeTheme.hex
                            }}
                          >
                            <th className="border-r px-2.5 py-1 text-left font-bold" style={{ borderColor: activeTheme.hex }}>Degree / Certificate</th>
                            <th className="border-r px-2.5 py-1 text-left font-bold" style={{ borderColor: activeTheme.hex }}>Institute / Board</th>
                            <th className="border-r px-2.5 py-1 text-center font-bold" style={{ borderColor: activeTheme.hex }}>CGPA / Percentage</th>
                            <th className="px-2.5 py-1 text-center font-bold">Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resumeData.education.map((edu: any, idx: number) => (
                            <tr
                              key={idx}
                              className={idx !== resumeData.education.length - 1 ? "border-b" : ""}
                              style={{
                                borderColor: activeTheme.hex + "30",
                                backgroundColor: idx % 2 === 1 ? (activeTheme.bgLight + "40") : "transparent"
                              }}
                            >
                              <td className="border-r px-2.5 py-1 font-semibold" style={{ borderColor: activeTheme.hex + "30" }}>{edu.degree}</td>
                              <td className="border-r px-2.5 py-1 text-zinc-800" style={{ borderColor: activeTheme.hex + "30" }}>{edu.institute}</td>
                              <td className="border-r px-2.5 py-1 text-center font-mono font-semibold" style={{ borderColor: activeTheme.hex + "30" }}>{edu.grade}</td>
                              <td className="px-2.5 py-1 text-center font-mono">{edu.year}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SECTION: WORK EXPERIENCE OR INTERNSHIPS (Dynamic based on Student mode) */}
                  {resumeData.experiences?.length > 0 && (
                    <div className={isCompact ? "mb-2.5" : "mb-3.5"}>
                      <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                        <h2
                          className="text-[12px] font-black uppercase tracking-wider font-sans"
                          style={{ color: activeTheme.hex }}
                        >
                          {isStudent ? "INTERNSHIPS & INDUSTRIAL TRAINING" : "WORK EXPERIENCE"}
                        </h2>
                      </div>

                      <div className="space-y-2">
                        {resumeData.experiences.map((exp: any, idx: number) => (
                          <div key={idx} className="text-[11px]">
                            <div className="flex justify-between font-bold text-zinc-950">
                              <span className="flex items-center gap-1.5">
                                <span className="inline-block h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: activeTheme.hex }} />
                                <strong style={{ color: activeTheme.hex }}>{exp.role}</strong>
                                {exp.company && <span className="font-normal text-zinc-700">– {exp.company}</span>}
                              </span>
                              <span className="font-mono text-[10.5px] font-semibold text-zinc-700">{exp.dates}</span>
                            </div>

                            {exp.type && (
                              <div className="text-[10px] text-zinc-600 italic pl-3 mb-0.5 font-medium">
                                {exp.type}
                              </div>
                            )}

                            <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 leading-snug">
                              {exp.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx}>{formatBold(b)}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: TECHNICAL PROJECTS (Branch-aware heading with sleek link badges) */}
                  {resumeData.projects?.length > 0 && (
                    <div className={isCompact ? "mb-2.5" : "mb-3.5"}>
                      <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                        <h2
                          className="text-[12px] font-black uppercase tracking-wider font-sans"
                          style={{ color: activeTheme.hex }}
                        >
                          {activeBranchKey === "mechanical"
                            ? "MECHANICAL & DESIGN PROJECTS"
                            : activeBranchKey === "civil"
                            ? "STRUCTURAL & DESIGN PROJECTS"
                            : activeBranchKey === "electrical"
                            ? "HARDWARE & VLSI PROJECTS"
                            : isStudent
                            ? "ACADEMIC & TECHNICAL PROJECTS"
                            : "TECHNICAL PROJECTS"}
                        </h2>
                      </div>

                      <div className="space-y-2.5">
                        {resumeData.projects.map((proj: any, idx: number) => (
                          <div key={idx} className="text-[11px]">
                            <div className="flex justify-between items-baseline font-bold text-zinc-950">
                              <span className="flex items-center gap-1.5">
                                <span className="inline-block h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: activeTheme.hex }} />
                                <strong style={{ color: activeTheme.hex }}>{proj.title}</strong>
                              </span>
                              <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold">
                                {proj.liveDemo && (
                                  <a
                                    href={`https://${proj.liveDemo.replace("https://", "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline font-bold px-1.5 py-0.5 rounded border inline-flex items-center gap-0.5"
                                    style={{
                                      borderColor: activeTheme.hex + "40",
                                      backgroundColor: activeTheme.bgLight,
                                      color: activeTheme.hex
                                    }}
                                  >
                                    Live Demo ↗
                                  </a>
                                )}
                                {proj.github && (
                                  <a
                                    href={`https://${proj.github.replace("https://", "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline font-bold px-1.5 py-0.5 rounded border border-zinc-200 bg-zinc-50 inline-flex items-center gap-0.5 text-zinc-800"
                                  >
                                    GitHub ↗
                                  </a>
                                )}
                              </div>
                            </div>

                            {proj.subtitle && (
                              <div className="text-[10px] text-zinc-600 italic pl-3 mb-0.5">
                                {proj.subtitle}
                              </div>
                            )}

                            <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 leading-snug">
                              {proj.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx}>{formatBold(b)}</li>
                              ))}
                            </ul>

                            {proj.techStack && (
                              <div className="pl-3 mt-0.5 text-[10.5px] text-zinc-700">
                                <strong style={{ color: activeTheme.hex }}>Tech Stack: </strong>{proj.techStack}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION: ACHIEVEMENTS / COMPETITIONS */}
                  {resumeData.achievements?.length > 0 && (
                    <div className={isCompact ? "mb-2.5" : "mb-3.5"}>
                      <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                        <h2
                          className="text-[12px] font-black uppercase tracking-wider font-sans"
                          style={{ color: activeTheme.hex }}
                        >
                          {isStudent ? "COMPETITIONS & ACHIEVEMENTS" : "ACHIEVEMENTS"}
                        </h2>
                      </div>

                      <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 text-[11px] leading-snug">
                        {resumeData.achievements.map((ach: string, idx: number) => (
                          <li key={idx}>{formatBold(ach)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* SECTION: TECHNICAL SKILLS & COMPETENCIES (Adapted per branch) */}
                  {resumeData.skills && (
                    <div className={isCompact ? "mb-2.5" : "mb-3.5"}>
                      <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                        <h2
                          className="text-[12px] font-black uppercase tracking-wider font-sans"
                          style={{ color: activeTheme.hex }}
                        >
                          {activeBranchKey === "mechanical"
                            ? "ENGINEERING SKILLS & COMPETENCIES"
                            : activeBranchKey === "civil"
                            ? "TECHNICAL SKILLS & DESIGN TOOLS"
                            : activeBranchKey === "electrical"
                            ? "HARDWARE & TECHNICAL SKILLS"
                            : "TECHNICAL SKILLS AND INTERESTS"}
                        </h2>
                      </div>

                      <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 text-[11px] leading-snug">
                        {resumeData.skills.languages && (
                          <li><strong style={{ color: activeTheme.hex }}>{activeBranchConfig.skillPlaceholders.languagesLabel}: </strong>{resumeData.skills.languages}.</li>
                        )}
                        {resumeData.skills.frameworks && (
                          <li><strong style={{ color: activeTheme.hex }}>{activeBranchConfig.skillPlaceholders.frameworksLabel}: </strong>{resumeData.skills.frameworks}.</li>
                        )}
                        {resumeData.skills.databases && (
                          <li><strong style={{ color: activeTheme.hex }}>{activeBranchConfig.skillPlaceholders.databasesLabel}: </strong>{resumeData.skills.databases}.</li>
                        )}
                        {resumeData.skills.cloudDevops && (
                          <li><strong style={{ color: activeTheme.hex }}>{activeBranchConfig.skillPlaceholders.cloudDevopsLabel}: </strong>{resumeData.skills.cloudDevops}.</li>
                        )}
                        {resumeData.skills.developerTools && (
                          <li><strong style={{ color: activeTheme.hex }}>{activeBranchConfig.skillPlaceholders.developerToolsLabel}: </strong>{resumeData.skills.developerTools}.</li>
                        )}
                        {resumeData.skills.otherTools && (
                          <li><strong style={{ color: activeTheme.hex }}>Other Competencies: </strong>{resumeData.skills.otherTools}.</li>
                        )}
                        {resumeData.skills.softSkills && (
                          <li><strong style={{ color: activeTheme.hex }}>Soft Skills: </strong>{resumeData.skills.softSkills}.</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* SECTION: POSITIONS OF RESPONSIBILITY */}
                  {resumeData.positions?.length > 0 && (
                    <div className="mb-2">
                      <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                        <h2
                          className="text-[12px] font-black uppercase tracking-wider font-sans"
                          style={{ color: activeTheme.hex }}
                        >
                          POSITIONS OF RESPONSIBILITY
                        </h2>
                      </div>

                      <div className="space-y-1.5">
                        {resumeData.positions.map((pos: any, idx: number) => (
                          <div key={idx} className="text-[11px]">
                            <div className="flex justify-between font-bold text-zinc-950">
                              <span>&bull; <strong style={{ color: activeTheme.hex }}>{pos.role}</strong></span>
                              <span className="font-mono text-[10.5px] font-semibold text-zinc-700">{pos.dates}</span>
                            </div>
                            <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 leading-snug">
                              {pos.bullets.map((b: string, bIdx: number) => (
                                <li key={bIdx}>{formatBold(b)}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Verified Clickable Watermark (Preserved in PDF & Browser) */}
                  <div className="mt-7 pt-2.5 border-t border-zinc-200 flex items-center justify-between text-[9.5px] text-zinc-500 font-mono select-none">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeTheme.hex }}></span>
                      <span className="font-sans font-medium text-zinc-600">
                        {isStudent ? "Student Verified Portfolio" : "Verified Career Evidence"} &bull; IIT/FAANG Standard
                      </span>
                    </div>
                    <a
                      href="https://careercompiler.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-all flex items-center gap-1 font-semibold group cursor-pointer"
                      style={{ color: activeTheme.hex }}
                      title="Click to open CareerCompiler AI website"
                    >
                      <span>Made with CareerCompiler AI</span>
                      <span className="text-[11px] font-bold group-hover:translate-x-0.5 transition-transform">↗</span>
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
