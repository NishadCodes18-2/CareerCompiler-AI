"use client";

import React, { useState } from "react";
import { Bot, Sparkles, ArrowRight, CheckCircle2, Copy, Check } from "lucide-react";

interface LiveDemoSectionProps {
  onActionClick: (destination: string) => void;
}

export default function LiveDemoSection({ onActionClick }: LiveDemoSectionProps) {
  const [role, setRole] = useState("Senior Backend Engineer @ Stripe");
  const [project, setProject] = useState("Distributed In-Memory Cache in Go");
  const [details, setDetails] = useState(
    "Implemented Raft consensus algorithm, dropped p99 query latency by 42% for 120k requests/second, zero data loss during simulated split-brain failover."
  );
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    bullet: string;
    score: number;
    metrics: string[];
    keywords: string[];
  } | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setResult({
        bullet: `Architected fault-tolerant distributed caching tier in Go utilizing Raft consensus across 16 nodes, slashing p99 latency by 42% under 120,000 QPS load while guaranteeing zero data loss during split-brain partitions.`,
        score: 98,
        metrics: ["-42% p99 Latency", "120,000 QPS", "16-node cluster", "0 data loss"],
        keywords: ["Raft Consensus", "Distributed Systems", "High Concurrency", "Go", "Fault Tolerance"],
      });
      setGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.bullet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-24 lg:py-32 bg-[#07080b]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-slate-400 mb-4">
            <span className="w-8 h-px bg-violet-400" />
            Live Demo
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Try the STAR Compiler yourself
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Enter your target role and raw project notes — the AI synthesizes an ATS-grade quantified bullet instantly.
          </p>
        </div>

        {/* 2-Column Demo Layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left Form: 2 Cols */}
          <div className="lg:col-span-2 flex flex-col justify-between p-6 sm:p-8 bg-[#0c0e15] rounded-2xl border border-white/10 shadow-2xl space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 mb-1.5 block">
                  Target Company & Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-slate-100 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Senior Backend Engineer"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 mb-1.5 block">
                  Project or Feature Name
                </label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-slate-100 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Distributed In-Memory Cache"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 mb-1.5 block">
                  Raw Technical Notes
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-slate-100 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="What did you build? What was the outcome?"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-violet-600/30 cursor-pointer disabled:opacity-50"
            >
              <Bot className="w-4 h-4" />
              {generating ? "Synthesizing bullet..." : "Generate STAR Bullet"}
            </button>
          </div>

          {/* Right Result: 3 Cols */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            {result ? (
              <div className="p-6 sm:p-8 bg-[#0c0e15] rounded-2xl border border-violet-500/30 shadow-2xl flex flex-col justify-between h-full space-y-6 text-left">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        ATS MATCH SCORE: {result.score}/100
                      </span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/10">
                    <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                      &quot;{result.bullet}&quot;
                    </p>
                  </div>

                  {/* Metrics Pills */}
                  <div className="mt-4">
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">
                      Extracted Quantified Impact:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {result.metrics.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="mt-4">
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">
                      Target ATS Keywords Embedded:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((k, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onActionClick("/resume")}
                  className="w-full py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                >
                  Save & Open in Resume Studio
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/15 rounded-2xl p-12 text-center text-slate-400 space-y-4 h-full flex flex-col items-center justify-center bg-[#0c0e15]/50">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-violet-400 opacity-60" />
                </div>
                <div>
                  <p className="text-base font-medium text-slate-200">
                    Ready to compile your first bullet
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Click &ldquo;Generate STAR Bullet&rdquo; to see real-time quantification in action.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
