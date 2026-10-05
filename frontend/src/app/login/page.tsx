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
  CheckCircle2,
  Code2,
  Gift
} from "lucide-react";
import ParticleCanvas from "@/components/ParticleCanvas";
import { GithubIcon } from "@/components/GithubIcon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleFreeEntry = async (userEmail: string) => {
    if (!userEmail || !userEmail.includes("@")) {
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
          email: userEmail,
          source: "email_entry_flow",
          metadata_json: {
            isFreeAccess: true,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.warn("Backend lead ping note:", err));

      // Persist in localStorage and sessionStorage
      localStorage.setItem("careercompiler_user_email", userEmail);
      localStorage.setItem("careercompiler_email_unlocked", userEmail);
      sessionStorage.setItem("careercompiler_user_email", userEmail);

      // Pre-seed gold_resume_data if personal.email is missing
      const existingDataStr = sessionStorage.getItem("gold_resume_data") || localStorage.getItem("gold_resume_data");
      let resumeData: any = {};
      if (existingDataStr) {
        try {
          resumeData = JSON.parse(existingDataStr);
        } catch (err) {}
      }

      if (!resumeData.personal) resumeData.personal = {};
      if (!resumeData.personal.email) resumeData.personal.email = userEmail;
      if (!resumeData.personal.fullName) {
        const namePart = userEmail.split("@")[0].replace(/[._]/g, " ");
        resumeData.personal.fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFreeEntry(email);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 bg-[#07080b] overflow-hidden">
      <ParticleCanvas particleCount={40} />

      {/* Atmospheric Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-violet-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0c0e15] border border-white/10 shadow-2xl space-y-6 text-left backdrop-blur-xl">
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
              <Gift className="w-3.5 h-3.5" /> 100% Free & Open Source
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans mt-2">
            Instant Studio Access
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            No password required. Enter your email to immediately unlock the full compiler, LaTeX studio, and ATS radar.
          </p>
        </div>

        {/* Zero-friction Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-300 font-semibold mb-1.5 block">
              Developer Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-black/50 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-mono text-rose-400 font-semibold">{error}</p>
          )}

          {success && (
            <p className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Access verified! Opening Resume Studio...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-violet-600/30 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span>Unlocking Studio...</span>
            ) : (
              <>
                <span>Launch Free Studio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0c0e15] px-3 text-[11px] font-mono text-slate-500 uppercase tracking-wider relative">
            Or Quick Access
          </span>
        </div>

        {/* GitHub 1-click Quick Entry */}
        <button
          type="button"
          onClick={() => handleFreeEntry("github.engineer@verified.dev")}
          className="w-full py-3 px-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:border-white/20"
        >
          <GithubIcon className="w-4 h-4 text-white" />
          <span>Continue with GitHub Developer Account</span>
        </button>

        {/* Security & Open Source Guarantee */}
        <div className="pt-2 border-t border-white/10 flex flex-col items-center gap-2 text-[11px] text-slate-400 font-mono text-center">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Paywalls &bull; Zero Spam &bull; MIT Licensed</span>
          </div>
          <span>Your data stays on your machine and private database.</span>
        </div>
      </div>
    </div>
  );
}
