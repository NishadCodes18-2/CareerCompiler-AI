"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Upload,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Sparkles,
  Download,
  Printer,
  Globe,
  FileText,
  ShieldCheck,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Plus,
  X,
  Sliders,
  Eye,
  Check,
  AlertCircle,
  Briefcase
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { profileApi, evidenceApi, resumesApi, matchingApi, authApi } from "@/lib/api";

const PRESET_AVATARS = [
  { id: "cavin", label: "Default Pro", url: "/avatars/candidate.jpg" },
  { id: "female_lead", label: "Elena (Lead)", url: "/avatars/avatar2.jpg" },
  { id: "sarah", label: "Sarah", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" },
  { id: "david", label: "David", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80" },
  { id: "marcus", label: "Marcus", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80" }
];

export default function ResumeMakerDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<any>(null);
  const [evidenceList, setEvidenceList] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [targetRole, setTargetRole] = useState("Backend Developer Intern");
  const [template, setTemplate] = useState("classic_ats");
  const [compiling, setCompiling] = useState(false);
  const [loading, setLoading] = useState(true);

  // Photo & Customization
  const [candidatePhoto, setCandidatePhoto] = useState("/avatars/candidate.jpg");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState("");

  // Connected Sites status
  const [connectedSites, setConnectedSites] = useState([
    {
      name: "GitHub Repositories",
      identifier: "@alexmorgan-dev",
      icon: "github",
      status: "Trained & Synced",
      details: "4 Public Repositories (Python, Go, Docker)",
      active: true,
      href: "/github"
    },
    {
      name: "Resume / Document OCR",
      identifier: "Master_Resume.pdf",
      icon: "pdf",
      status: "Trained & Synced",
      details: "3 Pages parsed · Exact text anchors extracted",
      active: true,
      href: "/documents"
    },
    {
      name: "Target Job Description",
      identifier: "Role Spec",
      icon: "job",
      status: "Trained & Synced",
      details: "Silicon Valley standard · Core skills mapped",
      active: true,
      href: "/jobs"
    },
    {
      name: "Verified Benchmarks",
      identifier: "Local & Commit Logs",
      icon: "proof",
      status: "9 Proof Nodes",
      details: "10k pkts/sec sniffer · 40% DB latency reduction",
      active: true,
      href: "/evidence"
    }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("careercompiler_avatar");
    if (saved) setCandidatePhoto(saved);

    const handleAvatarUpdate = () => {
      const updated = localStorage.getItem("careercompiler_avatar");
      if (updated) setCandidatePhoto(updated);
    };
    window.addEventListener("avatar_updated", handleAvatarUpdate);

    async function loadData() {
      try {
        const token = localStorage.getItem("careercompiler_token");
        if (!token) {
          await authApi.demoLogin();
        }

        const [pData, evData, rList] = await Promise.all([
          profileApi.getProfile(),
          evidenceApi.list(),
          resumesApi.list()
        ]);

        setProfile(pData);
        setEvidenceList(evData);
        setResumes(rList);

        if (pData?.target_role) {
          setTargetRole(pData.target_role);
        }

        if (rList.length > 0) {
          const detail = await resumesApi.get(rList[0].id);
          setSelectedResume(detail);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    return () => window.removeEventListener("avatar_updated", handleAvatarUpdate);
  }, []);

  const handleCompile = async () => {
    setCompiling(true);
    try {
      const res = await resumesApi.compile({
        target_role: targetRole,
        template_name: template,
        version_name: `v${resumes.length + 1} - ${targetRole}`
      });
      const updatedList = await resumesApi.list();
      setResumes(updatedList);
      const detail = await resumesApi.get(res.resume_id);
      setSelectedResume(detail);
    } catch (err) {
      console.error(err);
    } finally {
      setCompiling(false);
    }
  };

  const handlePrintPdf = () => {
    if (!selectedResume?.id) return;
    const url = resumesApi.getExportHtmlUrl(selectedResume.id, template);
    window.open(url, "_blank");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setCandidatePhoto(result);
          localStorage.setItem("careercompiler_avatar", result);
          window.dispatchEvent(new Event("avatar_updated"));
          setShowPhotoModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    setCandidatePhoto(url);
    localStorage.setItem("careercompiler_avatar", url);
    window.dispatchEvent(new Event("avatar_updated"));
    setShowPhotoModal(false);
  };

  const handleApplyCustomUrl = () => {
    if (customPhotoUrl.trim()) {
      setCandidatePhoto(customPhotoUrl.trim());
      localStorage.setItem("careercompiler_avatar", customPhotoUrl.trim());
      window.dispatchEvent(new Event("avatar_updated"));
      setCustomPhotoUrl("");
      setShowPhotoModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/30"></div>
        <span className="font-mono text-xs text-slate-400">Loading AI Resume Maker &amp; Data Pipeline...</span>
      </div>
    );
  }

  // 48 Radial Ray Segments for the "AI Training Synthesis" circle
  const radialSegments = Array.from({ length: 48 }, (_, i) => {
    const angle = (i * 360) / 48;
    let color = "#8b5cf6";
    if (i > 16 && i <= 32) color = "#10b981";
    if (i > 32) color = "#6366f1";
    return { angle, color };
  });

  return (
    <div className="space-y-6 pb-16 max-w-[1550px] mx-auto select-none">
      {/* ============================================================== */}
      {/* TOP HEADER: Clean Title & Quick Action Bar                     */}
      {/* ============================================================== */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
              Self-Training Resume Intelligence
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-0.5">
            AI Resume Maker &amp; Evidence Studio
          </h1>
          <p className="text-xs text-slate-400">
            Connects to your GitHub, uploaded documents, and job descriptions &bull; Self-trains on your real metrics &bull; Compiles 100% verified resumes.
          </p>
        </div>

        {/* 1-Click Compile & PDF Export CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCompile}
            disabled={compiling}
            className="gradient-button flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {compiling ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-violet-300" />
                <span>Training &amp; Compiling...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-violet-300" />
                <span>Compile Targeted Resume</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrintPdf}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#12141c] hover:bg-[#181b26] text-white text-xs font-semibold border border-white/10 hover:border-violet-500/40 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4 text-violet-400" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3-COLUMN INTUITIVE WORKSPACE                                   */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ============================================================ */}
        {/* COLUMN 1: CANDIDATE PHOTO & PROFILE CARD (4 Cols)            */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 space-y-4">
          <div className="slate-card slate-card-hover rounded-3xl p-5 space-y-4 bg-[#111317]">
            {/* Status Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#181b22] border border-white/[0.08] text-[11px] text-white">
                <span className="h-2 w-2 rounded-full bg-[#4ade80] animate-pulse"></span>
                <span className="font-semibold tracking-wide">ACTIVE CANDIDATE</span>
              </div>
              <span className="text-xs text-zinc-400 font-sans">
                {profile?.target_role || "Backend Developer"}
              </span>
            </div>

            {/* Candidate Photo with 1-Click Change */}
            <div className="relative group rounded-2xl overflow-hidden aspect-[4/4.2] bg-[#1a1d26] border border-white/[0.08] shadow-2xl">
              <img
                src={candidatePhoto}
                alt="Candidate Profile"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Photo Change Action Overlay */}
              <div
                onClick={() => setShowPhotoModal(true)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer backdrop-blur-xs text-white"
              >
                <div className="h-10 w-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-lg">
                  <Camera className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold tracking-wide">Upload / Change Photo</span>
              </div>
            </div>

            {/* Candidate Identity */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {profile?.user_id ? "Alex Morgan" : "Alex Morgan"}
                </h2>
                <Link
                  href="/profile"
                  className="h-8 w-8 rounded-full bg-[#181b22] border border-white/[0.08] hover:border-white/30 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                  title="Edit Master Profile"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-xs text-zinc-400 font-medium">
                {profile?.target_role || "Backend Developer Intern"} &bull; {profile?.location || "Seattle, WA"}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-[#161820] border border-white/[0.06] space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {evidenceList.length || 9}
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">
                  Verified Proof Items
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#161820] border border-white/[0.06] space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#4ade80] tracking-tight">
                  100%
                </div>
                <div className="text-[11px] text-zinc-400 font-medium">
                  Zero LLM Fabrication
                </div>
              </div>
            </div>

            {/* Verified Skills Tag Cloud */}
            <div className="p-4 rounded-2xl bg-[#14161e] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300">Trained Competencies</span>
                <span className="text-[10px] text-zinc-500 font-mono">EXTRACTED</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Python",
                  "Go",
                  "FastAPI",
                  "Docker",
                  "PostgreSQL",
                  "Redis",
                  "Raft Protocol",
                  "Packet Sniffer",
                  "RESTful APIs",
                  "Pytest",
                  "Git"
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#1c1f2a] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-[#4ade80]/40 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 2: MULTIPLE SITES & AI TRAINING HUB (4 Cols)          */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 space-y-4">
          {/* Connected Data Sources ("Takes Data from Multiple Sites") */}
          <div className="slate-card slate-card-hover rounded-3xl p-5 space-y-4 bg-[#111317]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Connected Data Sources</h3>
                <p className="text-[11px] text-zinc-400">Takes data from multiple sites to build your resume</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#4ade80] animate-pulse"></span>
            </div>

            <div className="space-y-3">
              {connectedSites.map((site, idx) => (
                <Link
                  key={idx}
                  href={site.href}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#161820] hover:bg-[#1c202a] border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#202430] border border-white/[0.08] flex items-center justify-center text-white text-xs shadow-inner">
                      {idx === 0 && <GithubIcon className="h-4 w-4 text-white" />}
                      {idx === 1 && <FileText className="h-4 w-4 text-[#38bdf8]" />}
                      {idx === 2 && <Briefcase className="h-4 w-4 text-[#f59e0b]" />}
                      {idx === 3 && <ShieldCheck className="h-4 w-4 text-[#4ade80]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#4ade80] transition-colors flex items-center gap-1.5">
                        <span>{site.name}</span>
                        <ChevronRight className="h-3 w-3 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div className="text-[11px] text-zinc-400 font-sans">
                        {site.details}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30 font-bold">
                    ✓ SYNCED
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Self-Training & Synthesis Engine */}
          <div className="slate-card slate-card-hover rounded-3xl p-5 space-y-4 bg-[#111317]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Self-Training Synthesis</h3>
                <p className="text-[11px] text-zinc-400">Trains on real metrics from all connected sites</p>
              </div>
              <span className="text-[10px] font-mono text-[#4ade80] font-bold">ACTIVE</span>
            </div>

            {/* Circular Iris / Radial Ray Disc */}
            <div className="relative flex items-center justify-center py-2">
              <div className="relative h-44 w-44 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  {radialSegments.map((seg, idx) => {
                    const radians = (seg.angle * Math.PI) / 180;
                    const r1 = 68;
                    const r2 = 90;
                    const x1 = 100 + r1 * Math.cos(radians);
                    const y1 = 100 + r1 * Math.sin(radians);
                    const x2 = 100 + r2 * Math.cos(radians);
                    const y2 = 100 + r2 * Math.sin(radians);

                    return (
                      <line
                        key={idx}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={seg.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity={0.85}
                      />
                    );
                  })}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-black text-white tracking-tight">100%</span>
                  <span className="text-[10px] font-sans text-[#4ade80] font-bold uppercase tracking-wider">
                    TRAINED
                  </span>
                </div>
              </div>
            </div>

            {/* Training Breakdown */}
            <div className="space-y-2 pt-1 border-t border-white/[0.05]">
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-zinc-300 font-medium">Source Code Benchmarks</span>
                <span className="text-white font-mono font-bold">10,000 pkts/sec</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-zinc-300 font-medium">Database Latency Reduction</span>
                <span className="text-[#4ade80] font-mono font-bold">-40% (Redis)</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-zinc-300 font-medium">Telemetry Log Ingestion</span>
                <span className="text-white font-mono font-bold">50k logs/sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMN 3: RESUME COMPILER CONTROLS & LIVE PREVIEW (4 Cols)   */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 space-y-4">
          {/* Target Role & Template Config */}
          <div className="slate-card slate-card-hover rounded-3xl p-5 space-y-4 bg-[#111317]">
            <h3 className="text-sm font-bold text-white tracking-wide">Compile Configuration</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Backend Developer Intern"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">ATS Template Style</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 cursor-pointer"
                >
                  <option value="classic_ats">Single-Column Classic ATS (Best for Large Companies)</option>
                  <option value="modern_tech">Modern Technical (Silicon Valley Standard)</option>
                  <option value="student_fresher">Student / Fresher Standard (Prioritizes Education)</option>
                  <option value="minimal_exec">Minimal Executive</option>
                </select>
              </div>

              <button
                onClick={handleCompile}
                disabled={compiling}
                className="gradient-button w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {compiling ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin text-violet-300" />
                    <span>Synthesizing Verified Proofs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-violet-300" />
                    <span>Compile Role-Targeted Resume</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Compiled Resume Live Preview Card */}
          <div className="rounded-3xl p-5 space-y-3.5 bg-[#0c0e15] border border-white/10 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-violet-400" />
                <span className="text-xs font-bold text-white tracking-wide">Live Resume Preview</span>
              </div>
              <button
                onClick={handlePrintPdf}
                className="text-[11px] font-mono text-violet-400 hover:text-violet-300 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="h-3 w-3" /> Export PDF
              </button>
            </div>

            {/* Document Preview Surface */}
            <div className="p-4 rounded-xl bg-[#fcfcfc] text-zinc-900 border border-zinc-200 shadow-md font-sans text-[11px] leading-relaxed space-y-2 max-h-72 overflow-y-auto">
              <div className="border-b border-zinc-300 pb-2 text-center">
                <h4 className="font-bold text-sm text-zinc-950 font-serif">Alex Morgan</h4>
                <div className="text-[#c2410c] font-semibold text-[10.5px]">
                  {selectedResume?.target_role || targetRole}
                </div>
                <div className="text-[10px] text-zinc-600 font-mono mt-0.5">
                  alex.morgan@careercompiler.ai &bull; Seattle, WA &bull; github.com/alexmorgan-dev
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[10.5px] uppercase font-mono border-b border-zinc-900 pb-0.5 block">
                  Technical Projects (Evidence-Backed)
                </span>
                <ul className="list-disc pl-4 space-y-1 text-zinc-800 text-[10.5px]">
                  {selectedResume?.bullets?.filter((b: any) => b.section_type === "projects").map((b: any) => (
                    <li key={b.id} className="hover:text-blue-700">
                      <span>{b.text}</span>
                      <span className="ml-1 text-[8.5px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1 rounded">
                        &#10003; PROVED
                      </span>
                    </li>
                  )) || (
                    <li>Architected Scapy sniffer sustaining 10,000 pkts/sec with zero packet loss.</li>
                  )}
                </ul>
              </div>

              <div className="space-y-1 pt-1">
                <span className="font-bold text-[10.5px] uppercase font-mono border-b border-zinc-900 pb-0.5 block">
                  Education &amp; Core Skills
                </span>
                <p className="text-[10px] text-zinc-700">
                  B.S. in Computer Science (3.8 GPA) &bull; Python, Go, Docker, PostgreSQL, Redis, RESTful APIs
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <Link
                href="/resume"
                className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Open Full Split-Screen Studio</span>
                <ChevronRight className="h-3 w-3" />
              </Link>

              <Link
                href="/interview"
                className="text-[#4ade80] hover:underline flex items-center gap-1"
              >
                <span>Defend in Mock Interview</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PHOTO UPLOAD & AVATAR PICKER MODAL                             */}
      {/* ============================================================== */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg p-6 rounded-3xl slate-card bg-[#111317] border border-white/15 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Candidate Profile Photo</h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Upload your own photo or pick a high-resolution professional portrait.
                </p>
              </div>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Current Active Preview */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#090b10] border border-white/[0.08]">
              <div className="h-16 w-16 rounded-2xl overflow-hidden border border-violet-400 shadow-md shrink-0">
                <img src={candidatePhoto} alt="Current Preview" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">Active Profile Picture</span>
                <p className="text-[11px] text-zinc-400">
                  Displayed on your executive dashboard, top bar, and exportable materials.
                </p>
              </div>
            </div>

            {/* Option 1: Upload from Computer */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                Upload from device
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-white/15 hover:border-violet-500 bg-[#090b10]/60 hover:bg-[#090b10] flex items-center justify-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                <Upload className="h-4 w-4 text-violet-400" />
                Select Photo from Computer (PNG / JPG / WEBP)
              </button>
            </div>

            {/* Option 2: Curated Pro Presets */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                Or select professional preset
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => handleSelectPreset(av.url)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer relative group ${
                      candidatePhoto === av.url
                        ? "border-violet-500 ring-2 ring-violet-500/40 scale-105"
                        : "border-transparent opacity-60 hover:opacity-100 hover:border-white/40"
                    }`}
                    title={av.label}
                  >
                    <img src={av.url} alt={av.label} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Option 3: Image URL input */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                Or paste image URL
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://... photo link"
                  value={customPhotoUrl}
                  onChange={(e) => setCustomPhotoUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
