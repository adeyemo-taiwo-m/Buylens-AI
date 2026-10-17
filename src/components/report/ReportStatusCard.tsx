import Image from "next/image";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type ReportStatusCardProps = {
  variant: "promising" | "verify";
  title: string;
  items: string[];
  imageSrc: string;
};

export function ReportStatusCard({ variant, title, items, imageSrc }: ReportStatusCardProps) {
  const promising = variant === "promising";

  return (
    <article
      className={cn(
        "relative min-h-[126px] overflow-hidden rounded-[14px] border px-5 py-4",
        promising ? "border-status-success-border bg-status-success-bg" : "border-status-warning-border bg-status-warning-bg"
      )}
    >
      <div className="relative z-10 pr-24 sm:pr-28">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white",
              promising ? "bg-status-success" : "bg-status-warning"
            )}
          >
            {promising ? <Check className="h-4 w-4" strokeWidth={3} /> : <Search className="h-4 w-4" strokeWidth={2.5} />}
          </span>
          <h2 className="text-xl font-semibold leading-none text-ink">{title}</h2>
        </div>
        <ul className="mt-4 space-y-2 text-sm leading-[1.35] text-ink-muted">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              {promising ? <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-status-success-text" strokeWidth={2.5} /> : <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-status-warning" />}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Image
        src={imageSrc}
        alt=""
        width={140}
        height={140}
        sizes="140px"
        aria-hidden="true"
        className={cn("pointer-events-none absolute bottom-[-22px] right-[-2px] z-0 h-[132px] w-[132px] object-contain opacity-80", !promising && "right-[-8px]")}
      />
    </article>
  );
}
