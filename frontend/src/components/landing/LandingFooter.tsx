"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mail,
  ExternalLink,
  Layers,
  Heart
} from "lucide-react";
import ParticleCanvas from "../ParticleCanvas";
import { GithubIcon } from "../GithubIcon";

interface LandingFooterProps {
  onActionClick: (destination: string) => void;
}

export default function LandingFooter({ onActionClick }: LandingFooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-black text-slate-400 border-t border-white/10">
      {/* Top Banner Particle Canvas */}
      <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none overflow-hidden">
        <ParticleCanvas particleCount={45} />
      </div>

      {/* Radial Top Glow */}
      <div
        className="absolute inset-x-0 top-0 h-96 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(139, 92, 246, 0.4), transparent 70%)",
        }}
      />

      {/* Giant CTA Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pt-24 lg:pt-36 pb-20 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-black tracking-tight mb-6 leading-[1] text-white">
          Ready to compile your career into verified proof?
        </h2>
        <p className="text-base sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-normal">
          Stop losing interview callbacks to generic bullet points and broken ATS screeners. Test 7 days free, then stay free forever on Starter.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onActionClick("/resume")}
            className="gradient-button inline-flex items-center justify-center rounded-[11px] text-base text-white font-sans font-bold px-8 py-4 gap-2.5 group cursor-pointer w-full sm:w-auto shadow-2xl"
          >
            Start compiling free
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => onActionClick("/interview")}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/15 text-white font-semibold rounded-xl transition-all hover:bg-white/10 bg-white/5 cursor-pointer w-full sm:w-auto text-sm"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            Try Interview Prep AI
          </button>
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 pt-10 border-t border-white/[0.08]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10 lg:gap-8 text-left">
          {/* Brand Column: 2 Cols */}
          <div className="col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 p-[1px]">
                <div className="h-full w-full bg-[#0a0c14] rounded-[11px] flex items-center justify-center">
                  <Layers className="h-4 w-4 text-violet-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                CareerCompiler<span className="text-violet-500">AI</span>
              </span>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Evidence-backed AI career intelligence and resume compilation platform. Powered by verified code repositories and target FAANG role rubrics.
            </p>

            <div>
              <span className="pearl-badge inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full cursor-default">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                AI Security aligned w/ ISO 27001 & SOC-2
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/NishadCodes18/CareerCompiler-AI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-500/50 transition-all"
              >
                <GithubIcon className="w-4 h-4 text-current" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-500/50 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:support@careercompiler.ai"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-500/50 transition-all"
                title="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Created by badge */}
            <div className="pt-2">
              <a
                href="https://github.com/NishadCodes18"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 hover:border-violet-400 transition-colors"
              >
                <span>Built with</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>by Nishad Patil (@NishadCodes18)</span>
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="col-span-1 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white mb-4">Product</h3>
            <p>
              <button
                onClick={() => scrollToSection("workflow")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Workflow
              </button>
            </p>
            <p>
              <button
                onClick={() => scrollToSection("screenshots")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Screenshots
              </button>
            </p>
            <p>
              <button
                onClick={() => scrollToSection("use-cases")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Use Cases
              </button>
            </p>
            <p>
              <button
                onClick={() => scrollToSection("demo")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                STAR Demo
              </button>
            </p>
            <p>
              <button
                onClick={() => scrollToSection("pricing")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Pricing
              </button>
            </p>
          </div>

          {/* Col 3: Platform */}
          <div className="col-span-1 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white mb-4">Platform</h3>
            <p>
              <Link href="/resume" className="hover:text-white transition-colors">
                Resume Studio
              </Link>
            </p>
            <p>
              <Link href="/evidence" className="hover:text-white transition-colors">
                Evidence Graph
              </Link>
            </p>
            <p>
              <Link href="/analysis" className="hover:text-white transition-colors">
                ATS Auditor
              </Link>
            </p>
            <p>
              <Link href="/interview" className="hover:text-white transition-colors">
                Interview Prep
              </Link>
            </p>
            <p>
              <Link href="/jobs" className="hover:text-white transition-colors">
                Job Tailoring
              </Link>
            </p>
          </div>

          {/* Col 4: Integrations */}
          <div className="col-span-1 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white mb-4">Integrations</h3>
            <p className="hover:text-white transition-colors cursor-default">
              GitHub Sync
            </p>
            <p className="hover:text-white transition-colors cursor-default">
              LeetCode & HackerRank
            </p>
            <p className="hover:text-white transition-colors cursor-default">
              Claude Code MCP
            </p>
            <p className="hover:text-white transition-colors cursor-default">
              Overleaf LaTeX
            </p>
            <p className="hover:text-white transition-colors cursor-default">
              Supabase Vector DB
            </p>
          </div>

          {/* Col 5: Legal */}
          <div className="col-span-1 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white mb-4">Legal</h3>
            <p className="hover:text-white transition-colors cursor-default">
              Privacy Policy
            </p>
            <p className="hover:text-white transition-colors cursor-default">
              Terms of Service
            </p>
            <p className="hover:text-white transition-colors cursor-default">
              Security & Encryption
            </p>
            <p className="hover:text-white transition-colors cursor-default">
              GDPR Compliance
            </p>
          </div>

          {/* Col 6: Partner */}
          <div className="col-span-2 md:col-span-1 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white mb-4">Official Deployment</h3>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                Vercel Production
              </span>
              <a
                href="https://career-compiler-ai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-violet-400 flex items-center gap-1 font-semibold text-xs"
              >
                career-compiler-ai.vercel.app
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CareerCompiler AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300 font-mono">All neural compiler systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
