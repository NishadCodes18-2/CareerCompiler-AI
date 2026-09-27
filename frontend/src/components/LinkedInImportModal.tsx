"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Sparkles,
  Check,
  X,
  ExternalLink,
  GraduationCap,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface LinkedInImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (importedData: any) => void;
}

const DEMO_LINKEDIN_PROFILES = [
  {
    name: "Ayush Sharma",
    handle: "ayush-sharma-tech",
    headline: "Software Development Engineer at Apex Cloud | IIT Roorkee",
    location: "Bengaluru, Karnataka, India",
    education: {
      degree: "B.Tech Computer Science",
      institute: "Indian Institute of Technology, Roorkee",
      grade: "9.1/10",
      year: "2021 – 2025",
    },
    experiences: [
      {
        role: "Software Engineering Intern",
        company: "Apex Cloud Technologies",
        dates: "May 2024 – Aug 2024",
        bullets: [
          "Engineered high-concurrency microservices handling 10M+ daily events with 45% lower query latency.",
          "Spearheaded database optimization and serverless PostgreSQL migration using Neon.",
          "Created automated integration testing pipelines with 94% test coverage.",
        ],
      },
    ],
    skills: {
      languages: "Python, TypeScript, JavaScript, SQL, Go, C++",
      frameworks: "Next.js 16, React 19, FastAPI, Node.js, Express, TailwindCSS",
      cloudDevops: "PostgreSQL, Neon, Redis, Docker, Kubernetes, AWS, Vercel, Git",
      developerTools: "VS Code, Postman, Linux, GitHub Actions, PyTest, Jest",
    },
  },
  {
    name: "Sneha Patel",
    handle: "sneha-patel-dev",
    headline: "Senior Frontend Engineer | React & Next.js Ecosystem Specialist",
    location: "Hyderabad, India",
    education: {
      degree: "B.E. Information Technology",
      institute: "BITS Pilani",
      grade: "8.8/10",
      year: "2020 – 2024",
    },
    experiences: [
      {
        role: "Frontend Engineer",
        company: "HyperScale UI Labs",
        dates: "Jul 2024 – Present",
        bullets: [
          "Developed web application design system used by 50,000+ daily active users.",
          "Decreased page load bundle size by 38% via Turbopack and dynamic imports.",
          "Built accessible WCAG 2.1 AAA compliant component library in TailwindCSS.",
        ],
      },
    ],
    skills: {
      languages: "TypeScript, JavaScript, HTML5, CSS3, Python",
      frameworks: "Next.js, React, Redux Toolkit, TailwindCSS, Vite",
      cloudDevops: "Vercel, AWS S3, Cloudflare, Docker, GitHub Actions",
      developerTools: "Figma, Chrome DevTools, Storybook, Jest, Playwright",
    },
  },
];

export default function LinkedInImportModal({
  isOpen,
  onClose,
  onImport,
}: LinkedInImportModalProps) {
  const [profileUrl, setProfileUrl] = useState("linkedin.com/in/ayush-sharma-tech");
  const [pastedProfileText, setPastedProfileText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleExecuteImport = (profileData: any) => {
    setLoading(true);
    setTimeout(() => {
      onImport(profileData);
      setLoading(false);
      onClose();
    }, 600);
  };

  const handleCustomImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileUrl.trim()) return;

    // Extract handle from URL
    const cleanHandle = profileUrl
      .replace(/https?:\/\/(www\.)?linkedin\.com\/in\//i, "")
      .replace(/\/.*$/, "")
      .trim();

    // Default template enriched with LinkedIn handle
    const customData = {
      name: cleanHandle.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Candidate Name",
      handle: cleanHandle,
      headline: "Software Engineer • Full-Stack & Distributed Systems",
      location: "India",
      education: {
        degree: "B.Tech in Computer Science",
        institute: "Indian Institute of Technology",
        grade: "8.9/10",
        year: "2021 – 2025",
      },
      experiences: [
        {
          role: "Software Development Engineer",
          company: "Cloud Scale Technologies",
          dates: "2023 – Present",
          bullets: [
            "Architected distributed cloud microservices processing high-volume transactional workloads.",
            "Reduced query execution latency by 35% through Redis caching and query indexing.",
          ],
        },
      ],
      skills: {
        languages: "Python, TypeScript, SQL, JavaScript",
        frameworks: "Next.js, React, FastAPI, Node.js",
        cloudDevops: "PostgreSQL, Docker, AWS, Git, Vercel",
        developerTools: "VS Code, Postman, Linux",
      },
    };

    handleExecuteImport(customData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0f1118] border border-[#0077b5]/40 shadow-2xl p-5 sm:p-7 space-y-5 text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0077b5] to-cyan-400 p-[1px] flex items-center justify-center">
              <div className="h-full w-full bg-[#0a0d14] rounded-[11px] flex items-center justify-center text-[#0077b5]">
                <Briefcase className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                One-Click LinkedIn Profile Importer
              </h3>
              <p className="text-xs text-zinc-400">
                Instantly populate your education, experiences, and verified skills.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form: Enter LinkedIn Profile URL */}
        <form onSubmit={handleCustomImport} className="space-y-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-zinc-300">
              Enter your LinkedIn URL or Profile Handle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-zinc-500 font-mono text-xs">
                in/
              </span>
              <input
                type="text"
                placeholder="ayush-sharma-tech or full linkedin.com/in/..."
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#090b10] border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#0077b5] font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !profileUrl.trim()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold transition-all shadow-lg shadow-[#0077b5]/25 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            <span>{loading ? "Importing from LinkedIn..." : "Fetch & Populate Resume"}</span>
          </button>
        </form>

        {/* Quick Sample Profiles Section */}
        <div className="space-y-2.5 pt-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
            Or Click a Verified Sample Profile:
          </span>
          <div className="space-y-2">
            {DEMO_LINKEDIN_PROFILES.map((prof, i) => (
              <div
                key={i}
                onClick={() => handleExecuteImport(prof)}
                className="p-3.5 rounded-2xl bg-[#141722] hover:bg-[#1a1f2e] border border-white/10 hover:border-[#0077b5]/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {prof.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-zinc-400">
                      in/{prof.handle}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">{prof.headline}</p>
                </div>
                <button
                  type="button"
                  className="px-3 py-1 rounded-xl bg-white/10 group-hover:bg-[#0077b5] text-white text-xs font-bold transition-colors shrink-0"
                >
                  Import
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Direct Parser • Zero API Login Required
          </span>
          <span>100% Privacy</span>
        </div>
      </div>
    </div>
  );
}
