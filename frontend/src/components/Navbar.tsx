"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Sparkles,
  Layers,
  User,
  ArrowRight,
  Download,
  Printer
} from "lucide-react";
import EmailCaptureModal from "@/components/EmailCaptureModal";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [candidatePhoto, setCandidatePhoto] = useState("/avatars/candidate.jpg");
  const [candidateName, setCandidateName] = useState("Ayush Sharma");

  // Universal Email Prompt Modal State
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [modalDestination, setModalDestination] = useState("/resume");

  useEffect(() => {
    const updateProfile = () => {
      const savedPhoto = localStorage.getItem("careercompiler_avatar");
      if (savedPhoto) setCandidatePhoto(savedPhoto);

      const savedResume = localStorage.getItem("gold_resume_data");
      if (savedResume) {
        try {
          const parsed = JSON.parse(savedResume);
          if (parsed?.personal?.fullName) setCandidateName(parsed.personal.fullName);
          if (parsed?.personal?.photoUrl) setCandidatePhoto(parsed.personal.photoUrl);
        } catch (e) {}
      }
    };

    updateProfile();
    window.addEventListener("avatar_updated", updateProfile);
    window.addEventListener("storage", updateProfile);
    return () => {
      window.removeEventListener("avatar_updated", updateProfile);
      window.removeEventListener("storage", updateProfile);
    };
  }, []);

  // Listen for open_email_prompt events from any child component or page
  useEffect(() => {
    const handleOpenPrompt = (e: any) => {
      const dest = e.detail?.destination || "/resume";
      setModalDestination(dest);
      setEmailModalOpen(true);
    };

    window.addEventListener("open_email_prompt", handleOpenPrompt);
    return () => window.removeEventListener("open_email_prompt", handleOpenPrompt);
  }, []);

  const handleOpenMobileMenu = () => {
    window.dispatchEvent(new Event("open_mobile_sidebar"));
  };

  // When Resume Studio link is clicked on the home page
  const handleResumeStudioClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      const savedEmail =
        localStorage.getItem("careercompiler_user_email") ||
        localStorage.getItem("careercompiler_email_unlocked");
      if (!savedEmail) {
        e.preventDefault();
        setModalDestination("/resume");
        setEmailModalOpen(true);
      }
    }
  };

  // When Candidate (Ayush) Profile is clicked on the home page, ALWAYS prompt for email
  const handleProfileClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      setModalDestination("/resume");
      setEmailModalOpen(true);
    }
  };

  return (
    <>
      <header className="no-print sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#090a0d]/95 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-3 sm:px-6 gap-3">
          {/* Left Section: Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Button (hidden on home page where sidebar is not present) */}
            {pathname !== "/" && (
              <button
                onClick={handleOpenMobileMenu}
                className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Open navigation menu"
                title="Open all features"
              >
                <Menu className="h-5 w-5 text-emerald-400" />
              </button>
            )}

            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/10">
                <div className="h-full w-full bg-[#0d0f15] rounded-[11px] flex items-center justify-center group-hover:bg-[#12151e] transition-colors">
                  <Layers className="h-4.5 w-4.5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-extrabold tracking-tight text-white font-sans">
                    CareerCompiler<span className="text-emerald-400">AI</span>
                  </span>
                  <span className="hidden sm:inline-block text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    FAANG Format
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium hidden xs:block">
                  AI Resume Maker &bull; Verified Evidence
                </span>
              </div>
            </Link>
          </div>

          {/* Center Section: Quick Desktop Navigation Links */}
          {/* On home page, ONLY Resume Studio is shown initially; other tabs appear when in the app */}
          <nav className="flex items-center gap-1 bg-[#12141c] p-1 rounded-full border border-white/10 text-xs">
            <Link
              href="/resume"
              onClick={handleResumeStudioClick}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                pathname === "/resume" || pathname === "/"
                  ? "bg-[#4ade80] text-[#090b0e] font-bold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              ★ Resume Studio
            </Link>

            {/* Afterwards (when inside the app), other tabs are visible */}
            {pathname !== "/" && (
              <>
                <Link
                  href="/github"
                  className={`hidden sm:inline-block px-3 py-1.5 rounded-full font-medium transition-all ${
                    pathname === "/github"
                      ? "bg-[#4ade80] text-[#090b0e] font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  GitHub Auto-fill
                </Link>
                <Link
                  href="/jobs"
                  className={`hidden sm:inline-block px-3 py-1.5 rounded-full font-medium transition-all ${
                    pathname === "/jobs"
                      ? "bg-[#4ade80] text-[#090b0e] font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Job Matcher
                </Link>
                <Link
                  href="/dashboard"
                  className={`hidden md:inline-block px-3 py-1.5 rounded-full font-medium transition-all ${
                    pathname === "/dashboard"
                      ? "bg-[#4ade80] text-[#090b0e] font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* Right Section: Primary Action & Profile Avatar */}
          <div className="flex items-center gap-2.5">
            {pathname === "/resume" ? (
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer"
                title="Download or Print Resume PDF"
              >
                <Printer className="h-3.5 w-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>
            ) : pathname !== "/" ? (
              <Link
                href="/resume"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#4ade80] hover:bg-[#3ec772] text-[#090b0e] font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Build Resume</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : null}

            {/* Candidate Profile Pill (Triggers email prompt on home page when clicked) */}
            <Link
              href="/profile"
              onClick={handleProfileClick}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-full bg-[#12141c] hover:bg-[#1a1d28] border border-white/10 transition-colors cursor-pointer"
              title="Candidate Profile (Ayush Sharma)"
            >
              <div className="h-7 w-7 rounded-full overflow-hidden border border-emerald-400/60 shrink-0">
                <img
                  src={candidatePhoto}
                  alt="Ayush Sharma"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-zinc-200 max-w-[100px] truncate">
                {candidateName.split(" ")[0]}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Universal Email Capture Modal (Mounts globally from navbar so it is always available) */}
      <EmailCaptureModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        destination={modalDestination}
      />
    </>
  );
}
