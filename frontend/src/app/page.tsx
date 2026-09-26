"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Terminal,
  GitBranch,
  Network,
  Cpu,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  Compass,
  FileText
} from "lucide-react";
import { authApi } from "@/lib/api";

export default function LandingPage() {
  const router = useRouter();

  const handleLaunchDemo = async () => {
    try {
      await authApi.demoLogin();
      router.push("/dashboard");
    } catch (e) {
      router.push("/login");
    }
  };

  return (
    <div className="space-y-24 py-6 md:py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-950/40 text-blue-400 border border-blue-800/40">
          <Terminal className="h-3.5 w-3.5" />
          <span>CAREER EVIDENCE INTELLIGENCE PLATFORM</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Compile your career <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            into verifiable proof.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Research the role. Understand your evidence. Build a targeted resume compiled strictly from your verified code, documents, and benchmarks.
        </p>

        {/* Core Principle Callout */}
        <div className="p-4 rounded-xl bg-[#11131b] border border-[#232733] max-w-2xl mx-auto text-left flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400">Core Principle</div>
            <p className="text-sm text-zinc-300 mt-1 italic">
              "A resume should be compiled from a candidate's verified career evidence and the requirements of a target role, not invented by an LLM from a few text inputs."
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleLaunchDemo}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            Explore Demo as Alex Morgan (CS Student)
          </button>
          <Link
            href="/signup"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#161822] hover:bg-[#1e2230] text-zinc-200 border border-[#232733] font-medium text-sm transition-all"
          >
            Build My Career Profile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Interactive Evidence Graph Demo Preview */}
      <section className="rounded-2xl border border-[#232733] bg-[#0d0f17] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#232733] pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">Live Architecture</span>
            <h3 className="text-xl font-bold text-white mt-1">The Career Evidence Graph</h3>
            <p className="text-xs text-zinc-400">Every resume claim connects directly to underlying commits, benchmarks, or documents.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
              <CheckCircle2 className="h-3.5 w-3.5" /> 9 Verified Proof Points
            </span>
          </div>
        </div>

        {/* Interactive Visual Graph representation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-[#121520] border border-[#232733] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">PROJECT</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/40 font-mono">VERIFIED</span>
            </div>
            <h4 className="text-sm font-semibold text-white">Network Traffic Packet Analyzer</h4>
            <p className="text-xs text-zinc-400">Asynchronous sniffer in Python & Scapy handling 10k packets/sec.</p>
            <div className="pt-2 border-t border-[#232733]/60 space-y-1 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5 text-blue-400">
                <GitBranch className="h-3 w-3" /> EV-001 (GitHub 48 commits)
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> EV-002 (tcpreplay benchmark log)
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-[#121520] border border-[#232733] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">PROJECT</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/40 font-mono">VERIFIED</span>
            </div>
            <h4 className="text-sm font-semibold text-white">Distributed Key-Value Store (Raft)</h4>
            <p className="text-xs text-zinc-400">Consensus state machine in Go with leader election & log replication.</p>
            <div className="pt-2 border-t border-[#232733]/60 space-y-1 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5 text-blue-400">
                <GitBranch className="h-3 w-3" /> EV-003 (raft_node.go source)
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> EV-004 (docker-compose multi-node)
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-xl bg-[#121520] border border-[#232733] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">INTERNSHIP</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/40 font-mono">VERIFIED</span>
            </div>
            <h4 className="text-sm font-semibold text-white">CloudScale Infrastructure Labs</h4>
            <p className="text-xs text-zinc-400">Backend Engineering Intern: telemetry ingestion & Postgres tuning.</p>
            <div className="pt-2 border-t border-[#232733]/60 space-y-1 text-[11px] text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5 text-purple-400">
                <FileText className="h-3 w-3" /> EV-007 (Offer & Completion Letter, p.1)
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3 w-3" /> EV-008 (AWS Cloud Practitioner)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Generic AI Resumes vs CareerCompiler AI */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">Contrast</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Generic AI Resume Generators Fail Engineers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Bad */}
          <div className="p-6 rounded-xl bg-red-950/10 border border-red-900/30 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
              <XCircle className="h-4 w-4" />
              Generic AI Resume Generators
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&times;</span>
                Invent fake metrics like "improved database throughput by 72%" without any benchmark data.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&times;</span>
                Stuff keywords randomly to game ATS filters, leading to immediate rejection in technical interviews.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&times;</span>
                Forces candidates to maintain 10 disconnected resume files for different job applications.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">&times;</span>
                Leaves candidates unable to explain or defend generated bullet points when pressed by interviewers.
              </li>
            </ul>
          </div>

          {/* Good */}
          <div className="p-6 rounded-xl bg-emerald-950/10 border border-emerald-900/30 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 className="h-4 w-4" />
              CareerCompiler AI
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                Every metric requires attached benchmark evidence or is explicitly flagged as UNVERIFIED.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                Studies real-time role fingerprints & citations to rank actual verified candidate projects.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                One Master Career Profile generates infinite role-specific, ATS-compliant versions.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                "Defend My Resume" generates technical interview questions directly from compiled claims.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 Product Pillars */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">The 5 Pillars of Career Proof</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-[#11131b] border border-[#232733] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-semibold text-white">1. Evidence-Backed Resumes</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every single bullet point references underlying evidence IDs from your GitHub repos, documents, and benchmarks in the Proof View.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#11131b] border border-[#232733] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Network className="h-5 w-5" />
            </div>
            <h4 className="text-base font-semibold text-white">2. Market-Aware Role Intelligence</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Studies live industry skill frequencies, project themes, and verified citations instead of relying on static, stale templates.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#11131b] border border-[#232733] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h4 className="text-base font-semibold text-white">3. Master Career Compiler</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Maintain one canonical source of truth for your entire professional footprint. Target SWE, Backend, or AI roles without manual rewrites.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#11131b] border border-[#232733] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Compass className="h-5 w-5" />
            </div>
            <h4 className="text-base font-semibold text-white">4. Evidence-Building Roadmap</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When skills are missing, the system generates actionable project blueprints with recommended tech stacks, features, and learning outcomes.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#11131b] border border-[#232733] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h4 className="text-base font-semibold text-white">5. Resume-to-Interview Continuity</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              "Defend My Resume" transforms every claim into technical, architectural, and behavioral interview questions with structured answer frameworks.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#11131b] border border-[#232733] space-y-2">
            <div className="h-9 w-9 rounded-lg bg-rose-600/20 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h4 className="text-base font-semibold text-white">ATS Reverse-Parser Test</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Reverse parses exported resumes to measure field detection, section order, and readability before you apply to high-volume applicant systems.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0c0e15] border border-[#232733] space-y-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to compile your career into proof?</h3>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          Explore the pre-seeded portfolio of Alex Morgan (Computer Science Student) with verified projects, GitHub analysis, and live interview prep.
        </p>
        <div className="pt-2">
          <button
            onClick={handleLaunchDemo}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
          >
            Launch Demo Workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
