import { Sparkles } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ANALYZE_COPY } from "./analyze.data";

export function AnalyzeHeader({ onTrySample, triggerRef }: { onTrySample?: () => void; triggerRef?: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <header className="analyze-header">
      <SectionBadge className="analyze-section-badge">{ANALYZE_COPY.badge}</SectionBadge>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <h1 className="text-[30px] font-medium leading-[1.25] text-[#333333] sm:text-[40px]">
            {ANALYZE_COPY.headlineLead}
            <span className="font-bold text-[#2563EB]">{ANALYZE_COPY.headlineAccent}</span>
          </h1>
          <p className="mt-2 text-base leading-[1.5] text-[#737373] sm:text-[19px]">{ANALYZE_COPY.subtext}</p>
        </div>
        {onTrySample && <button ref={triggerRef} type="button" onClick={onTrySample} className="inline-flex h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-primary-200 bg-white px-5 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:w-auto"><Sparkles className="h-4 w-4" aria-hidden="true" />Try a sample</button>}
      </div>
    </header>
  );
}
