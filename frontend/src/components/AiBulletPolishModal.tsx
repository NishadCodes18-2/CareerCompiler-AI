"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  Cpu,
  RefreshCw,
  Copy
} from "lucide-react";

interface AiBulletPolishModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  onApply: (polishedText: string) => void;
}

const POWER_ACTION_VERBS = [
  "Architected", "Spearheaded", "Engineered", "Accelerated", "Orchestrated",
  "Optimized", "Overhauled", "Decoupled", "Streamlined", "Pioneered",
  "Automated", "Standardized", "Consolidated", "Formulated", "Scaled"
];

const METRIC_BOOSTERS = [
  "reducing query latency by 43%",
  "handling 15M+ daily requests with 99.99% SLA",
  "saving $24,000/yr in serverless infrastructure overhead",
  "accelerating release cycles from 2 weeks to 2 hours",
  "increasing API throughput by 3.2x across 8 worker clusters",
  "driving 94% test coverage across 20 mission-critical endpoints"
];

export default function AiBulletPolishModal({
  isOpen,
  onClose,
  originalText,
  onApply,
}: AiBulletPolishModalProps) {
  const [selectedVerb, setSelectedVerb] = useState("Architected");
  const [selectedMetric, setSelectedMetric] = useState("reducing query latency by 43%");
  const [customAction, setCustomAction] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate Google X-Y-Z Formula variation
  const generatedPolish = React.useMemo(() => {
    const cleanText = originalText
      .replace(/^\s*[-•*]\s*/, "")
      .replace(/\*\*/g, "")
      .trim();

    if (!cleanText) {
      return `${selectedVerb} distributed cloud pipeline using modern microservices, ${selectedMetric}, by automating end-to-end task orchestration.`;
    }

    // Transform cleanText into X-Y-Z formula
    return `${selectedVerb} ${cleanText.replace(/^(built|created|made|worked on|developed|helped|did)\s+/i, "")}, ${selectedMetric}, by engineering fault-tolerant asynchronous microservices.`;
  }, [originalText, selectedVerb, selectedMetric]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPolish);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0f1118] border border-cyan-500/30 shadow-2xl p-5 sm:p-7 space-y-5 text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-[1px] flex items-center justify-center">
              <div className="h-full w-full bg-[#0a0d14] rounded-[11px] flex items-center justify-center text-cyan-400">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Google X-Y-Z Formula AI Bullet Polish
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                &quot;Accomplished [X] as measured by [Y], by doing [Z]&quot;
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Original Bullet */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-black/40 border border-white/10 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block">
            Original Resume Bullet:
          </span>
          <p className="text-zinc-300 font-mono italic">
            &quot;{originalText || "Built scalable data pipelines using AWS and Python."}&quot;
          </p>
        </div>

        {/* Step 1: Select Power Action Verb */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-zinc-300">
            Step 1: Choose FAANG Strong Action Verb
          </label>
          <div className="flex flex-wrap gap-1.5">
            {POWER_ACTION_VERBS.slice(0, 10).map((verb) => (
              <button
                key={verb}
                type="button"
                onClick={() => setSelectedVerb(verb)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedVerb === verb
                    ? "bg-cyan-400 text-black shadow-md shadow-cyan-400/20 scale-105"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {verb}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Quantitative Metric Booster [Y] */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-zinc-300">
            Step 2: Choose Measurable Outcome & Metric [Y]
          </label>
          <div className="space-y-1.5">
            {METRIC_BOOSTERS.map((metric, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedMetric(metric)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  selectedMetric === metric
                    ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold"
                    : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-transparent"
                }`}
              >
                <span>• {metric}</span>
                {selectedMetric === metric && <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Polished FAANG Result */}
        <div className="space-y-2 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-[#101420] to-[#101420] border border-cyan-500/40 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />
              FAANG Caliber Polished Output
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3 w-3 text-cyan-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm text-zinc-100 font-mono leading-relaxed bg-[#0a0d14] p-3 rounded-xl border border-white/10">
            {generatedPolish}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply(generatedPolish);
              onClose();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-black text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer hover:scale-105"
          >
            <Check className="h-4 w-4" />
            <span>Apply to Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
}
