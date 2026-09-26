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
  ShieldCheck
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
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-[#232733] pb-4 space-y-1">
        <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold tracking-wider">Document Ingestion</span>
        <h1 className="text-2xl font-bold text-white">Document & Credential Importer</h1>
        <p className="text-xs text-zinc-400">
          Upload resumes (PDF/DOCX/TXT) or certificates. Retains exact page numbers and converts text into structured evidence.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="p-6 rounded-2xl bg-[#0f1118] border border-[#232733] space-y-5">
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-[#282d3d] hover:border-blue-500/60 rounded-xl p-8 text-center transition-colors cursor-pointer relative bg-[#0b0d14]">
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-white">
                {file ? file.name : "Click or drag & drop resume or certificate"}
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                Supports PDF (with page tracking), DOCX, TXT (up to 15MB)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isCertificate}
                onChange={(e) => setIsCertificate(e.target.checked)}
                className="rounded border-[#232733] text-blue-600 focus:ring-0"
              />
              <span>This document is an internship completion letter, course certificate, or credential PDF</span>
            </label>

            <button
              type="submit"
              disabled={!file || uploading}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-[#1a1d28] disabled:text-zinc-600 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              {uploading ? "Extracting Structured Proof..." : "Process & Import Evidence"}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Upload Result Card */}
        {uploadResult && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Successfully parsed {uploadResult.filename} ({uploadResult.pages_parsed} pages)</span>
            </div>

            <div className="text-xs text-zinc-300 space-y-1">
              <p>
                <strong className="text-white">Evidence Created:</strong>{" "}
                <span className="font-mono text-blue-400">{uploadResult.evidence_created?.join(", ")}</span>
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
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white">Ingested Document Repository</h3>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-xl bg-[#0f1118] border border-[#232733] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#161a26] text-blue-400">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{doc.filename}</h4>
                  <p className="text-xs text-zinc-500 font-mono">
                    Format: {doc.file_type.toUpperCase()} &bull; Ingested {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                PROCESSED
              </span>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="text-xs text-zinc-500 italic">No documents uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
