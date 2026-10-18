import Image from "next/image";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";

type ReportStatusCardProps = {
  variant: "promising" | "verify";
  title: string;
  items: string[];
  imageSrc?: string;
  tone?: PurchaseReport["scoreTone"];
  compact?: boolean;
};

export function ReportStatusCard({ variant, title, items, imageSrc, tone = "positive", compact = false }: ReportStatusCardProps) {
  const promising = variant === "promising";
  const verifyIsRisk = !promising && tone === "negative";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[16px]",
        compact ? "min-h-[112px] px-3.5 py-3" : "h-[134px] px-6 py-6",
        promising ? "bg-status-success-bg" : verifyIsRisk ? "bg-status-danger-bg" : "bg-status-warning-bg"
      )}
    >
      <div className={cn("relative z-10", compact ? "pr-1" : "pr-32")}>
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full text-white",
              compact ? "h-6 w-6" : "h-9 w-9",
              promising ? "bg-status-success" : verifyIsRisk ? "bg-status-danger" : "bg-status-warning"
            )}
          >
            {promising ? <Check className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={3} /> : <Search className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={2.5} />}
          </span>
          <h2 className={cn("font-semibold leading-none text-ink", compact ? "text-[13px]" : "text-[24px]")}>{title}</h2>
        </div>
        <ul className={cn("text-ink-muted", compact ? "mt-2 space-y-1 text-[13px] leading-[1.25]" : "mt-4 space-y-3 text-[17px] leading-[1.2]")}>
          {items.slice(0, compact ? 2 : items.length).map((item) => (
            <li key={item} className="flex items-start gap-2">
              {promising ? <Check aria-hidden="true" className={cn("mt-0.5 shrink-0 text-status-success-text", compact ? "h-3 w-3" : "h-3.5 w-3.5")} strokeWidth={2.5} /> : <span aria-hidden="true" className={cn("shrink-0 rounded-full", compact ? "mt-1 h-1.5 w-1.5" : "mt-1.5 h-1.5 w-1.5", verifyIsRisk ? "bg-status-danger" : "bg-status-warning")} />}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {!compact && imageSrc && <Image src={imageSrc} alt="" width={140} height={140} sizes="140px" aria-hidden="true" className="pointer-events-none absolute bottom-[-10px] right-[-10px] z-0 h-[132px] w-[132px] object-contain" />}
    </article>
  );
}
