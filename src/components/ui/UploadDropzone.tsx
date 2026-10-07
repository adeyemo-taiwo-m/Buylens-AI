"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, X, RefreshCw, FileText } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  onImageChange?: (file: File | null, previewUrl: string | null) => void;
  className?: string;
}

export function UploadDropzone({ onImageChange, className }: UploadDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (incomingFile: File) => {
    setError(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(incomingFile.type)) {
      setError("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }
    if (incomingFile.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setFile(incomingFile);
      setPreview(url);
      onImageChange?.(incomingFile, url);
    };
    reader.readAsDataURL(incomingFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
    onImageChange?.(null, null);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
          }
        }}
      />

      {preview ? (
        <div className="relative rounded-[12px] border border-[#E4E7EC] bg-white p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={preview}
              alt="Listing preview"
              className="w-14 h-14 rounded-[8px] object-cover border border-[#E4E7EC] shrink-0"
            />
            <div className="truncate">
              <p className="text-xs font-semibold text-[#101828] truncate">{file?.name}</p>
              <p className="text-[11px] text-[#667085]">
                {file ? `${(file.size / 1024).toFixed(0)} KB` : "Attached"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1 text-[#667085]" />
              Replace
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-[#B42318] hover:bg-[#FEF3F2]"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "rounded-[12px] border-1.5 border-dashed p-6 text-center cursor-pointer transition-colors duration-150 flex flex-col items-center justify-center gap-2",
            dragActive
              ? "border-[#0B1220] bg-[#F2F4F0]"
              : "border-[#D0D5DD] hover:border-[#0B1220] bg-white"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-[#F2F4F0] flex items-center justify-center text-[#101828]">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#101828]">
              Upload listing screenshot or receipt
            </p>
            <p className="text-[11px] text-[#667085] mt-0.5">
              Drag and drop PNG, JPG, or WEBP up to 10MB
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-[#B42318]">{error}</p>}
    </div>
  );
}
