import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  className,
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#101828]"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          "w-full px-3.5 py-3 text-sm rounded-[10px] bg-white text-[#101828] placeholder-[#98A2B3] border border-[#E4E7EC] hover:border-[#D0D5DD] focus:border-[#0B1220] focus:ring-1 focus:ring-[#0B1220] focus:outline-none transition-all duration-150 disabled:bg-[#F2F4F0] disabled:cursor-not-allowed resize-y",
          error && "border-[#FECDCA] focus:border-[#DC2626] focus:ring-[#DC2626]",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-[#B42318]">{error}</p>}
      {hint && !error && <p className="text-xs text-[#667085]">{hint}</p>}
    </div>
  );
}
