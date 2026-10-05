"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Terminal, ShieldCheck, Layers } from "lucide-react";

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(18);
  const [statusText, setStatusText] = useState("Initializing CareerCompiler AI engine...");

  useEffect(() => {
    setMounted(true);

    const steps = [
      { p: 38, text: "Compiling verified evidence graph..." },
      { p: 72, text: "Calibrating FAANG standard A4 typography..." },
      { p: 94, text: "Locking ATS 98+ keyword compliance..." },
      { p: 100, text: "Ready." },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStatusText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
          }, 400);
        }, 250);
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080b] text-white transition-opacity duration-400 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background ambient radial glow matching landing page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/10 to-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center space-y-6">
        {/* Animated Brand Emblem */}
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-emerald-400 p-[1.5px] shadow-2xl shadow-violet-600/30 animate-pulse">
            <div className="h-full w-full bg-[#0a0c14] rounded-[14.5px] flex items-center justify-center">
              <Layers className="h-8 w-8 text-violet-400 animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-[#07080b] flex items-center justify-center shadow-md">
            <Sparkles className="h-3 w-3 text-black" />
          </div>
        </div>

        {/* Title matching Navbar & Landing */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
              CareerCompiler<span className="text-violet-500">AI</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Evidence-Backed Career Proof Engine
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full space-y-2">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-400 rounded-full transition-all duration-300 ease-out shadow-sm shadow-violet-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="truncate pr-2 text-slate-300 flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-violet-400 shrink-0" />
              {statusText}
            </span>
            <span className="font-bold text-violet-400">{progress}%</span>
          </div>
        </div>

        {/* Security badge matching landing theme */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] text-emerald-400 font-mono">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Zero Hallucinations • FAANG Standard ATS 98+</span>
        </div>
      </div>
    </div>
  );
}
