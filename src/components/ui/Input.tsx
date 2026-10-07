import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
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
      <input
        id={inputId}
        className={cn(
          "w-full px-3.5 py-2.5 text-sm rounded-[10px] bg-white text-[#101828] placeholder-[#98A2B3] border border-[#E4E7EC] hover:border-[#D0D5DD] focus:border-[#0B1220] focus:ring-1 focus:ring-[#0B1220] focus:outline-none transition-all duration-150 disabled:bg-[#F2F4F0] disabled:cursor-not-allowed",
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
