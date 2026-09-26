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
  Filter
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
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#232733] pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">Proof Architecture</span>
          <h1 className="text-2xl font-bold text-white mt-0.5">Career Evidence Engine</h1>
          <p className="text-xs text-zinc-400">Manage verified ground-truth artifacts backing every resume claim.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Add Evidence Item
        </button>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0f1118] border border-[#232733]">
          <span className="text-[10px] font-mono text-zinc-500">TOTAL EVIDENCE</span>
          <div className="text-xl font-bold text-white mt-0.5">{graphData?.summary?.total_evidence_items || 0}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0f1118] border border-emerald-900/40">
          <span className="text-[10px] font-mono text-emerald-400">VERIFIED</span>
          <div className="text-xl font-bold text-emerald-400 mt-0.5">{graphData?.summary?.verified_count || 0}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0f1118] border border-blue-900/40">
          <span className="text-[10px] font-mono text-blue-400">USER CONFIRMED</span>
          <div className="text-xl font-bold text-blue-400 mt-0.5">{graphData?.summary?.user_confirmed_count || 0}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0f1118] border border-zinc-800">
          <span className="text-[10px] font-mono text-zinc-400">INFERRED / UNVERIFIED</span>
          <div className="text-xl font-bold text-zinc-300 mt-0.5">{graphData?.summary?.unverified_count || 0}</div>
        </div>
      </div>

      {/* Visual Evidence Graph Explorer Canvas */}
      <div className="p-5 rounded-2xl bg-[#0b0d14] border border-[#232733] space-y-4">
        <div className="flex items-center justify-between border-b border-[#232733] pb-3">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Interactive Evidence Graph Topology</h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            {graphData?.nodes?.length || 0} Nodes &bull; {graphData?.edges?.length || 0} Traversal Edges
          </span>
        </div>

        {/* Graph representation pill grid */}
        <div className="p-4 rounded-xl bg-[#08090f] border border-[#1b1e2a] min-h-[160px] flex flex-wrap gap-2.5 items-center justify-center">
          {graphData?.nodes?.map((node: any) => {
            let bg = "bg-[#141724] text-zinc-300 border-[#232733]";
            if (node.type === "root") bg = "bg-blue-950/80 text-blue-200 border-blue-700/60 font-bold";
            if (node.type === "project") bg = "bg-purple-950/50 text-purple-300 border-purple-800/50";
            if (node.type === "evidence") bg = "bg-emerald-950/50 text-emerald-300 border-emerald-800/50";
            if (node.type === "technology") bg = "bg-[#181d2e] text-zinc-400 border-zinc-700";

            return (
              <div
                key={node.id}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-transform hover:scale-105 cursor-default ${bg}`}
              >
                <span className="text-[9px] uppercase opacity-60 mr-1.5 font-sans">[{node.type}]</span>
                {node.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs & Evidence Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-400 mr-2">Filter Status:</span>
            {["ALL", "VERIFIED", "USER_CONFIRMED", "UNVERIFIED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  filterStatus === st
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-zinc-400 hover:text-white bg-[#141722]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <span className="text-xs text-zinc-500">{filtered.length} items shown</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ev: any) => {
            const isVerified = ev.verification_status === "VERIFIED";
            const isUserConfirmed = ev.verification_status === "USER_CONFIRMED";

            return (
              <div
                key={ev.id}
                onClick={() => setSelectedEv(ev)}
                className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] hover:border-blue-500/50 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{ev.source_identifier}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                        isVerified
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                          : isUserConfirmed
                          ? "bg-blue-950/60 text-blue-400 border border-blue-800/40"
                          : "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                      }`}
                    >
                      {ev.verification_status}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{ev.evidence_type}</span>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">{ev.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{ev.description}</p>
                </div>

                {ev.snippet && (
                  <div className="p-2.5 rounded-lg bg-[#08090f] border border-[#1b1e2a] text-[11px] font-mono text-zinc-400 line-clamp-2">
                    {ev.snippet}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1 text-zinc-500">
                  {ev.source_url ? (
                    <a
                      href={ev.source_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> View Source
                    </a>
                  ) : (
                    <span>Internal Document</span>
                  )}
                  {ev.page_number && <span className="font-mono">Page {ev.page_number}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Evidence Detail Modal / Drawer */}
      {selectedEv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400">{selectedEv.source_identifier}</span>
                <h3 className="text-base font-bold text-white mt-1">{selectedEv.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEv(null)}
                className="text-zinc-500 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-zinc-300">{selectedEv.description}</p>
              {selectedEv.snippet && (
                <div className="p-3 rounded-lg bg-[#08090f] border border-[#1b1e2a] font-mono text-zinc-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedEv.snippet}
                </div>
              )}
              {selectedEv.source_url && (
                <p className="text-zinc-400">
                  Source: <a href={selectedEv.source_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{selectedEv.source_url}</a>
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#232733] flex items-center justify-between">
              <span className="text-xs text-zinc-400">Verification Status:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleUpdateStatus(selectedEv.id, "VERIFIED")}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEv.id, "USER_CONFIRMED")}
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedEv.id, "REJECTED")}
                  className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Create Evidence Artifact</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-white font-bold">&times;</button>
            </div>
            <form onSubmit={handleAddEvidence} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scapy Packet Sniffer Benchmark Report"
                  value={newEv.title}
                  onChange={(e) => setNewEv({ ...newEv, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white"
                />
              </div>
              <div>
                <label className="block text-zinc-300 mb-1">Evidence Type</label>
                <select
                  value={newEv.evidence_type}
                  onChange={(e) => setNewEv({ ...newEv, evidence_type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white"
                >
                  <option value="github_repo">GitHub Repository</option>
                  <option value="source_code">Source Code Snippet</option>
                  <option value="benchmark">Benchmark / Test Result</option>
                  <option value="document_snippet">Document / Offer Letter Snippet</option>
                  <option value="certificate">Certificate Credential</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-300 mb-1">Source URL / Identifier</label>
                <input
                  type="text"
                  placeholder="https://github.com/... or internal document"
                  value={newEv.source_url}
                  onChange={(e) => setNewEv({ ...newEv, source_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white"
                />
              </div>
              <div>
                <label className="block text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Context describing what this evidence verifies..."
                  value={newEv.description}
                  onChange={(e) => setNewEv({ ...newEv, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white"
                />
              </div>
              <div>
                <label className="block text-zinc-300 mb-1">Code / Text Excerpt Snippet</label>
                <textarea
                  rows={3}
                  placeholder="Exact terminal log or source snippet..."
                  value={newEv.snippet}
                  onChange={(e) => setNewEv({ ...newEv, snippet: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-[#232733] text-white font-mono"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#1c2030] text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
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
