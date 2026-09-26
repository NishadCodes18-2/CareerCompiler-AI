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
  MessageSquare
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
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">Claim Defense Continuity</span>
          <h1 className="text-2xl font-bold text-white mt-0.5">Defend My Resume & Interview Prep</h1>
          <p className="text-xs text-zinc-400">
            Every technical question is linked to claims and verified evidence from your compiled resume.
          </p>
        </div>

        {/* Resume Selector */}
        {resumes.length > 0 && (
          <select
            value={selectedResumeId}
            onChange={(e) => {
              setSelectedResumeId(e.target.value);
              loadQuestions(e.target.value);
            }}
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

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              activeCategory === cat
                ? "bg-blue-600 text-white font-semibold"
                : "bg-[#141722] text-zinc-400 hover:text-white"
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
            <span className="text-xs font-mono uppercase text-zinc-500 font-semibold">Available Questions</span>
            <span className="text-xs text-zinc-400 font-mono">{filteredQuestions.length} questions</span>
          </div>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {filteredQuestions.map((q) => {
              const isSelected = selectedQuestion?.id === q.id;

              return (
                <div
                  key={q.id}
                  onClick={() => handleSelectQuestion(q)}
                  className={`p-4 rounded-xl border text-left text-xs transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-blue-950/40 border-blue-500/60 shadow-md"
                      : "bg-[#0f1118] border-[#232733] hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181c2a] text-blue-300 border border-blue-900/40">
                      {q.category}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> Claim-Backed
                    </span>
                  </div>

                  <h4 className="font-semibold text-white leading-snug">{q.question}</h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 italic">Claim: "{q.context || q.bullet_text}"</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Defend My Resume Drilldown (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {selectedQuestion ? (
            <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-6">
              {/* Question Header */}
              <div className="space-y-2 border-b border-[#232733] pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                    {selectedQuestion.category} Question
                  </span>
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Ready to Defend
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{selectedQuestion.question}</h3>
              </div>

              {/* Exact Resume Claim */}
              <div className="p-4 rounded-xl bg-[#141722] border border-blue-900/40 space-y-1.5 text-xs">
                <span className="font-mono text-[10px] uppercase text-blue-400 font-semibold tracking-wider">
                  Traced Resume Claim:
                </span>
                <p className="text-zinc-200 font-medium italic">
                  "{defendData?.claim_text || selectedQuestion.context || selectedQuestion.bullet_text}"
                </p>
              </div>

              {/* Verified Supporting Evidence Chain */}
              {defendData?.evidence_chain?.length > 0 && (
                <div className="space-y-2 text-xs">
                  <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified Evidence Ground Truth:
                  </span>
                  <div className="space-y-2">
                    {defendData.evidence_chain.map((ev: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#0b0d14] border border-[#1e2230] space-y-1">
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="text-blue-400 font-bold">{ev.source_identifier} ({ev.evidence_type})</span>
                          <span className="text-emerald-400">{ev.verification_status}</span>
                        </div>
                        <p className="text-white font-medium">{ev.title}</p>
                        {ev.snippet && (
                          <div className="p-2 rounded bg-[#07080d] border border-[#161822] font-mono text-[10.5px] text-zinc-300">
                            {ev.snippet}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Candidate Suggested Answer Framework */}
              <div className="p-4 rounded-xl bg-[#121622] border border-[#232733] space-y-2 text-xs">
                <span className="font-mono text-[10px] uppercase text-purple-400 font-semibold tracking-wider">
                  Candidate Recommended Answer Framework:
                </span>
                <pre className="text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed">
                  {selectedQuestion.suggested_answer_framework}
                </pre>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-zinc-500 rounded-2xl bg-[#0f1118] border border-[#232733]">
              Select a question to inspect the Defend My Resume claim chain.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
