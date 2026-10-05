"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Sparkles, X, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: string;
}

export default function EmailCaptureModal({
  isOpen,
  onClose,
  destination = "/resume",
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      const saved =
        localStorage.getItem("careercompiler_user_email") ||
        localStorage.getItem("careercompiler_email_unlocked") ||
        "";
      setEmail(saved);
      setSuccess(false);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
      // 1. Submit lead to database
      await fetch(`${apiUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "home_page_universal_gate",
          metadata_json: {
            destination,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((err) => {
        console.warn("Backend lead notification note:", err);
      });

      // 2. Persist in storage so Resume Studio automatically fetches it into personal.email
      localStorage.setItem("careercompiler_user_email", email);
      localStorage.setItem("careercompiler_email_unlocked", email);
      sessionStorage.setItem("careercompiler_user_email", email);

      // Pre-seed gold_resume_data so the email is immediately rendered in resume header
      let resumeData: any = {};
      const existingDataStr =
        sessionStorage.getItem("gold_resume_data") ||
        localStorage.getItem("gold_resume_data");

      if (existingDataStr) {
        try {
          resumeData = JSON.parse(existingDataStr);
        } catch (err) {}
      }

      if (!resumeData.personal) resumeData.personal = {};
      resumeData.personal.email = email;
      if (!resumeData.personal.fullName) {
        const namePart = email.split("@")[0].replace(/[._]/g, " ");
        resumeData.personal.fullName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      }

      sessionStorage.setItem("gold_resume_data", JSON.stringify(resumeData));
      localStorage.setItem("gold_resume_data", JSON.stringify(resumeData));

      // Dispatch event to let page know it has been unlocked
      window.dispatchEvent(new Event("email_saved"));
      window.dispatchEvent(new Event("avatar_updated"));

      setSuccess(true);

      setTimeout(() => {
        onClose();
        window.location.href = destination || "/resume";
      }, 600);
    } catch (err: any) {
      console.error("Email capture error:", err);
      // Graceful fallback: persist and navigate
      localStorage.setItem("careercompiler_user_email", email);
      localStorage.setItem("careercompiler_email_unlocked", email);
      sessionStorage.setItem("careercompiler_user_email", email);
      window.location.href = destination || "/resume";
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0c0e15] border border-white/15 p-7 sm:p-8 shadow-2xl space-y-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Icon */}
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 p-[1px] shadow-lg shadow-violet-500/20">
          <div className="h-full w-full bg-[#0a0c14] rounded-[15px] flex items-center justify-center text-violet-400">
            <Mail className="h-6 w-6" />
          </div>
        </div>

        {/* Title & Explanation */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="pearl-badge inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-emerald-400">
              <Sparkles className="h-3 w-3" /> Direct Studio Access
            </span>
          </div>
          <h3 className="text-xl font-black text-white font-sans tracking-tight">
            Unlock Full AI Resume Studio
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enter your email to unlock all FAANG templates, real-time STAR optimizer, and ATS scoring rubrics instantly.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 font-semibold block">
              Candidate Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                autoFocus
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all font-mono"
              />
            </div>
            {error && <p className="text-xs font-mono text-rose-400 font-semibold">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting || !email.trim()}
            className="gradient-button w-full py-3.5 rounded-xl text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-50"
          >
            {success ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Unlocked! Opening Studio...</span>
              </>
            ) : submitting ? (
              <span>Unlocking Studio & Syncing...</span>
            ) : (
              <>
                <span>Unlock & Open Resume Studio</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Alternate Sign Up link */}
        <div className="pt-2 text-center text-xs text-slate-400">
          Want a full profile?{" "}
          <Link
            href="/signup"
            onClick={onClose}
            className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-2 ml-1"
          >
            Sign up with full profile &rarr;
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> 100% Private & Free
          </span>
          <span>&bull;</span>
          <span>Zero Prompt Retention</span>
        </div>
      </div>
    </div>
  );
}
