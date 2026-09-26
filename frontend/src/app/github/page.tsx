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
  FileCode
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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#232733] pb-4 space-y-1">
        <span className="text-[10px] font-mono uppercase text-purple-400 font-semibold tracking-wider">Repository Intelligence</span>
        <h1 className="text-2xl font-bold text-white">GitHub Profile & Repository Analyzer</h1>
        <p className="text-xs text-zinc-400">
          Extract verified source code evidence, detected frameworks, and architecture from public repositories without inventing claims.
        </p>
      </div>

      {/* Input Box */}
      <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-4">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <GithubIcon className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter public GitHub username or repo URL (e.g. alexmorgan-dev)"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#141722] border border-[#232733] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <Search className="h-4 w-4" />
            {loading ? "Analyzing Repositories..." : "Analyze GitHub Footprint"}
          </button>
        </form>

        <p className="text-[11px] text-zinc-500">
          Analyzes public repositories only. Examines language distributions, dependency graphs, README documentation quality, and commit history.
        </p>
      </div>

      {/* Analyzed Repositories */}
      {repos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">
              Detected Repositories for <span className="text-blue-400 font-mono">@{analyzedUser}</span>
            </h3>
            <span className="text-xs text-zinc-400 font-mono">{repos.length} public repos analyzed</span>
          </div>

          <div className="space-y-4">
            {repos.map((repo, idx) => {
              const isApproved = approvedMap[repo.name];

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isApproved
                      ? "bg-emerald-950/20 border-emerald-800/40"
                      : "bg-[#0f1118] border-[#232733]"
                  } space-y-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <FileCode className="h-5 w-5 text-blue-400" />
                      <h4 className="text-base font-bold text-white">{repo.name}</h4>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-500 hover:text-white"
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

                  <p className="text-xs text-zinc-300">{repo.description}</p>

                  {/* Detected Tech */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 mr-1">Detected:</span>
                    {repo.languages?.map((lang: string, lIdx: number) => (
                      <span key={lIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40">
                        {lang}
                      </span>
                    ))}
                    {repo.frameworks?.map((fw: string, fIdx: number) => (
                      <span key={fIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#171b28] text-zinc-300 border border-zinc-700">
                        {fw}
                      </span>
                    ))}
                  </div>

                  {/* Suggested Candidate Evidence */}
                  <div className="p-3.5 rounded-xl bg-[#0a0c12] border border-[#1e2230] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-blue-400 font-mono font-semibold">Suggested Evidence Proposal:</span>
                      <span className="text-amber-400 font-mono text-[10px]">USER REVIEW REQUIRED</span>
                    </div>
                    <p className="text-xs text-zinc-300 italic">"{repo.suggested_evidence}"</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#232733]/60">
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {isApproved ? "Integrated into Master Career Profile ✓" : "Pending candidate decision"}
                    </span>

                    <div className="flex items-center gap-2">
                      {isApproved ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Approved & Linked
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(repo)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve Evidence
                          </button>
                          <button
                            onClick={() => handleReject(repo)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181c28] hover:bg-red-950/40 text-zinc-400 hover:text-red-400 border border-[#2d3348] text-xs font-medium transition-all cursor-pointer"
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
