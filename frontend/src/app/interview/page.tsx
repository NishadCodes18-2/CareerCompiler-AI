"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
  BookOpen,
  ArrowRight,
  Layers,
  MessageSquare,
  Terminal,
  Sparkles,
  ChevronRight,
  Radio
} from "lucide-react";
import { interviewApi, resumesApi } from "@/lib/api";

export default function InterviewPrepPage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [defendData, setDefendData] = useState<any>(null);
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
        loadQuestions(list[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadQuestions(resumeId: string) {
    setLoading(true);
    try {
      const qs = await interviewApi.getQuestions(resumeId);
      setQuestions(qs);
      if (qs.length > 0) {
        setSelectedQuestion(qs[0]);
        if (qs[0].bullet_id) {
          const def = await interviewApi.defendBullet(qs[0].bullet_id);
          setDefendData(def);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectQuestion = async (q: any) => {
    setSelectedQuestion(q);
    if (q.bullet_id) {
      try {
        const def = await interviewApi.defendBullet(q.bullet_id);
        setDefendData(def);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const categories = ["ALL", "Technical", "System Design", "CS Fundamentals", "Project", "Behavioral"];

  const filteredQuestions = questions.filter((q) => {
    if (activeCategory === "ALL") return true;
    return q.category === activeCategory;
  });

  if (loading && questions.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/30"></div>
        <span className="font-mono text-xs text-slate-400">Loading Claim Defense Engine...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Luxury Dark Horizon Glow */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0c0e15] via-[#121622] to-[#0c0e15] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-violet-600/15 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                DEFENSE CONTINUITY
              </span>
              <span className="pill-badge bg-white/5 text-slate-400 border border-white/10">
                ZERO FABRICATION
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Defend My Resume &amp; Interview Prep
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Every technical question is derived directly from claims on your compiled resume, backed with exact evidence proofs and STAR interview defense structures.
            </p>
          </div>

          {/* Resume Snapshot Selector */}
          {resumes.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">Target Resume:</span>
              <select
                value={selectedResumeId}
                onChange={(e) => {
                  setSelectedResumeId(e.target.value);
                  loadQuestions(e.target.value);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white focus:outline-none focus:border-violet-500 font-mono cursor-pointer"
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

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2 uppercase">Domain Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/30 border border-violet-500/50"
                : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Split Layout: Question List (Left) + Defend My Resume Drilldown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Questions List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">
              Generated Questions
            </span>
            <span className="pill-badge bg-white/5 text-zinc-300 font-mono text-[10px]">
              {filteredQuestions.length} PROMPTS
            </span>
          </div>

          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const isSelected = selectedQuestion?.id === q.id;

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? "bg-[#121524] border-violet-500/60 shadow-lg shadow-violet-600/15"
                      : "bg-[#0c0e15] border-white/10 hover:border-violet-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="pill-badge bg-white/5 text-slate-300 border border-white/10 text-[10px]">
                      {q.category}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                      <ShieldCheck className="h-3 w-3" /> CLAIM-BACKED
                    </span>
                  </div>

                  <h4 className="font-semibold text-white leading-snug">{q.question}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 italic font-mono">
                    Claim: &quot;{q.context || q.bullet_text}&quot;
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Defend My Resume Drilldown (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {selectedQuestion ? (
            <div className="rounded-2xl p-6 space-y-6 bg-[#0c0e15] border border-white/10 shadow-xl">
              {/* Question Header */}
              <div className="space-y-2.5 border-b border-white/5 pb-5">
                <div className="flex items-center justify-between">
                  <span className="pill-badge bg-violet-500/15 text-violet-300 border border-violet-500/30 text-[11px] font-bold">
                    {selectedQuestion.category} Question
                  </span>
                  <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> READY TO DEFEND
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug tracking-tight">
                  {selectedQuestion.question}
                </h3>
              </div>

              {/* Exact Resume Claim */}
              <div className="p-4 rounded-xl bg-[#090b10] border border-white/10 space-y-1.5 text-xs">
                <span className="font-mono text-[10px] uppercase text-violet-400 font-semibold tracking-wider block">
                  Traced Resume Claim:
                </span>
                <p className="text-slate-200 font-medium italic leading-relaxed">
                  &quot;{defendData?.claim_text || selectedQuestion.context || selectedQuestion.bullet_text}&quot;
                </p>
              </div>

              {/* Verified Supporting Evidence Chain */}
              {defendData?.evidence_chain?.length > 0 && (
                <div className="space-y-2.5 text-xs">
                  <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Immutable Evidence Ground Truth:
                  </span>
                  <div className="space-y-2.5">
                    {defendData.evidence_chain.map((ev: any, idx: number) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#121622] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-violet-400 font-bold">{ev.source_identifier} ({ev.evidence_type})</span>
                          <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px]">
                            {ev.verification_status}
                          </span>
                        </div>
                        <p className="text-white font-medium">{ev.title}</p>
                        {ev.snippet && (
                          <div className="p-2.5 rounded-lg bg-[#08090f] border border-white/5 font-mono text-[10.5px] text-emerald-400">
                            <span className="text-slate-500 block text-[9px] mb-0.5">// Ground truth proof</span>
                            {ev.snippet}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Candidate Suggested Answer Framework */}
              <div className="p-4 rounded-xl bg-[#0e121d] border border-violet-500/20 space-y-2.5 text-xs">
                <span className="font-mono text-[10px] uppercase text-violet-400 font-semibold tracking-wider block">
                  Recommended STAR Defense Framework:
                </span>
                <pre className="text-slate-200 font-sans whitespace-pre-wrap leading-relaxed text-[11.5px]">
                  {selectedQuestion.suggested_answer_framework}
                </pre>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-12 text-center text-slate-500 font-mono text-xs bg-[#0c0e15] border border-white/10">
              Select a question to inspect the Defend My Resume claim chain.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
