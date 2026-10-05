"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  Code2,
  ArrowRight,
  Plus,
  ShieldCheck,
  CheckSquare,
  Square,
  Zap,
  Target,
  Sparkles
} from "lucide-react";
import { matchingApi } from "@/lib/api";

export default function RoadmapPage() {
  const [role, setRole] = useState("Backend Developer Intern");
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [diagnostic, setDiagnostic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmap(role);
  }, [role]);

  async function loadRoadmap(targetRole: string) {
    try {
      const [rData, dData] = await Promise.all([
        matchingApi.getRoadmap(targetRole),
        matchingApi.getDiagnostic(targetRole)
      ]);
      setRoadmapData(rData);
      setDiagnostic(dData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleToggle = async (id: string) => {
    try {
      await matchingApi.toggleRoadmapItem(id);
      loadRoadmap(role);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/30"></div>
        <span className="font-mono text-xs text-slate-400">Computing Skill Diagnostics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Luxury Dark Horizon Glow */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0c0e15] via-[#121622] to-[#0c0e15] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-violet-600/15 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                FIT DIAGNOSTICS
              </span>
              <span className="pill-badge bg-white/5 text-slate-400 border border-white/10">
                ACTIONABLE BLUEPRINTS
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Career Roadmap &amp; Project Blueprints
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Target role diagnostic fit analysis and prescriptive project architectures to systematically close skill gaps with verified repository evidence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c0e15] text-right shadow-lg">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Fit Readiness</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">{diagnostic?.match_percentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Role & Readiness Diagnostic Banner */}
      <div className="rounded-2xl p-6 space-y-5 bg-[#0c0e15] border border-white/10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-violet-400 font-semibold tracking-wider">
              Diagnostic Target Role
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">{diagnostic?.target_role}</h3>
            <p className="text-xs text-slate-400 italic mt-0.5">{diagnostic?.diagnostic_disclaimer}</p>
          </div>

          {/* Trajectory Progress Bar */}
          <div className="w-full sm:w-72 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Readiness Score</span>
              <span className="text-emerald-400 font-bold">{diagnostic?.match_percentage}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#080a10] border border-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${diagnostic?.match_percentage || 78}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Strong vs Missing Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#090b10] border border-emerald-500/20 space-y-2.5">
            <div className="flex items-center gap-2 font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Strong Verified Skills ({diagnostic?.strong_areas?.length || 0})
            </div>
            <div className="flex flex-wrap gap-2">
              {diagnostic?.strong_areas?.map((s: string, idx: number) => (
                <span
                  key={idx}
                  className="font-mono text-[11px] px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold"
                >
                  {s} &#10003;
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2.5">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <AlertTriangle className="h-4 w-4 text-amber-400" /> Critical Skill Gaps to Close ({diagnostic?.critical_gaps?.length || 0})
            </div>
            <div className="flex flex-wrap gap-2">
              {diagnostic?.critical_gaps?.map((s: string, idx: number) => (
                <span
                  key={idx}
                  className="font-mono text-[11px] px-3 py-1 rounded-lg bg-amber-500/10 text-amber-200 border border-amber-500/25 font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Evidence-Building Project Blueprints */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">
            Prescriptive Execution
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">Recommended Evidence-Building Blueprints</h3>
          <p className="text-xs text-zinc-400">
            Never put unverified claims on your resume. Build these targeted projects to create undeniable repository artifacts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmapData?.recommended_blueprints?.map((bp: any, idx: number) => (
            <div key={idx} className="card-glass rounded-2xl p-5 space-y-3.5 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-violet-500/15 text-violet-400">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{bp.title}</h4>
                </div>
                <span className="pill-badge bg-white/5 text-zinc-300 border border-white/10 text-[10px]">
                  BLUEPRINT
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">{bp.description}</p>

              {/* Stack */}
              <div className="space-y-1.5 text-xs">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">Recommended Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {bp.suggested_stack?.map((tech: string, tIdx: number) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[11px] px-2.5 py-0.5 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evidence Generated */}
              <div className="pt-2.5 border-t border-white/5 text-xs">
                <span className="text-emerald-400 font-medium">Verifiable Artifacts: </span>
                <span className="text-zinc-400 font-mono text-[11px]">{bp.evidence_generated?.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Roadmap Tasks Checklist */}
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="text-sm font-bold text-white tracking-wide">Roadmap Completion Tracker</h3>
          <span className="pill-badge bg-white/5 text-zinc-400 text-[10px]">
            CLICK TO TOGGLE PROGRESS
          </span>
        </div>

        <div className="space-y-2.5">
          {roadmapData?.active_items?.map((item: any) => (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                item.is_completed
                  ? "bg-[#090b10] border-emerald-500/30 text-zinc-400 line-through"
                  : "bg-[#10131e] border-white/10 text-white hover:border-white/20 hover:bg-[#141824]"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.is_completed ? (
                  <CheckSquare className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="h-4 w-4 text-zinc-500 shrink-0" />
                )}
                <div>
                  <h4 className="text-xs font-semibold">{item.title}</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{item.description}</p>
                </div>
              </div>
              <span className="pill-badge bg-white/5 text-zinc-400 text-[10px]">
                Priority {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
