"use client";

import { useState } from "react";
import Link from "next/link";
import { DecisionReport } from "@/types/analysis";
import { DecisionCard } from "@/components/report/DecisionCard";
import { MetricCard } from "@/components/report/MetricCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Info,
  Scale,
  ArrowRight,
  Share2,
} from "lucide-react";

interface ReportViewProps {
  report: DecisionReport;
}

export function ReportView({ report }: ReportViewProps) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyQuestion = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast("Question copied to clipboard", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllWhatsApp = () => {
    const questionsText = report.sellerQuestions
      .map((q, idx) => `${idx + 1}. ${q.question}`)
      .join("\n\n");
    const fullMsg = `Hello, regarding the ${report.productName} (₦${report.price.toLocaleString()}):\n\n${questionsText}\n\nKindly clarify these points so we can finalize. Thanks!`;
    navigator.clipboard.writeText(fullMsg);
    setCopiedId("all");
    toast("All questions copied formatted for WhatsApp", "success");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatCurrency = (val: number, cur: string = "NGN") => {
    if (cur === "NGN") {
      return `₦${val.toLocaleString()}`;
    }
    return `${cur} ${val.toLocaleString()}`;
  };

  const highestRisk = report.risks.some((r) => r.severity === "critical")
    ? "Critical"
    : report.risks.some((r) => r.severity === "high")
    ? "High"
    : report.risks.some((r) => r.severity === "medium")
    ? "Medium"
    : "Low";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Product Snapshot Header */}
      <div className="border-b border-[#E4E7EC] pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#667085] mb-2 font-medium">
          <span className="uppercase tracking-wider font-semibold text-[#101828]">
            {report.category.replace("_", " ")}
          </span>
          <span>•</span>
          <span>Report Generated {new Date(report.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#101828]">
              {report.productName}
            </h1>
          </div>
          <div className="text-left md:text-right shrink-0">
            <div className="text-2xl sm:text-3xl font-black text-[#101828]">
              {formatCurrency(report.price, report.currency)}
            </div>
            <div className="text-xs text-[#667085] font-medium">Quoted Purchase Price</div>
          </div>
        </div>
      </div>

      {/* 1. Signature Decision Card (Navy + Lime) */}
      <DecisionCard
        score={report.score}
        verdict={report.verdict}
        verdictSummary={report.verdictSummary}
        confidenceScore={report.confidenceScore}
        completenessScore={report.infoCompletenessScore}
      />

      {/* 2. Four Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Price Benchmark"
          value={Math.abs(report.priceAssessment.differencePercent)}
          subValue={report.priceAssessment.differencePercent <= 0 ? "% below avg" : "% above avg"}
          progressPercent={85}
          caption={`${report.priceAssessment.verdict.replace("_", " ")} quartile`}
        />
        <MetricCard
          label="Value Rating"
          value={report.valueAssessment.overallValueRating.toUpperCase()}
          progressPercent={report.valueAssessment.durabilityScore}
          caption={`Durability index: ${report.valueAssessment.durabilityScore}/100`}
        />
        <MetricCard
          label="Risk Assessment"
          value={highestRisk}
          riskLevel={highestRisk as "Low" | "Medium" | "High" | "Critical"}
          caption={`${report.risks.length} key factor${report.risks.length > 1 ? "s" : ""} to verify`}
        />
        <MetricCard
          label="Info Completeness"
          value={`${report.infoCompletenessScore}%`}
          progressPercent={report.infoCompletenessScore}
          caption="Data availability score"
        />
      </div>

      {/* 3. Price & Market Assessment */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E7EC]">
          <h2 className="text-lg font-bold text-[#101828] flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-[#101828]" />
            Price & Market Benchmark Analysis
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F2F4F0] text-[#101828] uppercase">
            {report.priceAssessment.verdict.replace("_", " ")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F2F4F0] rounded-[10px] p-4 text-sm">
          <div>
            <span className="text-xs text-[#667085] font-semibold uppercase tracking-wider">
              Market Baseline Average
            </span>
            <div className="text-lg font-bold text-[#101828] mt-0.5">
              {formatCurrency(report.priceAssessment.marketAverage, report.currency)}
            </div>
          </div>
          <div>
            <span className="text-xs text-[#667085] font-semibold uppercase tracking-wider">
              Fair Market Price Corridor
            </span>
            <div className="text-lg font-bold text-[#101828] mt-0.5">
              {formatCurrency(report.priceAssessment.fairPriceRange[0], report.currency)} –{" "}
              {formatCurrency(report.priceAssessment.fairPriceRange[1], report.currency)}
            </div>
          </div>
        </div>

        <p className="text-sm text-[#475467] leading-relaxed">
          {report.priceAssessment.commentary}
        </p>
      </Card>

      {/* 4. Identified Risks to Verify */}
      <Card variant="default" padding="lg" className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#E4E7EC]">
          <h2 className="text-lg font-bold text-[#101828] flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-[#DC2626]" />
            What Concerns Us (Risk Factors)
          </h2>
          <span className="text-xs text-[#667085]">
            {report.risks.length} issue{report.risks.length > 1 ? "s" : ""} to verify
          </span>
        </div>

        <div className="space-y-3">
          {report.risks.map((risk) => (
            <div
              key={risk.id}
              className={`p-4 rounded-[12px] border ${
                risk.severity === "high" || risk.severity === "critical"
                  ? "bg-[#FEF3F2] border-[#FECDCA]"
                  : "bg-[#FFFAEB] border-[#FEDF89]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-[#101828]">{risk.title}</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    risk.severity === "high" || risk.severity === "critical"
                      ? "bg-[#DC2626] text-white"
                      : "bg-[#B45309] text-white"
                  }`}
                >
                  {risk.severity} Risk
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                {risk.explanation}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Seller Questions (WhatsApp Interrogation Checklist) */}
      <Card variant="default" padding="lg" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E4E7EC]">
          <div>
            <h2 className="text-lg font-bold text-[#101828] flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#0B1220]" />
              Questions to Ask the Seller Before Paying
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Copy and send directly to the merchant on WhatsApp or chat.
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={copyAllWhatsApp}
            className="shrink-0"
          >
            {copiedId === "all" ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                <span>All Copied for WhatsApp</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#667085]" />
                <span>Copy Full WhatsApp Checklist</span>
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          {report.sellerQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-[12px] border border-[#E4E7EC] bg-white hover:border-[#D0D5DD] transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-[6px] bg-[#0B1220] text-[#B8F34A] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-[#101828]">{q.question}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyQuestion(q.id, q.question)}
                  className="shrink-0 h-7 px-2 text-xs"
                >
                  {copiedId === q.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span className="text-[#15803D] text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#667085]" />
                      <span className="text-[11px] text-[#667085]">Copy</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="text-xs text-[#667085] pl-9 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 shrink-0" />
                <span>Why: {q.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 6. Verified Strengths & Missing Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card variant="status" padding="md" className="bg-[#ECFDF3] border border-[#ABEFC6] space-y-3">
          <h3 className="text-sm font-bold text-[#15803D] flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
            Why This Looks Promising
          </h3>
          <ul className="space-y-2 text-xs text-[#475467]">
            {report.positiveFindings.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="status" padding="md" className="bg-[#FFFAEB] border border-[#FEDF89] space-y-3">
          <h3 className="text-sm font-bold text-[#B45309] flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
            What&apos;s Missing (Checklist)
          </h3>
          <ul className="space-y-2 text-xs text-[#475467]">
            {report.missingInformation.map((item, idx) => (
              <li key={idx} className="flex items-start justify-between gap-2">
                <span className="flex items-start gap-2">
                  <span className="text-[#F59E0B] font-bold">○</span>
                  <span>{item}</span>
                </span>
                <span className="text-[10px] text-[#667085] bg-white/70 px-1.5 py-0.5 rounded border border-[#FEDF89] shrink-0">
                  Not provided
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 7. Alternative Market Options */}
      {report.alternatives && report.alternatives.length > 0 && (
        <Card variant="default" padding="lg" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#101828]">Alternative Market Comparisons</h2>
            <Link
              href={`/app/report/${report.id}/compare`}
              className="text-xs font-semibold text-[#0B1220] hover:underline flex items-center gap-1"
            >
              <span>Full trade-off comparison</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.alternatives.map((alt) => (
              <div
                key={alt.id}
                className="p-4 rounded-[12px] border border-[#E4E7EC] bg-[#F2F4F0] space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-[#101828]">{alt.name}</h4>
                  <span className="text-xs font-bold text-[#101828] shrink-0">
                    {formatCurrency(alt.priceEstimate, alt.currency)}
                  </span>
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">{alt.comparisonSummary}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 8. SCREEN 09: FINAL DECISION PANEL per PRD Section 40 */}
      <Card variant="recommendation" padding="lg" className="space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#B8F34A]">
            FINAL DECISION GUIDANCE
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {report.verdict === "STRONG_BUY"
              ? "BUY — Verified value and low risk profile."
              : report.verdict === "BUY_WITH_CAUTION"
              ? "WORTH CONSIDERING — Verify key details before payment."
              : report.verdict === "OVERPRICED"
              ? "WAIT — Don't pay yet, price is elevated."
              : "INVESTIGATE — Crucial omissions detected."}
          </h3>
          <p className="text-sm text-[#E4E9F2] leading-relaxed">
            {report.finalRecommendation}
          </p>
        </div>

        {/* Final verification checklist per Section 40 */}
        <div className="p-4 rounded-[12px] bg-[#111A2B] border border-[rgba(255,255,255,0.08)] space-y-2.5 text-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#A8B3C7]">
            Immediate Verification Checklist
          </div>
          <div className="space-y-1.5 text-[#E4E9F2]">
            <div className="flex items-center gap-2">
              <span className="text-[#16A34A] font-bold">✓</span>
              <span>Price evaluated against Lagos/Abuja retail corridor</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#16A34A] font-bold">✓</span>
              <span>Capacity and specification suitability analyzed</span>
            </div>
            {report.sellerQuestions.slice(0, 2).map((q, i) => (
              <div key={i} className="flex items-center gap-2 text-[#FEDF89]">
                <span className="text-[#F59E0B] font-bold">⚠</span>
                <span>Ask seller: {q.question}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action button row per Section 40 */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href={`/app/report/${report.id}/questions`}>
            <Button variant="accent" size="md">
              <HelpCircle className="h-4 w-4 mr-1 text-[#0B1220]" />
              <span>Ask seller</span>
            </Button>
          </Link>

          <Link href={`/app/report/${report.id}/compare`}>
            <Button
              variant="secondary"
              size="md"
              className="bg-transparent text-white border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.08)]"
            >
              <Scale className="h-4 w-4 mr-1 text-white" />
              <span>Compare alternatives</span>
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast("Report link copied to clipboard", "success");
            }}
            className="bg-transparent text-white border-[rgba(255,255,255,0.20)] hover:bg-[rgba(255,255,255,0.08)]"
          >
            <Share2 className="h-4 w-4 mr-1 text-white" />
            <span>Save & Share report</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
