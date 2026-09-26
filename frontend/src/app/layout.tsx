import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CareerCompiler AI — Compile your career into proof",
  description:
    "Evidence-backed AI career intelligence and resume compilation platform. Compile your resume from verified career evidence and target role requirements, not hallucinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#08090d] text-zinc-100 antialiased selection:bg-[#ff5733] selection:text-white flex flex-col">
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
      </body>
    </html>
  );
}
