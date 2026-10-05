"use client";

import React from "react";
import {
  Code2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  ArrowRight
} from "lucide-react";

interface UseCasesSectionProps {
  onActionClick: (destination: string) => void;
}

export default function UseCasesSection({ onActionClick }: UseCasesSectionProps) {
  const cases = [
    {
      title: "Software Engineers & Tech Leads",
      description:
        "From microservices to distributed databases — compile accurate STAR bullets with real throughput, latency metrics, and architecture patterns.",
      icon: <Terminal className="w-6 h-6 text-violet-400" />,
      tag: "⚡ 90% faster than manual drafting",
      badgeColor: "violet",
      points: [
        "Automatic GitHub repo & commit mining",
        "Throughput, p99 latency & scale quantification",
        "Target job description tailoring in 1 click",
        "LaTeX PDF compilation & recruiter link proof",
      ],
    },
    {
      title: "Students & New Graduates",
      description:
        "Turn academic course projects, open-source pull requests, and hackathon prototypes into FAANG-caliber verified engineering evidence.",
      icon: <GraduationCap className="w-6 h-6 text-emerald-400" />,
      tag: "🎯 3x higher recruiter callback rate",
      badgeColor: "emerald",
      points: [
        "Transforms class projects into production narratives",
        "LeetCode Knight & contest rating integration",
        "IIT & Top-tier campus standard ATS formatting",
        "AI mock interview simulator with rubric coaching",
      ],
    },
    {
      title: "Career Switchers & Senior Leads",
      description:
        "Transitioning from non-traditional tech or moving into Staff / Engineering Management — re-frame your experiences with measurable business ROI.",
      icon: <Briefcase className="w-6 h-6 text-cyan-400" />,
      tag: "✨ Ready in under 3 minutes",
      badgeColor: "cyan",
      points: [
        "Translates business impact into technical metrics",
        "Highlights leadership, mentorship & system ownership",
        "Zero-gap keyword matching for ATS screeners",
        "Instant PDF export with custom design themes",
      ],
    },
  ];

  return (
    <section id="use-cases" className="py-24 lg:py-32 bg-[#090b10] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20 text-left">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-slate-400 mb-4">
            <span className="w-8 h-px bg-violet-400" />
            Use Cases
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
            Who is CareerCompiler AI for?
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-2xl bg-[#0c0e15] border border-white/10 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-600/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle hover gradient corner */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-colors">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-3 mb-8">
                  {item.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tag footer */}
              <div className="pt-6 border-t border-white/10 text-base font-bold text-violet-400 flex items-center justify-between">
                <span>{item.tag}</span>
                <button
                  onClick={() => onActionClick("/resume")}
                  className="p-2 rounded-lg bg-white/5 hover:bg-violet-600 hover:text-white text-slate-300 transition-colors cursor-pointer"
                  title="Try for your role"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
