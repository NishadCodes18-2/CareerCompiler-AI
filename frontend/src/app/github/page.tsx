"use client";

import React, { useState } from "react";
import {
  Search,
  Star,
  GitFork,
  CheckCircle2,
  XCircle,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Code2,
  FileCode,
  GitBranch,
  Terminal
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { githubApi } from "@/lib/api";

export default function GitHubPage() {
  const [username, setUsername] = useState("alexmorgan-dev");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [analyzedUser, setAnalyzedUser] = useState("");
  const [approvedMap, setApprovedMap] = useState<Record<string, boolean>>({});
  const [editingRepo, setEditingRepo] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    try {
      const data = await githubApi.analyze(username);
      setRepos(data.repositories || []);
      setAnalyzedUser(data.username);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (repo: any) => {
    try {
      await githubApi.approve({
        repo_data: repo,
        action: "approve",
      });
      setApprovedMap({ ...approvedMap, [repo.name]: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (repo: any) => {
    try {
      await githubApi.approve({
        repo_data: repo,
        action: "reject",
      });
      setRepos(repos.filter((r) => r.name !== repo.name));
    } catch (err) {
      console.error(err);
    }
  };

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
                SOURCE ANALYSIS
              </span>
              <span className="pill-badge bg-white/5 text-zinc-400 border border-white/10">
                PUBLIC REPOSITORIES
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              GitHub Profile &amp; Repository Analyzer
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Extract verified source code evidence, detected frameworks, and commit architecture from public repositories without inventing or exaggerating claims.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="pill-badge bg-white/5 text-zinc-300 border border-white/10 text-xs font-mono">
              AST &amp; GIT FOOTPRINT
            </span>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <GithubIcon className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter public GitHub username (e.g. alexmorgan-dev)"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#090b10] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5733] font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7849] hover:from-[#ff6b4a] hover:to-[#ff8d63] text-white text-xs font-semibold shadow-lg shadow-[#ff5733]/25 transition-all cursor-pointer"
          >
            <Search className="h-4 w-4" />
            {loading ? "Analyzing Repositories..." : "Analyze GitHub Footprint"}
          </button>
        </form>

        <p className="text-[11px] text-zinc-500 font-mono">
          Analyzes public repositories only. Examines language distributions, dependency graphs, and commit histories.
        </p>
      </div>

      {/* Analyzed Repositories */}
      {repos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Detected Repositories for <span className="text-[#ff7849] font-mono">@{analyzedUser}</span>
            </h3>
            <span className="pill-badge bg-white/5 text-zinc-300 font-mono text-[11px]">
              {repos.length} REPOSITORIES ANALYZED
            </span>
          </div>

          <div className="space-y-4">
            {repos.map((repo, idx) => {
              const isApproved = approvedMap[repo.name];

              return (
                <div
                  key={idx}
                  className={`card-glass rounded-2xl p-6 transition-all ${
                    isApproved
                      ? "border-[#bef264]/40 bg-[#0c1218]/80 shadow-lg shadow-[#bef264]/5"
                      : "hover:border-white/20"
                  } space-y-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#ff5733]/15 text-[#ff7849]">
                        <FileCode className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-bold text-white">{repo.name}</h4>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors"
                        title="View on GitHub"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-400" /> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5 text-zinc-400" /> {repo.forks}
                      </span>
                      <span>{repo.commits_count} commits</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">{repo.description}</p>

                  {/* Detected Tech */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 mr-1">Detected:</span>
                    {repo.languages?.map((lang: string, lIdx: number) => (
                      <span key={lIdx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-[#141824] text-[#bef264] border border-white/10">
                        {lang}
                      </span>
                    ))}
                    {repo.frameworks?.map((fw: string, fIdx: number) => (
                      <span key={fIdx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10">
                        {fw}
                      </span>
                    ))}
                  </div>

                  {/* Suggested Candidate Evidence */}
                  <div className="p-4 rounded-xl bg-[#080a10] border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#ff7849] font-mono font-semibold">Suggested Evidence Proposal:</span>
                      <span className="pill-badge bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px]">
                        CANDIDATE REVIEW REQUIRED
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 italic">"{repo.suggested_evidence}"</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {isApproved ? "Integrated into Master Career Profile ✓" : "Pending candidate decision"}
                    </span>

                    <div className="flex items-center gap-2">
                      {isApproved ? (
                        <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30 text-xs font-semibold py-1.5 px-3">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approved &amp; Linked
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(repo)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#bef264]/15 hover:bg-[#bef264]/25 text-[#bef264] border border-[#bef264]/30 text-xs font-semibold transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve Evidence
                          </button>
                          <button
                            onClick={() => handleReject(repo)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-white/10 text-xs font-medium transition-all cursor-pointer"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
