"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // On the home landing page, render edge-to-edge luxury SalesHook layout without dashboard sidebar constraints
  if (isHomePage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#07080b] text-slate-100 font-sans selection:bg-violet-600/30 selection:text-violet-200">
        {children}
      </div>
    );
  }

  // Inside the application (/resume, /interview, /dashboard, etc.)
  return (
    <>
      <Navbar />
      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-x-hidden p-3 sm:p-5 md:p-8 max-w-7xl mx-auto w-full pb-32 lg:pb-20">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
