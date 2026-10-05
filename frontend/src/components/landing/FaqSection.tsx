"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      q: "How does CareerCompiler verify code and project evidence?",
      a: "CareerCompiler connects to your public GitHub repositories, commit history, and technical artifacts. It parses commit diffs, PR descriptions, test reports, and benchmarks to verify real technical authorship rather than hallucinating generic bullet points.",
    },
    {
      q: "Are the compiled resumes guaranteed to pass ATS algorithm screeners?",
      a: "Yes. Every compiled resume is audited against formatting, parsing, and keyword matching rules used by major applicant tracking systems like Workday, Greenhouse, Lever, and Taleo. We adhere to single-column LaTeX/Clean PDF standards with zero parsing errors.",
    },
    {
      q: "How does the AI quantify bullets with numbers and metrics?",
      a: "When you provide raw project details, our models identify architectural bottlenecks, latency impacts, throughput shifts, and team scale metrics. It guides you to supply real benchmarks or calculates proportional improvements based on system parameters.",
    },
    {
      q: "Can I export my resume directly to Overleaf or raw LaTeX?",
      a: "Absolutely! CareerCompiler supports 1-click export to production-grade PDF, clean LaTeX code (compatible with Overleaf and TeXLive), and JSON resume format. You retain 100% control over the source files.",
    },
    {
      q: "What is the Cryptographic Recruiter Link?",
      a: "Every compiled resume can generate a tamper-proof public verification link with a scannable QR code. When recruiters or engineering hiring managers view it, they can inspect code snippets, commit hashes, and benchmark validation proofs directly.",
    },
    {
      q: "Is CareerCompiler AI really 100% free to use?",
      a: "Yes! CareerCompiler AI is 100% free and open-source software built for every software engineer. There are no hidden paywalls, subscriptions, or credit card requirements. You get full access to AST repo parsing, verifiable evidence graph compilation, live ATS radars, and unrestricted LaTeX/PDF exports.",
    },
    {
      q: "Is my personal data and code kept private?",
      a: "Yes. We enforce bank-grade encryption at rest and in transit. Your source code and resumes are never used to train public models, and your data remains strictly private to your account.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#090b10] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 text-left">
          {/* Left Column: Heading */}
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono text-slate-400 mb-4">
              <span className="w-8 h-px bg-violet-400" />
              FAQ
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
              Everything you need to know about our evidence engine, ATS compliance, and privacy guarantees.
            </p>
          </div>

          {/* Right Column: Accordion Details */}
          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-[#0c0e15] rounded-xl border border-white/10 transition-all open:border-violet-500/40"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none text-base font-semibold text-white">
                  <span>{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform duration-200 shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed font-normal">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
