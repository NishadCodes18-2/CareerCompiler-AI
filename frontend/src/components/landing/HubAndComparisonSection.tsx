"use client";

import React from "react";
import {
  ArrowRight,
  Sparkles,
  Database,
  Cpu,
  Bot,
  Code2,
  FileText,
  CheckCircle2,
  Layers,
  Award,
  ShieldCheck
} from "lucide-react";
import ParticleCanvas from "../ParticleCanvas";
import { GithubIcon } from "../GithubIcon";

interface HubAndComparisonSectionProps {
  onActionClick: (destination: string) => void;
}

export default function HubAndComparisonSection({
  onActionClick,
}: HubAndComparisonSectionProps) {
  return (
    <div id="architecture" className="bg-[#07080b] py-12 lg:py-20 border-t border-white/[0.06]">
      <div className="overflow-hidden rounded-[32px] sm:rounded-[40px] bg-black border border-white/10 max-w-[1360px] mx-auto shadow-2xl relative">
        <ParticleCanvas particleCount={30} />

        {/* Radial Center Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 15%, rgba(139, 92, 246, 0.15), transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="pearl-badge inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4 cursor-default">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Proven Architecture &amp; Quantified Results
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Manual Resume Writing vs. CareerCompiler AI
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Why top software engineers stop spending 30 hours on blank Google Docs and compile verified code evidence instead.
            </p>
          </div>

          {/* 2-Column: Before vs After & Architecture Flow Hub */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Before vs After */}
            <div className="rounded-3xl border border-white/10 bg-[#0c0e15]/90 p-8 lg:p-10 text-left shadow-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-5">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                Side-by-Side Comparison
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 font-sans">
                The Old Way vs. The Evidence Standard
              </h3>

              {/* Before Box */}
              <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 mb-5">
                <h4 className="text-sm font-bold text-rose-300 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Manual Writing &amp; Generic Builders
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                    20–30 hours spent staring at blank Google Docs or clunky Word templates
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                    Vague bullet points with zero quantified engineering metrics or scale
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                    Silently filtered by ATS keyword scanners without human review
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                    Zero proof of actual code authorship or system ownership
                  </li>
                </ul>
              </div>

              {/* After Box */}
              <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 mb-8">
                <h4 className="text-sm font-bold text-violet-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  With CareerCompiler AI (100% Free)
                </h4>
                <ul className="space-y-2.5 text-sm text-slate-300 font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                    Directly parses GitHub commits &amp; repositories into quantified STAR bullets
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                    Instant job description tailoring with 98%+ ATS pass scores
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                    Live cryptographic verification link lets recruiters inspect code &amp; metrics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                    Deterministic LaTeX typography with 1-click clean PDF compilation
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onActionClick("/resume")}
                className="gradient-button inline-flex items-center justify-center rounded-xl text-white font-sans font-bold px-7 py-3.5 text-sm gap-2 w-full sm:w-auto cursor-pointer shadow-xl shadow-violet-600/30"
              >
                <span>Launch Free Studio Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: CareerCompiler Architecture Hub Diagram */}
            <div className="overflow-x-auto w-full">
              <div className="min-w-[300px] max-w-[420px] mx-auto py-2">
                {/* Top Node: Developer Profile */}
                <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-6 py-4 max-w-[340px] border bg-gradient-to-b from-violet-600 via-indigo-600 to-violet-800 border-violet-400/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_25px_-5px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/20">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-bold text-base font-sans">
                      CareerCompiler AI Engine
                    </span>
                  </div>
                </div>

                {/* SVG Hub Lines 1: Splits to Left & Right */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full"
                  style={{ height: "65px" }}
                >
                  <path
                    d="M50,0 C50,50 25,50 25,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                  <path
                    d="M50,0 C50,50 75,50 75,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                </svg>

                {/* 2 Middle Nodes: Vector DB + Claim Verification */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-3 py-3 w-full pearl-badge">
                    <div className="flex items-center justify-center gap-1.5">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-medium text-xs">Vector DB</span>
                    </div>
                    <div className="uppercase tracking-wider text-slate-400 mt-1 text-[9px] font-mono">
                      Semantic Claim Anchors
                    </div>
                  </div>

                  <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-3 py-3 w-full pearl-badge">
                    <div className="flex items-center justify-center gap-1.5">
                      <Cpu className="w-4 h-4 text-violet-400" />
                      <span className="text-white font-medium text-xs">AST Shield</span>
                    </div>
                    <div className="uppercase tracking-wider text-slate-400 mt-1 text-[9px] font-mono">
                      Zero Hallucination Proof
                    </div>
                  </div>
                </div>

                {/* SVG Hub Lines 2: Converge */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full"
                  style={{ height: "65px" }}
                >
                  <path
                    d="M25,0 C25,50 50,50 50,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                  <path
                    d="M75,0 C75,50 50,50 50,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                </svg>

                {/* Candidate Input Node */}
                <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-6 py-3.5 max-w-[340px] pearl-badge">
                  <div className="flex items-center justify-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-medium text-sm">
                      Engineering Evidence Intake
                    </span>
                  </div>
                  <div className="uppercase tracking-wider text-slate-400 mt-1 text-[10px] font-mono">
                    GitHub Commits &bull; System Benchmarks &bull; Code Diffs
                  </div>
                </div>

                {/* Vertical Neon Stem */}
                <div className="relative mx-auto w-px h-10">
                  <div className="absolute inset-0 bg-violet-400 blur-[3px] opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-300 via-violet-400 to-violet-500/30" />
                </div>

                {/* Processing Node */}
                <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-6 py-3.5 max-w-[340px] pearl-badge">
                  <div className="flex items-center justify-center gap-2">
                    <Bot className="w-4 h-4 text-violet-400" />
                    <span className="text-white font-medium text-sm">
                      Neural STAR Compiler
                    </span>
                  </div>
                  <div className="uppercase tracking-wider text-slate-400 mt-1 text-[10px] font-mono">
                    Deterministic Metric Synthesis
                  </div>
                </div>

                {/* SVG Hub Lines 3: 3-way Split */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full"
                  style={{ height: "65px" }}
                >
                  <path
                    d="M50,0 C50,50 16.66,50 16.66,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                  <path
                    d="M50,0 C50,50 50,50 50,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                  <path
                    d="M50,0 C50,50 83.33,50 83.33,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                </svg>

                {/* 3 Intake Modalities */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="group relative mx-auto rounded-xl flex flex-col items-center text-center p-2.5 w-full pearl-badge">
                    <GithubIcon className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-white font-medium text-[11px] mt-1">Git Repos</span>
                  </div>
                  <div className="group relative mx-auto rounded-xl flex flex-col items-center text-center p-2.5 w-full pearl-badge">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-white font-medium text-[11px] mt-1">Code &amp; PRs</span>
                  </div>
                  <div className="group relative mx-auto rounded-xl flex flex-col items-center text-center p-2.5 w-full pearl-badge">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-white font-medium text-[11px] mt-1">Tech Docs</span>
                  </div>
                </div>

                {/* SVG Hub Lines 4: 3-way Converge */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full"
                  style={{ height: "65px" }}
                >
                  <path
                    d="M16.66,0 C16.66,50 50,50 50,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                  <path
                    d="M50,0 C50,50 50,50 50,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                  <path
                    d="M83.33,0 C83.33,50 50,50 50,100"
                    fill="none"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="lp3-hub-line"
                  />
                </svg>

                {/* Final Output Node */}
                <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-6 py-4 max-w-[340px] pearl-badge">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-bold text-sm">
                      ATS-Crushing LaTeX PDF &amp; Link
                    </span>
                  </div>
                  <div className="uppercase tracking-wider text-slate-400 mt-1 text-[10px] font-mono">
                    Deterministic Compilation &bull; 98+ Score
                  </div>
                </div>

                {/* Vertical Neon Stem */}
                <div className="relative mx-auto w-px h-10">
                  <div className="absolute inset-0 bg-emerald-400 blur-[3px] opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500/30" />
                </div>

                {/* Destination Goal: Hired */}
                <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-6 py-4 max-w-[340px] border bg-gradient-to-b from-emerald-600 via-teal-600 to-emerald-800 border-emerald-400/50 shadow-xl">
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-white" />
                    <span className="text-white font-black text-base tracking-wide font-sans">
                      Signed FAANG / Top Offer
                    </span>
                  </div>
                  <button
                    onClick={() => onActionClick("/resume")}
                    className="mt-3.5 inline-flex items-center gap-1.5 px-5 py-2 bg-white text-emerald-900 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer shadow-md"
                  >
                    Launch Free Studio Workspace
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
