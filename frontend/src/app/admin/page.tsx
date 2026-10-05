"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Database,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Activity,
  Server,
  Zap
} from "lucide-react";
import { adminApi } from "@/lib/api";

export default function AdminPage() {
  const [statusData, setStatusData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reseeding, setReseeding] = useState(false);
  const [reseedMsg, setReseedMsg] = useState("");

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    try {
      const data = await adminApi.getStatus();
      setStatusData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleReseed = async () => {
    setReseeding(true);
    setReseedMsg("");
    try {
      const res = await adminApi.reseed();
      setReseedMsg(res.message);
      loadStatus();
    } catch (err) {
      console.error(err);
    } finally {
      setReseeding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/30"></div>
        <span className="font-mono text-xs text-zinc-400">Loading System Telemetry...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0c0e15] via-[#121622] to-[#0c0e15] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-violet-600/10 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SYSTEM CONSOLE
              </span>
              <span className="pill-badge bg-white/5 text-zinc-400 border border-white/10">
                CONTROL PLANE
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Developer &amp; Admin Telemetry Panel
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Real-time API gateway health, deterministic claim graph counters, zero-hallucination verification shields, and candidate sandbox controls.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="pill-badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
              GATEWAY ONLINE &bull; 8000
            </span>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-glass rounded-2xl p-5 space-y-1.5 border-emerald-500/30">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">BACKEND ENGINE</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{statusData?.status}</div>
          <p className="text-[11px] text-zinc-400 font-mono">FastAPI Core v{statusData?.version}</p>
        </div>

        <div className="card-glass rounded-2xl p-5 space-y-1.5 border-violet-500/30">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">AI SAFEGUARDS</span>
            <ShieldCheck className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-violet-400">{statusData?.ai_engine?.status}</div>
          <p className="text-[11px] text-zinc-400 font-mono">Hallucination Prevention Active (Zero Tolerance)</p>
        </div>

        <div className="card-glass rounded-2xl p-5 space-y-1.5">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">RELATIONAL ORM</span>
            <Database className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">SQLite / PostgreSQL</div>
          <p className="text-[11px] text-zinc-400 font-mono">Hybrid Vector Ready</p>
        </div>
      </div>

      {/* Database Entity Counts */}
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide">
          <Database className="h-4 w-4 text-emerald-400" /> Relational Store Entity Counts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          {Object.entries(statusData?.database_counts || {}).map(([key, count]: any, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block truncate">{key.replace("_", " ")}</span>
              <div className="text-xl font-bold text-white font-mono">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Re-Seed Sandbox Tool */}
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Reset &amp; Reseed Demo Candidate</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
              Refreshes the fictional student profile for <strong className="text-white">Alex Morgan</strong> with 4 verified projects, 9 evidence items, target job description, and pre-compiled resume.
            </p>
          </div>
          <button
            onClick={handleReseed}
            disabled={reseeding}
            className="gradient-button flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-xs shadow-lg shadow-violet-600/25 transition-all cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className={`h-4 w-4 ${reseeding ? "animate-spin" : ""}`} />
            {reseeding ? "Reseeding Database..." : "Reseed Demo Data"}
          </button>
        </div>

        {reseedMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{reseedMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
