"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Target
} from "lucide-react";
import { jobsApi } from "@/lib/api";

export default function JobsPage() {
  const [role, setRole] = useState("Backend Developer Intern");
  const [fingerprint, setFingerprint] = useState<any>(null);
  const [citations, setCitations] = useState<any[]>([]);
  const [rawText, setRawText] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [savedJDs, setSavedJDs] = useState<any[]>([]);
  const [activeAnalysis, setActiveAnalysis] = useState<any>(null);

  useEffect(() => {
    loadRoleData(role);
    loadSavedJobs();
  }, [role]);

  async function loadRoleData(roleTitle: string) {
    try {
      const [fp, cites] = await Promise.all([
        jobsApi.getRoleFingerprint(roleTitle),
        jobsApi.getMarketCitations(roleTitle)
      ]);
      setFingerprint(fp);
      setCitations(cites);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadSavedJobs() {
    try {
      const list = await jobsApi.list();
      setSavedJDs(list);
      if (list.length > 0) {
        setActiveAnalysis(list[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleAnalyzeJD = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    setAnalyzing(true);
    try {
      const parsed = await jobsApi.analyze({
        title: title || role,
        company: company || "Target Tech Company",
        raw_text: rawText,
      });
      setActiveAnalysis(parsed);
      loadSavedJobs();
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

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
                MARKET INTELLIGENCE
              </span>
              <span className="pill-badge bg-white/5 text-zinc-400 border border-white/10">
                AGGREGATE RADAR
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Role Intelligence &amp; JD Analyzer
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Extract hiring signals, core tech requirements, and project patterns from live industry postings to target your resume compilation.
            </p>
          </div>

          {/* Role selector capsules */}
          <div className="flex flex-wrap gap-2">
            {["Backend Developer Intern", "Software Engineer Intern", "AI / ML Engineer Intern"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  role === r
                    ? "bg-[#ff5733] text-white font-semibold shadow-lg shadow-[#ff5733]/25"
                    : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role Fingerprint Blueprint */}
      {fingerprint && (
        <div className="card-glass rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#bef264]/15 text-[#bef264] flex items-center justify-center">
                <Target className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#bef264] font-semibold tracking-wider">
                  Aggregated Role Spec
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {fingerprint.role_title} ({fingerprint.level})
                </h3>
              </div>
            </div>
            <span className="pill-badge bg-white/5 text-zinc-300 font-mono text-[11px] border border-white/10">
              Source: {fingerprint.market_source}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Core Skills */}
            <div className="p-4 rounded-xl bg-[#090b10] border border-white/5 space-y-2.5">
              <span className="font-semibold text-white tracking-wide flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#bef264]"></span>
                Must-Have Core Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {fingerprint.core_skills?.map((s: string, idx: number) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] px-3 py-1 rounded-lg bg-[#bef264]/10 text-[#bef264] border border-[#bef264]/25 font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Supporting Skills */}
            <div className="p-4 rounded-xl bg-[#090b10] border border-white/5 space-y-2.5">
              <span className="font-semibold text-white tracking-wide flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff7849]"></span>
                Supporting &amp; Preferred Skills
              </span>
              <div className="flex flex-wrap gap-2">
                {fingerprint.supporting_skills?.map((s: string, idx: number) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] px-3 py-1 rounded-lg bg-[#141824] text-zinc-300 border border-white/10"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Themes */}
          <div className="p-4 rounded-xl bg-[#090b10] border border-white/5 space-y-2.5">
            <span className="text-xs font-semibold text-white tracking-wide flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
              High-Signal Portfolio Themes (Silicon Valley Standard)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-400">
              {fingerprint.project_patterns?.map((p: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#121622] border border-white/5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#bef264] shrink-0"></div>
                  <span className="text-zinc-300">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paste Real Job Description Form */}
      <div className="card-glass rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
          <div className="h-7 w-7 rounded-lg bg-[#ff5733]/15 text-[#ff7849] flex items-center justify-center">
            <Briefcase className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Live Job Description Ingestion</h3>
            <p className="text-[11px] text-zinc-400">Deconstruct requirements into structured ATS tokens</p>
          </div>
        </div>

        <form onSubmit={handleAnalyzeJD} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 font-mono text-[11px] mb-1">Target Title</label>
              <input
                type="text"
                placeholder="e.g. Backend Developer Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-[#ff5733]"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-mono text-[11px] mb-1">Company / Organization</label>
              <input
                type="text"
                placeholder="e.g. Stripe, Amazon, High-Growth Scale-up"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-[#ff5733]"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono text-[11px] mb-1">Raw Job Posting Text</label>
            <textarea
              rows={5}
              placeholder="Paste full job description with requirements, stack, and responsibilities..."
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-white focus:outline-none focus:border-[#ff5733] font-mono text-xs leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={analyzing || !rawText.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7849] hover:from-[#ff6b4a] hover:to-[#ff8d63] disabled:opacity-40 text-white font-semibold text-xs transition-all shadow-lg shadow-[#ff5733]/25 cursor-pointer"
          >
            {analyzing ? "Extracting Requirements Radar..." : "Analyze & Ingest Job Description"}
          </button>
        </form>

        {/* Parsed Job Profile Output */}
        {activeAnalysis && (
          <div className="mt-5 p-5 rounded-xl bg-[#080a10] border border-white/10 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{activeAnalysis.title}</h4>
                <p className="text-xs text-[#ff7849] mt-0.5">{activeAnalysis.company} &bull; {activeAnalysis.location}</p>
              </div>
              <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30 text-[10px]">
                PARSED TELEMETRY
              </span>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/5 text-xs">
              <div>
                <span className="font-semibold text-white">Extracted Must Have Skills: </span>
                <span className="font-mono text-[#bef264]">{activeAnalysis.must_have_skills?.join(", ")}</span>
              </div>
              <div>
                <span className="font-semibold text-white">Preferred Skills: </span>
                <span className="font-mono text-zinc-400">{activeAnalysis.preferred_skills?.join(", ")}</span>
              </div>
              <div>
                <span className="font-semibold text-white block mb-1">Key Responsibilities:</span>
                <ul className="list-disc pl-5 text-zinc-300 space-y-1">
                  {activeAnalysis.responsibilities?.map((r: string, rIdx: number) => (
                    <li key={rIdx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verified Market Citations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#bef264]" />
          <h3 className="text-sm font-bold text-white tracking-wide">Verified Market Research Citations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {citations.map((cite) => (
            <div key={cite.id} className="card-glass rounded-2xl p-5 space-y-3 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30 text-[10px]">
                  {cite.source_type}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">{(cite.confidence * 100).toFixed(0)}% CONFIDENCE</span>
              </div>
              <h4 className="text-xs font-bold text-white">{cite.title}</h4>
              <p className="text-xs text-zinc-400 italic leading-relaxed">"{cite.excerpt}"</p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <a
                  href={cite.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#ff7849] hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <ExternalLink className="h-3 w-3" /> View Source Report
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
