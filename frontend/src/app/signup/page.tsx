"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Terminal, Sparkles, ArrowRight, ShieldAlert } from "lucide-react";
import { authApi } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authApi.register({ full_name: fullName, email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setLoading(true);
    try {
      await authApi.demoLogin();
      router.push("/dashboard");
    } catch (err: any) {
      setError("Failed to initialize demo mode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 p-8 rounded-2xl bg-[#0f1118] border border-[#232733] shadow-xl">
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <Terminal className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Create CareerCompiler Account</h2>
          <p className="text-xs text-zinc-400">Build your evidence-backed professional profile</p>
        </div>

        {/* Demo Fast-Track Callout */}
        <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              Instant Sandbox
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-200">EXPLORE DEMO</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-normal">
            Skip manual entry and evaluate the complete pipeline immediately with student candidate Alex Morgan.
          </p>
          <button
            type="button"
            onClick={handleDemo}
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Explore Pre-Seeded Workspace
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#232733] w-full"></div>
          <span className="bg-[#0f1118] px-3 text-[11px] uppercase tracking-wider text-zinc-500 font-mono">Or create your own</span>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full px-3 py-2 rounded-lg bg-[#141620] border border-[#232733] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="candidate@university.edu"
              className="w-full px-3 py-2 rounded-lg bg-[#141620] border border-[#232733] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 rounded-lg bg-[#141620] border border-[#232733] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#1a1d28] hover:bg-[#222634] text-white border border-[#2d3244] text-xs font-semibold transition-all cursor-pointer"
          >
            {loading ? "Creating Profile..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
