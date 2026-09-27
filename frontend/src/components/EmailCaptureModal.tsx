"use client";

import React, { useState, useEffect } from "react";
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

      // Pre-seed gold_resume_data in sessionStorage so the email is immediately rendered in resume header
      const existingDataStr = sessionStorage.getItem("gold_resume_data");
      if (existingDataStr) {
        try {
          const parsed = JSON.parse(existingDataStr);
          if (parsed && parsed.personal) {
            parsed.personal.email = email;
            sessionStorage.setItem("gold_resume_data", JSON.stringify(parsed));
          }
        } catch (err) {}
      }

      // Dispatch event to let page know it has been unlocked
      window.dispatchEvent(new Event("email_saved"));

      setSuccess(true);

      setTimeout(() => {
        onClose();
        window.location.href = destination || "/resume";
      }, 650);
    } catch (err: any) {
      console.error("Email capture error:", err);
      // Even if network fails, ensure user can proceed
      localStorage.setItem("careercompiler_user_email", email);
      window.location.href = destination || "/resume";
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0d1017] border border-emerald-500/40 p-6 sm:p-7 shadow-2xl space-y-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Icon */}
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-lg shadow-emerald-500/20">
          <div className="h-full w-full bg-[#0a0d14] rounded-[14.5px] flex items-center justify-center text-emerald-400">
            <Mail className="h-6 w-6" />
          </div>
        </div>

        {/* Title & Explanation */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <Sparkles className="h-3 w-3" />
            <span>Direct Studio Access</span>
          </div>
          <h3 className="text-lg font-black text-white leading-snug">
            Enter your email to start making your resume
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Your email will be securely saved into our database and automatically fetched into your
            resume header so you can compile and download PDFs instantly.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-zinc-400 block font-medium">
              Candidate Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                required
                autoFocus
                placeholder="you@iitb.ac.in or you@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#141724] border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 font-mono transition-colors"
              />
            </div>
            {error && <p className="text-[11px] text-red-400">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting || !email.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-[#090b0e] text-xs font-extrabold shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
          >
            {success ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#090b0e]" />
                <span>Email Saved! Redirecting...</span>
              </>
            ) : submitting ? (
              <span>Saving & Auto-Populating Resume...</span>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Start Making My Resume 🚀</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Trust Badges */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Stored in Neon DB
          </span>
          <span>•</span>
          <span>100% Free Forever</span>
        </div>
      </div>
    </div>
  );
}
