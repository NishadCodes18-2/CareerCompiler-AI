"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  FileText,
  Cpu,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Code2,
  ExternalLink,
  ChevronRight,
  GitCommit,
  Award
} from "lucide-react";

interface LiveDashboardSectionProps {
  onActionClick: (destination: string) => void;
}

export default function LiveDashboardSection({ onActionClick }: LiveDashboardSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Dashboard", url: "app.careercompiler.ai/dashboard" },
    { id: 1, label: "Resume Studio", url: "app.careercompiler.ai/resume" },
    { id: 2, label: "Evidence Graph", url: "app.careercompiler.ai/evidence" },
    { id: 3, label: "ATS Auditor", url: "app.careercompiler.ai/analysis" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#07080b] relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-slate-400 mb-4">
            <span className="w-8 h-px bg-violet-400" />
            Live Intelligence
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-5 tracking-tight">
            Your career, one intelligent dashboard.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Resume Studio, live Evidence Graph, ATS score auditor, and AI interview simulator — all interconnected, all in real time.
          </p>
        </div>

        {/* 3D Dashboard Container */}
        <div className="relative mx-auto max-w-6xl [perspective:1000px]">
          {/* Subtle glow underneath */}
          <div className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-b from-violet-500/15 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

          {/* Tab Selector Pills */}
          <div className="flex flex-row items-center overflow-x-auto no-visible-scrollbar max-w-full w-full justify-center gap-2 mb-8 relative z-20">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-white shadow-lg shadow-violet-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.id === 0 && <Layers className="w-3.5 h-3.5" />}
                    {tab.id === 1 && <FileText className="w-3.5 h-3.5" />}
                    {tab.id === 2 && <GitCommit className="w-3.5 h-3.5" />}
                    {tab.id === 3 && <ShieldCheck className="w-3.5 h-3.5" />}
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3D Stack / Display Frame */}
          <div className="relative h-[480px] sm:h-[580px] lg:h-[660px] w-full">
            {/* Card 0: Dashboard */}
            <div
              onClick={() => setActiveTab(0)}
              className="w-full h-full absolute top-0 left-0 transition-all duration-700 ease-out cursor-pointer"
              style={{
                zIndex: activeTab === 0 ? 30 : activeTab === 1 ? 20 : 10,
                opacity: activeTab === 0 ? 1 : activeTab === 1 ? 0.75 : 0.4,
                transform:
                  activeTab === 0
                    ? "none"
                    : activeTab > 0
                    ? `translateY(${activeTab * 20}px) scale(${1 - activeTab * 0.05}) rotateX(6deg)`
                    : "translateY(20px) scale(0.95)",
              }}
            >
              <div className="w-full h-full rounded-2xl border border-white/15 bg-[#0e111a] shadow-2xl shadow-violet-600/10 overflow-hidden flex flex-col">
                {/* macOS Chrome Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#08090e]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-4 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">https://</span>app.careercompiler.ai/dashboard
                  </span>
                </div>

                {/* Dashboard Content Mockup */}
                <div className="p-5 sm:p-7 flex-1 overflow-y-auto space-y-6 text-left">
                  {/* Top Stats Banner */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs text-slate-400 font-mono">ATS Readiness Score</div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 flex items-baseline gap-1">
                        98<span className="text-sm font-normal text-slate-400">/100</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" /> Top 2% in FAANG pool
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs text-slate-400 font-mono">Verified Commits</div>
                      <div className="text-2xl sm:text-3xl font-black text-violet-400 mt-1">
                        842
                      </div>
                      <span className="text-[11px] text-slate-400">Across 14 public repos</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs text-slate-400 font-mono">STAR Metrics</div>
                      <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
                        18
                      </div>
                      <span className="text-[11px] text-cyan-400">Quantified benchmarks</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-xs text-slate-400 font-mono">Interview Confidence</div>
                      <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                        94%
                      </div>
                      <span className="text-[11px] text-slate-400">System Design & Core</span>
                    </div>
                  </div>

                  {/* Two Column Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Active Resumes */}
                    <div className="lg:col-span-7 p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-violet-400" />
                          Compiled Resumes
                        </h4>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          Live Sync
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <div className="p-3 rounded-lg bg-white/[0.04] border border-violet-500/30 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white">
                              Google L5 — Senior Distributed Systems
                            </div>
                            <div className="text-xs text-slate-400">
                              Tailored to Kubernetes, Go & High-Concurrency · Updated 2h ago
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 text-xs font-mono font-bold">
                            99% Match
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-slate-200">
                              Stripe Backend — Infrastructure & Core
                            </div>
                            <div className="text-xs text-slate-400">
                              Focus: Idempotency, Microservices & Rust · Updated 1d ago
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                            97% Match
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Quick Evidence Stream */}
                    <div className="lg:col-span-5 p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <GitCommit className="w-4 h-4 text-cyan-400" />
                        Latest Cryptographic Proof
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="flex items-start gap-2.5 p-2 rounded bg-black/40 border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-200 block">
                              Commit #8d4f2c verified
                            </span>
                            <span className="text-slate-400">
                              Reduced Redis latency by 42% under 100k QPS benchmark
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 p-2 rounded bg-black/40 border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-200 block">
                              LeetCode 420+ solved (Top 4%)
                            </span>
                            <span className="text-slate-400">
                              Contest Rating 2,140 · Knight rank verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 1: Resume Studio */}
            <div
              onClick={() => setActiveTab(1)}
              className="w-full h-full absolute top-0 left-0 transition-all duration-700 ease-out cursor-pointer"
              style={{
                zIndex: activeTab === 1 ? 30 : activeTab === 2 ? 20 : 10,
                opacity: activeTab === 1 ? 1 : activeTab === 0 ? 0.8 : 0.4,
                transform:
                  activeTab === 1
                    ? "none"
                    : activeTab < 1
                    ? "translateY(20px) scale(0.95)"
                    : "translateY(40px) scale(0.90)",
              }}
            >
              <div className="w-full h-full rounded-2xl border border-white/15 bg-[#0e111a] shadow-2xl shadow-violet-600/10 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#08090e]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-4 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">https://</span>app.careercompiler.ai/resume
                  </span>
                </div>

                <div className="p-6 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                  {/* Left Column: Editor & Suggestions */}
                  <div className="md:col-span-6 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-mono text-violet-400 uppercase tracking-wider font-semibold">
                        STAR Bullet Studio
                      </span>
                      <span className="text-[11px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
                        AI Quantified
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                      <div className="text-xs text-slate-400 font-mono">Raw Input / Experience:</div>
                      <p className="text-sm text-slate-300 italic">
                        &quot;Worked on cache system to make database queries faster and handle traffic spikes.&quot;
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 space-y-2">
                      <div className="text-xs text-violet-300 font-mono font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                        Compiled FAANG-Standard Bullet:
                      </div>
                      <p className="text-sm text-slate-100 font-medium">
                        &quot;Architected distributed Redis-backed caching layer across 18 microservices, slashing p99 database query latency by <span className="text-emerald-400 font-bold">42%</span> and seamlessly sustaining <span className="text-cyan-400 font-bold">120k QPS</span> during peak product release.&quot;
                      </p>
                      <div className="flex gap-2 pt-2 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          Metrics: +42%
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                          Scale: 120k QPS
                        </span>
                        <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300">
                          Action: Architected
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: LaTeX Clean Preview */}
                  <div className="md:col-span-6 p-5 rounded-xl bg-white text-slate-900 font-serif text-xs space-y-3 shadow-xl">
                    <div className="text-center pb-2 border-b border-slate-300">
                      <div className="text-lg font-bold font-sans tracking-tight">
                        AYUSH SHARMA
                      </div>
                      <div className="text-[10px] text-slate-600 font-mono">
                        Bengaluru, India · github.com/ayush · linkedin.com/in/ayush · ayush@engineer.io
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider font-sans border-b border-slate-300 pb-0.5 mb-1.5">
                        Experience
                      </div>
                      <div className="font-sans font-bold flex justify-between">
                        <span>Senior Systems Engineer — CloudFlow Inc.</span>
                        <span className="font-normal text-slate-500">2023 – Present</span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-normal font-sans text-[11px]">
                        <li>
                          Architected distributed Redis-backed caching layer across 18 microservices, slashing p99 latency by 42% for 120k QPS.
                        </li>
                        <li>
                          Spearheaded zero-downtime database migration for 12M active user records with automated rollback validations.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider font-sans border-b border-slate-300 pb-0.5 mb-1.5">
                        Technical Skills
                      </div>
                      <div className="font-sans text-[10px] text-slate-700">
                        <span className="font-semibold">Languages:</span> Go, Rust, TypeScript, Python, SQL<br />
                        <span className="font-semibold">Infra & Tools:</span> Kubernetes, Docker, AWS, Kafka, Redis, PostgreSQL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Evidence Graph */}
            <div
              onClick={() => setActiveTab(2)}
              className="w-full h-full absolute top-0 left-0 transition-all duration-700 ease-out cursor-pointer"
              style={{
                zIndex: activeTab === 2 ? 30 : 10,
                opacity: activeTab === 2 ? 1 : 0.4,
                transform:
                  activeTab === 2
                    ? "none"
                    : "translateY(30px) scale(0.92) rotateX(8deg)",
              }}
            >
              <div className="w-full h-full rounded-2xl border border-white/15 bg-[#0e111a] shadow-2xl shadow-violet-600/10 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#08090e]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-4 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">https://</span>app.careercompiler.ai/evidence
                  </span>
                </div>
                <div className="p-6 flex-1 overflow-y-auto space-y-4 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">Cryptographic Career Evidence Graph</h4>
                      <p className="text-xs text-slate-400">Every single bullet is tethered to verifiable repository commits and metrics</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-mono">
                      100% Cryptographically Backed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-violet-400 font-semibold text-sm">
                        <Code2 className="w-4 h-4" /> Go Distributed Cache
                      </div>
                      <div className="text-xs text-slate-400 font-mono">commit #8f32ac9</div>
                      <p className="text-xs text-slate-300">
                        Merged PR with raft consensus protocol implementation; verified benchmark report attached.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <ShieldCheck className="w-4 h-4" /> Kubernetes Ingress
                      </div>
                      <div className="text-xs text-slate-400 font-mono">commit #2b11e94</div>
                      <p className="text-xs text-slate-300">
                        Terraform & Helm charts for multi-region load balancing; tested under simulated 200k DDoS.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                        <Award className="w-4 h-4" /> Hackathon 1st Prize
                      </div>
                      <div className="text-xs text-slate-400 font-mono">Smart India Hackathon</div>
                      <p className="text-xs text-slate-300">
                        AI Document Analyzer built with PyTorch & FastAPI; awarded out of 1,200 teams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: ATS Auditor */}
            <div
              onClick={() => setActiveTab(3)}
              className="w-full h-full absolute top-0 left-0 transition-all duration-700 ease-out cursor-pointer"
              style={{
                zIndex: activeTab === 3 ? 30 : 10,
                opacity: activeTab === 3 ? 1 : 0.4,
                transform:
                  activeTab === 3
                    ? "none"
                    : "translateY(30px) scale(0.92) rotateX(8deg)",
              }}
            >
              <div className="w-full h-full rounded-2xl border border-white/15 bg-[#0e111a] shadow-2xl shadow-violet-600/10 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#08090e]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-4 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="text-emerald-400">https://</span>app.careercompiler.ai/analysis
                  </span>
                </div>
                <div className="p-6 flex-1 overflow-y-auto space-y-5 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">Full ATS Keyword & Formatting Audit</h4>
                      <p className="text-xs text-slate-400">Scanned against Workday, Greenhouse, Lever, and Taleo algorithms</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                      ATS Pass Probability: 99.4%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                      <div className="text-emerald-400 font-bold text-lg">100%</div>
                      <div className="text-[11px] text-slate-400">Section Headers</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                      <div className="text-emerald-400 font-bold text-lg">98%</div>
                      <div className="text-[11px] text-slate-400">Keyword Density</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                      <div className="text-emerald-400 font-bold text-lg">100%</div>
                      <div className="text-[11px] text-slate-400">Date Formatting</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                      <div className="text-emerald-400 font-bold text-lg">96%</div>
                      <div className="text-[11px] text-slate-400">Quantified Bullets</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
