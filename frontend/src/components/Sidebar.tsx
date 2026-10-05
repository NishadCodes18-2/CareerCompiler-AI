"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  Calendar,
  HelpCircle,
  User,
  FileText,
  Briefcase,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Heart
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setMobileDrawerOpen((prev) => !prev);
    const handleOpen = () => setMobileDrawerOpen(true);
    const handleClose = () => setMobileDrawerOpen(false);

    window.addEventListener("toggle_mobile_sidebar", handleToggle);
    window.addEventListener("open_mobile_sidebar", handleOpen);
    window.addEventListener("close_mobile_sidebar", handleClose);

    return () => {
      window.removeEventListener("toggle_mobile_sidebar", handleToggle);
      window.removeEventListener("open_mobile_sidebar", handleOpen);
      window.removeEventListener("close_mobile_sidebar", handleClose);
    };
  }, []);

  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setMobileDrawerOpen(false);
    }
  }, [pathname]);

  if (pathname === "/") {
    return null;
  }

  const navSections = [
    {
      title: "Core Resume Tools",
      items: [
        {
          href: "/resume",
          label: "Resume Studio",
          desc: "Gold-standard IIT/FAANG template with live preview",
          icon: Layers,
          badge: "Best Format"
        },
        {
          href: "/dashboard",
          label: "Dashboard",
          desc: "Multi-site overview & career readiness score",
          icon: Home
        }
      ]
    },
    {
      title: "Connect Your Evidence",
      items: [
        {
          href: "/github",
          label: "GitHub Import",
          desc: "Auto-fetch repos, stars, commit history & tech stack",
          icon: GithubIcon,
          badge: "Auto"
        },
        {
          href: "/documents",
          label: "Document OCR",
          desc: "Scan existing PDFs, certificates & experience letters",
          icon: FileText
        },
        {
          href: "/jobs",
          label: "Job Description Match",
          desc: "Align resume keywords to target role requirements",
          icon: Briefcase
        }
      ]
    },
    {
      title: "Career & Interview",
      items: [
        {
          href: "/interview",
          label: "Interview Defense",
          desc: "Generate smart Q&A to defend every resume claim",
          icon: HelpCircle
        },
        {
          href: "/roadmap",
          label: "Career Roadmap",
          desc: "Step-by-step projects to close missing skill gaps",
          icon: Calendar
        }
      ]
    },
    {
      title: "Settings & Profile",
      items: [
        {
          href: "/profile",
          label: "Profile & Photo",
          desc: "Set master headshot, contact links & personal info",
          icon: User
        }
      ]
    }
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="no-print shrink-0 w-72 bg-[#07080b] border-r border-white/[0.08] flex flex-col justify-between py-5 px-3.5 h-[calc(100vh-4rem)] sticky top-16 z-30 select-none hidden lg:flex">
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Quick Callout */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-violet-600/10 via-indigo-600/10 to-transparent border border-violet-500/25 shadow-lg shadow-violet-500/5">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-bold mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Resume Studio</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Synthesize verified code commits, format with LaTeX typography, and export ATS 98+ PDFs.
            </p>
          </div>

          {/* Grouped Navigation */}
          <div className="space-y-5">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  {section.title}
                </span>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-start gap-3 px-3 py-2.5 rounded-2xl transition-all duration-150 group ${
                          isActive
                            ? "bg-violet-600/15 border border-violet-500/40 text-white shadow-md shadow-violet-600/10"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                        }`}
                      >
                        <div
                          className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isActive
                              ? "bg-violet-600/30 text-violet-300"
                              : "bg-[#0f1118] text-slate-400 group-hover:text-white group-hover:bg-[#151824]"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-bold truncate ${
                                isActive ? "text-violet-200" : "text-slate-300 group-hover:text-white"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-bold shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-slate-500 group-hover:text-slate-400 leading-snug mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-3 border-t border-white/[0.06] px-1 space-y-2">
          <Link
            href="/resume"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/25 text-violet-300 text-xs font-bold transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-violet-400" />
              <span>Open Resume Studio</span>
            </span>
            <ChevronRight className="h-4 w-4 text-violet-400" />
          </Link>

          {/* Author Attribution */}
          <div className="pt-1 pb-1 px-1 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-[10px]">
              Made with <Heart className="h-2.5 w-2.5 text-rose-500 fill-rose-500 animate-pulse" /> by
            </span>
            <a
              href="https://github.com/NishadCodes18"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-violet-400 font-semibold flex items-center gap-1 transition-colors text-[10.5px] group"
            >
              <GithubIcon className="h-3 w-3 text-violet-400 group-hover:rotate-12 transition-transform" />
              <span>Nishad Patil</span>
              <span className="text-slate-500 group-hover:text-violet-400 text-[9px]">↗</span>
            </a>
          </div>
        </div>
      </aside>

      {/* MOBILE / TABLET FULL SLIDE-OUT DRAWER OVERLAY */}
      {mobileDrawerOpen && (
        <div className="no-print lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <div className="relative w-4/5 max-w-sm bg-[#0c0e15] border-r border-white/10 h-full flex flex-col p-5 overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center font-black text-sm border border-violet-500/30">
                  CC
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">CareerCompiler AI</h2>
                  <p className="text-[10px] text-slate-400">All Features &amp; Sections</p>
                </div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation List */}
            <div className="space-y-5 flex-1">
              {navSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-violet-400 font-bold block">
                    {section.title}
                  </span>

                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                            isActive
                              ? "bg-violet-600/20 border border-violet-500/40 text-white"
                              : "text-slate-300 hover:bg-white/5"
                          }`}
                        >
                          <div
                            className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                              isActive
                                ? "bg-violet-600/30 text-violet-300"
                                : "bg-[#151824] text-slate-400"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 font-bold">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
              <Link
                href="/resume"
                onClick={() => setMobileDrawerOpen(false)}
                className="gradient-button w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Layers className="h-4 w-4" />
                <span>Open Resume Studio</span>
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" />
                <span>by</span>
                <a
                  href="https://github.com/NishadCodes18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-violet-400 font-semibold flex items-center gap-1 transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-violet-400" />
                  <span>Nishad Patil</span>
                  <span className="text-slate-500 text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE / TABLET BOTTOM NAVIGATION BAR */}
      <div className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07080b]/95 backdrop-blur-xl border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <Link
          href="/resume"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors ${
            pathname === "/resume" || pathname === "/" ? "text-violet-400" : "text-slate-400 hover:text-white"
          }`}
        >
          <Layers className="h-4.5 w-4.5" />
          <span className="text-[10px] font-bold">Resume</span>
        </Link>

        <Link
          href="/github"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors ${
            pathname === "/github" ? "text-violet-400" : "text-slate-400 hover:text-white"
          }`}
        >
          <GithubIcon className="h-4.5 w-4.5" />
          <span className="text-[10px] font-medium">GitHub</span>
        </Link>

        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors ${
            pathname === "/dashboard" ? "text-violet-400" : "text-slate-400 hover:text-white"
          }`}
        >
          <Home className="h-4.5 w-4.5" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-colors ${
            pathname === "/profile" ? "text-violet-400" : "text-slate-400 hover:text-white"
          }`}
        >
          <User className="h-4.5 w-4.5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>

        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Open full menu"
        >
          <Menu className="h-4.5 w-4.5" />
          <span className="text-[10px] font-medium">All Tools</span>
        </button>
      </div>
    </>
  );
}
