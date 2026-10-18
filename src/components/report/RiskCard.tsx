import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";
import { REPORT_COPY, RISK_STYLES } from "./purchaseReport.data";

type RiskCardProps = {
  risk: PurchaseReport["risk"];
  compact?: boolean;
};

export function RiskCard({ risk, compact = false }: RiskCardProps) {
  const riskStyle = RISK_STYLES[risk.level];

  return (
    <div className={cn("w-full rounded-[20px] border", compact ? "rounded-[16px] p-3.5" : "p-6", riskStyle.card)}>
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-ink-muted", compact ? "text-[13px]" : "text-base")}>{REPORT_COPY.riskAssessment}</span>
        <span className={cn("flex items-center justify-center rounded-full", compact ? "h-7 w-7" : "h-10 w-10", riskStyle.icon)}>
          <ShieldAlert className={compact ? "h-4 w-4" : "h-5 w-5"} aria-hidden="true" />
        </span>
      </div>
      <p className={cn("font-semibold leading-none tracking-[-0.02em] text-ink", compact ? "mt-2 text-[26px]" : "mt-3 text-[40px]")}>{risk.level}</p>
      <span className={cn("inline-flex items-center gap-2 rounded-full font-medium", compact ? "mt-3 h-7 px-2.5 text-[13px]" : "mt-5 h-8 px-3 text-[13px]", riskStyle.pill)}>
        <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
        {risk.note}
      </span>
    </div>
  );
}
