"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANALYZE_CATEGORIES, ANALYZE_COPY, type AnalyzeCategory } from "./analyze.data";

type CategorySelectProps = {
  value: AnalyzeCategory;
  onValueChange: (value: AnalyzeCategory) => void;
  invalid?: boolean;
  disabled?: boolean;
  describedBy?: string;
};

export function CategorySelect({ value, onValueChange, invalid = false, disabled = false, describedBy }: CategorySelectProps) {
  return (
    <div className="relative">
      <select
        id="analyze-category"
        name="category"
        value={value}
        onChange={(event) => onValueChange(event.target.value as AnalyzeCategory)}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        className={cn("analyze-select dashboard-input", value && "analyze-select-filled", invalid && "analyze-input-error")}
      >
        <option value="">{ANALYZE_COPY.categoryPlaceholder}</option>
        {ANALYZE_CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>{category.label}</option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-[22px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#6B7280]" />
    </div>
  );
}
