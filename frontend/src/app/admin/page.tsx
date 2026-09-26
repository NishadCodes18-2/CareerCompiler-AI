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
  Activity
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
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#232733] pb-4 space-y-1">
        <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold tracking-wider">Internal Diagnostics</span>
        <h1 className="text-2xl font-bold text-white">Developer & Admin Control Panel</h1>
        <p className="text-xs text-zinc-400">
          System telemetry, AI engine safeguards, database entity counts, and sandbox reseeding tools.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0f1118] border border-emerald-900/40 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>BACKEND STATUS</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400">{statusData?.status}</div>
          <p className="text-[11px] text-zinc-400 font-mono">FastAPI v{statusData?.version}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0f1118] border border-blue-900/40 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>AI SAFEGUARDS</span>
            <ShieldCheck className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-blue-400">{statusData?.ai_engine?.status}</div>
          <p className="text-[11px] text-zinc-400 font-mono">Hallucination Prevention Active</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0f1118] border border-purple-900/40 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>DATABASE ORM</span>
            <Database className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white">PostgreSQL / SQLite</div>
          <p className="text-[11px] text-zinc-400 font-mono">Hybrid Vector Ready</p>
        </div>
      </div>

      {/* Database Entity Counts */}
      <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-400" /> Relational Store Entities
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          {Object.entries(statusData?.database_counts || {}).map(([key, count]: any, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#141722] border border-[#232733] space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">{key.replace("_", " ")}</span>
              <div className="text-lg font-bold text-white">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Re-Seed Sandbox Tool */}
      <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Reset & Reseed Demo Candidate</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Refreshes the fictional student profile for <strong>Alex Morgan</strong> with 4 verified projects, 9 evidence items, target job description, and pre-compiled resume.
            </p>
          </div>
          <button
            onClick={handleReseed}
            disabled={reseeding}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${reseeding ? "animate-spin" : ""}`} />
            {reseeding ? "Reseeding Database..." : "Reseed Demo Data"}
          </button>
        </div>

        {reseedMsg && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{reseedMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
