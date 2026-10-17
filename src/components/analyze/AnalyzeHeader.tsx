import { SectionBadge } from "@/components/ui/SectionBadge";
import { ANALYZE_COPY } from "./analyze.data";

export function AnalyzeHeader() {
  return (
    <header className="analyze-header">
      <SectionBadge className="analyze-section-badge">{ANALYZE_COPY.badge}</SectionBadge>
      <h1 className="mt-5 text-[30px] font-medium leading-[1.25] text-[#333333] sm:text-[40px]">
        {ANALYZE_COPY.headlineLead}
        <span className="font-bold text-[#2563EB]">{ANALYZE_COPY.headlineAccent}</span>
      </h1>
      <p className="mt-2 text-base leading-[1.5] text-[#737373] sm:text-[19px]">
        {ANALYZE_COPY.subtext}
      </p>
    </header>
  );
}
