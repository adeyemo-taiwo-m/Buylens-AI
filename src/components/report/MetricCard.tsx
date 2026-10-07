import React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  progressPercent?: number;
  riskLevel?: "Low" | "Medium" | "High" | "Critical";
  caption: string;
}

export function MetricCard({
  label,
  value,
  subValue,
  progressPercent,
  riskLevel,
  caption,
}: MetricCardProps) {
  const getRiskChip = (level: "Low" | "Medium" | "High" | "Critical") => {
    switch (level) {
      case "Low":
        return "bg-[#ECFDF3] text-[#15803D] border border-[#ABEFC6]";
      case "Medium":
        return "bg-[#FFFAEB] text-[#B45309] border border-[#FEDF89]";
      case "High":
        return "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]";
      case "Critical":
        return "bg-[#DC2626] text-white font-bold";
    }
  };

  return (
    <Card variant="default" padding="sm" className="min-h-[120px] flex flex-col justify-between">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#667085] mb-1">
          {label}
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
            {value}
          </span>
          {subValue && (
            <span className="text-xs text-[#667085] font-semibold">{subValue}</span>
          )}
        </div>
      </div>

      <div className="mt-3">
        {riskLevel ? (
          <div className="mb-1.5">
            <span
              className={cn(
                "inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide",
                getRiskChip(riskLevel)
              )}
            >
              {riskLevel} Risk
            </span>
          </div>
        ) : typeof progressPercent === "number" ? (
          <div className="w-full h-1 bg-[#E4E7EC] rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-[#0B1220] rounded-full"
              style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
            />
          </div>
        ) : null}
        <p className="text-[11px] text-[#667085] line-clamp-1">{caption}</p>
      </div>
    </Card>
  );
}
