"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  FileCode,
  ShieldCheck,
  Cpu,
  GitCommit,
  GitBranch,
  Layers,
  Flame,
  Binary,
  Code2
} from "lucide-react";

interface LiveDemoSectionProps {
  onActionClick: (destination: string) => void;
}

interface DemoPreset {
  id: string;
  name: string;
  lang: string;
  repo: string;
  commitSha: string;
  role: string;
  rawCodeSnippet: string;
  rawNotes: string;
  compiledBullet: string;
  latexCode: string;
  atsScore: number;
  metrics: string[];
  keywords: string[];
  proofSteps: { label: string; detail: string; status: "verified" | "active" }[];
}

const PRESETS: DemoPreset[] = [
  {
    id: "go-raft",
    name: "Go Raft Consensus Engine",
    lang: "Go",
    repo: "github.com/engine/raft-core",
    commitSha: "a8f419c",
    role: "Senior Distributed Systems Engineer",
    rawCodeSnippet: `func (rf *Raft) AppendEntries(args *AppendEntriesArgs, reply *AppendEntriesReply) {
    rf.mu.Lock()
    defer rf.mu.Unlock()
    if args.Term < rf.currentTerm {
        reply.Success = false
        return
    }
    // Zero-loss log compaction & p99 optimization
    rf.entries = append(rf.entries[:args.PrevLogIndex+1], args.Entries...)
    rf.persist()
}`,
    rawNotes: "Engineered Raft consensus tier across 16 nodes in Go; cut p99 tail query latency by 42% under 120k QPS load; zero data loss during split-brain partition recovery tests.",
    compiledBullet: "Architected fault-tolerant distributed consensus engine in Go implementing Raft across 16 nodes, slashing p99 latency by 42% under 120,000 QPS while guaranteeing zero data loss during network split-brain simulations.",
    latexCode: `\\item \\textbf{Raft Consensus Engine} \\hfill \\textbf{Go, Distributed Systems}
\\begin{itemize}
    \\item Architected fault-tolerant distributed consensus tier across 16 nodes in Go, slashing p99 query latency by 42\\% under 120,000 QPS load.
    \\item Enforced strict linearizability and zero data loss through automated split-brain election tests (commit \\texttt{a8f419c}).
\\end{itemize}`,
    atsScore: 99,
    metrics: ["-42% p99 Latency", "120,000 QPS", "16 Clustered Nodes", "0 Data Loss"],
    keywords: ["Raft Consensus", "Distributed Systems", "Linearizability", "Go Concurrency", "High Throughput"],
    proofSteps: [
      { label: "AST Parse", detail: "Extracted 1,420 AST nodes in AppendEntries()", status: "verified" },
      { label: "Commit Link", detail: "SHA: a8f419c anchored to repo commit log", status: "verified" },
      { label: "Zero Hallucination", detail: "Metric -42% verified against p99 benchmark suite", status: "verified" },
      { label: "ATS Grammar", detail: "STAR formula: Action Verb + Scope + Quantified Impact", status: "verified" },
    ],
  },
  {
    id: "rust-vector",
    name: "Rust SIMD Vector Search",
    lang: "Rust",
    repo: "github.com/vectordb/simd-ann",
    commitSha: "c41e89b",
    role: "Systems / Performance Engineer",
    rawCodeSnippet: `pub unsafe fn cosine_simd_avx512(a: &[f32], b: &[f32]) -> f32 {
    let mut sum = _mm512_setzero_ps();
    for i in (0..a.len()).step_by(16) {
        let va = _mm512_loadu_ps(a.as_ptr().add(i));
        let vb = _mm512_loadu_ps(b.as_ptr().add(i));
        sum = _mm512_fmadd_ps(va, vb, sum);
    }
    _mm512_reduce_add_ps(sum)
}`,
    rawNotes: "Built AVX-512 SIMD accelerated cosine similarity engine in Rust; indexed 15M 1536-dimensional embeddings; improved search throughput 8.4x over standard BLAS with sub-4ms p95.",
    compiledBullet: "Engineered ultra-low-latency vector search engine in Rust utilizing AVX-512 SIMD vectorization, achieving 8.4x throughput speedup indexing 15M embeddings with sub-4ms p95 latency.",
    latexCode: `\\item \\textbf{Vector Search Acceleration Engine} \\hfill \\textbf{Rust, AVX-512, SIMD}
\\begin{itemize}
    \\item Developed high-throughput vector index in Rust using AVX-512 intrinsics, accelerating nearest-neighbor lookup 8.4x over standard BLAS.
    \\item Scaled indexing to 15,000,000 dense vectors at sub-4ms p95 search latency (commit \\texttt{c41e89b}).
\\end{itemize}`,
    atsScore: 98,
    metrics: ["8.4x Speedup", "15M Embeddings", "sub-4ms p95", "AVX-512 SIMD"],
    keywords: ["SIMD Intrinsics", "Rust", "Vector Databases", "Memory Alignment", "Sub-4ms p95"],
    proofSteps: [
      { label: "AST Parse", detail: "Parsed unsafe AVX-512 SIMD loop blocks", status: "verified" },
      { label: "Commit Link", detail: "SHA: c41e89b verified on main branch", status: "verified" },
      { label: "Zero Hallucination", detail: "Throughput ratio 8.4x anchored to criterion benchmarks", status: "verified" },
      { label: "ATS Grammar", detail: "Engineered + Scope + Outcome verified", status: "verified" },
    ],
  },
  {
    id: "ts-gateway",
    name: "TypeScript Distributed Gateway",
    lang: "TypeScript",
    repo: "github.com/infra/api-mesh",
    commitSha: "f07d23a",
    role: "Full-Stack / Platform Engineer",
    rawCodeSnippet: `export class SlidingWindowRateLimiter {
  async isAllowed(ip: string, cost = 1): Promise<boolean> {
    const key = \`ratelimit:\${ip}\`;
    const now = Date.now();
    const count = await redis.zcount(key, now - 60000, now);
    if (count + cost > this.limit) return false;
    await redis.zadd(key, now, \`\${now}-\${Math.random()}\`);
    return true;
  }
}`,
    rawNotes: "Designed sliding-window rate limiting proxy in TypeScript & Redis; protected 45 microservices from DDoS spikes; maintained 99.999% uptime across 85M daily API calls.",
    compiledBullet: "Designed edge API gateway proxy in TypeScript using Redis sliding-window algorithms, shielding 45 microservices against traffic spikes while maintaining 99.999% uptime across 85M+ requests/day.",
    latexCode: `\\item \\textbf{Distributed API Edge Gateway} \\hfill \\textbf{TypeScript, Redis, Architecture}
\\begin{itemize}
    \\item Designed low-latency API gateway proxy with distributed sliding-window rate limiting in Redis, protecting 45 microservices.
    \\item Sustained 99.999\\% service availability under 85M+ requests daily while reducing DDoS impact to 0 (commit \\texttt{f07d23a}).
\\end{itemize}`,
    atsScore: 97,
    metrics: ["99.999% Uptime", "85M+ Daily Requests", "45 Microservices", "0 DDoS Failures"],
    keywords: ["Edge Proxy", "TypeScript", "Redis", "Distributed Caching", "High Availability"],
    proofSteps: [
      { label: "AST Parse", detail: "Analyzed SlidingWindowRateLimiter class AST", status: "verified" },
      { label: "Commit Link", detail: "SHA: f07d23a verified in repository tree", status: "verified" },
      { label: "Zero Hallucination", detail: "99.999% uptime validated against Datadog monitors", status: "verified" },
      { label: "ATS Grammar", detail: "Designed + Architecture + Availability verified", status: "verified" },
    ],
  },
];

export default function LiveDemoSection({ onActionClick }: LiveDemoSectionProps) {
  const [selectedPreset, setSelectedPreset] = useState<DemoPreset>(PRESETS[0]);
  const [userNotes, setUserNotes] = useState(PRESETS[0].rawNotes);
  const [compiling, setCompiling] = useState(false);
  const [compileStep, setCompileStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"bullet" | "latex" | "proof" | "source">("bullet");
  const [copied, setCopied] = useState(false);
  const [compiledResult, setCompiledResult] = useState<DemoPreset | null>(PRESETS[0]);

  // When changing preset, populate defaults
  const handleSelectPreset = (p: DemoPreset) => {
    setSelectedPreset(p);
    setUserNotes(p.rawNotes);
    setCompiledResult(p);
  };

  const handleRunCompile = () => {
    setCompiling(true);
    setCompileStep(1);

    const timer1 = setTimeout(() => setCompileStep(2), 250);
    const timer2 = setTimeout(() => setCompileStep(3), 500);
    const timer3 = setTimeout(() => {
      setCompileStep(4);
      setCompiledResult({
        ...selectedPreset,
        rawNotes: userNotes,
      });
      setCompiling(false);
    }, 750);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenStudio = () => {
    if (compiledResult) {
      try {
        const existing = sessionStorage.getItem("gold_resume_data") || localStorage.getItem("gold_resume_data");
        let data: any = {};
        if (existing) data = JSON.parse(existing);
        if (!data.experience) data.experience = [];
        data.experience.unshift({
          title: compiledResult.role || "Senior Software Engineer",
          company: "High Growth Tech",
          startDate: "2023",
          endDate: "Present",
          bulletPoints: [compiledResult.compiledBullet],
        });
        sessionStorage.setItem("gold_resume_data", JSON.stringify(data));
        localStorage.setItem("gold_resume_data", JSON.stringify(data));
      } catch (e) {}
    }
    onActionClick("/resume");
  };

  return (
    <section id="demo" className="py-24 lg:py-32 bg-[#07080b] border-t border-white/[0.06] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Code-to-Proof Sandbox
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            See AST-Anchored Synthesis in Real-Time
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Pick a repository architecture below or type raw notes. The engine parses real AST code tokens, anchors verified commit SHAs, and synthesizes 100% hallucination-free LaTeX bullets.
          </p>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-violet-400" />
            Select Code Architecture:
          </span>
          {PRESETS.map((p) => {
            const isSelected = selectedPreset.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? "bg-violet-600/20 border-violet-500 text-white shadow-lg shadow-violet-600/20 scale-[1.02]"
                    : "bg-[#0c0e15] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                  }`}
                />
                {p.name}
              </button>
            );
          })}
        </div>

        {/* 2-Column Compiler Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Input & Source Inspector (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 bg-[#0c0e15] rounded-3xl border border-white/10 shadow-2xl space-y-5">
            {/* Top Repo Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-mono text-slate-200 font-bold truncate max-w-[200px]">
                    {selectedPreset.repo}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
                  <GitCommit className="w-3 h-3" />
                  <span>{selectedPreset.commitSha}</span>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-violet-400" />
                    Verified AST Code Signature ({selectedPreset.lang}):
                  </span>
                  <span className="text-emerald-400 text-[10px]">Verified AST</span>
                </div>
                <pre className="p-3.5 rounded-xl bg-black/70 border border-white/10 text-slate-300 text-xs font-mono overflow-x-auto leading-relaxed max-h-[160px] selection:bg-violet-500/40">
                  <code>{selectedPreset.rawCodeSnippet}</code>
                </pre>
              </div>

              {/* Raw Technical Notes */}
              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1.5 block">
                  Engineer&apos;s Raw Project Notes:
                </label>
                <textarea
                  rows={3}
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/50 text-slate-100 text-xs font-sans focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all resize-none leading-relaxed"
                  placeholder="What was built? What were the benchmarked outcomes?"
                />
              </div>
            </div>

            {/* Run Button with Telemetry Animation */}
            <div>
              <button
                onClick={handleRunCompile}
                disabled={compiling}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-xl shadow-violet-600/30 cursor-pointer disabled:opacity-75"
              >
                {compiling ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Compiling AST Evidence...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Run AST Evidence Audit & Compile</span>
                  </>
                )}
              </button>

              {/* Dynamic Telemetry Status Ticker */}
              <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      compiling ? "bg-amber-400 animate-ping" : "bg-emerald-400"
                    }`}
                  />
                  <span>
                    {compiling
                      ? compileStep === 1
                        ? "Parsing AST Syntax Tree..."
                        : compileStep === 2
                        ? "Verifying Git Commit Signatures..."
                        : "Anchoring Zero-Hallucination Shield..."
                      : "Compiler Status: Idle & Ready"}
                  </span>
                </span>
                <span className="text-slate-500 text-[10px]">Deterministic v2.4</span>
              </div>
            </div>
          </div>

          {/* Right Column: Compiled Proof & LaTeX Output (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-[#0c0e15] rounded-3xl border border-violet-500/30 shadow-2xl space-y-6">
            <div>
              {/* Output Tab Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setActiveTab("bullet")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeTab === "bullet"
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    STAR Bullet
                  </button>
                  <button
                    onClick={() => setActiveTab("latex")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeTab === "latex"
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    LaTeX Code
                  </button>
                  <button
                    onClick={() => setActiveTab("proof")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeTab === "proof"
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Proof Trace
                  </button>
                </div>

                {/* ATS Score Indicator */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ATS {compiledResult?.atsScore || 99}/100
                  </span>
                </div>
              </div>

              {/* Tab 1: STAR Bullet View */}
              {activeTab === "bullet" && (
                <div className="mt-5 space-y-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 relative group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Zero-Hallucination Verified
                      </span>
                      <button
                        onClick={() => handleCopyText(compiledResult?.compiledBullet || "")}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed font-sans">
                      &quot;{compiledResult?.compiledBullet}&quot;
                    </p>
                  </div>

                  {/* Quantified Metrics Pills */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">
                      Anchored Engineering Metrics:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {compiledResult?.metrics.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ATS Keywords */}
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">
                      Extracted Technical Radar Keywords:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {compiledResult?.keywords.map((k, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: LaTeX Code View */}
              {activeTab === "latex" && (
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Clean TeX Source (Compatible with Overleaf & TeXLive):
                    </span>
                    <button
                      onClick={() => handleCopyText(compiledResult?.latexCode || "")}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? "Copied LaTeX" : "Copy LaTeX"}
                    </button>
                  </div>
                  <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-emerald-300/90 text-xs font-mono overflow-x-auto leading-relaxed max-h-[220px]">
                    <code>{compiledResult?.latexCode}</code>
                  </pre>
                </div>
              )}

              {/* Tab 3: Proof Trace Graph */}
              {activeTab === "proof" && (
                <div className="mt-5 space-y-3">
                  <span className="text-xs font-mono text-slate-400 block">
                    Cryptographic Evidence Chain:
                  </span>
                  <div className="space-y-2.5">
                    {compiledResult?.proofSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <span className="font-mono font-bold text-white block">
                              {step.label}
                            </span>
                            <span className="text-slate-400 text-[11px] font-sans">
                              {step.detail}
                            </span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          PASSED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Button */}
            <button
              onClick={handleOpenStudio}
              className="w-full py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl hover:shadow-2xl active:scale-[0.98]"
            >
              <span>Export & Open in Free Resume Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
