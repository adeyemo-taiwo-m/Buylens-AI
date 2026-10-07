"use client";

import { useState, use } from "react";
import Link from "next/link";
import { getStoredReportById } from "@/lib/storage/reports";
import { DecisionReport, AlternativeOption } from "@/types/analysis";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, Check, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CompareAlternativesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [report] = useState<DecisionReport>(() => getStoredReportById(id) || DEMO_SOLAR_REPORT);
  const [selectedAltId, setSelectedAltId] = useState<string>("current");

  const alternatives: AlternativeOption[] = report.alternatives || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href={`/app/report/${report.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#101828] mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Decision Report</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
          Is there a better deal?
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Review market alternatives side-by-side to understand the exact trade-offs before deciding.
        </p>
      </div>

      {/* Trade-off summary alert banner per PRD Section 37 */}
      <Card variant="subtle" padding="md" className="border border-[#E4E7EC] flex items-start gap-3">
        <Info className="h-5 w-5 text-[#0B1220] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#101828]">
            Key Trade-Off Insight
          </span>
          <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
            Alternative C scores higher because it offers a 5-year verifiable warranty and superior mobile app monitoring, but costs ₦70,000 more upfront.
          </p>
        </div>
      </Card>

      {/* Alternatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Current Option */}
        <div
          onClick={() => setSelectedAltId("current")}
          className={cn(
            "rounded-[14px] p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-6",
            selectedAltId === "current"
              ? "border-[#0B1220] bg-white shadow-[0_4px_12px_-2px_rgba(11,18,32,0.08)] scale-[1.01]"
              : "border-[#E4E7EC] bg-white hover:border-[#D0D5DD]"
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                CURRENT QUOTATION
              </span>
              {selectedAltId === "current" && (
                <div className="h-5 w-5 rounded-full bg-[#0B1220] flex items-center justify-center text-[#B8F34A]">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
              )}
            </div>
            <h3 className="text-base font-bold text-[#101828]">{report.productName}</h3>
            <div className="text-2xl font-black text-[#101828] mt-2">
              ₦{report.price.toLocaleString()}
            </div>
            <div className="text-xs text-[#667085] mt-1">Buy Score: {report.score} / 100</div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#E4E7EC] text-xs">
            <div className="font-semibold text-[#101828]">Key Strengths:</div>
            <ul className="space-y-1.5 text-[#475467]">
              {report.positiveFindings.slice(0, 2).map((p, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2 & 3: Alternatives from report */}
        {alternatives.map((alt) => (
          <div
            key={alt.id}
            onClick={() => setSelectedAltId(alt.id)}
            className={cn(
              "rounded-[14px] p-6 border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-6",
              selectedAltId === alt.id
                ? "border-[#0B1220] bg-white shadow-[0_4px_12px_-2px_rgba(11,18,32,0.08)] scale-[1.01]"
                : "border-[#E4E7EC] bg-white hover:border-[#D0D5DD]"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                  MARKET ALTERNATIVE
                </span>
                {selectedAltId === alt.id && (
                  <div className="h-5 w-5 rounded-full bg-[#0B1220] flex items-center justify-center text-[#B8F34A]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
              </div>
              <h3 className="text-base font-bold text-[#101828]">{alt.name}</h3>
              <div className="text-2xl font-black text-[#101828] mt-2">
                ₦{alt.priceEstimate.toLocaleString()}
              </div>
              <div className="text-xs text-[#667085] mt-1">
                Estimated Difference:{" "}
                {alt.priceEstimate > report.price
                  ? `+₦${(alt.priceEstimate - report.price).toLocaleString()}`
                  : `-₦${(report.price - alt.priceEstimate).toLocaleString()}`}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E4E7EC] text-xs">
              <p className="text-[#475467] leading-relaxed">{alt.comparisonSummary}</p>
              <div className="space-y-1">
                {alt.pros.map((p, i) => (
                  <div key={i} className="text-[#15803D] font-medium flex items-center gap-1.5">
                    <span className="font-bold">+</span> {p}
                  </div>
                ))}
                {alt.cons.map((c, i) => (
                  <div key={i} className="text-[#B42318] font-medium flex items-center gap-1.5">
                    <span className="font-bold">-</span> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Decision Guidance Footer */}
      <Card variant="recommendation" padding="lg" className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-[#B8F34A]">
          DECISION TAKEAWAY
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-[#E4E9F2]">
          If your priority is absolute lowest upfront outlay, consider negotiated discount on the current quote. If long-term local warranty support is non-negotiable, Option C represents the safest overall risk profile.
        </p>
      </Card>
    </div>
  );
}
