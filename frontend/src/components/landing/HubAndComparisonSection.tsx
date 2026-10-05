"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Shield,
  ArrowRight,
  Sparkles,
  Database,
  Cpu,
  Phone,
  Bot,
  Mic,
  Code2,
  FileText,
  CheckCircle2,
  Calendar,
  Timer,
  Layers,
  Award
} from "lucide-react";
import ParticleCanvas from "../ParticleCanvas";
import { GithubIcon } from "../GithubIcon";

interface HubAndComparisonSectionProps {
  onActionClick: (destination: string) => void;
}

export default function HubAndComparisonSection({
  onActionClick,
}: HubAndComparisonSectionProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const showcaseCards = [
    {
      title: "Executive Dashboard",
      subtitle: "All metrics, target roles & interview confidence at a glance.",
      badge: "Free tier included",
      color: "emerald",
      preview: (
        <div className="p-5 text-left text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono text-emerald-400 font-bold">ATS READINESS</span>
            <span className="text-white font-mono bg-emerald-500/20 px-2 py-0.5 rounded">98/100</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-400 block">Verified Repos</span>
              <span className="text-white font-bold text-base mt-0.5 block">14 Public</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-400 block">STAR Bullets</span>
              <span className="text-violet-400 font-bold text-base mt-0.5 block">18 Scored</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-violet-600/10 border border-violet-500/30 text-[11px] text-slate-300">
            &bull; Google L5 Distributed Systems: <span className="text-emerald-400 font-bold">99% Match</span>
          </div>
        </div>
      ),
    },
    {
      title: "AI STAR Studio",
      subtitle: "Describe your project or paste a commit – AI writes the bullet for you.",
      badge: "Real-time AI",
      color: "violet",
      preview: (
        <div className="p-5 text-left text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono text-violet-400 font-bold">STAR QUANTIFICATION</span>
            <span className="text-white font-mono bg-violet-500/20 px-2 py-0.5 rounded">Claude 3.7</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
            &quot;Architected distributed Redis-backed cache layer, cutting p99 query latency by <span className="text-emerald-400 font-bold">42%</span> across 18 microservices under 120k QPS.&quot;
          </p>
          <div className="flex gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Metric: +42%</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Scale: 120k QPS</span>
          </div>
        </div>
      ),
    },
    {
      title: "Evidence Graph",
      subtitle: "Tether every claim to real GitHub commits and code benchmarks.",
      badge: "Cryptographic",
      color: "cyan",
      preview: (
        <div className="p-5 text-left text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono text-cyan-400 font-bold">CRYPTOGRAPHIC PROOF</span>
            <span className="text-white font-mono bg-cyan-500/20 px-2 py-0.5 rounded">Verified</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="p-2 rounded bg-black/50 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-mono">commit #8f32ac9 (Go Cache)</span>
              <span className="text-emerald-400 font-bold">&check;</span>
            </div>
            <div className="p-2 rounded bg-black/50 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300 font-mono">LeetCode Knight (2,140)</span>
              <span className="text-emerald-400 font-bold">&check;</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "ATS Screener Auditor",
      subtitle: "Pre-screen against Workday, Greenhouse & Lever algorithms.",
      badge: "ATS 98+ Guaranteed",
      color: "amber",
      preview: (
        <div className="p-5 text-left text-xs space-y-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-mono text-amber-400 font-bold">ALGORITHM AUDIT</span>
            <span className="text-white font-mono bg-amber-500/20 px-2 py-0.5 rounded">100% Pass</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-center">
            <div className="p-2 rounded bg-white/5">
              <div className="font-bold text-emerald-400 text-sm">100%</div>
              <div className="text-[10px] text-slate-400">Header Compliance</div>
            </div>
            <div className="p-2 rounded bg-white/5">
              <div className="font-bold text-emerald-400 text-sm">0</div>
              <div className="text-[10px] text-slate-400">Parsing Errors</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="screenshots" className="bg-[#07080b] py-8 lg:py-16">
      <div className="overflow-hidden rounded-[32px] sm:rounded-[40px] bg-black border border-white/10 max-w-[1360px] mx-auto shadow-2xl">
        <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
          <ParticleCanvas particleCount={40} />

          {/* Radial Center Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 15%, rgba(139, 92, 246, 0.22), transparent 65%)",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
            {/* Top Pill & Headline */}
            <div className="text-center mb-12 lg:mb-16">
              <span className="pearl-badge inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-6 cursor-default">
                <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                Knowledge & Architecture Hub
              </span>
              <h2 className="text-4xl lg:text-6xl font-light text-white tracking-tight">
                The intelligence hub for your career
              </h2>
            </div>

            {/* Mobile Carousel */}
            <div className="sm:hidden relative z-10">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 no-visible-scrollbar">
                {showcaseCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="snap-center shrink-0 w-[90%] aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 bg-[#0e111a] relative shadow-2xl flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#08090e]">
                      <span className="text-xs font-bold text-white">{card.title}</span>
                      <span className="pearl-badge text-[10px] px-2 py-0.5 rounded-full">
                        {card.badge}
                      </span>
                    </div>
                    {card.preview}
                    <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <p className="text-xs text-slate-300">{card.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop 3D Stack / Coverflow Deck */}
            <div className="hidden sm:block relative z-10 -mt-4 lg:-mt-8">
              <div className="relative w-full" style={{ height: "440px" }}>
                <div
                  className="absolute inset-0 flex items-end justify-center"
                  style={{ perspective: "1100px" }}
                >
                  {/* Left Back Card */}
                  <div
                    onClick={() => setActiveCardIndex((activeCardIndex + 3) % 4)}
                    className="absolute bottom-0 rounded-2xl overflow-hidden will-change-transform select-none cursor-pointer transition-all duration-500"
                    style={{
                      width: "560px",
                      height: "350px",
                      zIndex: 80,
                      transform:
                        "translateX(-200px) translateY(12px) scale(0.90) rotateX(10deg) rotateZ(-12deg)",
                      opacity: 0.85,
                    }}
                  >
                    <div className="group relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0e111a] shadow-2xl shadow-black/80 flex flex-col justify-between">
                      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#08090e]">
                        <span className="text-sm font-bold text-white">
                          {showcaseCards[(activeCardIndex + 3) % 4].title}
                        </span>
                        <span className="pearl-badge text-xs px-2.5 py-1 rounded-full">
                          {showcaseCards[(activeCardIndex + 3) % 4].badge}
                        </span>
                      </div>
                      {showcaseCards[(activeCardIndex + 3) % 4].preview}
                      <div className="p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <p className="text-xs text-slate-300">
                          {showcaseCards[(activeCardIndex + 3) % 4].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Back Card */}
                  <div
                    onClick={() => setActiveCardIndex((activeCardIndex + 1) % 4)}
                    className="absolute bottom-0 rounded-2xl overflow-hidden will-change-transform select-none cursor-pointer transition-all duration-500"
                    style={{
                      width: "560px",
                      height: "350px",
                      zIndex: 80,
                      transform:
                        "translateX(200px) translateY(12px) scale(0.90) rotateX(10deg) rotateZ(12deg)",
                      opacity: 0.85,
                    }}
                  >
                    <div className="group relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0e111a] shadow-2xl shadow-black/80 flex flex-col justify-between">
                      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#08090e]">
                        <span className="text-sm font-bold text-white">
                          {showcaseCards[(activeCardIndex + 1) % 4].title}
                        </span>
                        <span className="pearl-badge text-xs px-2.5 py-1 rounded-full">
                          {showcaseCards[(activeCardIndex + 1) % 4].badge}
                        </span>
                      </div>
                      {showcaseCards[(activeCardIndex + 1) % 4].preview}
                      <div className="p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <p className="text-xs text-slate-300">
                          {showcaseCards[(activeCardIndex + 1) % 4].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Front Main Card */}
                  <div
                    className="absolute bottom-0 rounded-2xl overflow-hidden will-change-transform select-none transition-all duration-500"
                    style={{
                      width: "580px",
                      height: "360px",
                      zIndex: 100,
                      transform: "translateY(-14px) scale(1.04)",
                    }}
                  >
                    <div className="group relative w-full h-full rounded-2xl overflow-hidden border border-violet-500/40 bg-[#0e111a] shadow-2xl shadow-violet-500/20 flex flex-col justify-between">
                      <div className="flex items-center justify-between p-4.5 border-b border-white/15 bg-[#090b12]">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500/80" />
                          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                          <span className="ml-2 text-sm font-bold text-white">
                            {showcaseCards[activeCardIndex].title}
                          </span>
                        </div>
                        <span className="pearl-badge text-xs font-semibold px-3 py-1 rounded-full text-emerald-400">
                          {showcaseCards[activeCardIndex].badge}
                        </span>
                      </div>
                      {showcaseCards[activeCardIndex].preview}
                      <div className="p-5 bg-gradient-to-t from-black via-black/90 to-transparent">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {showcaseCards[activeCardIndex].title}
                        </h3>
                        <p className="text-xs text-slate-300">
                          {showcaseCards[activeCardIndex].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicator Dots */}
              <div className="mt-8 flex items-center justify-center gap-2">
                {showcaseCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeCardIndex === idx
                        ? "w-8 bg-violet-400 shadow-md shadow-violet-400/50"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Showcard ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Assurance Bar */}
            <div className="relative z-10 mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-400">
              <span className="flex items-center gap-2 text-slate-200 font-semibold">
                <Shield className="w-4 h-4 text-violet-400" />
                Zero AI Hallucinations
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/10" />
              <span>
                Bank-grade encryption, verifiable credentials, and private models. Your data is 100% yours.
              </span>
            </div>

            {/* 2-Column: Before vs After & Architecture Flow Hub */}
            <div className="mt-24 lg:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column: Before vs After */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-10 text-left">
                <span className="pearl-badge inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
                  Before vs. After
                </span>
                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
                  Manual resume writing vs. CareerCompiler AI
                </h2>

                {/* Before Box */}
                <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 mb-5">
                  <h3 className="text-sm font-bold text-rose-300 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Writing yourself
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                      20–30 hours spent staring at blank Google Docs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                      Vague bullet points with zero quantified business metrics
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                      Rejected by ATS keyword scanners without any human review
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold mt-0.5">&rsaquo;</span>
                      Imposter syndrome and no proof of actual code ownership
                    </li>
                  </ul>
                </div>

                {/* After Box */}
                <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 mb-8">
                  <h3 className="text-sm font-bold text-violet-300 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    With CareerCompiler AI
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                      Directly parses GitHub commits & projects into quantified STAR bullets
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                      Instant job description tailoring with 98%+ ATS pass scores
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                      Live cryptographic link lets recruiters verify code & metrics
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400 font-bold mt-0.5">&rsaquo;</span>
                      Instant 1-click LaTeX typography & production-grade PDF compilation
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => onActionClick("/resume")}
                  className="gradient-button inline-flex items-center justify-center rounded-[11px] text-white font-sans font-bold px-7 py-3.5 text-sm gap-2 w-full sm:w-auto cursor-pointer"
                >
                  Compile your resume now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Column: The Iconic SalesHook Architecture Hub Diagram */}
              <div className="overflow-x-auto w-full">
                <div className="min-w-[300px] max-w-[400px] mx-auto py-2">
                  {/* Top Node: Developer Profile */}
                  <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-6 py-4 max-w-[340px] border bg-gradient-to-b from-violet-600 via-indigo-600 to-violet-800 border-violet-400/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_25px_-5px_rgba(0,0,0,0.6)]">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-white/20">
                        <Layers className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-bold text-base">
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

                  {/* 2 Middle Nodes: Supabase Vector DB + Claude MCP */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-3 py-3 w-full pearl-badge">
                      <div className="flex items-center justify-center gap-1.5">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <span className="text-white font-medium text-xs">Vector DB</span>
                      </div>
                      <div className="uppercase tracking-wider text-slate-400 mt-1 text-[9px] font-mono">
                        Supabase Semantic
                      </div>
                    </div>

                    <div className="group relative mx-auto rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] cursor-default px-3 py-3 w-full pearl-badge">
                      <div className="flex items-center justify-center gap-1.5">
                        <Cpu className="w-4 h-4 text-violet-400" />
                        <span className="text-white font-medium text-xs">MCP Server</span>
                      </div>
                      <div className="uppercase tracking-wider text-slate-400 mt-1 text-[9px] font-mono">
                        Live Claude & Cursor
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
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-medium text-sm">
                        Raw Career Intake
                      </span>
                    </div>
                    <div className="uppercase tracking-wider text-slate-400 mt-1 text-[10px] font-mono">
                      GitHub &bull; Voice Note &bull; Class Projects
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
                      ≈ 15 seconds &bull; Metric Synthesis
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
                      <Mic className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-white font-medium text-[11px] mt-1">Voice</span>
                    </div>
                    <div className="group relative mx-auto rounded-xl flex flex-col items-center text-center p-2.5 w-full pearl-badge">
                      <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-white font-medium text-[11px] mt-1">Code</span>
                    </div>
                    <div className="group relative mx-auto rounded-xl flex flex-col items-center text-center p-2.5 w-full pearl-badge">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-white font-medium text-[11px] mt-1">PDFs</span>
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
                        ATS-Crushing LaTeX PDF & Dossier
                      </span>
                    </div>
                    <div className="uppercase tracking-wider text-slate-400 mt-1 text-[10px] font-mono">
                      Cryptographic Recruiter Link &bull; 98+ Score
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
                      <span className="text-white font-black text-base tracking-wide">
                        Signed FAANG / Top Offer
                      </span>
                    </div>
                    <button
                      onClick={() => onActionClick("/resume")}
                      className="mt-3.5 inline-flex items-center gap-1.5 px-5 py-2 bg-white text-emerald-900 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer shadow-md"
                    >
                      Start Free 7-Day Trial
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
