"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  Plus,
  RefreshCw,
  Search
} from "lucide-react";

interface JobMatchScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkills: {
    languages: string;
    frameworks: string;
    cloudDevops: string;
    developerTools: string;
  };
  resumeText: string;
  onInjectSkills: (newSkills: string[]) => void;
}

const COMMON_TECH_KEYWORDS = [
  "Python", "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "FastAPI",
  "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GCP", "Azure",
  "SQL", "GraphQL", "REST APIs", "Microservices", "CI/CD", "Git", "Linux",
  "Kafka", "RabbitMQ", "Elasticsearch", "TailwindCSS", "Terraform", "Java",
  "C++", "Go", "Distributed Systems", "System Design", "Unit Testing", "PyTest",
  "Jest", "Agile", "Scrum", "High Availability", "Performance Optimization"
];

export default function JobMatchScannerModal({
  isOpen,
  onClose,
  currentSkills,
  resumeText,
  onInjectSkills,
}: JobMatchScannerModalProps) {
  const [jobDescription, setJobDescription] = useState(
    `We are seeking a Senior Full-Stack / Backend Engineer to join our Core Platform team.
Requirements:
- Strong experience with Python, FastAPI, and Next.js / React
- Expertise in PostgreSQL, Redis caching, and Docker microservices
- Hands-on experience with Kubernetes, AWS infrastructure, and CI/CD pipelines
- Proven background in Distributed Systems, System Design, and High Availability APIs
- Strong understanding of GraphQL and Unit Testing with PyTest`
  );

  const [injectedCount, setInjectedCount] = useState(0);

  // Parse keywords from job description
  const { matchedKeywords, missingKeywords, score } = useMemo(() => {
    if (!jobDescription.trim()) {
      return { matchedKeywords: [], missingKeywords: [], score: 0 };
    }

    const jdLower = jobDescription.toLowerCase();
    const resumeLower = (
      resumeText +
      " " +
      Object.values(currentSkills).join(" ")
    ).toLowerCase();

    const matched: string[] = [];
    const missing: string[] = [];

    COMMON_TECH_KEYWORDS.forEach((kw) => {
      const kwLower = kw.toLowerCase();
      // Check if keyword is in JD
      if (jdLower.includes(kwLower)) {
        // Check if keyword is in resume
        if (resumeLower.includes(kwLower)) {
          matched.push(kw);
        } else {
          missing.push(kw);
        }
      }
    });

    const totalKeywords = matched.length + missing.length;
    const matchScore =
      totalKeywords > 0 ? Math.round((matched.length / totalKeywords) * 100) : 75;

    return { matchedKeywords: matched, missingKeywords: missing, score: matchScore };
  }, [jobDescription, currentSkills, resumeText]);

  if (!isOpen) return null;

  const handleInjectMissing = (kw: string) => {
    onInjectSkills([kw]);
    setInjectedCount((prev) => prev + 1);
  };

  const handleInjectAllMissing = () => {
    if (missingKeywords.length > 0) {
      onInjectSkills(missingKeywords);
      setInjectedCount((prev) => prev + missingKeywords.length);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f1118] border border-emerald-500/30 shadow-2xl p-5 sm:p-7 space-y-5 text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] flex items-center justify-center">
              <div className="h-full w-full bg-[#0a0d14] rounded-[11px] flex items-center justify-center text-emerald-400">
                <Flame className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Real-Time Job Match Scanner & Keyword Heatmap
              </h3>
              <p className="text-xs text-zinc-400">
                Align your resume against any target Job Description to maximize ATS score.
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

        {/* ATS Score Meter */}
        <div className="p-4 rounded-2xl bg-[#141824] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
              Calculated ATS Match Score
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-black ${
                  score >= 80
                    ? "text-emerald-400"
                    : score >= 60
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {score}%
              </span>
              <span className="text-xs font-semibold text-zinc-300">
                {score >= 80
                  ? "🔥 High FAANG Alignment"
                  : score >= 60
                  ? "⚡ Moderate Alignment"
                  : "⚠ Low Alignment (Missing Keywords)"}
              </span>
            </div>
          </div>

          {missingKeywords.length > 0 && (
            <button
              onClick={handleInjectAllMissing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-[#090b0e] text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Auto-Inject All Missing ({missingKeywords.length})</span>
            </button>
          )}
        </div>

        {/* Input: Job Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-zinc-300 flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5 text-emerald-400" />
              <span>Target Job Description (JD)</span>
            </label>
            <span className="text-[11px] text-zinc-500 font-mono">
              Paste your target role requirements below
            </span>
          </div>
          <textarea
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste full job description from LinkedIn, Indeed, or company careers page..."
            className="w-full p-3 rounded-xl bg-[#090b10] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 font-mono"
          />
        </div>

        {/* Keyword Heatmap Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs pb-1">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] font-mono">
              Live Keyword Heatmap
            </span>
            <div className="flex items-center gap-3 text-[10.5px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Matched ({matchedKeywords.length})
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                Missing in Resume ({missingKeywords.length})
              </span>
            </div>
          </div>

          {/* Matched Keywords (Green) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
              ✓ Successfully Matched in Your Resume:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {matchedKeywords.length > 0 ? (
                matchedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {kw}
                  </span>
                ))
              ) : (
                <span className="text-xs text-zinc-500 italic">No keyword matches yet.</span>
              )}
            </div>
          </div>

          {/* Missing Keywords (Red / Click to inject) */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">
              ⚠ Missing in Resume (Click to 1-Click Inject):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {missingKeywords.length > 0 ? (
                missingKeywords.map((kw, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleInjectMissing(kw)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono transition-all hover:scale-105 cursor-pointer group"
                    title={`Click to add ${kw} into your Technical Skills`}
                  >
                    <Plus className="h-3 w-3 text-rose-400 group-hover:rotate-90 transition-transform" />
                    <span>{kw}</span>
                    <span className="text-[9px] text-rose-400/80 underline ml-0.5">add</span>
                  </button>
                ))
              ) : (
                <span className="text-xs text-emerald-400 font-semibold">
                  🎉 Outstanding! Your resume contains 100% of detected JD keywords!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <span>{injectedCount > 0 ? `✓ Added ${injectedCount} skills to resume` : "Click any missing skill to auto-inject"}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
