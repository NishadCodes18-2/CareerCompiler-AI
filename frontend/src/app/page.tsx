"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  Cpu,
  Flame,
  QrCode as QrIcon,
  Globe,
  Layers,
  Heart,
  ExternalLink,
  ChevronRight,
  Check
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import QrCode from "@/components/QrCode";

export default function CoverLandingPage() {
  const [email, setEmail] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState("");

  useEffect(() => {
    // Check if user previously unlocked
    const saved = localStorage.getItem("careercompiler_email_unlocked");
    if (saved) {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      // Save email to Neon DB backend
      await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "cover_resume_unlock",
          metadata_json: { timestamp: new Date().toISOString() },
        }),
      }).catch((err) => {
        console.warn("Backend lead notice:", err);
      });

      localStorage.setItem("careercompiler_email_unlocked", email);
      setIsUnlocked(true);
      setUnlockMessage("Resume fully unlocked! Redirecting to studio...");
      setTimeout(() => {
        window.location.href = "/resume";
      }, 1200);
    } catch (err) {
      console.error(err);
      setIsUnlocked(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20 select-none">
      {/* ========================================================================= */}
      {/* HERO SECTION: Split Left (Purpose & Creator) + Right (Watermarked Resume) */}
      {/* ========================================================================= */}
      <section className="relative pt-2 sm:pt-6">
        {/* Ambient atmospheric backdrop glow */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Name, Purpose, Creator, CTAs                                */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wide shadow-lg shadow-emerald-500/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NEXT-GEN AI RESUME COMPILER</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">FAANG IIT STANDARD</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Compile Your Career Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Verified Proof.
              </span>
            </h1>

            {/* Purpose description */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Unlike generic AI resume makers that invent fake bullet points,{" "}
              <strong className="text-white font-semibold">CareerCompiler AI</strong> indexes your real
              GitHub repos, live projects, and verified credentials to forge ATS-dominating,
              mathematically optimized resumes ready for top tech companies.
            </p>

            {/* Highlighted Creator Card: Made by Nishad Patil */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#11141c] via-[#141824] to-[#11141c] border border-emerald-500/30 shadow-xl shadow-emerald-500/5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                  Creator & Lead Architect
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Author
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shrink-0 shadow-md shadow-emerald-500/20">
                    <div className="h-full w-full bg-[#0a0d14] rounded-[9.5px] flex items-center justify-center overflow-hidden">
                      <GithubIcon className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Nishad Patil
                      <span className="text-[10px] font-mono text-zinc-400 font-normal">(@NishadCodes18)</span>
                    </h3>
                    <p className="text-[11.5px] text-zinc-400 leading-tight">
                      Full-Stack AI Systems & High-Performance Web Architect
                    </p>
                  </div>
                </div>

                <a
                  href="https://github.com/NishadCodes18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all hover:scale-105 group"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/resume"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-[#090b0e] font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Open Live Resume Studio (Free Demo)</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/resume?action=linkedin"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#131620] hover:bg-[#1b202e] text-zinc-200 hover:text-white border border-white/15 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
              >
                <span>LinkedIn Auto-Fill</span>
              </Link>
            </div>

            {/* Feature Checklist */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs text-zinc-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>One-Click LinkedIn Import</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Real-Time Job Match Scanner</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Google X-Y-Z AI Bullet Polish</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Header QR Code Verification</span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: Example Resume with Slanted Watermark & Partial Blur Lock */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-[#0e1017] border border-white/15 p-3 sm:p-5 shadow-2xl overflow-hidden">
              {/* Header Bar of the Mockup Window */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 pl-2">
                    Standard A4 FAANG Format Preview
                  </span>
                </div>
                <Link
                  href="/resume"
                  className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Edit in Studio</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>

              {/* THE RESUME CANVAS WITH SLANTED WATERMARK */}
              <div className="relative w-full bg-white text-zinc-950 rounded-xl p-5 sm:p-8 font-sans shadow-xl text-[10px] sm:text-xs overflow-hidden select-none">
                {/* ================================================================= */}
                {/* SLANTED / DIAGONAL WATERMARK COVERING THE ENTIRE PAGE              */}
                {/* ================================================================= */}
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex flex-col justify-around opacity-[0.14] rotate-[-28deg] scale-125">
                  <div className="whitespace-nowrap text-lg sm:text-2xl font-black tracking-widest text-zinc-900 uppercase">
                    COPYRIGHT © CAREERCOMPILER AI • DEMO SAMPLE • PROPRIETARY FAANG FORMAT
                  </div>
                  <div className="whitespace-nowrap text-lg sm:text-2xl font-black tracking-widest text-zinc-900 uppercase">
                    VERIFIED EVIDENCE ENGINE • PREVIEW ONLY • UNLOCK FOR FULL ACCESS
                  </div>
                  <div className="whitespace-nowrap text-lg sm:text-2xl font-black tracking-widest text-zinc-900 uppercase">
                    COPYRIGHT © CAREERCOMPILER AI • DEMO SAMPLE • PROPRIETARY FAANG FORMAT
                  </div>
                  <div className="whitespace-nowrap text-lg sm:text-2xl font-black tracking-widest text-zinc-900 uppercase">
                    NISHAD PATIL • CAREERCOMPILER-AI.VERCEL.APP • LIVE DEMO
                  </div>
                </div>

                {/* RESUME HEADER */}
                <div className="border-b-2 border-zinc-950 pb-2 mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-950">
                        AYUSH SHARMA
                      </h2>
                      <p className="text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                        Software Development Engineer • Full Stack & Distributed Systems
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-zinc-700 font-mono mt-1">
                        <span>📍 India</span>
                        <span>✉ ayush.sharma.dev@gmail.com</span>
                        <span>📞 +91 98765 43210</span>
                        <span className="font-bold text-zinc-950">github.com/ayush-dev</span>
                        <span className="font-bold text-zinc-950">in/ayush-sharma-tech</span>
                      </div>
                    </div>

                    {/* Subtle QR Code on Header */}
                    <div className="shrink-0 text-center pl-2">
                      <QrCode value="https://career-compiler-ai.vercel.app/r/ayush" size={42} />
                      <span className="text-[8px] font-mono text-zinc-500 block mt-0.5">Scan Proof</span>
                    </div>
                  </div>
                </div>

                {/* EDUCATION TABLE (Visible top portion) */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 border-b border-zinc-950 pb-0.5 mb-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
                    <h3 className="text-[11px] font-black uppercase tracking-wider">EDUCATION</h3>
                  </div>
                  <table className="w-full border border-zinc-950 border-collapse text-[9.5px]">
                    <thead>
                      <tr className="bg-zinc-100 font-bold border-b border-zinc-950 text-left">
                        <th className="p-1 border-r border-zinc-950">Degree</th>
                        <th className="p-1 border-r border-zinc-950">Institute</th>
                        <th className="p-1 border-r border-zinc-950 text-center">Year</th>
                        <th className="p-1 text-center">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-200">
                        <td className="p-1 font-semibold border-r border-zinc-950">B.Tech Computer Science</td>
                        <td className="p-1 border-r border-zinc-950">Indian Institute of Technology (IIT)</td>
                        <td className="p-1 border-r border-zinc-950 text-center">2021 – 2025</td>
                        <td className="p-1 text-center font-bold">8.92 / 10.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* TECHNICAL SKILLS SECTION (Partially readable) */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 border-b border-zinc-950 pb-0.5 mb-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
                    <h3 className="text-[11px] font-black uppercase tracking-wider">TECHNICAL SKILLS</h3>
                  </div>
                  <div className="space-y-0.5 text-[9.5px] leading-relaxed">
                    <p>
                      <strong className="font-bold">Languages & Core:</strong> Python, TypeScript, JavaScript, Go, SQL, C++
                    </p>
                    <p>
                      <strong className="font-bold">Frameworks & Cloud:</strong> Next.js 16, React 19, FastAPI, PostgreSQL, Neon, Docker, TailwindCSS
                    </p>
                  </div>
                </div>

                {/* EXPERIENCE SECTION (Starts visible, blends into blur) */}
                <div>
                  <div className="flex items-center gap-1 border-b border-zinc-950 pb-0.5 mb-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
                    <h3 className="text-[11px] font-black uppercase tracking-wider">WORK EXPERIENCE</h3>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between font-bold text-[10px]">
                      <span>Software Engineering Intern • Google / Apex Cloud</span>
                      <span className="text-zinc-600 font-mono">May 2024 – Aug 2024</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-[9.5px] text-zinc-800 leading-normal">
                      <li>
                        Architected high-throughput distributed microservice indexing <strong>12M+ daily events</strong>, reducing query latency by <strong>43%</strong>.
                      </li>
                      <li>
                        Spearheaded zero-downtime database migration to serverless PostgreSQL cluster, saving <strong>$18,000/yr</strong> in infrastructure costs.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* ================================================================= */}
                {/* FROSTED GLASS LOCK OVERLAY: Covers lower ~55% of the resume       */}
                {/* ================================================================= */}
                {!isUnlocked && (
                  <div className="absolute inset-x-0 bottom-0 top-[42%] z-30 bg-gradient-to-t from-white via-white/95 to-white/60 backdrop-blur-[6px] flex flex-col items-center justify-center p-6 text-center">
                    <div className="max-w-sm space-y-3.5 p-5 rounded-2xl bg-[#090b10] text-white border border-emerald-500/30 shadow-2xl">
                      <div className="h-10 w-10 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Lock className="h-5 w-5" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-extrabold text-white">
                          Unlock Full Resume & Edit in Studio
                        </h4>
                        <p className="text-[11px] text-zinc-300 leading-snug">
                          Provide your email to view the complete unblurred FAANG resume, export free PDFs, and access all AI tools.
                        </p>
                      </div>

                      <form onSubmit={handleUnlock} className="space-y-2">
                        <div className="flex items-center gap-1.5 bg-[#141722] p-1 rounded-xl border border-white/15 focus-within:border-emerald-400">
                          <input
                            type="email"
                            required
                            placeholder="Enter your email address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-transparent px-2.5 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none"
                          />
                          <button
                            type="submit"
                            disabled={submitting}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-[#090b0e] text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                          >
                            {submitting ? "Saving..." : "Unlock"}
                          </button>
                        </div>
                        {unlockMessage && (
                          <p className="text-[10px] font-mono text-emerald-400">✓ {unlockMessage}</p>
                        )}
                      </form>

                      <div className="pt-1 border-t border-white/10 flex items-center justify-center gap-3 text-[10px] text-zinc-400 font-mono">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ShieldCheck className="h-3 w-3" /> Stored in Neon DB
                        </span>
                        <span>•</span>
                        <span>100% Free Access</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* If unlocked, show floating success badge */}
                {isUnlocked && (
                  <div className="absolute bottom-4 right-4 z-30">
                    <Link
                      href="/resume"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-extrabold text-xs shadow-2xl hover:scale-105 transition-all"
                    >
                      <Unlock className="h-3.5 w-3.5" />
                      <span>Unlocked! Open Studio</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 CORE FEATURES GRID                                                      */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            ENGINEERED FOR SENIOR IMPACT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            5 Core Capabilities That Beat Generic AI Resume Makers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: One-Click LinkedIn & GitHub */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              1. One-Click LinkedIn & GitHub Importer
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Auto-fetch your repos, star counts, tech stacks, and career milestones from LinkedIn and GitHub with a single click. Zero manual data entry.
            </p>
          </div>

          {/* Card 2: Real-Time Job Match & Heatmap */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="h-10 w-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
              2. Real-Time Job Match & Heatmap
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Paste target Job Descriptions to calculate your ATS match percentage and see a color-coded Keyword Heatmap. 1-click auto-injects missing skills.
            </p>
          </div>

          {/* Card 3: Google X-Y-Z AI Bullet Polish */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              3. Google X-Y-Z Formula AI Polish
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Transform weak bullets into FAANG gold using Google&apos;s formula: &quot;Accomplished [X] as measured by [Y], by doing [Z]&quot; with high-impact verbs.
            </p>
          </div>

          {/* Card 4: Header QR Code */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <QrIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              4. Subtle QR Code on Resume Header
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              An optional, crisp vector QR code in the resume header allows hiring managers to scan your printed resume and instantly view your live portfolio.
            </p>
          </div>

          {/* Card 5: Hosted Public Web Resume */}
          <div className="p-5 rounded-2xl bg-[#0f1118] border border-white/10 hover:border-emerald-500/40 transition-all space-y-3 group">
            <div className="h-10 w-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
              5. Hosted Public Web Resume
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Instantly publish a responsive public web version of your resume to share on LinkedIn, social profiles, and recruiter emails with 1-click sharing.
            </p>
          </div>

          {/* Card 6: Zero Login Instant Export */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-[#0f1118] to-[#0f1118] border border-emerald-500/30 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Instant PDF & Zero Login Required
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Generate pixel-perfect A4, US-Letter, or Legal PDFs directly in your browser. All data stored safely with auto-delete options.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BOTTOM BANNER: Link to Production Deployment & Creator Credit             */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d1017] via-[#131724] to-[#0d1017] border border-emerald-500/30 shadow-2xl text-center space-y-4">
        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Ready to compile your winning FAANG resume?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300">
            Open the studio now, import your data, or inspect the live platform on Vercel.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/resume"
            className="px-6 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer"
          >
            Launch Resume Studio Now 🚀
          </Link>

          <a
            href="https://career-compiler-ai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#181d2a] hover:bg-[#22293b] text-white border border-white/20 text-xs font-bold transition-all hover:scale-105"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span>career-compiler-ai.vercel.app</span>
            <ExternalLink className="h-3 w-3 text-zinc-400" />
          </a>
        </div>
      </section>
    </div>
  );
}
