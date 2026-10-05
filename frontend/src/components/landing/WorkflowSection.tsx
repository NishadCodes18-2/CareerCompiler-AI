"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Code2,
  Calendar,
  FileText,
  ExternalLink,
  Cpu
} from "lucide-react";

interface WorkflowSectionProps {
  onActionClick?: (destination: string) => void;
}

export default function WorkflowSection({ onActionClick }: WorkflowSectionProps) {
  return (
    <section id="workflow" className="py-24 lg:py-32 bg-[#090b10] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20 text-left">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-slate-400 mb-4">
            <span className="w-8 h-px bg-violet-400" />
            Your Workflow
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-5 tracking-tight">
            From raw achievements to signed offer
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            CareerCompiler AI guides you through every step of modern tech hiring — no generic hallucinations and zero manual formatting headaches.
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-[#0c0e15] grid grid-cols-1 md:grid-cols-2">
          {/* Bento Cell 1: Evidence & Quantification */}
          <div className="relative h-full p-8 lg:p-12 border-white/10 md:border-r border-b">
            {/* Interactive Mock UI */}
            <div className="mb-8 lg:mb-10">
              <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden text-xs">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 text-slate-400 font-mono">
                  <span>Project #1 · Distributed Redis Cache</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> verified
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 text-slate-300 font-mono">
                  <span>Raft Consensus Integration</span>
                  <span className="text-violet-400 font-semibold">+42% throughput</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 text-slate-300 font-mono">
                  <span>Zero-Downtime Sharding (Go)</span>
                  <span className="text-violet-400 font-semibold">120k QPS peak</span>
                </div>
                <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 text-slate-300 font-mono">
                  <span>p99 Latency Drop</span>
                  <span className="text-violet-400 font-semibold">-35ms latency</span>
                </div>
                <div className="lp3-row-glow flex items-center justify-between px-4 py-3 bg-violet-600/10 text-white font-semibold">
                  <span className="flex items-center gap-1.5 text-violet-300">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    Auto-Quantified STAR Score
                  </span>
                  <span className="font-mono text-emerald-400 text-sm">98 / 100</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Evidence & Quantification
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Connect your GitHub or describe your projects in a few sentences. The AI extracts proven metrics, latency drops, and business impact into recruiter-approved STAR bullets.
            </p>
          </div>

          {/* Bento Cell 2: Target Matching & ATS Audit */}
          <div className="relative h-full p-8 lg:p-12 border-white/10 border-b">
            {/* Interactive Mock UI */}
            <div className="mb-8 lg:mb-10">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs flex items-center gap-3.5">
                <div className="relative w-10 h-10 shrink-0">
                  <span className="lp3-ring-pulse absolute inset-0 rounded-full bg-emerald-400/40" />
                  <div className="relative w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    Target Role: Google L5 Senior SWE
                  </div>
                  <div className="text-emerald-400 font-mono text-xs mt-0.5">
                    99.2% Keyword & Contextual Match · Zero Gaps
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Target Matching & Tailoring
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Paste any job description from Google, Meta or Stripe. The compiler pinpoints missing keywords and re-weights your experiences in seconds without inventing false claims.
            </p>
          </div>

          {/* Bento Cell 3: Plan & Upskill Schedule */}
          <div className="relative h-full p-8 lg:p-12 border-white/10 md:border-r border-b md:border-b-0">
            {/* Interactive Mock UI */}
            <div className="mb-8 lg:mb-10">
              <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs grid grid-cols-4 gap-2">
                <div className="text-center text-[10px] font-mono text-slate-400 font-semibold mb-1">
                  MON
                </div>
                <div className="text-center text-[10px] font-mono text-slate-400 font-semibold mb-1">
                  TUE
                </div>
                <div className="text-center text-[10px] font-mono text-slate-400 font-semibold mb-1">
                  WED
                </div>
                <div className="text-center text-[10px] font-mono text-slate-400 font-semibold mb-1">
                  THU
                </div>

                <div className="h-8 rounded-lg lp3-cell-glow bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-semibold text-violet-300 px-1 truncate">
                  System Design
                </div>
                <div className="h-8 rounded-lg lp3-cell-glow bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-semibold text-violet-300 px-1 truncate">
                  System Design
                </div>
                <div className="h-8 rounded-lg bg-white/5 border border-white/5" />
                <div className="h-8 rounded-lg lp3-cell-glow bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px] font-semibold text-emerald-300 px-1 truncate">
                  DSA Trees
                </div>

                <div className="h-8 rounded-lg bg-white/5 border border-white/5" />
                <div className="h-8 rounded-lg lp3-cell-glow bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-semibold text-violet-300 px-1 truncate">
                  Mock Interview
                </div>
                <div className="h-8 rounded-lg lp3-cell-glow bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-[10px] font-semibold text-violet-300 px-1 truncate">
                  Mock Interview
                </div>
                <div className="h-8 rounded-lg lp3-cell-glow bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-[10px] font-semibold text-cyan-300 px-1 truncate">
                  Offer Review
                </div>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Plan & Upskill
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Identify your skill gaps and follow an AI-generated learning sprint with targeted problems, system design challenges, and live rubric feedback.
            </p>
          </div>

          {/* Bento Cell 4: Compile & Export */}
          <div className="relative h-full p-8 lg:p-12 border-white/10">
            {/* Interactive Mock UI */}
            <div className="mb-8 lg:mb-10">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs flex items-center justify-center gap-2 flex-wrap">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                  GitHub
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
                  Projects
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                <span className="lp3-pill-glow px-3 py-1.5 rounded-lg bg-violet-600 text-white font-bold">
                  CareerCompiler
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400 font-mono font-semibold">
                  ATS PDF
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono font-semibold">
                  Live Link
                </span>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Compile & Verify
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Convert your profile into a production-grade PDF with 1 click. Recruiter-scannable QR links prove your commits, contributions, and real authorship without friction.
            </p>
          </div>
        </div>

        {/* Workflow Action CTA */}
        {onActionClick && (
          <div className="mt-12 text-center">
            <button
              onClick={() => onActionClick("/resume")}
              className="gradient-button inline-flex items-center justify-center rounded-xl text-white font-sans font-bold px-8 py-3.5 text-sm gap-2 cursor-pointer shadow-xl"
            >
              <span>Build your verified resume now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
