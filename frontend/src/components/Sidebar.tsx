"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Network,
  FileText,
  Briefcase,
  GitPullRequest,
  Compass,
  FileCheck2,
  CheckCircle,
  HelpCircle,
  Cpu,
  Layers
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Master Career Profile", icon: UserCheck },
  { href: "/evidence", label: "Career Evidence Engine", icon: Network },
  { href: "/github", label: "GitHub Analyzer", icon: GithubIcon },
  { href: "/documents", label: "Document & Credentials", icon: FileText },
  { href: "/jobs", label: "Role Intelligence & JDs", icon: Briefcase },
  { href: "/roadmap", label: "Career Roadmap & Gaps", icon: Compass },
  { href: "/resume", label: "Resume Compiler", icon: Layers, highlight: true },
  { href: "/analysis", label: "ATS & Reviews", icon: FileCheck2 },
  { href: "/interview", label: "Defend My Resume", icon: HelpCircle },
  { href: "/admin", label: "Developer & System Diagnostics", icon: Cpu }
];

export default function Sidebar() {
  const pathname = usePathname();

  // Do not render sidebar on landing, login, signup
  if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <aside className="w-64 shrink-0 border-r border-[#232733] bg-[#0d0f17] flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono font-semibold tracking-wider text-zinc-500 uppercase">
          Career Proof Pipeline
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-[#161822] border border-transparent"
              } ${item.highlight && !isActive ? "text-blue-300" : ""}`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-blue-400" : "text-zinc-400"}`} />
              <span>{item.label}</span>
              {item.highlight && (
                <span className="ml-auto text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">
                  Core
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-[#232733] bg-[#090a0f]">
        <div className="p-2.5 rounded-lg bg-[#141721] border border-[#232733] text-[11px] text-zinc-400 space-y-1">
          <div className="flex items-center justify-between text-zinc-300 font-medium">
            <span>Target Role</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <p className="text-zinc-200 text-xs font-semibold truncate">Backend Developer Intern</p>
          <p className="text-[10px] text-zinc-500">Evidence status: Verified (9 items)</p>
        </div>
      </div>
    </aside>
  );
}
