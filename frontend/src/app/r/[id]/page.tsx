"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import {
  Printer,
  Sparkles,
  Share2,
  Check,
  Globe,
  ExternalLink,
  ShieldCheck,
  ChevronLeft
} from "lucide-react";
import QrCode from "@/components/QrCode";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PublicResumePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const candidateId = resolvedParams.id || "ayush";
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Banner for Recruiter/Visitor */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#10131b] border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            title="Back to CareerCompiler AI"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Public Candidate Resume</span>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                Verified FAANG Standard
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Candidate: <span className="text-zinc-200 font-semibold uppercase">{candidateId}</span> • Published via CareerCompiler AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-zinc-400" />}
            <span>{copied ? "Link Copied!" : "Share Link"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </button>

          <Link
            href="/resume"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Build Mine Free</span>
          </Link>
        </div>
      </div>

      {/* Printable / Viewable A4 Resume Canvas */}
      <div className="flex justify-center">
        <div
          id="printable-resume"
          className="w-full bg-white text-zinc-950 font-sans shadow-2xl max-w-[820px] p-6 sm:p-12 text-xs leading-normal select-text selection:bg-amber-100 rounded-2xl"
        >
          {/* Header */}
          <div className="border-b-2 border-zinc-950 pb-3 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950">
                  Ayush Sharma
                </h1>
                <p className="text-xs sm:text-sm font-bold text-zinc-700 uppercase tracking-wide mt-0.5">
                  Software Development Engineer • Full Stack & Systems
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-800 font-mono mt-1.5">
                  <span>📍 Bengaluru, India</span>
                  <a href="mailto:ayush.sharma.dev@gmail.com" className="hover:underline">
                    ✉ ayush.sharma.dev@gmail.com
                  </a>
                  <span>📞 +91 98765 43210</span>
                  <a href="https://github.com/ayush-dev" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">
                    github.com/ayush-dev ↗
                  </a>
                  <a href="https://linkedin.com/in/ayush-sharma-tech" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">
                    in/ayush-sharma-tech ↗
                  </a>
                </div>
              </div>

              {/* QR Code in header */}
              <div className="shrink-0 text-center pl-3">
                <QrCode value={`https://career-compiler-ai.vercel.app/r/${candidateId}`} size={48} />
                <span className="text-[8px] font-mono text-zinc-500 block mt-0.5">Verify Live</span>
              </div>
            </div>
          </div>

          {/* Education Table */}
          <div className="mb-4">
            <div className="flex items-center gap-1 border-b border-zinc-950 pb-0.5 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
              <h2 className="text-xs font-black uppercase tracking-wider">EDUCATION</h2>
            </div>
            <table className="w-full border border-zinc-950 border-collapse text-[10.5px]">
              <thead>
                <tr className="bg-zinc-100 font-bold border-b border-zinc-950 text-left">
                  <th className="p-1.5 border-r border-zinc-950">Degree / Certificate</th>
                  <th className="p-1.5 border-r border-zinc-950">Institute / University</th>
                  <th className="p-1.5 border-r border-zinc-950 text-center">Passing Year</th>
                  <th className="p-1.5 text-center">Score / CGPA</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-200">
                  <td className="p-1.5 font-semibold border-r border-zinc-950">B.Tech in Computer Science & Engineering</td>
                  <td className="p-1.5 border-r border-zinc-950">Indian Institute of Technology (IIT)</td>
                  <td className="p-1.5 border-r border-zinc-950 text-center">2021 – 2025</td>
                  <td className="p-1.5 text-center font-bold">8.92 / 10.0</td>
                </tr>
                <tr>
                  <td className="p-1.5 font-semibold border-r border-zinc-950">Higher Secondary School (Class XII, CBSE)</td>
                  <td className="p-1.5 border-r border-zinc-950">Delhi Public School</td>
                  <td className="p-1.5 border-r border-zinc-950 text-center">2021</td>
                  <td className="p-1.5 text-center font-bold">96.4%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Technical Skills */}
          <div className="mb-4">
            <div className="flex items-center gap-1 border-b border-zinc-950 pb-0.5 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
              <h2 className="text-xs font-black uppercase tracking-wider">TECHNICAL SKILLS</h2>
            </div>
            <div className="space-y-1 text-[11px] leading-relaxed">
              <p>
                <strong className="font-bold">Languages & Core:</strong> Python, TypeScript, JavaScript, Go, SQL, C++, HTML5, CSS3
              </p>
              <p>
                <strong className="font-bold">Frameworks & Libraries:</strong> Next.js 16, React 19, FastAPI, Node.js, Express, TailwindCSS, SQLAlchemy
              </p>
              <p>
                <strong className="font-bold">Databases & Cloud:</strong> PostgreSQL (Neon Serverless), Redis, MongoDB, Docker, Git, Linux, Vercel, AWS S3
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <div className="flex items-center gap-1 border-b border-zinc-950 pb-0.5 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
              <h2 className="text-xs font-black uppercase tracking-wider">WORK EXPERIENCE</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <span>Software Engineering Intern • Apex Cloud Technologies</span>
                  <span className="text-zinc-600 font-mono">May 2024 – Aug 2024</span>
                </div>
                <p className="text-[10px] text-zinc-600 italic">Bengaluru, India (Hybrid)</p>
                <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-zinc-800 leading-normal mt-1">
                  <li>
                    Architected high-throughput distributed microservice indexing <strong>12M+ daily events</strong>, reducing search query latency by <strong>43%</strong>.
                  </li>
                  <li>
                    Spearheaded zero-downtime database migration to serverless PostgreSQL cluster, saving <strong>$18,000/yr</strong> in infrastructure overhead.
                  </li>
                  <li>
                    Constructed comprehensive test harness with <strong>94% code coverage</strong> across 15 mission-critical asynchronous endpoints.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="mb-4">
            <div className="flex items-center gap-1 border-b border-zinc-950 pb-0.5 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-950" />
              <h2 className="text-xs font-black uppercase tracking-wider">KEY PROJECTS</h2>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <span className="flex items-center gap-1">
                    Distributed Task Queue & Scheduler
                    <a href="https://github.com/ayush-dev/task-queue" target="_blank" rel="noopener noreferrer" className="text-zinc-700 underline font-normal text-[10px]">
                      [GitHub]
                    </a>
                  </span>
                  <span className="text-zinc-600 font-mono text-[10px]">Python, Redis, FastAPI, Docker</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-zinc-800 leading-normal mt-1">
                  <li>
                    Engineered fault-tolerant task queue with exponential backoff and dead-letter queues handling <strong>50,000+ jobs/min</strong>.
                  </li>
                  <li>
                    Benchmarked Redis Streams consumer groups, achieving sub-5ms job dispatching across 8 worker nodes.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
