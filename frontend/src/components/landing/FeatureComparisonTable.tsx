"use client";

import React from "react";
import { Check, X } from "lucide-react";

export default function FeatureComparisonTable() {
  const comparisonData = [
    {
      feature: "Automated GitHub & Repo Code Parsing",
      compiler: true,
      word: false,
      chatgpt: "Manual",
      writers: "None",
    },
    {
      feature: "FAANG STAR Impact Quantification",
      compiler: true,
      word: false,
      chatgpt: "Generic / Vague",
      writers: "Manual guesswork",
    },
    {
      feature: "ATS 98+ Algorithm Compatibility",
      compiler: true,
      word: false,
      chatgpt: "Rarely (Table bugs)",
      writers: "Varies",
    },
    {
      feature: "Cryptographic Recruiter Evidence Link",
      compiler: true,
      word: false,
      chatgpt: false,
      writers: false,
    },
    {
      feature: "Instant Job Description Tailoring",
      compiler: true,
      word: false,
      chatgpt: "Hallucinates facts",
      writers: "Takes 3-5 days",
    },
    {
      feature: "Integrated Voice & Behavioral Mock Simulator",
      compiler: true,
      word: false,
      chatgpt: "Text only",
      writers: false,
    },
    {
      feature: "Time to First Production-Ready Resume",
      compiler: "3 minutes",
      word: "3–4 days",
      chatgpt: "Hours of prompt editing",
      writers: "1–2 weeks",
    },
    {
      feature: "Pricing & Value",
      compiler: "Free / from $19/mo",
      word: "$0 (Time wasted)",
      chatgpt: "$20/mo",
      writers: "$300–$600",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#07080b]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-14 text-center mx-auto">
          <span className="pearl-badge inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 cursor-default">
            Why CareerCompiler
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Not just templates. Not generic ChatGPT.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            CareerCompiler AI is the only system that binds raw engineering achievements to verifiable career proof.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl">
          <table className="w-full text-sm min-w-[760px] border-collapse">
            <thead>
              <tr className="bg-[#0e111a] border-b border-white/10">
                <th className="text-left font-medium text-slate-400 px-6 py-5 w-[32%]">
                  Features & Capabilities
                </th>
                <th className="text-center font-bold text-violet-300 bg-violet-600/15 border-x border-violet-500/20 px-6 py-5 w-[22%]">
                  <div className="text-base text-white">CareerCompiler AI</div>
                  <div className="text-[10px] text-violet-400 font-mono font-normal mt-0.5">
                    IIT / FAANG Standard
                  </div>
                </th>
                <th className="text-center font-medium text-slate-400 px-5 py-5 w-[15%]">
                  Word & Canva
                </th>
                <th className="text-center font-medium text-slate-400 px-5 py-5 w-[15%]">
                  Generic ChatGPT
                </th>
                <th className="text-center font-medium text-slate-400 px-5 py-5 w-[16%]">
                  Resume Agency ($400+)
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-white/5 transition-colors ${
                    idx % 2 === 0 ? "bg-[#090b10]" : "bg-[#0b0e14]"
                  }`}
                >
                  {/* Feature Label */}
                  <td className="px-6 py-4.5 text-slate-200 font-medium">
                    {row.feature}
                  </td>

                  {/* CareerCompiler AI Highlighted Column */}
                  <td className="px-6 py-4.5 text-center bg-violet-600/[0.08] border-x border-violet-500/20 font-semibold">
                    {row.compiler === true ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/20 text-violet-300">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold font-mono text-sm">
                        {row.compiler}
                      </span>
                    )}
                  </td>

                  {/* Word & Canva */}
                  <td className="px-5 py-4.5 text-center text-slate-400">
                    {row.word === false ? (
                      <span className="text-slate-600">&ndash;</span>
                    ) : (
                      <span className="text-xs">{row.word}</span>
                    )}
                  </td>

                  {/* ChatGPT */}
                  <td className="px-5 py-4.5 text-center text-slate-400 text-xs">
                    {row.chatgpt === false ? (
                      <span className="text-slate-600">&ndash;</span>
                    ) : (
                      <span>{row.chatgpt}</span>
                    )}
                  </td>

                  {/* Resume Agency */}
                  <td className="px-5 py-4.5 text-center text-slate-400 text-xs">
                    {row.writers === false ? (
                      <span className="text-slate-600">&ndash;</span>
                    ) : (
                      <span>{row.writers}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
