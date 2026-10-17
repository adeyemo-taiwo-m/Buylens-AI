"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ANALYZE_COPY } from "./analyze.data";

type UsageTextareaProps = {
  value: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  invalid?: boolean;
  disabled?: boolean;
  describedBy?: string;
};

export function UsageTextarea({ value, onValueChange, onBlur, invalid = false, disabled = false, describedBy }: UsageTextareaProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <textarea
        id="analyze-usage"
        name="usage"
        value={value}
        maxLength={300}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={ANALYZE_COPY.usagePlaceholder}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        className={cn("analyze-textarea", invalid && "analyze-input-error")}
      />
      {(focused || value.length > 0) && <span className="absolute bottom-3 right-3 text-xs text-[#6B7280]">{ANALYZE_COPY.usageCounter(value.length)}</span>}
    </div>
  );
}
