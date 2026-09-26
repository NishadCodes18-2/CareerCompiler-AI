"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Layers } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the instant zero-login resume studio
    const timer = setTimeout(() => {
      router.push("/resume");
    }, 1200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-[75vh] items-center justify-center py-12 px-4 sm:px-6">
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-[#0e1017] border border-white/10 shadow-2xl text-center space-y-5">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-[#4ade80]/15 border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80]">
          <Layers className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white font-sans">
            No Account Needed
          </h2>
          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
            You don't need to sign up to build, preview, or download resumes. All data stays secure and private in your active browser session.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#4ade80] shrink-0" />
          <span>Redirecting to Resume Studio...</span>
        </div>

        <Link
          href="/resume"
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] font-bold text-xs transition-all shadow-lg cursor-pointer"
        >
          <span>Start Building Instantly</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
