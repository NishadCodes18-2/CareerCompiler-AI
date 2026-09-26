"use client";

import React from "react";
import { GithubIcon } from "./GithubIcon";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="no-print fixed bottom-[50px] lg:bottom-0 left-0 right-0 z-40 w-full border-t border-white/10 bg-[#07090d]/95 backdrop-blur-xl py-2 px-3 sm:px-6 text-xs text-zinc-400 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand info */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="h-3 w-3" />
          </div>
          <span className="font-bold text-white tracking-tight text-[11px] sm:text-xs">CareerCompiler AI</span>
          <span className="text-zinc-500 text-[10px] hidden md:inline">&bull; Evidence-Backed Career Platform</span>
        </div>

        {/* Center / Right: Made with ❤️ by Nishad Patil with GitHub */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 text-zinc-300 text-[11px] sm:text-xs">
          <span>Made with</span>
          <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline-block animate-pulse shrink-0" />
          <span>by</span>
          <a
            href="https://github.com/NishadCodes18"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 text-white font-semibold transition-all hover:scale-105 group text-[11px] sm:text-xs"
          >
            <GithubIcon className="h-3.5 w-3.5 text-emerald-400 group-hover:rotate-12 transition-transform shrink-0" />
            <span>Nishad Patil</span>
            <span className="text-emerald-400 font-mono text-[10px] hidden sm:inline">(@NishadCodes18)</span>
            <span className="text-zinc-500 group-hover:text-emerald-400 transition-colors text-[10px]">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
