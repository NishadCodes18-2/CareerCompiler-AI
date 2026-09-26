"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  FileCheck2,
  Award,
  AlertCircle,
  FileCode,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { documentApi } from "@/lib/api";

export default function DocumentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isCertificate, setIsCertificate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      const docs = await documentApi.list();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError("");
    setUploadResult(null);

    try {
      const res = await documentApi.upload(file, isCertificate);
      setUploadResult(res);
      setFile(null);
      loadDocuments();
    } catch (err: any) {
      setError(err.message || "Failed to parse document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner - Borea AI Horizon Glow */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#0c0e15] via-[#121622] to-[#0c0e15] border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-[#ff5733]/10 blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-48 bg-[#bef264]/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#bef264] animate-pulse"></span>
                OCR &amp; INGESTION
              </span>
              <span className="pill-badge bg-white/5 text-zinc-400 border border-white/10">
                PAGE-PRESERVED
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Document &amp; Credential Ingestion Engine
            </h1>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Upload past resumes, internship verification letters, or course certificates. Converts raw documents into deterministic, page-anchored evidence nodes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="pill-badge bg-white/5 text-zinc-300 border border-white/10 text-xs font-mono">
              {documents.length} ARTIFACTS INGESTED
            </span>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="card-glass rounded-2xl p-6 space-y-5">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-white/10 hover:border-[#ff5733]/50 rounded-2xl p-8 text-center transition-all cursor-pointer relative bg-[#080a10] group">
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center gap-2.5">
              <div className="h-12 w-12 rounded-2xl bg-[#ff5733]/15 text-[#ff7849] border border-[#ff5733]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-white">
                {file ? file.name : "Click or drag & drop resume or certificate PDF"}
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                Supports PDF (with page tracking), DOCX, TXT (up to 15MB)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isCertificate}
                onChange={(e) => setIsCertificate(e.target.checked)}
                className="rounded border-white/20 bg-[#090b10] text-[#ff5733] focus:ring-0"
              />
              <span>This document is an internship completion letter, course certificate, or credential PDF</span>
            </label>

            <button
              type="submit"
              disabled={!file || uploading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7849] hover:from-[#ff6b4a] hover:to-[#ff8d63] disabled:opacity-40 text-white text-xs font-semibold shadow-lg shadow-[#ff5733]/25 transition-all cursor-pointer"
            >
              {uploading ? "Extracting Structured Proof..." : "Process & Import Evidence"}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Result Card */}
        {uploadResult && (
          <div className="p-4 rounded-xl bg-[#bef264]/10 border border-[#bef264]/30 space-y-2.5">
            <div className="flex items-center gap-2 text-[#bef264] font-bold text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Successfully parsed {uploadResult.filename} ({uploadResult.pages_parsed} pages)</span>
            </div>

            <div className="text-xs text-zinc-300 space-y-1">
              <p>
                <strong className="text-white">Evidence Created:</strong>{" "}
                <span className="font-mono text-[#bef264]">{uploadResult.evidence_created?.join(", ")}</span>
              </p>
              {uploadResult.extracted_data?.skills?.length > 0 && (
                <p>
                  <strong className="text-white">Extracted Skills:</strong>{" "}
                  {uploadResult.extracted_data.skills.slice(0, 6).join(", ")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Document History */}
      <div className="card-glass rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white tracking-wide">Ingested Document Repository</h3>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-xl bg-[#090b10] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#ff5733]/15 text-[#ff7849]">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{doc.filename}</h4>
                  <p className="text-xs text-zinc-500 font-mono">
                    Format: {doc.file_type.toUpperCase()} &bull; Ingested {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="pill-badge bg-[#bef264]/15 text-[#bef264] border border-[#bef264]/30 text-[10px]">
                PROCESSED
              </span>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="text-xs text-zinc-500 italic font-mono">No documents uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
