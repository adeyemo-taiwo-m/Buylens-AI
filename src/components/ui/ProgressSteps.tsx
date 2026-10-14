"use client";

import React from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  id: string;
  label: string;
  status: "complete" | "current" | "upcoming";
}

interface ProgressStepsProps {
  steps: StepItem[];
  className?: string;
}

export function ProgressSteps({ steps, className }: ProgressStepsProps) {
  return (
    <div className={cn("space-y-4 max-w-md mx-auto", className)}>
      {steps.map((step) => {
        const isComplete = step.status === "complete";
        const isCurrent = step.status === "current";

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 transition-opacity duration-300",
              isComplete ? "opacity-100" : isCurrent ? "opacity-100" : "opacity-40"
            )}
          >
            <div className="flex items-center justify-center w-6 h-6 shrink-0">
              {isComplete ? (
                <div className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center transition-all duration-300">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : isCurrent ? (
                <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#88CF13]/40 bg-[#F7FEE7]">
                  <span className="animate-pulse-dot inline-flex rounded-full h-2 w-2 bg-[#88CF13]" />
                </div>
              ) : (
                <Circle className="w-3.5 h-3.5 text-[#98A2B3]" />
              )}
            </div>

            <span
              className={cn(
                "text-sm font-medium",
                isComplete
                  ? "text-[#101828]"
                  : isCurrent
                  ? "text-[#101828] font-bold"
                  : "text-[#667085]"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
