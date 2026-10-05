import type { Metadata } from "next";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "CareerCompiler AI — Win Interviews Faster. From Verified Evidence.",
  description:
    "Evidence-backed AI career intelligence and resume compilation platform. Connect GitHub and projects to compile verified, ATS 98+ resumes with quantified STAR impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07080b] text-slate-100 antialiased selection:bg-violet-600/30 selection:text-violet-200 flex flex-col">
        <PageLoader />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
