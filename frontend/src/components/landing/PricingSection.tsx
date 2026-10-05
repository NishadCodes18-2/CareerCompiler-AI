"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Sparkles, ChevronDown, ChevronUp, Terminal, Cpu } from "lucide-react";

interface PricingSectionProps {
  onActionClick: (destination: string) => void;
}

export default function PricingSection({ onActionClick }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(true);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<number, boolean>>({});

  const toggleFeatures = (idx: number) => {
    setExpandedFeatures((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const plans = [
    {
      num: "01",
      name: "Starter",
      subtitle: "The essential digital baseline for every tech job seeker.",
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        "1 Compiled Master Resume",
        "GitHub Public Repo Import",
        "ATS Score Checker (up to 85)",
        "Standard PDF Export",
        "Community Support",
      ],
      extraFeatures: [
        "Single-column classic layout",
        "Public recruiter preview link",
        "Standard grammar linting",
      ],
      popular: false,
      cta: "Start Free Forever",
    },
    {
      num: "02",
      name: "Pro",
      subtitle: "Full AI quantification & unlimited role tailoring.",
      priceMonthly: 24,
      priceYearly: 19,
      features: [
        "Unlimited Compiled Resumes",
        "Automated STAR Metric Quantification",
        "Deep ATS 98+ Algorithm Audit",
        "Instant Job Description Tailoring",
        "LaTeX PDF & Overleaf Export",
        "Full Cryptographic Evidence Link",
      ],
      extraFeatures: [
        "Workday & Greenhouse rule match",
        "Unlimited Claude 3.7 bullet rewrites",
        "Priority Discord support",
      ],
      popular: false,
      cta: "Start 7-Day Free Trial",
    },
    {
      num: "03",
      name: "Career Accelerator",
      subtitle: "The sweet spot with interview simulation & recruiter dossier.",
      priceMonthly: 49,
      priceYearly: 39,
      features: [
        "Everything in Pro",
        "AI Mock Interview Voice Simulator",
        "FAANG System Design Rubric Feedback",
        "Salary & Offer Negotiation Guide",
        "Dedicated Recruiter Verification Dossier",
        "Early Access to CareerCompiler MCP",
      ],
      extraFeatures: [
        "Personalized technical interview Q&A",
        "Voice transcription & pace analysis",
        "1-on-1 resume audit by Staff SWE",
      ],
      popular: true,
      cta: "Start 7-Day Free Trial",
    },
    {
      num: "04",
      name: "Enterprise / Campus",
      subtitle: "For university cohorts, bootcamps & recruiting teams.",
      priceMonthly: 129,
      priceYearly: 99,
      features: [
        "Everything in Accelerator",
        "Cohort Management Dashboard",
        "Bulk ATS Screener Screening",
        "Custom LaTeX College Branding",
        "Dedicated Account Executive",
        "SSO & Custom Vector DB Sync",
      ],
      extraFeatures: [
        "API access for batch compilation",
        "Placement officer analytics",
        "Custom SLA guarantees",
      ],
      popular: false,
      cta: "Contact Enterprise",
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-36 bg-[#07080b] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14 lg:mb-18 text-left">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-slate-400 mb-4">
            <span className="w-8 h-px bg-violet-400" />
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 tracking-tight">
            Simple, fair pricing
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl">
            Start completely for free or unlock the full neural compiler for your upcoming interview cycle.
          </p>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center gap-4 mb-14">
          <span
            className={`text-sm font-medium transition-colors cursor-pointer ${
              !isYearly ? "text-white font-bold" : "text-slate-400"
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </span>
          <button
            role="switch"
            aria-checked={isYearly}
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 bg-white/10 hover:bg-white/15 rounded-full p-1 transition-colors cursor-pointer border border-white/10"
          >
            <div
              className={`w-5 h-5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-transform duration-300 shadow-md ${
                isYearly ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors cursor-pointer ${
              isYearly ? "text-white font-bold" : "text-slate-400"
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </span>
          <span className="px-2.5 py-1 bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-mono font-bold rounded-full">
            Save 20%
          </span>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((p, idx) => {
            const price = isYearly ? p.priceYearly : p.priceMonthly;
            const isExpanded = !!expandedFeatures[idx];

            return (
              <div
                key={idx}
                className={`relative p-7 lg:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 text-left ${
                  p.popular
                    ? "bg-[#0e111a] border-2 border-violet-500 shadow-2xl shadow-violet-500/20 lg:-my-3 lg:py-10"
                    : "bg-[#0c0e15] border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Popular Pill */}
                {p.popular && (
                  <span className="absolute -top-3.5 left-8 px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[11px] font-mono font-bold uppercase tracking-widest rounded-full shadow-lg">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Plan Number & Name */}
                  <div className="mb-6">
                    <span className="font-mono text-xs text-slate-500 font-bold block">
                      {p.num}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">{p.name}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                      {p.subtitle}
                    </p>
                  </div>

                  {/* Price Header */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                        ${price}
                      </span>
                      <span className="text-slate-400 text-xs font-mono">/month</span>
                    </div>
                    {isYearly && price > 0 && (
                      <p className="text-[11px] text-emerald-400 font-mono mt-1">
                        Billed annually &bull; save 20%
                      </p>
                    )}
                    {price === 0 && (
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        No credit card needed
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-4">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}

                    {/* Expandable Extra Features */}
                    {isExpanded &&
                      p.extraFeatures.map((ext, eIdx) => (
                        <li
                          key={`extra-${eIdx}`}
                          className="flex items-start gap-2.5 text-xs text-violet-300 font-medium"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                          <span>{ext}</span>
                        </li>
                      ))}
                  </ul>

                  {/* Toggle Features Accordion */}
                  <button
                    onClick={() => toggleFeatures(idx)}
                    className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors py-2 mb-6 cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" /> Hide extra details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" /> Show all features
                      </>
                    )}
                  </button>
                </div>

                {/* Card CTA Button */}
                <button
                  onClick={() => {
                    if (p.num === "04") {
                      window.location.href = "mailto:enterprise@careercompiler.ai?subject=Enterprise%20Inquiry%20-%20CareerCompiler%20AI&body=Hi%20CareerCompiler%20Team%2C%0A%0AWe%20are%20interested%20in%20deploying%20CareerCompiler%20for%20our%20cohort%2Fcampus.%20Please%20reach%20out%20with%20enterprise%20licensing%20details.";
                    } else if (p.cta.includes("Trial")) {
                      onActionClick("/signup");
                    } else {
                      onActionClick("/resume");
                    }
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    p.popular
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30 hover:scale-[1.02]"
                      : "border border-white/15 text-slate-200 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  {p.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* MCP Callout Banner */}
        <div className="mt-14 lg:mt-18">
          <div className="block w-full rounded-2xl bg-gradient-to-r from-[#3e1b69] via-violet-800 to-indigo-700 p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-violet-400/30">
            <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle_at_15%_15%,white,transparent_35%)]" />

            <div className="relative flex items-center justify-between gap-6 flex-wrap text-left">
              <div className="flex items-center gap-4">
                <div className="flex w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 items-center justify-center shrink-0">
                  <Terminal className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-violet-200" />
                    Now Available for Developers
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-1 text-white">
                    CareerCompiler MCP Server is live
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
                    Connect CareerCompiler directly to Claude Code and Cursor. Your AI coding assistant automatically extracts commit diffs, verifies benchmark results, and compiles resumes straight from your terminal.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onActionClick("/resume")}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-violet-900 text-sm font-bold hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
              >
                Connect Claude MCP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-slate-400 font-mono">
          All plans include automatic ATS updates, LaTeX typography, and encrypted evidence storage. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
