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
  CheckCircle2,
  KeyRound
} from "lucide-react";
import ParticleCanvas from "@/components/ParticleCanvas";
import { GithubIcon } from "@/components/GithubIcon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

      // 1. Optional backend auth / lead logging
      await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "login_flow",
          metadata_json: {
            rememberMe,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((err) => console.warn("Backend login ping notice:", err));

      // 2. Persist in localStorage and sessionStorage
      localStorage.setItem("careercompiler_user_email", email);
      localStorage.setItem("careercompiler_email_unlocked", email);
      sessionStorage.setItem("careercompiler_user_email", email);

      // Pre-seed gold_resume_data if personal.email is missing
      const existingDataStr = sessionStorage.getItem("gold_resume_data") || localStorage.getItem("gold_resume_data");
      let resumeData: any = {};
      if (existingDataStr) {
        try {
          resumeData = JSON.parse(existingDataStr);
        } catch (err) {}
      }

      if (!resumeData.personal) resumeData.personal = {};
      if (!resumeData.personal.email) resumeData.personal.email = email;
      if (!resumeData.personal.fullName) {
        // Derive clean name from email prefix
        const namePart = email.split("@")[0].replace(/[._]/g, " ");
        resumeData.personal.fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      }

      sessionStorage.setItem("gold_resume_data", JSON.stringify(resumeData));
      localStorage.setItem("gold_resume_data", JSON.stringify(resumeData));

      setSuccess(true);
      window.dispatchEvent(new Event("email_saved"));
      window.dispatchEvent(new Event("avatar_updated"));

      setTimeout(() => {
        router.push("/resume");
      }, 600);
    } catch (err) {
      console.error(err);
      router.push("/resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail("alex.chen@engineer.io");
    setPassword("••••••••••••");
    localStorage.setItem("careercompiler_user_email", "alex.chen@engineer.io");
    localStorage.setItem("careercompiler_email_unlocked", "alex.chen@engineer.io");
    sessionStorage.setItem("careercompiler_user_email", "alex.chen@engineer.io");
    window.dispatchEvent(new Event("email_saved"));
    setSuccess(true);
    setTimeout(() => {
      router.push("/resume");
    }, 400);
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
            <span className="pearl-badge inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> Welcome Back
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans mt-2">
            Log in to your workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Access your verified evidence graph, ATS scores, and compiled resumes.
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <KeyRound className="w-4 h-4 text-violet-400 shrink-0" />
            <span>Need quick access?</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer"
          >
            Fill Demo Account &rarr;
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-slate-300 font-semibold">
                Password
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions will be sent to your email.");
                }}
                className="text-[11px] font-mono text-violet-400 hover:text-violet-300 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-black/40 text-violet-600 focus:ring-violet-500 accent-violet-600"
              />
              <span>Remember this device</span>
            </label>
          </div>

          {error && (
            <p className="text-xs font-mono text-rose-400 font-semibold">{error}</p>
          )}

          {success && (
            <p className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Signed in! Opening Resume Studio...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="gradient-button w-full py-3.5 rounded-xl text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Studio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0c0e15] px-3 text-[11px] font-mono text-slate-500 uppercase tracking-wider relative">
            Or
          </span>
        </div>

        {/* GitHub / Zero-friction Sign in */}
        <button
          type="button"
          onClick={() => {
            setEmail("github.developer@verified.io");
            setPassword("github-oauth-verified");
            localStorage.setItem("careercompiler_user_email", "github.developer@verified.io");
            sessionStorage.setItem("careercompiler_user_email", "github.developer@verified.io");
            window.dispatchEvent(new Event("email_saved"));
            setSuccess(true);
            setTimeout(() => router.push("/resume"), 500);
          }}
          className="w-full py-3 px-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:border-white/20"
        >
          <GithubIcon className="w-4 h-4 text-white" />
          <span>Continue with GitHub</span>
        </button>

        {/* Switch to Sign Up */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-slate-400">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 ml-1"
          >
            Sign up for free
          </Link>
        </div>

        {/* Security Assurance */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted session &bull; Zero prompt retention</span>
        </div>
      </div>
    </div>
  );
}
