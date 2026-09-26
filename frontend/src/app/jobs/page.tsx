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
  ShieldCheck
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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#232733] pb-4 space-y-1">
        <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold tracking-wider">Market Intelligence</span>
        <h1 className="text-2xl font-bold text-white">Job Description Analyzer & Role Intelligence</h1>
        <p className="text-xs text-zinc-400">
          Analyze real job descriptions and compare against aggregate industry fingerprints and verified market citations.
        </p>
      </div>

      {/* Role Selector Tabs */}
      <div className="flex gap-2">
        {["Backend Developer Intern", "Software Engineer Intern", "AI / ML Engineer Intern"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              role === r
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "bg-[#141722] text-zinc-400 hover:text-white"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Role Fingerprint Blueprint */}
      {fingerprint && (
        <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
          <div className="flex items-center justify-between border-b border-[#232733] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold">Role Fingerprint</span>
              <h3 className="text-base font-bold text-white mt-0.5">{fingerprint.role_title} ({fingerprint.level})</h3>
            </div>
            <span className="text-xs text-zinc-500 font-mono">{fingerprint.market_source}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Core Skills */}
            <div className="p-3.5 rounded-xl bg-[#141722] border border-[#232733] space-y-2">
              <span className="font-semibold text-zinc-200">Core Must-Have Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {fingerprint.core_skills?.map((s: string, idx: number) => (
                  <span key={idx} className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Supporting Skills */}
            <div className="p-3.5 rounded-xl bg-[#141722] border border-[#232733] space-y-2">
              <span className="font-semibold text-zinc-200">Supporting & Preferred Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {fingerprint.supporting_skills?.map((s: string, idx: number) => (
                  <span key={idx} className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-[#1c2132] text-zinc-300 border border-zinc-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Project Themes */}
          <div className="p-3.5 rounded-xl bg-[#141722] border border-[#232733] space-y-2">
            <span className="text-xs font-semibold text-zinc-200">Common Recommended Project Themes</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
              {fingerprint.project_patterns?.map((p: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0"></div>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paste Real Job Description Form */}
      <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
        <h3 className="text-sm font-semibold text-white">Paste Real Job Description</h3>
        <form onSubmit={handleAnalyzeJD} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Role Title (e.g. Backend Developer Intern)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Company Name (e.g. Stripe, Amazon, Start-up)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <textarea
            rows={5}
            placeholder="Paste full job description text with requirements and responsibilities..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
          />
          <button
            type="submit"
            disabled={analyzing || !rawText.trim()}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold text-xs transition-all cursor-pointer"
          >
            {analyzing ? "Extracting Requirements..." : "Analyze & Save Job Description"}
          </button>
        </form>

        {/* Parsed Job Profile Output */}
        {activeAnalysis && (
          <div className="mt-4 p-5 rounded-xl bg-[#0a0c12] border border-[#1e2230] space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{activeAnalysis.title}</h4>
                <p className="text-xs text-blue-400">{activeAnalysis.company} &bull; {activeAnalysis.location}</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                PARSED
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#1e2230] text-xs">
              <div>
                <span className="font-semibold text-white">Must Have Skills: </span>
                <span className="font-mono text-blue-300">{activeAnalysis.must_have_skills?.join(", ")}</span>
              </div>
              <div>
                <span className="font-semibold text-white">Preferred Skills: </span>
                <span className="font-mono text-zinc-400">{activeAnalysis.preferred_skills?.join(", ")}</span>
              </div>
              <div>
                <span className="font-semibold text-white">Responsibilities Extracted:</span>
                <ul className="list-disc pl-5 text-zinc-300 mt-1 space-y-0.5">
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
          <BookOpen className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Verified Market Research Citations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {citations.map((cite) => (
            <div key={cite.id} className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-emerald-400">{cite.source_type}</span>
                <span className="text-[10px] font-mono text-zinc-500">{(cite.confidence * 100).toFixed(0)}% confidence</span>
              </div>
              <h4 className="text-xs font-bold text-white">{cite.title}</h4>
              <p className="text-xs text-zinc-400 italic">"{cite.excerpt}"</p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <a
                  href={cite.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1"
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
