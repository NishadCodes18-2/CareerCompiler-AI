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
  Terminal
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
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#232733] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">Document Quality Assurance</span>
          <h1 className="text-2xl font-bold text-white mt-0.5">ATS Reverse-Parser & Review Diagnostics</h1>
          <p className="text-xs text-zinc-400">
            Actual reverse text extraction and multi-perspective technical & recruiter evaluation. No fake universal scores.
          </p>
        </div>

        {/* Resume Selector */}
        {resumes.length > 0 && (
          <select
            value={selectedResumeId}
            onChange={(e) => handleResumeChange(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-xs text-white focus:outline-none focus:border-blue-500"
          >
            {resumes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.version_name} ({r.target_role})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-[#232733] pb-2">
        <button
          onClick={() => setActiveTab("ats")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "ats" ? "bg-blue-600 text-white" : "bg-[#141722] text-zinc-400 hover:text-white"
          }`}
        >
          <FileCheck2 className="h-4 w-4" />
          ATS Reverse Document Parser Test
        </button>
        <button
          onClick={() => setActiveTab("recruiter")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "recruiter" ? "bg-blue-600 text-white" : "bg-[#141722] text-zinc-400 hover:text-white"
          }`}
        >
          <UserCheck className="h-4 w-4" />
          Recruiter Scanability Review
        </button>
        <button
          onClick={() => setActiveTab("technical")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "technical" ? "bg-blue-600 text-white" : "bg-[#141722] text-zinc-400 hover:text-white"
          }`}
        >
          <Cpu className="h-4 w-4" />
          Technical Depth Review
        </button>
      </div>

      {/* TAB 1: ATS REVERSE PARSER TEST */}
      {activeTab === "ats" && atsReport && (
        <div className="space-y-6">
          {/* Status KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0f1118] border border-emerald-900/40 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">OVERALL ATS STATUS</span>
              <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" /> {atsReport.overall_status}
              </div>
              <p className="text-[11px] text-zinc-400">{atsReport.reading_order_status}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">STANDARD SECTIONS RECOVERED</span>
              <div className="text-xl font-bold text-white">{atsReport.sections_detected}</div>
              <p className="text-[11px] text-zinc-400">Headings: {atsReport.detected_sections?.join(", ")}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">CONTACT & LINKS DETECTED</span>
              <div className="text-xl font-bold text-blue-400">{atsReport.links_detected}</div>
              <p className="text-[11px] text-zinc-400">Email, Phone, GitHub, LinkedIn</p>
            </div>
          </div>

          {/* Contact Details Audit Table */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
            <h3 className="text-sm font-semibold text-white">Parsed Field Verification Checklist</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {Object.entries(atsReport.contact_detected || {}).map(([key, val]: any, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#141722] border border-[#232733] flex items-center justify-between">
                  <span className="capitalize text-zinc-300">{key}</span>
                  {val ? (
                    <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1 font-bold">
                      <CheckCircle2 className="h-3 w-3" /> PASS
                    </span>
                  ) : (
                    <span className="text-red-400 font-mono text-[10px] flex items-center gap-1 font-bold">
                      MISSING
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reverse Extracted Text Stream */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Raw ATS Extracted Text Sample</span>
              <span className="text-[10px] font-mono text-zinc-500">Text Extraction Engine v1.0</span>
            </div>
            <pre className="p-4 rounded-xl bg-[#07090e] border border-[#181b26] text-[11px] font-mono text-zinc-300 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
              {atsReport.extracted_text_sample}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: RECRUITER REVIEW */}
      {activeTab === "recruiter" && recruiterReport && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">SCANABILITY INDEX</span>
              <div className="text-2xl font-bold text-blue-400">{recruiterReport.scanability_score}/100</div>
              <p className="text-[11px] text-zinc-400">6-second recruiter visual sweep</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">RELEVANCE ALIGNMENT</span>
              <div className="text-2xl font-bold text-emerald-400">{recruiterReport.relevance_score}/100</div>
              <p className="text-[11px] text-zinc-400">Target role project density</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">CLARITY INDEX</span>
              <div className="text-2xl font-bold text-purple-400">{recruiterReport.clarity_score}/100</div>
              <p className="text-[11px] text-zinc-400">Action verb & deliverable precision</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#0f1118] border border-emerald-900/30 space-y-3">
              <h4 className="text-xs font-mono uppercase text-emerald-400 font-semibold">Strengths Identified</h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {recruiterReport.strengths?.map((st: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#0f1118] border border-blue-900/30 space-y-3">
              <h4 className="text-xs font-mono uppercase text-blue-400 font-semibold">Actionable Recommendations</h4>
              <ul className="space-y-2 text-xs text-zinc-300">
                {recruiterReport.actionable_suggestions?.map((sug: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
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
            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">TECHNICAL DEPTH RATING</span>
              <div className="text-2xl font-bold text-blue-400">{techReport.tech_depth_score}/100</div>
              <p className="text-[11px] text-zinc-400">Protocol, distributed systems & API architectural complexity</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500">TERMINOLOGY CREDIBILITY</span>
              <div className="text-2xl font-bold text-emerald-400">{techReport.credibility_score}/100</div>
              <p className="text-[11px] text-zinc-400">{techReport.architecture_clarity}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
            <h3 className="text-sm font-semibold text-white">Technical Claims In-Depth Review</h3>
            <div className="space-y-3">
              {techReport.technical_claims_reviewed?.map((claim: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-[#141722] border border-[#232733] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">Claim: "{claim.claim}"</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {claim.depth_evaluation} DEPTH
                    </span>
                  </div>
                  <p className="text-zinc-400 text-[11px]">{claim.commentary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
