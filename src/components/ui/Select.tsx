import React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options?: Array<{ value: string; label: string }>;
}

export function Select({
  label,
  error,
  hint,
  options,
  children,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#101828]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            "w-full px-3.5 py-2.5 text-sm rounded-[10px] bg-white text-[#101828] border border-[#E4E7EC] hover:border-[#D0D5DD] focus:border-[#0B1220] focus:ring-1 focus:ring-[#0B1220] focus:outline-none transition-all duration-150 disabled:bg-[#F2F4F0] appearance-none cursor-pointer",
            error && "border-[#FECDCA] focus:border-[#DC2626] focus:ring-[#DC2626]",
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#667085]">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-[#B42318]">{error}</p>}
      {hint && !error && <p className="text-xs text-[#667085]">{hint}</p>}
    </div>
  );
}
