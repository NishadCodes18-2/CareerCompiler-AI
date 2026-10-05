"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Mail,
  User,
  CheckCircle2,
  Gift
} from "lucide-react";
import ParticleCanvas from "@/components/ParticleCanvas";
import { GithubIcon } from "@/components/GithubIcon";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [targetRole, setTargetRole] = useState("Senior Backend Engineer");
  const [githubUser, setGithubUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFreeSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

      // Store in DB lead_captures table without requiring password creation
      await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "signup_form",
          metadata_json: {
            fullName: fullName || email.split("@")[0],
            targetRole,
            githubUser,
            isFreeAccess: true,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.warn("Backend signup lead note:", err));

      // Persist in localStorage and sessionStorage
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
      resumeData.personal.fullName = fullName || email.split("@")[0].replace(/[._]/g, " ");
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
      }, 500);
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
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Gift className="w-3.5 h-3.5" /> 100% Free Forever
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans mt-2">
            Claim Free Studio Access
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Open-source and zero-friction. Enter your email to begin compiling verified ATS resumes directly from your code.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleFreeSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-xs font-mono text-slate-300 font-semibold mb-1.5 block">
              Full Name (for resume header)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
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
              Email Address <span className="text-emerald-400">*</span>
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
              <CheckCircle2 className="w-4 h-4" /> Workspace verified! Launching Resume Studio...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-violet-600/30 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span>Activating Studio...</span>
            ) : (
              <>
                <span>Launch Free Studio Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security & Open Source Assurance */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Free Forever</span>
          </div>
          <span>Zero Credit Card Required</span>
        </div>
      </div>
    </div>
  );
}
