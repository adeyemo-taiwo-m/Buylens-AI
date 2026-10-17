"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYZE_COPY } from "./analyze.data";

type ImageDropzoneProps = {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onErrorChange?: (error: string | null) => void;
  disabled?: boolean;
};

export function ImageDropzone({ file, onFileChange, onErrorChange, disabled = false }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const previewRef = useRef<string | null>(null);

  useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
  }, []);

  const setDropzoneError = (nextError: string | null) => {
    setError(nextError);
    onErrorChange?.(nextError);
  };

  const handleFile = (nextFile: File | undefined) => {
    if (!nextFile) return;
    if (!(nextFile.type === "image/jpeg" || nextFile.type === "image/png") || nextFile.size > 5 * 1024 * 1024) {
      setDropzoneError(ANALYZE_COPY.dropzoneError);
      return;
    }
    setDropzoneError(null);
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = URL.createObjectURL(nextFile);
    setPreview(previewRef.current);
    onFileChange(nextFile);
  };

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const removeFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDropzoneError(null);
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null;
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png" className="hidden" disabled={disabled} onChange={(event) => handleFile(event.target.files?.[0])} />
      <div
        id="analyze-image"
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={ANALYZE_COPY.dropzoneAria}
        aria-disabled={disabled}
        onClick={openPicker}
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === " ") && !disabled) {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragEnter={(event) => { event.preventDefault(); if (!disabled) setDragActive(true); }}
        onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragActive(true); }}
        onDragLeave={(event) => { event.preventDefault(); setDragActive(false); }}
        onDrop={(event) => { event.preventDefault(); setDragActive(false); handleFile(event.dataTransfer.files?.[0]); }}
        className={cn("analyze-dropzone", dragActive && "analyze-dropzone-dragging", disabled && "cursor-wait opacity-60", error && "analyze-dropzone-error")}
      >
        {file && preview ? (
          <div className="flex w-full items-center justify-center gap-4 px-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Selected product" className="h-16 w-16 shrink-0 rounded-[10px] object-cover" />
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium text-[#0F1B33]">{file.name}</p>
              <p className="mt-1 text-xs text-[#6B7280]">{`${(file.size / 1024).toFixed(0)} KB`}</p>
            </div>
            <button type="button" aria-label={ANALYZE_COPY.removeImage} onClick={removeFile} className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-white hover:text-[#0F1B33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"><X className="h-4 w-4" /></button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <UploadImageIcon />
            <p className="mt-3 text-base font-medium text-[#0F1B33]">{dragActive ? ANALYZE_COPY.dropzoneDragPrompt : <>{ANALYZE_COPY.dropzonePrompt} <span className="text-[#2563EB]">{ANALYZE_COPY.dropzoneBrowse}</span></>}</p>
            <p className="mt-1.5 text-xs text-[#5F6B7A]">{ANALYZE_COPY.dropzoneHint}</p>
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-[#DC2626]">{error}</p>}
    </div>
  );
}

function UploadImageIcon() {
  return (
    <svg aria-hidden="true" className="analyze-upload-icon h-6 w-8 transition-transform duration-150" viewBox="0 0 32 24" fill="none">
      <rect x="1" y="1" width="30" height="22" rx="5" fill="#4C8CF5" />
      <circle cx="23" cy="7" r="3" fill="white" />
      <path d="M3 20 11 12l4.2 4.2 3.4-3.4L29 20H3Z" fill="white" />
    </svg>
  );
}
