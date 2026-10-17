import { ShieldAlert } from "lucide-react";
import { DASHBOARD_COPY } from "./dashboard.data";

export function InsightBanner() {
  return <aside className="flex min-h-[93px] items-center gap-6 rounded-[20px] border border-[#CFE0FB] bg-[#EAF1FD] px-[18px] py-4 sm:px-[26px]"><ShieldAlert aria-hidden="true" className="h-9 w-9 shrink-0 text-[#2563EB] sm:h-11 sm:w-11" strokeWidth={1.75} /><div><h2 className="text-base font-semibold leading-[1.25] text-[#333333] sm:text-[18px]">{DASHBOARD_COPY.bannerTitle}</h2><p className="mt-1.5 text-xs leading-[1.4] text-[#4F5D70] sm:text-[11px]">{DASHBOARD_COPY.bannerSubtext}</p></div></aside>;
}
