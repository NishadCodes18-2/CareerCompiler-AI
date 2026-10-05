"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Play,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Terminal,
  Cpu,
  Globe,
  Database,
  Code2
} from "lucide-react";
import ParticleCanvas from "../ParticleCanvas";
import { GithubIcon } from "../GithubIcon";

interface HeroSectionProps {
  onActionClick: (destination: string) => void;
  onWatchDemo: () => void;
}

export default function HeroSection({ onActionClick, onWatchDemo }: HeroSectionProps) {
  const [emailInput, setEmailInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [savedEmail, setSavedEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [unlockSuccess, setUnlockSuccess] = useState("");
  const [unlockError, setUnlockError] = useState("");

  useEffect(() => {
    const checkEmail = () => {
      const email =
        localStorage.getItem("careercompiler_user_email") ||
        localStorage.getItem("careercompiler_email_unlocked");
      if (email) {
        setIsUnlocked(true);
        setSavedEmail(email);
      }
    };
    checkEmail();
    window.addEventListener("storage", checkEmail);
    window.addEventListener("email_saved", checkEmail);
    return () => {
      window.removeEventListener("storage", checkEmail);
      window.removeEventListener("email_saved", checkEmail);
    };
  }, []);

  const handleUnlockEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setUnlockError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    setUnlockError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      // Send lead to backend
      await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          source: "hero_direct_unlock",
          metadata_json: {
            destination: "/resume",
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.warn("Backend lead notice:", err));

      // Persist in localStorage and pre-seed resume data
      localStorage.setItem("careercompiler_user_email", emailInput);
      localStorage.setItem("careercompiler_email_unlocked", emailInput);
      sessionStorage.setItem("careercompiler_user_email", emailInput);

      let resumeData: any = {};
      const existingDataStr =
        sessionStorage.getItem("gold_resume_data") ||
        localStorage.getItem("gold_resume_data");
      if (existingDataStr) {
        try {
          resumeData = JSON.parse(existingDataStr);
        } catch (err) {}
      }

      if (!resumeData.personal) resumeData.personal = {};
      resumeData.personal.email = emailInput;
      if (!resumeData.personal.fullName) {
        const namePart = emailInput.split("@")[0].replace(/[._]/g, " ");
        resumeData.personal.fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      }

      sessionStorage.setItem("gold_resume_data", JSON.stringify(resumeData));
      localStorage.setItem("gold_resume_data", JSON.stringify(resumeData));

      setIsUnlocked(true);
      setSavedEmail(emailInput);
      setUnlockSuccess("✓ Studio Unlocked! Launching Resume Studio...");

      window.dispatchEvent(new Event("email_saved"));
      window.dispatchEvent(new Event("avatar_updated"));

      setTimeout(() => {
        onActionClick("/resume");
      }, 650);
    } catch (err) {
      console.error(err);
      onActionClick("/resume");
    } finally {
      setSubmitting(false);
    }
  };
  const integrations = [
    {
      name: "GitHub Sync",
      desc: "Live Commits & PRs",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-zinc-800 text-white">
          <GithubIcon className="w-4 h-4 text-white" />
        </div>
      ),
    },
    {
      name: "LeetCode & DSA",
      desc: "Rankings & Submissions",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
          <Code2 className="w-4 h-4 text-amber-400" />
        </div>
      ),
    },
    {
      name: "LaTeX PDF Engine",
      desc: "Pixel-Perfect Typography",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-serif font-black text-xs">
          Tx
        </div>
      ),
    },
    {
      name: "Supabase Vector DB",
      desc: "Semantic Career Graph",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <Database className="w-4 h-4 text-emerald-400" />
        </div>
      ),
    },
    {
      name: "Claude 3.7 Sonnet",
      desc: "STAR Quantification",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 font-bold text-xs">
          C3
        </div>
      ),
    },
    {
      name: "Gemini 2.5 Pro",
      desc: "ATS Auditor & Rubrics",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
          <Sparkles className="w-4 h-4 text-blue-400" />
        </div>
      ),
    },
    {
      name: "Overleaf & CLI",
      desc: "LaTeX Code Export",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
          <Terminal className="w-4 h-4 text-rose-400" />
        </div>
      ),
    },
    {
      name: "Cryptographic QR",
      desc: "Recruiter Verification",
      icon: (
        <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
        </div>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-between pt-28 lg:pt-32 pb-12">
      {/* Background Interactive Particles */}
      <ParticleCanvas particleCount={60} />

      {/* Atmospheric Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-violet-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Main Hero Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        {/* Pearl Badge Header */}
        <div className="mb-6 flex justify-center">
          <span className="pearl-badge inline-flex items-center gap-2.5 text-xs font-semibold pl-4 pr-5 py-2 rounded-full cursor-default hover:scale-105 transition-transform duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="tracking-wide">ATS 2025 Ready · Cryptographic Proof · IIT & FAANG Verified</span>
          </span>
        </div>

        {/* Hero Headline with Animated Words */}
        <div className="relative mb-6 mx-auto max-w-5xl">
          <h1 className="text-[clamp(2.5rem,6.5vw,5.2rem)] font-sans font-black leading-[1.05] tracking-tight text-white">
            <span className="block">Win interviews faster.</span>
            <span className="block mt-1">
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-emerald-300">
                <span className="inline-block animate-char-in whitespace-nowrap">
                  From verified evidence.
                </span>
              </span>
            </span>
            <span className="block text-violet-500 mt-1">All in one platform.</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
          Connect your GitHub, repositories, and technical projects – CareerCompiler AI synthesizes ATS-crushing resumes with quantified STAR impact. Plus real-time evidence graph, interview defense, and instant PDF compilation in one app.
        </p>

        {/* Email Unlock & Quick Access Bar */}
        <div className="relative z-20 max-w-lg mx-auto w-full mb-6">
          {isUnlocked ? (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    Studio Unlocked: {savedEmail}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    All FAANG templates & AI models active
                  </span>
                </div>
              </div>
              <button
                onClick={() => onActionClick("/resume")}
                className="gradient-button px-4 py-2 rounded-xl text-white font-bold text-xs shrink-0 cursor-pointer inline-flex items-center gap-1.5"
              >
                Open Studio
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleUnlockEmail}
              className="p-1.5 sm:p-2 rounded-2xl bg-[#0c0e15]/90 border border-white/15 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative w-full flex-1">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    if (unlockError) setUnlockError("");
                  }}
                  placeholder="Enter your email to unlock AI studio..."
                  className="w-full pl-4 pr-3 py-3 text-sm rounded-xl bg-transparent text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-violet-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="gradient-button w-full sm:w-auto px-6 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shrink-0 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Unlocking...</span>
                ) : (
                  <>
                    <span>Unlock Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {unlockSuccess && (
            <div className="mt-2 text-xs font-mono text-emerald-400 font-semibold flex items-center justify-center gap-1.5 animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {unlockSuccess}
            </div>
          )}

          {unlockError && (
            <div className="mt-2 text-xs font-mono text-rose-400 font-semibold">
              {unlockError}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto w-full">
          <button
            onClick={() => onActionClick("/signup")}
            className="gradient-button inline-flex items-center justify-center rounded-[11px] text-white font-sans font-bold px-7 py-3 text-sm w-full sm:w-auto gap-2 group cursor-pointer"
          >
            Start 7 days free
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onWatchDemo}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-semibold rounded-xl text-sm transition-all hover:scale-[1.02] w-full sm:w-auto cursor-pointer backdrop-blur-sm"
          >
            <Play className="w-4 h-4 text-violet-400 fill-violet-400/30" />
            Watch Demo
          </button>
        </div>

        {/* Trust subtext */}
        <p className="mt-4 text-xs text-slate-400 font-mono">
          No credit card required · Share via recruiter link · Direct PDF & LaTeX export
        </p>

        {/* Social Proof Channels */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <a
            href="https://github.com/NishadCodes18/CareerCompiler-AI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-500/50 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <GithubIcon className="w-5 h-5 text-current" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-500/50 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-500/50 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Infinite Logo Marquee */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-14">
        <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-5 text-center">
          Engineered for Modern Engineering Standards & Frameworks
        </p>

        <div
          className="relative w-full overflow-hidden py-3"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div className="animate-marquee-slow items-center gap-12 lg:gap-16 opacity-90 hover:opacity-100 transition-opacity">
            {/* First set */}
            <div className="flex shrink-0 items-center gap-12 lg:gap-16">
              {integrations.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0">
                  {item.icon}
                  <div className="text-left">
                    <span className="text-sm font-semibold text-slate-200 block whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block whitespace-nowrap">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cloned set for seamless infinite loop */}
            <div className="flex shrink-0 items-center gap-12 lg:gap-16" aria-hidden="true">
              {integrations.map((item, idx) => (
                <div key={`clone-${idx}`} className="flex items-center gap-3 shrink-0">
                  {item.icon}
                  <div className="text-left">
                    <span className="text-sm font-semibold text-slate-200 block whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block whitespace-nowrap">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
