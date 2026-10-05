"use client";

import React from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, Play, Layers } from "lucide-react";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (destination: string) => void;
}

export default function DemoVideoModal({
  isOpen,
  onClose,
  onActionClick,
}: DemoVideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/15 bg-[#0e111a] shadow-2xl overflow-hidden flex flex-col text-left">
        {/* Modal Chrome Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#08090e]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs font-mono text-slate-300">
              Interactive Product Walkthrough · CareerCompiler AI
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Interactive Stage */}
        <div className="p-6 sm:p-8 space-y-6">
          <div
            onClick={() => {
              onClose();
              onActionClick("/resume");
            }}
            className="relative aspect-[16/9] rounded-xl overflow-hidden bg-black border border-white/10 flex flex-col items-center justify-center text-center p-6 cursor-pointer group hover:border-violet-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/40 via-transparent to-emerald-950/20" />
            <div className="relative z-10 space-y-4 max-w-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-violet-600/30 group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Watch 3-Minute Platform Demo
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                See how CareerCompiler connects to your GitHub repositories, parses AST code tokens to verify technical claims, and outputs pixel-perfect LaTeX PDF resumes with 98+ ATS pass rates. 100% free and open-source.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onActionClick("/resume");
                  }}
                  className="gradient-button px-6 py-3 rounded-xl text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg"
                >
                  Skip to Live Studio
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
              <span className="font-mono text-violet-400 font-bold block mb-1">
                STEP 01
              </span>
              <span className="text-white font-semibold block mb-1">
                Repo Evidence Sync
              </span>
              <span className="text-slate-400">
                Extract commits, PRs, and system benchmark stats automatically.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
              <span className="font-mono text-emerald-400 font-bold block mb-1">
                STEP 02
              </span>
              <span className="text-white font-semibold block mb-1">
                ATS Metric Synthesis
              </span>
              <span className="text-slate-400">
                STAR phrasing with throughput gains, latency drops, and scale numbers.
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
              <span className="font-mono text-cyan-400 font-bold block mb-1">
                STEP 03
              </span>
              <span className="text-white font-semibold block mb-1">
                1-Click LaTeX PDF & Link
              </span>
              <span className="text-slate-400">
                Single-column ATS formatting with scannable cryptographic proof.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
