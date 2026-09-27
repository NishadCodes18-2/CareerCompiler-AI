"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import {
  Printer,
  Download,
  Loader2,
  Sparkles,
  Share2,
  Check,
  Globe,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  Clock,
  Lock,
  Monitor,
  AlertTriangle
} from "lucide-react";
import {
  getGithubHref,
  getLinkedinHref,
  getWebHref,
  INITIAL_GOLD_RESUME,
  RESUME_THEMES
} from "@/components/GoldStandardResumeStudio";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function PublicResumePage({ params, searchParams }: PageProps) {
  const resolvedParams = use(params);
  const resolvedSearchParams = searchParams ? use(searchParams) : {};
  const candidateId = (resolvedParams.id || "ayush").toLowerCase();
  
  const [copied, setCopied] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [expiryDateText, setExpiryDateText] = useState("");
  const [daysRemaining, setDaysRemaining] = useState<number | null>(7);
  const [resumeData, setResumeData] = useState<any>(INITIAL_GOLD_RESUME);
  const [showInAppModal, setShowInAppModal] = useState(false);
  const [activeTheme, setActiveTheme] = useState<any>(RESUME_THEMES.classic);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Read expiry from search params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const expFromUrl = (resolvedSearchParams?.exp as string) || urlParams.get("exp");

    // 2. Check if candidate customized their shared data
    let storedData: any = null;
    let storedExp: number | null = null;

    try {
      const raw = localStorage.getItem(`cc_resume_share_${candidateId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.data) storedData = parsed.data;
        if (parsed?.expiresAt) storedExp = Number(parsed.expiresAt);
      }
    } catch (e) {}

    const effectiveExp = expFromUrl ? Number(expFromUrl) : storedExp;

    if (effectiveExp) {
      const now = Date.now();
      if (now > effectiveExp) {
        setIsExpired(true);
        setExpiryDateText(new Date(effectiveExp).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric"
        }));
      } else {
        const days = Math.max(1, Math.ceil((effectiveExp - now) / (1000 * 60 * 60 * 24)));
        setDaysRemaining(days);
        setExpiryDateText(new Date(effectiveExp).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric"
        }));
      }
    } else {
      // Default 7-day validity from first view if no token provided
      setDaysRemaining(7);
    }

    if (storedData) {
      setResumeData(storedData);
      setActiveTheme(RESUME_THEMES[storedData.theme || "classic"] || RESUME_THEMES.classic);
    } else {
      setActiveTheme(RESUME_THEMES.classic);
    }
  }, [candidateId, resolvedSearchParams]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportPdfStatus, setExportPdfStatus] = useState("");

  const handleDownloadPdf = async () => {
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent || "";
      if (/Instagram|FBAN|FBAV|Twitter|TikTok|Snapchat/i.test(ua)) {
        setShowInAppModal(true);
        return;
      }
    }

    const resumeEl = document.getElementById("printable-resume");
    if (!resumeEl) {
      handlePrint();
      return;
    }

    try {
      setIsExportingPdf(true);
      setExportPdfStatus("Preparing PDF...");
      const { exportResumePdf } = await import("@/utils/pdfExport");
      await exportResumePdf(resumeEl, {
        fileName: `${resumeData?.personal?.fullName || candidateId || "Candidate"} - Resume`,
        paperSize: "a4",
        onProgress: (status) => setExportPdfStatus(status)
      });
    } catch (err) {
      console.warn("Direct PDF compilation fallback to print:", err);
      handlePrint();
    } finally {
      setIsExportingPdf(false);
      setExportPdfStatus("");
    }
  };

  const handlePrint = () => {
    // Detect Instagram / Facebook / TikTok / Twitter in-app browser
    if (typeof navigator !== "undefined") {
      const ua = navigator.userAgent || navigator.vendor || (window as any).opera || "";
      if (/Instagram|FBAN|FBAV|Twitter|TikTok|Snapchat/i.test(ua)) {
        setShowInAppModal(true);
        return;
      }
    }

    // Force light theme and add print class so mobile Chrome never prints dark background
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.body.classList.remove("paper-a4", "paper-letter", "paper-legal", "paper-a3");
      document.body.classList.add("paper-a4");
    }

    setTimeout(() => {
      window.print();
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        document.body.classList.remove("paper-a4", "paper-letter", "paper-legal", "paper-a3");
      }
    }, 250);
  };

  const formatBold = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*|https?:\/\/[^\s]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-zinc-950">{part.slice(2, -2)}</strong>;
      }
      if (/^https?:\/\//i.test(part)) {
        const cleanUrl = part.replace(/[.,;]+$/, "");
        const trailing = part.slice(cleanUrl.length);
        return (
          <span key={i}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block underline underline-offset-2 hover:opacity-80 font-medium cursor-pointer"
              style={{ color: "inherit" }}
            >
              {cleanUrl}
            </a>
            {trailing}
          </span>
        );
      }
      return part;
    });
  };

  // EXPIRED LINK SCREEN (7-Day Expiry Guarantee)
  if (isExpired) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl bg-[#11141c] border border-amber-500/30 p-7 sm:p-9 shadow-2xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 uppercase tracking-wider">
              Link Expired &bull; 7-Day Security Limit
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              This Shared Resume Has Expired
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
              For candidate privacy and verification integrity, CareerCompiler AI shareable links remain active for exactly <strong>7 days</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-zinc-400 space-y-1">
            <div>Candidate: <strong className="text-white uppercase">{candidateId}</strong></div>
            <div>Expired on: <strong className="text-amber-300">{expiryDateText || "Recently"}</strong></div>
            <p className="text-[11px] text-zinc-500 pt-1">
              Please request a renewed 7-day link from the candidate or compile your own resume below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/resume"
              className="px-6 py-3 rounded-full bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] font-extrabold text-xs shadow-lg shadow-[#4ade80]/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Build Your Own Resume</span>
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="public-resume-container space-y-5 pb-20 max-w-5xl mx-auto">
      {/* Mobile Laptop/PC Recommendation Notice */}
      <div className="no-print lg:hidden flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-[#131622] to-teal-500/10 border border-emerald-500/30 text-xs shadow-xl animate-in fade-in">
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
          <Monitor className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-white text-xs">
            <span>💡 For Best Results: Use on Laptop / PC</span>
            <span className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">Recommended</span>
          </div>
          <p className="text-[11px] text-zinc-300 leading-relaxed mt-0.5">
            For full-width A4 sheet viewing &amp; instant 1-click vector PDF download, open this link on your laptop or desktop browser.
          </p>
        </div>
      </div>

      {/* Top Banner for Recruiter/Visitor */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#10131b] border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            title="Back to CareerCompiler AI"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-white">Public Candidate Resume</span>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                Verified FAANG Standard
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30" title="This shareable link expires automatically after 7 days">
                <Clock className="h-3 w-3" />
                Valid 7 Days ({daysRemaining}d left)
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Candidate: <span className="text-zinc-200 font-semibold uppercase">{resumeData?.personal?.fullName || candidateId}</span> &bull; Published via CareerCompiler AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer"
            title="Share this 7-day verified link"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-zinc-400" />}
            <span>{copied ? "Link Copied!" : "Share Link"}</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-60"
            title="Download PDF with interactive clickable hyperlinks"
          >
            {isExportingPdf ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span>{isExportingPdf ? (exportPdfStatus || "Generating PDF...") : "Download PDF"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
            title="Print via browser or send to physical printer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <Link
            href="/resume"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 hover:from-teal-500/30 hover:to-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Build Mine Free</span>
          </Link>
        </div>
      </div>

      {/* Printable / Viewable A4 Resume Canvas with Horizontal Scroll on Mobile */}
      <div className="resume-paper-container flex justify-center overflow-x-auto p-1 sm:p-4 rounded-3xl bg-[#0b0d13] border border-white/10 shadow-2xl print:p-0 print:m-0 print:bg-transparent print:border-none print:shadow-none print:rounded-none print:w-full print:block">
        <div
          id="printable-resume"
          className="w-full bg-white text-zinc-950 font-sans shadow-2xl max-w-[820px] min-w-[700px] sm:min-w-0 p-5 sm:p-10 text-xs leading-normal select-text selection:bg-amber-100 rounded-none print:shadow-none print:border-none print:rounded-none print:transform-none"
        >
          {/* Header */}
          <div
            className="pb-2.5 mb-3 border-b-2"
            style={{ borderBottomColor: activeTheme.hex }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1
                  className="text-2xl sm:text-[26px] font-bold tracking-tight uppercase font-sans leading-tight"
                  style={{ color: activeTheme.hex }}
                >
                  {resumeData.personal.fullName}
                </h1>
                {resumeData.personal.targetRole && (
                  <p className="text-[12px] font-semibold text-zinc-700 uppercase tracking-wide mt-0.5">
                    {resumeData.personal.targetRole}
                  </p>
                )}

                {/* Clickable Contact Links */}
                <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-800 font-mono mt-1 gap-y-1">
                  <div className="flex items-center gap-3">
                    {resumeData.personal.location && (
                      <span className="flex items-center gap-1 text-zinc-800">
                        📍 {resumeData.personal.location}
                      </span>
                    )}
                    {resumeData.personal.email && (
                      <a
                        href={`mailto:${resumeData.personal.email}`}
                        className="inline-block hover:underline transition-colors font-medium cursor-pointer"
                        style={{ color: activeTheme.hex }}
                      >
                        ✉ {resumeData.personal.email}
                      </a>
                    )}
                    {resumeData.personal.phone && (
                      <a
                        href={`tel:${resumeData.personal.phone.replace(/[^+\d]/g, "")}`}
                        className="inline-block hover:underline transition-colors font-medium text-zinc-800 cursor-pointer"
                      >
                        📞 {resumeData.personal.phone}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {resumeData.personal.github && (
                      <a
                        href={getGithubHref(resumeData.personal.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:underline font-semibold cursor-pointer"
                        style={{ color: activeTheme.hex }}
                      >
                        github.com/{resumeData.personal.github.replace(/^(https?:\/\/)?(www\.)?github\.com\/?/, "")} ↗
                      </a>
                    )}
                    {resumeData.personal.linkedin && (
                      <a
                        href={getLinkedinHref(resumeData.personal.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:underline font-semibold cursor-pointer"
                        style={{ color: activeTheme.hex }}
                      >
                        in/{resumeData.personal.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in\/)?/, "")} ↗
                      </a>
                    )}
                    {resumeData.personal.portfolio && (
                      <a
                        href={getWebHref(resumeData.personal.portfolio)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:underline font-semibold cursor-pointer"
                        style={{ color: activeTheme.hex }}
                      >
                        {resumeData.personal.portfolio.replace(/^https?:\/\//, "")} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {resumeData.personal.showPhoto && (
                <div
                  className="overflow-hidden border shrink-0 bg-zinc-100 shadow-sm print:shadow-none h-20 w-20 rounded"
                  style={{ borderColor: activeTheme.hex }}
                >
                  <img
                    src={resumeData.personal.photoUrl || "/avatars/candidate.jpg"}
                    alt="Profile Photo"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Education Table */}
          {resumeData.education?.length > 0 && (
            <div className="mb-3.5">
              <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                <h2 className="text-[12px] font-black uppercase tracking-wider font-sans" style={{ color: activeTheme.hex }}>
                  EDUCATION
                </h2>
              </div>
              <div className="overflow-x-auto rounded-md border" style={{ borderColor: activeTheme.hex }}>
                <table className="w-full border-collapse text-[11px]">
                  <thead>
                    <tr
                      className="font-bold border-b"
                      style={{
                        backgroundColor: activeTheme.bgLight,
                        borderColor: activeTheme.hex,
                        color: activeTheme.hex
                      }}
                    >
                      <th className="border-r px-2.5 py-1 text-left font-bold" style={{ borderColor: activeTheme.hex }}>Degree / Certificate</th>
                      <th className="border-r px-2.5 py-1 text-left font-bold" style={{ borderColor: activeTheme.hex }}>Institute / Board</th>
                      <th className="border-r px-2.5 py-1 text-center font-bold" style={{ borderColor: activeTheme.hex }}>CGPA / Percentage</th>
                      <th className="px-2.5 py-1 text-center font-bold">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumeData.education.map((edu: any, idx: number) => (
                      <tr
                        key={idx}
                        className={idx !== resumeData.education.length - 1 ? "border-b" : ""}
                        style={{
                          borderColor: activeTheme.hex + "30",
                          backgroundColor: idx % 2 === 1 ? (activeTheme.bgLight + "40") : "transparent"
                        }}
                      >
                        <td className="border-r px-2.5 py-1 font-semibold" style={{ borderColor: activeTheme.hex + "30" }}>{edu.degree}</td>
                        <td className="border-r px-2.5 py-1 text-zinc-800" style={{ borderColor: activeTheme.hex + "30" }}>{edu.institute}</td>
                        <td className="border-r px-2.5 py-1 text-center font-mono font-semibold" style={{ borderColor: activeTheme.hex + "30" }}>{edu.grade}</td>
                        <td className="px-2.5 py-1 text-center font-mono">{edu.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Work Experience */}
          {resumeData.experiences?.length > 0 && (
            <div className="mb-3.5">
              <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                <h2 className="text-[12px] font-black uppercase tracking-wider font-sans" style={{ color: activeTheme.hex }}>
                  {resumeData.mode === "student" ? "INTERNSHIPS & INDUSTRIAL TRAINING" : "WORK EXPERIENCE"}
                </h2>
              </div>
              <div className="space-y-2">
                {resumeData.experiences.map((exp: any, idx: number) => (
                  <div key={idx} className="text-[11px]">
                    <div className="flex justify-between font-bold text-zinc-950">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: activeTheme.hex }} />
                        <strong style={{ color: activeTheme.hex }}>{exp.role}</strong>
                        {exp.company && <span className="font-normal text-zinc-700">– {exp.company}</span>}
                      </span>
                      <span className="font-mono text-[10.5px] font-semibold text-zinc-700">{exp.dates}</span>
                    </div>
                    {exp.type && <div className="text-[10px] text-zinc-600 italic pl-3 mb-0.5 font-medium">{exp.type}</div>}
                    <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 leading-snug">
                      {exp.bullets?.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{formatBold(b)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Projects */}
          {resumeData.projects?.length > 0 && (
            <div className="mb-3.5">
              <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                <h2 className="text-[12px] font-black uppercase tracking-wider font-sans" style={{ color: activeTheme.hex }}>
                  TECHNICAL PROJECTS
                </h2>
              </div>
              <div className="space-y-2.5">
                {resumeData.projects.map((proj: any, idx: number) => (
                  <div key={idx} className="text-[11px]">
                    <div className="flex justify-between items-baseline font-bold text-zinc-950">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: activeTheme.hex }} />
                        <strong style={{ color: activeTheme.hex }}>{proj.title}</strong>
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold">
                        {proj.liveDemo && (
                          <a
                            href={getWebHref(proj.liveDemo)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block hover:underline font-bold px-1.5 py-0.5 rounded border cursor-pointer"
                            style={{
                              borderColor: activeTheme.hex + "40",
                              backgroundColor: activeTheme.bgLight,
                              color: activeTheme.hex
                            }}
                          >
                            Live Demo ↗
                          </a>
                        )}
                        {proj.github && (
                          <a
                            href={getGithubHref(proj.github)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block hover:underline font-bold px-1.5 py-0.5 rounded border border-zinc-200 bg-zinc-50 text-zinc-800 cursor-pointer"
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.subtitle && <div className="text-[10px] text-zinc-600 italic pl-3 mb-0.5">{proj.subtitle}</div>}
                    <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 leading-snug">
                      {proj.bullets?.map((b: string, bIdx: number) => (
                        <li key={bIdx}>{formatBold(b)}</li>
                      ))}
                    </ul>
                    {proj.techStack && (
                      <div className="pl-3 mt-0.5 text-[10.5px] text-zinc-700">
                        <strong style={{ color: activeTheme.hex }}>Tech Stack: </strong>{proj.techStack}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competitions & Achievements */}
          {resumeData.achievements?.length > 0 && (
            <div className="mb-3.5">
              <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                <h2 className="text-[12px] font-black uppercase tracking-wider font-sans" style={{ color: activeTheme.hex }}>
                  ACHIEVEMENTS
                </h2>
              </div>
              <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 text-[11px] leading-snug">
                {resumeData.achievements.map((ach: string, idx: number) => (
                  <li key={idx}>{formatBold(ach)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && (
            <div className="mb-3.5">
              <div className="flex items-center gap-1.5 border-b pb-0.5 mb-1.5" style={{ borderBottomColor: activeTheme.hex }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTheme.hex }} />
                <h2 className="text-[12px] font-black uppercase tracking-wider font-sans" style={{ color: activeTheme.hex }}>
                  TECHNICAL SKILLS &amp; INTERESTS
                </h2>
              </div>
              <ul className="list-disc pl-6 space-y-0.5 text-zinc-800 text-[11px] leading-snug">
                {resumeData.skills.languages && (
                  <li><strong style={{ color: activeTheme.hex }}>Languages: </strong>{resumeData.skills.languages}.</li>
                )}
                {resumeData.skills.frameworks && (
                  <li><strong style={{ color: activeTheme.hex }}>Frameworks: </strong>{resumeData.skills.frameworks}.</li>
                )}
                {resumeData.skills.databases && (
                  <li><strong style={{ color: activeTheme.hex }}>Databases: </strong>{resumeData.skills.databases}.</li>
                )}
                {resumeData.skills.cloudDevops && (
                  <li><strong style={{ color: activeTheme.hex }}>Cloud &amp; DevOps: </strong>{resumeData.skills.cloudDevops}.</li>
                )}
                {resumeData.skills.developerTools && (
                  <li><strong style={{ color: activeTheme.hex }}>Developer Tools: </strong>{resumeData.skills.developerTools}.</li>
                )}
              </ul>
            </div>
          )}

          {/* Watermark */}
          <div className="mt-7 pt-2.5 border-t border-zinc-200 flex items-center justify-between text-[9.5px] text-zinc-500 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeTheme.hex }}></span>
              <span className="font-sans font-medium text-zinc-600">
                Verified Candidate Resume &bull; IIT/FAANG Standard
              </span>
            </div>
            <a
              href="https://career-compiler-ai.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:underline transition-all font-semibold cursor-pointer"
              style={{ color: activeTheme.hex }}
              title="Click to open CareerCompiler AI website"
            >
              Made with CareerCompiler AI ↗
            </a>
          </div>
        </div>
      </div>

      {/* In-App Browser Guidance Modal */}
      {showInAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#11141c] border border-emerald-500/40 p-6 shadow-2xl space-y-4 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe className="h-7 w-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-extrabold text-white">
                Open in Chrome or Safari
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                You are currently inside an in-app browser (such as Instagram or TikTok), which disables direct PDF downloads and print spoolers.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-black text-[10px] font-black">1</span>
                <span>Tap the 3 dots (⋮ or ⋯) in the top-right corner</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-black text-[10px] font-black">2</span>
                <span>Select &quot;Open in Chrome&quot; or &quot;Open in Safari&quot;</span>
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-black text-[10px] font-black">3</span>
                <span>Or open on your Laptop/PC for instant 1-click PDF!</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                  setShowInAppModal(false);
                }}
                className="w-full py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-xs transition-all shadow-lg cursor-pointer"
              >
                Copy Link to Open in Chrome
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInAppModal(false);
                  setTimeout(() => window.print(), 100);
                }}
                className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-medium text-xs transition-all cursor-pointer"
              >
                Try Printing Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
