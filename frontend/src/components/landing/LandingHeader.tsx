"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowRight, Layers, User } from "lucide-react";

interface LandingHeaderProps {
  onActionClick: (destination: string) => void;
}

export default function LandingHeader({ onActionClick }: LandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed z-50 transition-all duration-500 pt-[env(safe-area-inset-top)] top-0 left-0 right-0">
      <nav
        className={`mx-auto transition-all duration-500 max-w-[1400px] ${
          scrolled
            ? "bg-[#07080b]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between transition-all duration-500 px-4 sm:px-6 lg:px-8 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105">
              <div className="h-full w-full bg-[#0a0c14] rounded-[11px] flex items-center justify-center">
                <Layers className="h-5 w-5 text-violet-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <span className="font-sans font-extrabold tracking-tight transition-all duration-500 text-xl sm:text-2xl text-white">
              CareerCompiler<span className="text-violet-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            <button
              onClick={() => scrollToSection("workflow")}
              className="text-sm text-slate-300/80 hover:text-white transition-colors duration-300 relative group cursor-pointer"
            >
              Workflow
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("screenshots")}
              className="text-sm text-slate-300/80 hover:text-white transition-colors duration-300 relative group cursor-pointer"
            >
              Screenshots
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("use-cases")}
              className="text-sm text-slate-300/80 hover:text-white transition-colors duration-300 relative group cursor-pointer"
            >
              Use Cases
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="text-sm text-slate-300/80 hover:text-white transition-colors duration-300 relative group cursor-pointer"
            >
              Demo
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm text-slate-300/80 hover:text-white transition-colors duration-300 relative group cursor-pointer"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white transition-all duration-300 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Log in
            </Link>
            <button
              onClick={() => onActionClick("/resume")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 px-4 h-10 text-sm font-semibold shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-violet-200 animate-pulse" />
              Compile AI Resume
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 pt-4 pb-8 bg-[#07080b]/98 border-b border-white/10 backdrop-blur-2xl space-y-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("workflow")}
                className="text-left text-base text-slate-200 py-2 hover:text-violet-400 transition-colors"
              >
                Workflow
              </button>
              <button
                onClick={() => scrollToSection("screenshots")}
                className="text-left text-base text-slate-200 py-2 hover:text-violet-400 transition-colors"
              >
                Screenshots & Knowledge Hub
              </button>
              <button
                onClick={() => scrollToSection("use-cases")}
                className="text-left text-base text-slate-200 py-2 hover:text-violet-400 transition-colors"
              >
                Use Cases
              </button>
              <button
                onClick={() => scrollToSection("demo")}
                className="text-left text-base text-slate-200 py-2 hover:text-violet-400 transition-colors"
              >
                Interactive Demo
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left text-base text-slate-200 py-2 hover:text-violet-400 transition-colors"
              >
                Pricing
              </button>
            </div>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full text-center py-2.5 rounded-xl border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/5"
              >
                Log in
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onActionClick("/resume");
                }}
                className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30"
              >
                <Sparkles className="h-4 w-4" />
                Compile AI Resume
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
