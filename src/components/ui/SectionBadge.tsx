import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type SectionBadgeProps = HTMLAttributes<HTMLSpanElement>;

export function SectionBadge({ className, children, ...props }: SectionBadgeProps) {
  return (
    <span className={cn("section-badge", className)} {...props}>
      {children}
    </span>
  );
}
