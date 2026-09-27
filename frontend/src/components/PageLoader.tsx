"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Terminal, ShieldCheck, Cpu } from "lucide-react";

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState("Initializing Career Compiler...");

  useEffect(() => {
    setMounted(true);

    // Only display once per browser session to ensure fast subsequent navigations
    const hasSeenLoader = sessionStorage.getItem("careercompiler_boot_seen");
    if (hasSeenLoader) {
      setVisible(false);
      return;
    }

    const steps = [
      { p: 35, text: "Compiling GitHub verified evidence graph..." },
      { p: 68, text: "Calibrating FAANG standard A4 typography..." },
      { p: 92, text: "Locking ATS keyword compliance..." },
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
          setVisible(false);
          sessionStorage.setItem("careercompiler_boot_seen", "true");
        }, 350);
      }
    }, 220);

    return () => clearInterval(interval);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080b] text-white transition-opacity duration-500">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center space-y-6">
        {/* Animated Brand Emblem */}
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-[1.5px] shadow-2xl shadow-emerald-500/30 animate-pulse">
            <div className="h-full w-full bg-[#0a0d13] rounded-[14.5px] flex items-center justify-center">
              <Cpu className="h-8 w-8 text-emerald-400 animate-spin-slow" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-[#07080b] flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-black" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xl font-black tracking-tight text-white font-sans">
              CareerCompiler<span className="text-emerald-400">AI</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Evidence-Backed Career Proof Engine
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-full space-y-2">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-300 ease-out shadow-sm shadow-emerald-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span className="truncate pr-2 text-zinc-300 flex items-center gap-1">
              <Terminal className="h-3 w-3 text-emerald-400 shrink-0" />
              {statusText}
            </span>
            <span className="font-bold text-emerald-400">{progress}%</span>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono">
          <ShieldCheck className="h-3 w-3" />
          <span>Zero Hallucinations • FAANG Standard</span>
        </div>
      </div>
    </div>
  );
}
