"use client";

import React, { useState, useEffect } from "react";
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Eye,
  Terminal,
  Activity,
  Award,
  Sparkles
} from "lucide-react";
import { analysisApi, resumesApi } from "@/lib/api";

export default function AnalysisPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [atsReport, setAtsReport] = useState<any>(null);
  const [recruiterReport, setRecruiterReport] = useState<any>(null);
  const [techReport, setTechReport] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"ats" | "recruiter" | "technical">("ats");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
    try {
      const list = await resumesApi.list();
      setResumes(list);
      if (list.length > 0) {
        setSelectedResumeId(list[0].id);
        runDiagnostics(list[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function runDiagnostics(resumeId: string) {
    setLoading(true);
    try {
      const [ats, rec, tech] = await Promise.all([
        analysisApi.atsTest(resumeId),
        analysisApi.recruiterReview(resumeId),
        analysisApi.technicalReview(resumeId)
      ]);
      setAtsReport(ats);
      setRecruiterReport(rec);
      setTechReport(tech);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleResumeChange = (id: string) => {
    setSelectedResumeId(id);
    runDiagnostics(id);
  };

  if (loading && !atsReport) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#ff5733] border-t-transparent shadow-lg shadow-[#ff5733]/30"></div>
        <span className="font-mono text-xs text-zinc-400">Running ATS Reverse Extraction Radar...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Borea AI Horizon Glow */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0c0e15] via-[#121622] to-[#0c0e15] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-[#ff5733]/10 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-[#bef264]/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#bef264] animate-pulse"></span>
                QUALITY ASSURANCE
              </span>
              <span className="pill-badge bg-white/5 text-zinc-400 border border-white/10">
                REVERSE TEXT PARSER
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              ATS Reverse-Parser &amp; Quality Diagnostics
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Real deterministic text extraction, reading order integrity analysis, and multi-perspective technical &amp; recruiter evaluation.
            </p>
          </div>

          {/* Resume Snapshot Selector */}
          {resumes.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">Target Resume:</span>
              <select
                value={selectedResumeId}
                onChange={(e) => handleResumeChange(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white focus:outline-none focus:border-[#ff5733] font-mono cursor-pointer"
              >
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.version_name} ({r.target_role})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs - Haulix style capsules */}
      <div className="flex flex-wrap gap-2.5 border-b border-white/5 pb-3">
        <button
          onClick={() => setActiveTab("ats")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "ats"
              ? "bg-[#ff5733] text-white shadow-lg shadow-[#ff5733]/25"
              : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
          }`}
        >
          <FileCheck2 className="h-4 w-4" />
          ATS Reverse Document Parser Test
        </button>
        <button
          onClick={() => setActiveTab("recruiter")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "recruiter"
              ? "bg-[#ff5733] text-white shadow-lg shadow-[#ff5733]/25"
              : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
          }`}
        >
          <UserCheck className="h-4 w-4" />
          Recruiter Scanability Sweep
        </button>
        <button
          onClick={() => setActiveTab("technical")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "technical"
              ? "bg-[#ff5733] text-white shadow-lg shadow-[#ff5733]/25"
              : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
          }`}
        >
          <Cpu className="h-4 w-4" />
          Technical Depth Review
        </button>
      </div>

      {/* TAB 1: ATS REVERSE PARSER TEST */}
      {activeTab === "ats" && atsReport && (
        <div className="space-y-6">
          {/* Status KPI Row - Haulix Telemetry Style */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card-glass rounded-2xl p-5 space-y-1.5 border-[#bef264]/30">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">OVERALL ATS STATUS</span>
              <div className="text-2xl font-bold text-[#bef264] flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> {atsReport.overall_status}
              </div>
              <p className="text-[11px] text-zinc-400">{atsReport.reading_order_status}</p>
            </div>

            <div className="card-glass rounded-2xl p-5 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">STANDARD SECTIONS RECOVERED</span>
              <div className="text-2xl font-bold text-white font-mono">{atsReport.sections_detected}</div>
              <p className="text-[11px] text-zinc-400">Headings: {atsReport.detected_sections?.join(", ")}</p>
            </div>

            <div className="card-glass rounded-2xl p-5 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">CONTACT &amp; LINKS DETECTED</span>
              <div className="text-2xl font-bold text-[#ff7849] font-mono">{atsReport.links_detected}</div>
              <p className="text-[11px] text-zinc-400">Email, Phone, GitHub, LinkedIn</p>
            </div>
          </div>

          {/* Contact Details Audit Table */}
          <div className="card-glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Parsed Field Verification Checklist</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {Object.entries(atsReport.contact_detected || {}).map(([key, val]: any, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 flex items-center justify-between">
                  <span className="capitalize text-zinc-300 font-medium">{key}</span>
                  {val ? (
                    <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30 text-[10px] font-bold">
                      <CheckCircle2 className="h-3 w-3" /> PASS
                    </span>
                  ) : (
                    <span className="pill-badge bg-red-950/60 text-red-400 border border-red-800 text-[10px] font-bold">
                      MISSING
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reverse Extracted Text Stream */}
          <div className="card-glass rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                Raw ATS Extracted Stream
              </span>
              <span className="pill-badge bg-white/5 text-zinc-400 text-[10px]">
                Deterministic Regex Parser
              </span>
            </div>
            <pre className="p-4 rounded-xl bg-[#080a10] border border-white/5 text-[11px] font-mono text-[#bef264] whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
              {atsReport.extracted_text_sample}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: RECRUITER REVIEW */}
      {activeTab === "recruiter" && recruiterReport && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card-glass rounded-2xl p-5 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">SCANABILITY INDEX</span>
              <div className="text-3xl font-bold text-[#ff7849] font-mono">{recruiterReport.scanability_score}/100</div>
              <p className="text-[11px] text-zinc-400">6-second recruiter visual sweep</p>
            </div>
            <div className="card-glass rounded-2xl p-5 space-y-1.5 border-[#bef264]/30">
              <span className="text-[10px] font-mono text-[#bef264] uppercase tracking-wider font-semibold">RELEVANCE ALIGNMENT</span>
              <div className="text-3xl font-bold text-[#bef264] font-mono">{recruiterReport.relevance_score}/100</div>
              <p className="text-[11px] text-zinc-400">Target role project density</p>
            </div>
            <div className="card-glass rounded-2xl p-5 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">CLARITY INDEX</span>
              <div className="text-3xl font-bold text-white font-mono">{recruiterReport.clarity_score}/100</div>
              <p className="text-[11px] text-zinc-400">Action verb &amp; deliverable precision</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card-glass rounded-2xl p-5 space-y-3 border-[#bef264]/20">
              <h4 className="text-xs font-mono uppercase text-[#bef264] font-semibold tracking-wider">Strengths Identified</h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {recruiterReport.strengths?.map((st: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#bef264] shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glass rounded-2xl p-5 space-y-3 border-[#ff5733]/25">
              <h4 className="text-xs font-mono uppercase text-[#ff7849] font-semibold tracking-wider">Actionable Recommendations</h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {recruiterReport.actionable_suggestions?.map((sug: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-[#ff7849] shrink-0 mt-0.5" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TECHNICAL REVIEW */}
      {activeTab === "technical" && techReport && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card-glass rounded-2xl p-5 space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">TECHNICAL DEPTH RATING</span>
              <div className="text-3xl font-bold text-[#ff7849] font-mono">{techReport.tech_depth_score}/100</div>
              <p className="text-[11px] text-zinc-400">Protocol, distributed systems &amp; API architectural complexity</p>
            </div>
            <div className="card-glass rounded-2xl p-5 space-y-1.5 border-[#bef264]/30">
              <span className="text-[10px] font-mono text-[#bef264] uppercase tracking-wider font-semibold">TERMINOLOGY CREDIBILITY</span>
              <div className="text-3xl font-bold text-[#bef264] font-mono">{techReport.credibility_score}/100</div>
              <p className="text-[11px] text-zinc-400">{techReport.architecture_clarity}</p>
            </div>
          </div>

          <div className="card-glass rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Technical Claims In-Depth Review</h3>
            <div className="space-y-3">
              {techReport.technical_claims_reviewed?.map((claim: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-[#090b10] border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Claim: "{claim.claim}"</span>
                    <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30 text-[10px]">
                      {claim.depth_evaluation} DEPTH
                    </span>
                  </div>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">{claim.commentary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
