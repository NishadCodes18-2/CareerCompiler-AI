"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingHeader from "@/components/landing/LandingHeader";
import HeroSection from "@/components/landing/HeroSection";
import LiveDashboardSection from "@/components/landing/LiveDashboardSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import HubAndComparisonSection from "@/components/landing/HubAndComparisonSection";
import FeatureComparisonTable from "@/components/landing/FeatureComparisonTable";
import UseCasesSection from "@/components/landing/UseCasesSection";
import LiveDemoSection from "@/components/landing/LiveDemoSection";
import RoiCalculatorSection from "@/components/landing/RoiCalculatorSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FaqSection from "@/components/landing/FaqSection";
import LandingFooter from "@/components/landing/LandingFooter";
import DemoVideoModal from "@/components/landing/DemoVideoModal";
import EmailCaptureModal from "@/components/EmailCaptureModal";

export default function CoverLandingPage() {
  const router = useRouter();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [modalDestination, setModalDestination] = useState("/resume");

  useEffect(() => {
    // Listen for custom email prompts from any interactive widget if explicitly triggered
    const handleOpenPrompt = (e: any) => {
      const dest = e.detail?.destination || "/resume";
      setModalDestination(dest);
      setEmailModalOpen(true);
    };

    window.addEventListener("open_email_prompt", handleOpenPrompt);
    return () => window.removeEventListener("open_email_prompt", handleOpenPrompt);
  }, []);

  const handleActionClick = (destination: string) => {
    // Direct, instant, zero-friction client-side routing
    router.push(destination);
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 font-sans selection:bg-violet-600/30 selection:text-violet-200 overflow-x-hidden">
      {/* 1. Floating Header with Navigation */}
      <LandingHeader onActionClick={handleActionClick} />

      {/* Main Page Flow */}
      <main>
        {/* 2. Hero Section with Particle Canvas & Marquee */}
        <HeroSection
          onActionClick={handleActionClick}
          onWatchDemo={() => setDemoModalOpen(true)}
        />

        {/* 3. 3D Live Dashboard Showcase Frame */}
        <LiveDashboardSection onActionClick={handleActionClick} />

        {/* 4. 2x2 Bento Workflow Grid */}
        <WorkflowSection onActionClick={handleActionClick} />

        {/* 5. Scaled Dark Container: 3D Coverflow, Before vs After, and SVG Architecture Hub */}
        <HubAndComparisonSection onActionClick={handleActionClick} />

        {/* 6. Comprehensive Feature Comparison Table */}
        <FeatureComparisonTable />

        {/* 7. Who is CareerCompiler for? 3 Use Cases */}
        <UseCasesSection onActionClick={handleActionClick} />

        {/* 8. Live Interactive STAR Compiler Demo */}
        <LiveDemoSection onActionClick={handleActionClick} />

        {/* 9. Interactive ROI / Time Saved Range Sliders */}
        <RoiCalculatorSection onActionClick={handleActionClick} />

        {/* 10. Reviews & Testimonials Infinite Marquee */}
        <TestimonialsSection />

        {/* 11. Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* 13. Giant CTA Banner & Multi-Column Footer */}
      <LandingFooter onActionClick={handleActionClick} />

      {/* Interactive Walkthrough Demo Video Modal */}
      <DemoVideoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onActionClick={handleActionClick}
      />

      {/* Universal Email Lead Capture Modal (available on explicit prompt) */}
      <EmailCaptureModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        destination={modalDestination}
      />
    </div>
  );
}
