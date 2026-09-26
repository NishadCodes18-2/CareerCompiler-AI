"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Terminal, Sparkles, LogOut, User as UserIcon } from "lucide-react";
import { getAuthToken, clearAuthToken, authApi } from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("careercompiler_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    router.push("/login");
  };

  const handleDemoSwitch = async () => {
    try {
      const demo = await authApi.demoLogin();
      setUser(demo);
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#232733] bg-[#090a0f]/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-white font-semibold tracking-tight hover:opacity-90">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-400">
              <Terminal className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">CareerCompiler<span className="text-blue-500">.ai</span></span>
              <span className="hidden sm:inline text-[10px] text-zinc-400 font-mono tracking-wider uppercase">Compile your career into proof</span>
            </div>
          </Link>

          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
            <ShieldCheck className="h-3 w-3" />
            Evidence-Backed v1.0
          </span>
        </div>

        {/* User Pill & Action */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#161822] border border-[#232733] text-xs">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-zinc-200 font-medium">{user.full_name || "Alex Morgan"}</span>
                {user.is_demo && (
                  <span className="bg-blue-900/60 text-blue-300 text-[10px] px-1.5 py-0.5 rounded font-mono">DEMO</span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md text-zinc-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDemoSwitch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Explore Demo Candidate
              </button>
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-md border border-[#232733] hover:bg-[#161822] text-zinc-300 text-xs font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
