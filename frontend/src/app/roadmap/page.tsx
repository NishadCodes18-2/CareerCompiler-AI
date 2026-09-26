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
  Square
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
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#232733] pb-4 space-y-1">
        <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold tracking-wider">Gap Diagnostics & Action</span>
        <h1 className="text-2xl font-bold text-white">Career Roadmap & Project Blueprints</h1>
        <p className="text-xs text-zinc-400">
          Target role diagnostic fit analysis and actionable project blueprints to build verifiable proof for missing skills.
        </p>
      </div>

      {/* Target Role & Readiness Diagnostic Banner */}
      <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232733] pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold">Active Target Role</span>
            <h3 className="text-xl font-bold text-white">{diagnostic?.target_role}</h3>
            <p className="text-xs text-zinc-400 italic mt-0.5">{diagnostic?.diagnostic_disclaimer}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-zinc-400 font-mono">Skill Match Diagnostic</span>
            <div className="text-3xl font-extrabold text-blue-400 mt-0.5">{diagnostic?.match_percentage}%</div>
          </div>
        </div>

        {/* Strong vs Missing Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Strong Verified Skills ({diagnostic?.strong_areas?.length || 0})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {diagnostic?.strong_areas?.map((s: string, idx: number) => (
                <span key={idx} className="font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  {s} &#10003;
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-400">
              <AlertTriangle className="h-4 w-4" /> Critical Skill Gaps to Close ({diagnostic?.critical_gaps?.length || 0})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {diagnostic?.critical_gaps?.map((s: string, idx: number) => (
                <span key={idx} className="font-mono text-[11px] px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
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
          <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold tracking-wider">Prescriptive Recommendations</span>
          <h3 className="text-base font-bold text-white mt-0.5">Recommended Evidence-Building Projects</h3>
          <p className="text-xs text-zinc-400">Instead of merely saying "Learn Docker", build projects that create concrete repository proof.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmapData?.recommended_blueprints?.map((bp: any, idx: number) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{bp.title}</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  BLUEPRINT
                </span>
              </div>

              <p className="text-xs text-zinc-300">{bp.description}</p>

              {/* Stack */}
              <div className="space-y-1 text-xs">
                <span className="text-zinc-500 font-mono text-[10px] uppercase">Suggested Stack:</span>
                <div className="flex flex-wrap gap-1">
                  {bp.suggested_stack?.map((tech: string, tIdx: number) => (
                    <span key={tIdx} className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#161a26] text-blue-300 border border-blue-900/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evidence Generated */}
              <div className="pt-2 border-t border-[#232733] text-xs">
                <span className="text-emerald-400 font-medium">Evidence Created: </span>
                <span className="text-zinc-400 font-mono text-[11px]">{bp.evidence_generated?.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Roadmap Tasks Checklist */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white">Roadmap Completion Tracker</h3>
        <div className="space-y-2">
          {roadmapData?.active_items?.map((item: any) => (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-4 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                item.is_completed
                  ? "bg-emerald-950/20 border-emerald-800/40 text-zinc-400 line-through"
                  : "bg-[#0f1118] border-[#232733] text-white"
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
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141722] text-zinc-400">
                Priority {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
