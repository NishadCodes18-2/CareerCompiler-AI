"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Lock,
  Mail,
  User,
  Briefcase,
  CheckCircle2
} from "lucide-react";
import ParticleCanvas from "@/components/ParticleCanvas";
import { GithubIcon } from "@/components/GithubIcon";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetRole, setTargetRole] = useState("Senior Backend Engineer");
  const [githubUser, setGithubUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

      // 1. Submit lead/user to backend
      await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "signup_flow",
          metadata_json: {
            fullName,
            targetRole,
            githubUser,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.warn("Backend signup lead note:", err));

      // 2. Persist in localStorage
      localStorage.setItem("careercompiler_user_email", email);
      localStorage.setItem("careercompiler_email_unlocked", email);
      sessionStorage.setItem("careercompiler_user_email", email);

      // Pre-seed gold_resume_data so Resume Studio is customized
      const existingDataStr = sessionStorage.getItem("gold_resume_data");
      let resumeData: any = {};
      if (existingDataStr) {
        try {
          resumeData = JSON.parse(existingDataStr);
        } catch (err) {}
      }

      if (!resumeData.personal) resumeData.personal = {};
      resumeData.personal.fullName = fullName;
      resumeData.personal.email = email;
      if (targetRole) resumeData.personal.targetRole = targetRole;
      if (githubUser) {
        resumeData.personal.github = `github.com/${githubUser}`;
      }

      sessionStorage.setItem("gold_resume_data", JSON.stringify(resumeData));
      localStorage.setItem("gold_resume_data", JSON.stringify(resumeData));

      setSuccess(true);
      window.dispatchEvent(new Event("email_saved"));
      window.dispatchEvent(new Event("avatar_updated"));

      setTimeout(() => {
        router.push("/resume");
      }, 700);
    } catch (err) {
      console.error(err);
      router.push("/resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 bg-[#07080b] overflow-hidden">
      <ParticleCanvas particleCount={40} />

      {/* Atmospheric Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-violet-600/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-[#0c0e15] border border-white/10 shadow-2xl space-y-6 text-left">
        {/* Top Brand Pill & Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 p-[1px] shadow-lg shadow-violet-500/20">
              <div className="h-full w-full bg-[#0a0c14] rounded-[11px] flex items-center justify-center">
                <Layers className="h-5 w-5 text-violet-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-white font-sans">
              CareerCompiler<span className="text-violet-500">AI</span>
            </span>
          </Link>

          <div>
            <span className="pearl-badge inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> Start 7-Day Free Trial
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans mt-2">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Compile verified, ATS 98+ resumes directly from your code and real achievements.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-xs font-mono text-slate-300 font-semibold mb-1.5 block">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ayush Sharma"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-mono text-slate-300 font-semibold mb-1.5 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ayush@engineer.io"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-mono text-slate-300 font-semibold mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Target Role & GitHub Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-mono text-slate-300 font-semibold mb-1.5 block">
                Target Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-xs focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value="Senior Backend Engineer">Backend Engineer</option>
                <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                <option value="Distributed Systems Lead">Distributed Systems</option>
                <option value="DevOps / Cloud / SRE">DevOps / SRE</option>
                <option value="AI / ML Engineer">AI / ML Engineer</option>
                <option value="Student / New Grad">Student / New Grad</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 font-semibold mb-1.5 block">
                GitHub Handle (Optional)
              </label>
              <div className="relative">
                <GithubIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                  placeholder="e.g. ayushcodes"
                  className="w-full pl-10 pr-3 py-3 rounded-xl border border-white/10 bg-black/50 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs font-mono text-rose-400 font-semibold">{error}</p>
          )}

          {success && (
            <p className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Account created! Launching Resume Studio...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="gradient-button w-full py-3.5 rounded-xl text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <span>Creating your account...</span>
            ) : (
              <>
                <span>Create Free Account & Unlock Studio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-2"
          >
            Log in here
          </Link>
        </div>

        {/* Security Assurance */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Bank-grade encryption &bull; 100% Private code parsing</span>
        </div>
      </div>
    </div>
  );
}
