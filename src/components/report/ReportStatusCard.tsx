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
        "relative h-[134px] overflow-hidden rounded-[16px] px-6 py-6",
        promising ? "bg-status-success-bg" : "bg-status-warning-bg"
      )}
    >
      <div className="relative z-10 pr-32">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white",
              promising ? "bg-status-success" : "bg-status-warning"
            )}
          >
            {promising ? <Check className="h-4 w-4" strokeWidth={3} /> : <Search className="h-4 w-4" strokeWidth={2.5} />}
          </span>
          <h2 className="text-[24px] font-semibold leading-none text-ink">{title}</h2>
        </div>
        <ul className="mt-4 space-y-3 text-[17px] leading-[1.2] text-ink-muted">
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
        className="pointer-events-none absolute bottom-[-10px] right-[-10px] z-0 h-[132px] w-[132px] object-contain"
      />
    </article>
  );
}
