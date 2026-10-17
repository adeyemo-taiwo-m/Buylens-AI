"use client";

import { Check } from "lucide-react";
import { ANALYZE_PRIORITIES, type AnalyzePriority } from "./analyze.data";

type PriorityCheckboxesProps = {
  value: AnalyzePriority[];
  onValueChange: (value: AnalyzePriority[]) => void;
  disabled?: boolean;
};

export function PriorityCheckboxes({ value, onValueChange, disabled = false }: PriorityCheckboxesProps) {
  const toggle = (priority: AnalyzePriority) => {
    onValueChange(value.includes(priority) ? value.filter((item) => item !== priority) : [...value, priority]);
  };

  return (
    <div className="analyze-priority-grid">
      {ANALYZE_PRIORITIES.map((priority) => (
        <label key={priority.value} className="analyze-priority-option">
          <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <input type="checkbox" name="priorities" value={priority.value} checked={value.includes(priority.value)} disabled={disabled} onChange={() => toggle(priority.value)} className="peer analyze-checkbox" />
            <Check aria-hidden="true" className="pointer-events-none absolute h-[14px] w-[14px] scale-75 text-white opacity-0 transition-[opacity,transform] duration-120 peer-checked:scale-100 peer-checked:opacity-100" strokeWidth={3} />
          </span>
          <span>{priority.label}</span>
        </label>
      ))}
    </div>
  );
}
