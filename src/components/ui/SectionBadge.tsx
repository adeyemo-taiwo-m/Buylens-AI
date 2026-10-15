import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type SectionBadgeTone = "default" | "onBlue";

export type SectionBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: SectionBadgeTone;
};

export function SectionBadge({ className, children, tone = "default", ...props }: SectionBadgeProps) {
  return (
    <span className={cn("section-badge", tone === "onBlue" && "section-badge-on-blue", className)} {...props}>
      {children}
    </span>
  );
}
