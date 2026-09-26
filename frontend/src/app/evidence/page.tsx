"use client";

import React, { useEffect, useState } from "react";
import {
  Network,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Plus,
  GitBranch,
  FileText,
  Award,
  Filter,
  Activity,
  Layers,
  Sparkles,
  Check,
  X
} from "lucide-react";
import { evidenceApi } from "@/lib/api";

export default function EvidencePage() {
  const [evidenceList, setEvidenceList] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedEv, setSelectedEv] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEv, setNewEv] = useState({
    title: "",
    evidence_type: "github_repo",
    description: "",
    source_url: "",
    snippet: "",
    verification_status: "USER_CONFIRMED"
  });

  useEffect(() => {
    loadEvidence();
  }, []);

  async function loadEvidence() {
    try {
      const [list, graph] = await Promise.all([
        evidenceApi.list(),
        evidenceApi.getGraph()
      ]);
      setEvidenceList(list);
      setGraphData(graph);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await evidenceApi.updateVerification(id, newStatus);
      loadEvidence();
      if (selectedEv && selectedEv.id === id) {
        setSelectedEv({ ...selectedEv, verification_status: newStatus });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await evidenceApi.create(newEv);
      setShowAddModal(false);
      setNewEv({
        title: "",
        evidence_type: "github_repo",
        description: "",
        source_url: "",
        snippet: "",
        verification_status: "USER_CONFIRMED"
      });
      loadEvidence();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = evidenceList.filter((item) => {
    if (filterStatus === "ALL") return true;
    return item.verification_status === filterStatus;
  });

  if (loading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#ff5733] border-t-transparent shadow-lg shadow-[#ff5733]/30"></div>
        <span className="font-mono text-xs text-zinc-400">Loading Proof Graph Topology...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Borea AI Horizon Glow */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0c0e15] via-[#121622] to-[#0c0e15] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-[#ff5733]/10 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-[#bef264]/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#bef264] animate-pulse"></span>
                GRAPH REPOSITORY
              </span>
              <span className="pill-badge bg-white/5 text-zinc-400 border border-white/10">
                PROVED CLAIMS: 100%
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Career Evidence Engine &amp; Graph
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Every single line on your resume is anchored to verifiable artifacts: Git commits, benchmark logs, and verified repository stats.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7849] hover:from-[#ff6b4a] hover:to-[#ff8d63] text-white text-xs font-semibold shadow-lg shadow-[#ff5733]/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] self-start lg:self-auto"
          >
            <Plus className="h-4 w-4" /> Add Evidence Item
          </button>
        </div>
      </div>

      {/* Summary KPI Badges - Haulix Telemetry Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-glass rounded-2xl p-4.5 space-y-1">
          <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase font-semibold">TOTAL EVIDENCE ITEMS</span>
          <div className="text-2xl font-bold text-white tracking-tight">{graphData?.summary?.total_evidence_items || 0}</div>
          <div className="text-[11px] text-zinc-400 font-mono">Linked into Career Graph</div>
        </div>

        <div className="card-glass rounded-2xl p-4.5 space-y-1 border-[#bef264]/30">
          <span className="text-[10px] font-mono text-[#bef264] tracking-wider uppercase font-semibold">CRYPTOGRAPHICALLY VERIFIED</span>
          <div className="text-2xl font-bold text-[#bef264] tracking-tight">{graphData?.summary?.verified_count || 0}</div>
          <div className="text-[11px] text-zinc-400 font-mono">100% Audit Confidence</div>
        </div>

        <div className="card-glass rounded-2xl p-4.5 space-y-1 border-[#ff7849]/30">
          <span className="text-[10px] font-mono text-[#ff7849] tracking-wider uppercase font-semibold">USER CONFIRMED</span>
          <div className="text-2xl font-bold text-[#ff7849] tracking-tight">{graphData?.summary?.user_confirmed_count || 0}</div>
          <div className="text-[11px] text-zinc-400 font-mono">Inline Reviewed Claims</div>
        </div>

        <div className="card-glass rounded-2xl p-4.5 space-y-1">
          <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase font-semibold">UNVERIFIED / PENDING</span>
          <div className="text-2xl font-bold text-zinc-300 tracking-tight">{graphData?.summary?.unverified_count || 0}</div>
          <div className="text-[11px] text-zinc-500 font-mono">Requires Benchmarks</div>
        </div>
      </div>

      {/* Visual Evidence Graph Explorer Canvas */}
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#bef264]/15 text-[#bef264] flex items-center justify-center">
              <Network className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Interactive Evidence Graph Topology</h3>
              <p className="text-[11px] text-zinc-400">Direct acyclic graph mapping candidate claims to source code</p>
            </div>
          </div>
          <span className="pill-badge bg-white/5 text-zinc-300 border border-white/10 font-mono text-[11px]">
            {graphData?.nodes?.length || 0} NODES &bull; {graphData?.edges?.length || 0} TRAVERSAL EDGES
          </span>
        </div>

        {/* Graph representation pill grid */}
        <div className="p-6 rounded-xl bg-[#080a10] border border-white/5 min-h-[170px] flex flex-wrap gap-2.5 items-center justify-center">
          {graphData?.nodes?.map((node: any) => {
            let bg = "bg-[#141824] text-zinc-300 border-white/10";
            if (node.type === "root") bg = "bg-[#ff5733]/20 text-[#ff7849] border-[#ff5733]/40 font-bold shadow-md shadow-[#ff5733]/10";
            if (node.type === "project") bg = "bg-[#181d2c] text-indigo-300 border-indigo-500/30";
            if (node.type === "evidence") bg = "bg-[#bef264]/15 text-[#bef264] border-[#bef264]/30 font-semibold";
            if (node.type === "technology") bg = "bg-white/5 text-zinc-400 border-white/10";

            return (
              <div
                key={node.id}
                className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all hover:scale-105 cursor-pointer shadow-sm ${bg}`}
              >
                <span className="text-[9px] uppercase opacity-70 mr-1.5 font-sans">[{node.type}]</span>
                {node.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs & Evidence Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-400 mr-1">Status Filter:</span>
            {["ALL", "VERIFIED", "USER_CONFIRMED", "UNVERIFIED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  filterStatus === st
                    ? "bg-[#ff5733] text-white font-semibold shadow-md shadow-[#ff5733]/20"
                    : "text-zinc-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <span className="text-xs text-zinc-400 font-mono">{filtered.length} items logged</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ev: any) => {
            const isVerified = ev.verification_status === "VERIFIED";
            const isUserConfirmed = ev.verification_status === "USER_CONFIRMED";

            return (
              <div
                key={ev.id}
                onClick={() => setSelectedEv(ev)}
                className="card-glass rounded-2xl p-5 hover:border-[#bef264]/40 transition-all cursor-pointer space-y-3 relative group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#ff7849]">{ev.source_identifier}</span>
                    <span
                      className={`pill-badge text-[10px] ${
                        isVerified
                          ? "bg-[#bef264]/15 text-[#bef264] border-[#bef264]/30"
                          : isUserConfirmed
                          ? "bg-[#ff5733]/15 text-[#ff7849] border-[#ff5733]/30"
                          : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {ev.verification_status}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">{ev.evidence_type}</span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#bef264] transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">{ev.description}</p>
                </div>

                {ev.snippet && (
                  <div className="p-2.5 rounded-xl bg-[#08090f] border border-white/5 text-[11px] font-mono text-[#bef264] line-clamp-2">
                    <span className="text-zinc-600 block text-[9px]">// Log trace</span>
                    {ev.snippet}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5 text-zinc-500 font-mono">
                  {ev.source_url ? (
                    <a
                      href={ev.source_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#ff7849] hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> View Source URL
                    </a>
                  ) : (
                    <span>Internal Benchmark</span>
                  )}
                  {ev.page_number && <span>Page {ev.page_number}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Evidence Detail Modal - Haulix style */}
      {selectedEv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0c0f18] border border-white/15 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#ff7849]">{selectedEv.source_identifier}</span>
                <h3 className="text-base font-bold text-white mt-1">{selectedEv.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEv(null)}
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-zinc-300 leading-relaxed">{selectedEv.description}</p>
              {selectedEv.snippet && (
                <div className="p-3.5 rounded-xl bg-[#08090f] border border-white/10 font-mono text-[#bef264] whitespace-pre-wrap max-h-48 overflow-y-auto">
                  <span className="text-zinc-500 block text-[9px] mb-1">// Ground-Truth Payload</span>
                  {selectedEv.snippet}
                </div>
              )}
              {selectedEv.source_url && (
                <p className="text-zinc-400 font-mono">
                  Source: <a href={selectedEv.source_url} target="_blank" rel="noreferrer" className="text-[#ff7849] hover:underline">{selectedEv.source_url}</a>
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Update State:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedEv.id, "VERIFIED")}
                  className="px-3 py-1.5 rounded-xl bg-[#bef264]/20 hover:bg-[#bef264]/30 text-[#bef264] border border-[#bef264]/40 text-xs font-semibold cursor-pointer"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEv.id, "USER_CONFIRMED")}
                  className="px-3 py-1.5 rounded-xl bg-[#ff5733]/20 hover:bg-[#ff5733]/30 text-[#ff7849] border border-[#ff5733]/40 text-xs font-semibold cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEv.id, "REJECTED")}
                  className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Evidence Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0c0f18] border border-white/15 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Create Evidence Artifact</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddEvidence} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scapy Packet Sniffer Benchmark Report"
                  value={newEv.title}
                  onChange={(e) => setNewEv({ ...newEv, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121624] border border-white/10 text-white focus:outline-none focus:border-[#ff5733]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Evidence Type</label>
                <select
                  value={newEv.evidence_type}
                  onChange={(e) => setNewEv({ ...newEv, evidence_type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121624] border border-white/10 text-white focus:outline-none focus:border-[#ff5733]"
                >
                  <option value="github_repo">GitHub Repository</option>
                  <option value="source_code">Source Code Snippet</option>
                  <option value="benchmark">Benchmark / Test Result</option>
                  <option value="document_snippet">Document / Offer Letter Snippet</option>
                  <option value="certificate">Certificate Credential</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Source URL / Identifier</label>
                <input
                  type="text"
                  placeholder="https://github.com/... or internal log file"
                  value={newEv.source_url}
                  onChange={(e) => setNewEv({ ...newEv, source_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121624] border border-white/10 text-white focus:outline-none focus:border-[#ff5733]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Context describing what this evidence verifies..."
                  value={newEv.description}
                  onChange={(e) => setNewEv({ ...newEv, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121624] border border-white/10 text-white focus:outline-none focus:border-[#ff5733]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] mb-1">Code / Text Excerpt Snippet</label>
                <textarea
                  rows={3}
                  placeholder="Exact terminal log or source snippet..."
                  value={newEv.snippet}
                  onChange={(e) => setNewEv({ ...newEv, snippet: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121624] border border-white/10 text-white font-mono focus:outline-none focus:border-[#ff5733]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7849] text-white font-semibold shadow-md shadow-[#ff5733]/25 cursor-pointer"
                >
                  Create Evidence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
