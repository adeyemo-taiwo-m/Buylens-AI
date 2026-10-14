"use client";

import { cn } from "@/lib/utils";
import { INSIGHTS } from "./heroLensData";
import type { LensController } from "./useLensController";

type InsightChipsProps = { controller: LensController };

export function InsightChips({ controller }: InsightChipsProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {INSIGHTS.map(({ id, icon: Icon, title, value }, index) => {
        const active = controller.activeId === id;
        const pinned = controller.pinnedId === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={pinned}
            onPointerEnter={() => controller.onChipEnter(id)}
            onPointerLeave={controller.onChipLeave}
            onFocus={() => controller.onChipFocus(id)}
            onBlur={controller.onChipBlur}
            onClick={() => controller.onChipClick(id)}
            className={cn(
              "animate-fade-up flex min-h-[66px] items-center gap-3 rounded-2xl border bg-[#EEF5FF] px-3 text-left transition-shadow sm:px-4",
              "border-[#D6E6FC] hover:shadow-[0_8px_24px_-12px_rgba(47,111,235,.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FEB] focus-visible:ring-offset-2",
              active || pinned
                ? "border-[1.5px] border-[#2F6FEB] bg-white shadow-[0_8px_24px_-10px_rgba(47,111,235,.45)]"
                : "border",
            )}
            style={{ animationDelay: `${320 + index * 80}ms` }}
          >
            <Icon className="h-[22px] w-[22px] shrink-0 text-[#2563EB]" strokeWidth={1.8} />
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-medium tracking-[.04em] text-[#2563EB] sm:text-xs">{title}</span>
              <span className="block truncate text-[11px] text-[#6F9BE8] sm:text-[13px]">{value}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
