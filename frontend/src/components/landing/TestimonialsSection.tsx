"use client";

import React from "react";
import { Star, ShieldCheck, ExternalLink } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      author: "Alex Chen",
      role: "L5 Software Engineer @ Google",
      source: "Google Review",
      text: "Turned my messy GitHub commit logs into high-impact STAR bullets that passed Google and Stripe recruiter screens. Landed 3 FAANG offers within 4 weeks.",
    },
    {
      author: "Priya Sharma",
      role: "Incoming SWE @ Microsoft",
      source: "Trustpilot",
      text: "The ATS screener score is frighteningly accurate. It caught 6 missing cloud keywords in my resume that were getting me auto-filtered. Absolute must-have.",
    },
    {
      author: "Jordan Miller",
      role: "Senior Distributed Systems Lead",
      source: "Product Hunt",
      text: "The cryptographic proof link blew away my interviewers. They could literally verify my raft consensus benchmark data on the spot during my system design loop.",
    },
    {
      author: "Devin Vance",
      role: "Staff Infrastructure Engineer",
      source: "Trustpilot",
      text: "LaTeX PDF compilation is flawless. Zero awkward line wraps or margin glitches. Exported directly to Overleaf and submitted with total confidence.",
    },
    {
      author: "Ananya Iyer",
      role: "Backend Engineer @ Uber",
      source: "Google Review",
      text: "I used to spend 10+ hours per week manually tailoring resumes for each job posting. CareerCompiler does it in 30 seconds with 10x better metric phrasing.",
    },
    {
      author: "Marcus Brody",
      role: "Lead DevOps / SRE @ FinTech",
      source: "Product Hunt",
      text: "Clean, blazing fast, and the MCP integration into Claude Code is unbelievable. I can generate resumes straight from my terminal while coding.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#07080b] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header and Rating Badges */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20 text-left">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-slate-400 mb-4">
              <span className="w-8 h-px bg-violet-400" />
              Developer & Recruiter Reviews
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
              What top engineers say
            </h2>
          </div>

          {/* Ratings Badges */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Google / Rating Card */}
            <div className="flex flex-col items-center justify-center gap-1.5 h-[104px] w-[116px] rounded-2xl bg-[#0c0e15] border border-white/10 p-3 shadow-lg">
              <span className="text-xs font-bold text-slate-300 font-mono">
                Google
              </span>
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-white font-mono">5.0 / 5.0</span>
            </div>

            {/* Product Hunt / Trustpilot Card */}
            <div className="flex flex-col items-center justify-center gap-1.5 h-[104px] w-[116px] rounded-2xl bg-[#0c0e15] border border-white/10 p-3 shadow-lg">
              <span className="text-xs font-bold text-slate-300 font-mono">
                Trustpilot
              </span>
              <div className="flex gap-0.5 text-emerald-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-bold text-white font-mono">Verified</span>
            </div>
          </div>
        </div>

        {/* Infinite Reviews Marquee */}
        <div
          className="relative -mx-6 px-6 lg:-mx-12 lg:px-12 overflow-hidden py-4"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="animate-marquee-testimonials flex gap-6 lg:gap-8 items-stretch">
            {/* First Set */}
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="shrink-0 w-[85vw] sm:w-[380px] lg:w-[350px] flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0e15] border border-white/10 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-600/10 transition-all text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      {rev.source}
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed mb-6">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold text-white text-sm">{rev.author}</div>
                  <div className="text-xs text-slate-400">{rev.role}</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Candidate
                  </div>
                </div>
              </div>
            ))}

            {/* Cloned Set */}
            {reviews.map((rev, idx) => (
              <div
                key={`clone-${idx}`}
                aria-hidden="true"
                className="shrink-0 w-[85vw] sm:w-[380px] lg:w-[350px] flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0e15] border border-white/10 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-600/10 transition-all text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      {rev.source}
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed mb-6">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold text-white text-sm">{rev.author}</div>
                  <div className="text-xs text-slate-400">{rev.role}</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Candidate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
