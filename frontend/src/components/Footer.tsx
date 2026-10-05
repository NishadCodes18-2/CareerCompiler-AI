"use client";

import React from "react";
import { GithubIcon } from "./GithubIcon";
import { Sparkles, Heart, ExternalLink, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="no-print fixed bottom-[52px] lg:bottom-0 left-0 right-0 z-40 w-full border-t border-white/[0.08] bg-[#07080b]/95 backdrop-blur-2xl py-2 px-3 sm:px-6 text-xs text-slate-400 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Brand info & Canonical live link */}
        <div className="flex items-center gap-2">
          <a
            href="https://career-compiler-ai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/30 text-violet-300 transition-all hover:scale-105 group"
            title="Official Live Production Deployment"
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <Globe className="h-3 w-3 text-violet-400" />
            <span className="font-bold text-white text-[11px] sm:text-xs">
              career-compiler-ai.vercel.app
            </span>
            <ExternalLink className="h-2.5 w-2.5 text-violet-400/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <span className="text-slate-500 text-[10px] hidden md:inline font-mono">
            &bull; FAANG-Caliber Resume Studio
          </span>
        </div>

        {/* Right: Made with by Nishad Patil with glowing highlights */}
        <div className="flex items-center gap-2">
          <div className="relative inline-flex items-center gap-1.5 p-1 px-3 rounded-full bg-white/[0.03] border border-white/10 shadow-lg text-slate-300 text-[11px] sm:text-xs">
            <span className="text-slate-400 font-medium">Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline-block animate-pulse shrink-0" />
            <span className="text-slate-400 font-medium">by</span>

            <a
              href="https://github.com/NishadCodes18"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#12141c] hover:bg-[#181b26] border border-white/15 hover:border-violet-400 text-white font-bold transition-all hover:scale-105 group"
            >
              <GithubIcon className="h-3.5 w-3.5 text-violet-400 group-hover:rotate-12 transition-transform shrink-0" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-200 font-extrabold">
                Nishad Patil
              </span>
              <span className="text-violet-400 font-mono text-[9px] hidden sm:inline px-1 py-0.2 rounded bg-violet-500/20 border border-violet-500/40">
                @NishadCodes18
              </span>
              <ExternalLink className="h-2.5 w-2.5 text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
