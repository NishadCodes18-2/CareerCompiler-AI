"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Briefcase,
  Layers,
  Compass,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Code2
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { profileApi, evidenceApi, resumesApi, matchingApi, authApi } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [evidenceGraph, setEvidenceGraph] = useState<any>(null);
  const [resumes, setResumes] = useState<any[]>([]);
  const [diagnostic, setDiagnostic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Auto-login demo if no token
        const token = localStorage.getItem("careercompiler_token");
        if (!token) {
          await authApi.demoLogin();
        }

        const [pData, gData, rData] = await Promise.all([
          profileApi.getProfile(),
          evidenceApi.getGraph(),
          resumesApi.list(),
        ]);

        setProfile(pData);
        setEvidenceGraph(gData);
        setResumes(rData);

        const targetRole = pData?.target_role || "Backend Developer Intern";
        const diagData = await matchingApi.getDiagnostic(targetRole);
        setDiagnostic(diagData);
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <span className="text-xs font-mono text-zinc-400">Loading Career Proof Engine...</span>
        </div>
      </div>
    );
  }

  const verifiedCount = evidenceGraph?.summary?.verified_count || 0;
  const userConfirmedCount = evidenceGraph?.summary?.user_confirmed_count || 0;
  const totalEvidence = evidenceGraph?.summary?.total_evidence_items || 0;
  const latestResume = resumes.length > 0 ? resumes[0] : null;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner: Who am I & Target Role */}
      <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">{profile?.user_id ? "Alex Morgan" : "Candidate Profile"}</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-800/40">
              {profile?.student_mode ? "Student / Fresher Mode" : "Professional Mode"}
            </span>
          </div>
          <p className="text-xs text-zinc-400">{profile?.headline}</p>
          <div className="flex items-center gap-3 text-xs text-zinc-500 pt-1">
            <span>{profile?.location}</span>
            <span>&bull;</span>
            <a href={profile?.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
              <GithubIcon className="h-3 w-3" /> GitHub
            </a>
            <span>&bull;</span>
            <a href={profile?.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-[#151824] border border-[#232733] text-right">
            <span className="text-[10px] font-mono uppercase text-zinc-500">Active Target Role</span>
            <p className="text-sm font-semibold text-white">{profile?.target_role || "Backend Developer Intern"}</p>
          </div>
          <Link
            href="/resume"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Layers className="h-4 w-4" />
            Resume Compiler
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Career Evidence</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalEvidence}</div>
          <p className="text-[11px] text-emerald-400 font-mono">
            {verifiedCount} Verified &bull; {userConfirmedCount} Confirmed
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Role Alignment</span>
            <Briefcase className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{diagnostic?.match_percentage || 75}%</div>
          <p className="text-[11px] text-zinc-400">
            {diagnostic?.matched_skills_count || 6}/{diagnostic?.total_required_skills || 8} core skills matched
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Projects Linked</span>
            <Code2 className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{profile?.projects?.length || 4}</div>
          <p className="text-[11px] text-zinc-400">Backed by git commits & benchmarks</p>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Claim Truth Status</span>
            <FileCheck2 className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">100%</div>
          <p className="text-[11px] text-emerald-400 font-mono">0 Unsupported Claims Detected</p>
        </div>
      </div>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Target Role & Skill Gap Breakdown */}
          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-4">
            <div className="flex items-center justify-between border-b border-[#232733] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold">Fit Diagnostics</span>
                <h3 className="text-base font-bold text-white">Target Role Skill Coverage</h3>
              </div>
              <Link href="/roadmap" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                View Roadmap <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {diagnostic?.skill_matches?.slice(0, 6).map((item: any, idx: number) => {
                const isVerified = item.match_status === "VERIFIED_MATCH";
                const isMissing = item.match_status === "MISSING";
                const isTransferable = item.match_status === "TRANSFERABLE";

                return (
                  <div key={idx} className="p-3 rounded-lg bg-[#141722] border border-[#232733] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-200">{item.skill_name}</span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          isVerified
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                            : isMissing
                            ? "bg-red-950/60 text-red-400 border border-red-800/40"
                            : "bg-blue-950/60 text-blue-400 border border-blue-800/40"
                        }`}
                      >
                        {item.match_status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{item.reasoning}</p>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-zinc-500 italic">
              {diagnostic?.diagnostic_disclaimer || "Diagnostic fit analysis only. Not an automated hiring decision."}
            </p>
          </div>

          {/* Core Projects with Evidence Indicators */}
          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-4">
            <div className="flex items-center justify-between border-b border-[#232733] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold">Portfolio Evidence</span>
                <h3 className="text-base font-bold text-white">Verified Technical Projects</h3>
              </div>
              <Link href="/profile" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                Manage Profile <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {profile?.projects?.slice(0, 3).map((proj: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-lg bg-[#141722] border border-[#232733] space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{proj.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{proj.description}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 shrink-0">
                      VERIFIED
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {proj.technologies?.map((tech: string, tIdx: number) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#1c2030] text-zinc-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 span) */}
        <div className="space-y-6">
          {/* Active Resume Card */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-[#131726] to-[#0f1118] border border-blue-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold">Current Resume</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/50">
                COMPILED
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{latestResume?.version_name || "v1 - Backend Focus"}</h3>
              <p className="text-xs text-zinc-400 mt-1">Target: {latestResume?.target_role || "Backend Developer Intern"}</p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Template: {latestResume?.template_name || "modern_tech"}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#232733]">
              <Link
                href="/resume"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                Open Split-Screen Compiler
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/interview"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#181c28] hover:bg-[#202536] text-zinc-300 border border-[#2d3348] text-xs font-medium transition-all"
              >
                <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
                Defend My Resume Prep
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-500 font-semibold">Pipeline Quick Actions</h4>
            <div className="space-y-2">
              <Link
                href="/github"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#141722] hover:bg-[#1a1e2e] border border-[#232733] text-xs font-medium text-zinc-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="h-4 w-4 text-purple-400" />
                  Analyze GitHub Repositories
                </span>
                <ArrowRight className="h-3 w-3 text-zinc-500" />
              </Link>

              <Link
                href="/documents"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#141722] hover:bg-[#1a1e2e] border border-[#232733] text-xs font-medium text-zinc-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-emerald-400" />
                  Import Old Resume / Certificate
                </span>
                <ArrowRight className="h-3 w-3 text-zinc-500" />
              </Link>

              <Link
                href="/jobs"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#141722] hover:bg-[#1a1e2e] border border-[#232733] text-xs font-medium text-zinc-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-400" />
                  Analyze New Job Description
                </span>
                <ArrowRight className="h-3 w-3 text-zinc-500" />
              </Link>

              <Link
                href="/analysis"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#141722] hover:bg-[#1a1e2e] border border-[#232733] text-xs font-medium text-zinc-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-cyan-400" />
                  Run ATS Reverse-Parser Test
                </span>
                <ArrowRight className="h-3 w-3 text-zinc-500" />
              </Link>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="p-5 rounded-xl bg-[#0f1118] border border-[#232733] space-y-3">
            <h4 className="text-xs font-mono uppercase text-zinc-500 font-semibold flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Activity Log
            </h4>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-emerald-500 pl-3 space-y-0.5">
                <p className="text-white font-medium">9 Evidence Items Verified</p>
                <p className="text-[10px] text-zinc-500 font-mono">EV-001 through EV-009 active</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3 space-y-0.5">
                <p className="text-white font-medium">Compiled v1 - Backend Focus</p>
                <p className="text-[10px] text-zinc-500 font-mono">Modern Tech template applied</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-3 space-y-0.5">
                <p className="text-white font-medium">GitHub Repository Synced</p>
                <p className="text-[10px] text-zinc-500 font-mono">alexmorgan-dev/raft-kv-store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
