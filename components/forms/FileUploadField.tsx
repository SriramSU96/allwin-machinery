"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileCheck2, X, Loader2 } from "lucide-react";

interface FileUploadFieldProps {
  label?: string;
  onUploaded: (url: string | null, filename: string | null) => void;
  accept?: string;
  dark?: boolean;
}

export function FileUploadField({
  label = "Attach a file (optional)",
  onUploaded,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp",
  dark = false,
}: FileUploadFieldProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload-attachment", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setFileName(file.name);
      onUploaded(data.url, file.name);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed. Please try again.";
      setError(message);
      onUploaded(null, null);
    } finally {
      setUploading(false);
    }
  };

  const clear = () => {
    setFileName(null);
    setError(null);
    onUploaded(null, null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const baseInputClasses = dark
    ? "border-white/15 bg-white/5 text-white/70 hover:border-brand-gold"
    : "border-gray-200 bg-white text-gray-500 hover:border-brand-green";

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {!fileName ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`w-full flex items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-3 text-sm transition-colors disabled:opacity-60 ${baseInputClasses}`}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Uploading...
            </>
          ) : (
            <>
              <UploadCloud size={16} /> {label}
            </>
          )}
        </button>
      ) : (
        <div
          className={`w-full flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm ${
            dark ? "border-brand-gold/40 bg-brand-gold/10 text-white" : "border-brand-green/40 bg-brand-green/5 text-brand-text"
          }`}
        >
          <span className="flex items-center gap-2 truncate">
            <FileCheck2 size={16} className={dark ? "text-brand-gold" : "text-brand-green"} />
            <span className="truncate">{fileName}</span>
          </span>
          <button
            type="button"
            onClick={clear}
            aria-label="Remove file"
            className={dark ? "text-white/50 hover:text-white" : "text-gray-400 hover:text-gray-700"}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}