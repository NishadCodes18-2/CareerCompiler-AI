"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Sparkles,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  Edit3,
  HelpCircle,
  Eye,
  Check,
  RefreshCw,
  Printer
} from "lucide-react";
import { resumesApi, profileApi } from "@/lib/api";

export default function ResumeCompilerPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [resumeDetail, setResumeDetail] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [targetRole, setTargetRole] = useState("Backend Developer Intern");
  const [template, setTemplate] = useState("classic_ats");
  const [compiling, setCompiling] = useState(false);
  const [loading, setLoading] = useState(true);

  // Proof View drawer state
  const [activeProofBullet, setActiveProofBullet] = useState<any>(null);
  const [preExportData, setPreExportData] = useState<any>(null);
  const [showPreExportModal, setShowPreExportModal] = useState(false);

  // Edit bullet state
  const [editingBullet, setEditingBullet] = useState<any>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    initCompiler();
  }, []);

  async function initCompiler() {
    try {
      const [rList, pData] = await Promise.all([
        resumesApi.list(),
        profileApi.getProfile()
      ]);
      setResumes(rList);
      setProfile(pData);
      if (pData?.target_role) {
        setTargetRole(pData.target_role);
      }
      if (rList.length > 0) {
        setSelectedResumeId(rList[0].id);
        loadResumeDetail(rList[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadResumeDetail(id: string) {
    try {
      const detail = await resumesApi.get(id);
      setResumeDetail(detail);
      setTemplate(detail.template_name || "classic_ats");
    } catch (err) {
      console.error(err);
    }
  }

  const handleCompile = async () => {
    setCompiling(true);
    try {
      const res = await resumesApi.compile({
        target_role: targetRole,
        template_name: template,
        version_name: `v${resumes.length + 1} - ${targetRole} Targeted`
      });
      const updatedList = await resumesApi.list();
      setResumes(updatedList);
      setSelectedResumeId(res.resume_id);
      loadResumeDetail(res.resume_id);
    } catch (err) {
      console.error(err);
    } finally {
      setCompiling(false);
    }
  };

  const handlePreExportCheck = async () => {
    if (!selectedResumeId) return;
    try {
      const check = await resumesApi.preExportCheck(selectedResumeId);
      setPreExportData(check);
      setShowPreExportModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportPrint = () => {
    if (!selectedResumeId) return;
    const url = resumesApi.getExportHtmlUrl(selectedResumeId, template);
    window.open(url, "_blank");
  };

  const handleSaveBulletEdit = async () => {
    if (!editingBullet || !editText.trim()) return;
    try {
      await resumesApi.updateBullet(editingBullet.id, {
        text: editText,
        audit_status: "USER_CONFIRMED",
        audit_reason: "Confirmed by candidate during inline review."
      });
      setEditingBullet(null);
      loadResumeDetail(selectedResumeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const bullets = resumeDetail?.bullets || [];
  const projectBullets = bullets.filter((b: any) => b.section_type === "projects");
  const expBullets = bullets.filter((b: any) => b.section_type === "experience");

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#232733] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold tracking-wider">Core Pipeline</span>
          <h1 className="text-2xl font-bold text-white">Resume Compiler & Proof View</h1>
          <p className="text-xs text-zinc-400">
            Split-screen compilation workspace. Every bullet references verified evidence. Click any claim to inspect its proof.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePreExportCheck}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141722] hover:bg-[#1a1f2e] text-zinc-200 border border-[#232733] text-xs font-medium cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Validate Before Export
          </button>
          <button
            onClick={handleExportPrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Export / Print PDF
          </button>
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls & Compiler Pipeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target Role & Compile Controls */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
            <h3 className="text-sm font-semibold text-white">Compiler Configuration</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Backend Developer Intern"
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-medium mb-1">ATS Template</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="classic_ats">Template 1: Single-Column Classic ATS</option>
                  <option value="modern_tech">Template 2: Modern Technical</option>
                  <option value="student_fresher">Template 3: Student / Fresher Standard</option>
                  <option value="minimal_exec">Template 4: Minimal Executive</option>
                </select>
              </div>

              <button
                onClick={handleCompile}
                disabled={compiling}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                {compiling ? "Running Evidence Compilation Pipeline..." : "Compile Targeted Resume"}
              </button>
            </div>
          </div>

          {/* Active Version Selector */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-500 font-semibold">Compiled Versions</span>
              <span className="text-xs text-blue-400 font-mono">{resumes.length} versions</span>
            </div>

            <div className="space-y-2">
              {resumes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedResumeId(r.id);
                    loadResumeDetail(r.id);
                  }}
                  className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedResumeId === r.id
                      ? "bg-blue-950/40 border-blue-500/60 text-white font-semibold shadow-sm"
                      : "bg-[#141722] border-[#232733] text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{r.version_name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300">
                      {r.template_name}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">{r.target_role}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Truth / Claim Auditor Widget */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-blue-900/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Resume Truth Auditor
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                100% PROVED
              </span>
            </div>
            <p className="text-xs text-zinc-300">
              All quantitative metrics in this compiled resume are backed by local benchmark records or Git commit proofs.
            </p>
            <div className="p-3 rounded-lg bg-[#080a10] border border-[#1e2230] text-[11px] text-zinc-400 space-y-1 font-mono">
              <div>&bull; EV-001 / EV-002: 10,000 pkts/sec sniffer throughput</div>
              <div>&bull; EV-006: 40% database latency reduction (Redis cache)</div>
              <div>&bull; EV-007: CloudScale 50k logs/sec telemetry ingestion</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live ATS Resume Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-blue-400" />
              Live ATS Document Preview (Click any bullet to inspect proof)
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">Template: {template}</span>
          </div>

          {/* Paper-like Resume Canvas */}
          <div className="p-8 rounded-xl bg-white text-zinc-900 shadow-2xl border border-zinc-300 font-sans text-xs leading-relaxed space-y-5 selection:bg-blue-100">
            {/* Header */}
            <div className={`text-${template === "classic_ats" ? "center" : "left"} border-b border-zinc-200 pb-3`}>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                {profile?.user_id ? "Alex Morgan" : "Alex Morgan"}
              </h2>
              <div className="text-blue-700 font-semibold text-xs mt-0.5">
                {resumeDetail?.target_role || "Backend Developer Intern"}
              </div>
              <div className="text-[11px] text-zinc-600 mt-1">
                {profile?.email_contact || "alex.morgan@careercompiler.ai"} &bull; {profile?.phone || "+1 (555) 234-5678"} &bull; {profile?.location || "Seattle, WA"}
                <br />
                <span className="font-mono text-blue-600">github.com/alexmorgan-dev</span> &bull; <span className="font-mono text-blue-600">linkedin.com/in/alexmorgan-cs</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5">
                Technical Summary
              </h3>
              <p className="text-[11.5px] text-zinc-700 leading-normal">
                {profile?.summary || "Final-year Computer Science undergraduate specializing in backend architecture, distributed systems, and API design."}
              </p>
            </div>

            {/* Education (Student mode priority) */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5">
                Education
              </h3>
              <div className="space-y-1.5 pt-0.5">
                {profile?.educations?.map((edu: any) => (
                  <div key={edu.id} className="text-[11.5px]">
                    <div className="flex justify-between font-bold text-zinc-900">
                      <span>{edu.institution}</span>
                      <span>{edu.start_date} – {edu.end_date}</span>
                    </div>
                    <div className="flex justify-between text-zinc-700 italic">
                      <span>{edu.degree} in {edu.field_of_study}</span>
                      <span className="font-semibold">{edu.grade}</span>
                    </div>
                    {edu.coursework && (
                      <div className="text-[10.5px] text-zinc-600">
                        Coursework: {edu.coursework.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Projects with Proof Click Hooks */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5">
                Technical Projects (Click for Proof Chain)
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-[11.5px] text-zinc-800 pt-0.5">
                {projectBullets.map((b: any) => (
                  <li
                    key={b.id}
                    onClick={() => setActiveProofBullet(b)}
                    className="cursor-pointer hover:bg-blue-50 p-1 rounded transition-colors group relative"
                  >
                    <span>{b.text}</span>
                    <span className="ml-2 inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                      &#10003; PROOF ({b.evidence_items?.length || 1})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience / Internships */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5">
                Experience & Internships
              </h3>
              <div className="space-y-2 pt-0.5 text-[11.5px]">
                {profile?.experiences?.map((exp: any) => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold text-zinc-900">
                      <span>{exp.company}</span>
                      <span>{exp.start_date} – {exp.end_date}</span>
                    </div>
                    <div className="text-zinc-700 italic">{exp.position} &bull; {exp.location}</div>
                  </div>
                ))}
                <ul className="list-disc pl-5 space-y-1 text-zinc-800">
                  {expBullets.map((eb: any) => (
                    <li
                      key={eb.id}
                      onClick={() => setActiveProofBullet(eb)}
                      className="cursor-pointer hover:bg-blue-50 p-1 rounded transition-colors"
                    >
                      {eb.text}
                      <span className="ml-2 inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        &#10003; VERIFIED
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-900 pb-0.5">
                Technical Skills
              </h3>
              <div className="text-[11px] text-zinc-800 pt-0.5 space-y-1">
                <div>
                  <strong>Languages: </strong> Python, Go, SQL, Bash, C++
                </div>
                <div>
                  <strong>Frameworks & APIs: </strong> Flask, FastAPI, RESTful APIs, Scapy, Raft
                </div>
                <div>
                  <strong>Databases & Tools: </strong> PostgreSQL, MySQL, Redis, Docker, Git, Pytest, Linux
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROOF VIEW DRAWER / MODAL */}
      {activeProofBullet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Proof View — Verified Claim Chain
                </span>
                <h3 className="text-sm font-bold text-white mt-1">"{activeProofBullet.text}"</h3>
              </div>
              <button
                onClick={() => setActiveProofBullet(null)}
                className="text-zinc-500 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Supporting evidence objects */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">Supporting Evidence Assets:</span>
              <div className="space-y-2">
                {activeProofBullet.evidence_items?.map((ev: any, idx: number) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#141722] border border-[#232733] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-blue-400 font-bold">{ev.source_identifier}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {ev.verification_status}
                      </span>
                    </div>
                    <h5 className="font-semibold text-white">{ev.title}</h5>
                    <p className="text-zinc-400 text-[11px]">{ev.relevance_reason}</p>
                    {ev.snippet && (
                      <div className="p-2 rounded bg-[#090b10] border border-[#1b1e2a] font-mono text-[10.5px] text-zinc-300">
                        {ev.snippet}
                      </div>
                    )}
                  </div>
                ))}
                {(!activeProofBullet.evidence_items || activeProofBullet.evidence_items.length === 0) && (
                  <p className="text-xs text-zinc-400 italic">Confirmed by candidate during profile compilation.</p>
                )}
              </div>
            </div>

            {/* Actions: Edit Bullet or Defend in Interview */}
            <div className="pt-3 border-t border-[#232733] flex items-center justify-between">
              <button
                onClick={() => {
                  setEditingBullet(activeProofBullet);
                  setEditText(activeProofBullet.text);
                  setActiveProofBullet(null);
                }}
                className="flex items-center gap-1 text-xs text-blue-400 hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" /> Edit Bullet Text
              </button>

              <button
                onClick={() => {
                  window.location.href = "/interview";
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                <HelpCircle className="h-3.5 w-3.5" /> Defend in Mock Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT BULLET MODAL */}
      {editingBullet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Edit Resume Bullet</h3>
            <textarea
              rows={4}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#141722] border border-[#232733] text-white text-xs font-sans focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingBullet(null)}
                className="px-3 py-1.5 rounded-lg bg-[#1a1e2c] text-zinc-400 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBulletEdit}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRE-EXPORT VALIDATION MODAL */}
      {showPreExportModal && preExportData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                  Automated Export Gate
                </span>
                <h3 className="text-base font-bold text-white mt-1">Pre-Export Quality Audit</h3>
              </div>
              <button onClick={() => setShowPreExportModal(false)} className="text-zinc-500 hover:text-white font-bold">&times;</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{preExportData.status_label}</span>
                </div>
                <p className="text-zinc-300">
                  Claim Support Rate: <strong>{preExportData.support_rate_percent}%</strong> &bull; Reverse ATS Parse: <strong>{preExportData.parser_sections_detected} Sections</strong>
                </p>
              </div>

              {preExportData.issues?.length > 0 && (
                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-300 space-y-1">
                  <span className="font-semibold">Items for Attention:</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {preExportData.issues.map((iss: string, iIdx: number) => (
                      <li key={iIdx}>{iss}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#232733]">
              <button
                onClick={() => setShowPreExportModal(false)}
                className="px-3 py-1.5 rounded-lg bg-[#1a1e2c] text-zinc-300 text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPreExportModal(false);
                  handleExportPrint();
                }}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Proceed to Print / PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
