"use client";

import { useState } from "react";
import { DecisionReport, RecommendationVerdict } from "@/types/analysis";
import {
  ShieldAlert,
  HelpCircle,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";

interface ReportViewProps {
  report: DecisionReport;
}

export function ReportView({ report }: ReportViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyQuestion = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getVerdictStyle = (verdict: RecommendationVerdict) => {
    switch (verdict) {
      case "STRONG_BUY":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-800",
          label: "Strong Buy",
        };
      case "BUY_WITH_CAUTION":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          label: "Buy With Caution",
        };
      case "REQUEST_MORE_INFO":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          label: "Request More Info",
        };
      case "OVERPRICED":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          text: "text-orange-800",
          label: "Overpriced",
        };
      case "HIGH_RISK":
      case "DO_NOT_BUY":
      default:
        return {
          bg: "bg-rose-50",
          border: "border-rose-200",
          text: "text-rose-800",
          label: "High Risk / Do Not Buy",
        };
    }
  };

  const verdictStyle = getVerdictStyle(report.verdict);

  const formatCurrency = (val: number, cur: string = "NGN") => {
    if (cur === "NGN") {
      return `₦${val.toLocaleString()}`;
    }
    return `${cur} ${val.toLocaleString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Report Header */}
      <div className="border-b border-zinc-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-2">
          <span className="uppercase tracking-wider font-semibold">
            {report.category.replace("_", " ")}
          </span>
          <span>•</span>
          <span>Report Generated: {new Date(report.createdAt).toLocaleDateString()}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
          {report.productName}
        </h1>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-zinc-900">
            {formatCurrency(report.price, report.currency)}
          </span>
          <span className="text-sm text-zinc-500">Quoted Purchase Price</span>
        </div>
      </div>

      {/* Primary Verdict & Score Card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Overall Verdict
            </div>
            <div
              className={`inline-block px-3 py-1 rounded-md text-sm font-bold border ${verdictStyle.bg} ${verdictStyle.border} ${verdictStyle.text}`}
            >
              {verdictStyle.label}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-zinc-950">{report.score}/100</div>
              <div className="text-xs text-zinc-500 font-medium">Decision Score</div>
            </div>
            <div className="h-8 w-px bg-zinc-200" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-zinc-950">{report.confidenceScore}%</div>
              <div className="text-xs text-zinc-500 font-medium">Confidence</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            Executive Summary
          </div>
          <p className="text-zinc-800 text-sm sm:text-base leading-relaxed">
            {report.verdictSummary}
          </p>
        </div>
      </div>

      {/* Price Assessment */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-zinc-700" />
            Price & Market Assessment
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 uppercase">
            {report.priceAssessment.verdict.replace("_", " ")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-sm">
          <div>
            <span className="text-xs text-zinc-500">Market Baseline Average</span>
            <div className="text-base font-bold text-zinc-900">
              {formatCurrency(report.priceAssessment.marketAverage, report.currency)}
            </div>
          </div>
          <div>
            <span className="text-xs text-zinc-500">Estimated Fair Price Corridor</span>
            <div className="text-base font-bold text-zinc-900">
              {formatCurrency(report.priceAssessment.fairPriceRange[0], report.currency)} –{" "}
              {formatCurrency(report.priceAssessment.fairPriceRange[1], report.currency)}
            </div>
          </div>
        </div>

        <p className="text-sm text-zinc-700 leading-relaxed">
          {report.priceAssessment.commentary}
        </p>
      </div>

      {/* Identified Risks & Concerns */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-rose-600" />
          Key Risks to Verify
        </h2>

        <div className="space-y-3">
          {report.risks.map((risk) => (
            <div
              key={risk.id}
              className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-900">{risk.title}</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    risk.severity === "high" || risk.severity === "critical"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {risk.severity} Risk
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {risk.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Seller Questions to Ask */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-950 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-indigo-600" />
            Questions to Ask the Seller Before Paying
          </h2>
          <span className="text-xs text-zinc-500">Copy to send via WhatsApp</span>
        </div>

        <div className="space-y-3">
          {report.sellerQuestions.map((q) => (
            <div
              key={q.id}
              className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-zinc-900">{q.question}</p>
                <button
                  onClick={() => copyQuestion(q.id, q.question)}
                  className="shrink-0 p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-600 transition-colors inline-flex items-center gap-1 text-xs"
                  title="Copy question text"
                >
                  {copiedId === q.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 shrink-0" />
                <span>Why: {q.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positive Findings & Missing Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Verified Strengths
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
            {report.positiveFindings.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            Missing Specifications
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-600">
            {report.missingInformation.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alternative Market Options */}
      {report.alternatives && report.alternatives.length > 0 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-zinc-950">Alternative Market Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {report.alternatives.map((alt) => (
              <div key={alt.id} className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-zinc-900">{alt.name}</h4>
                  <span className="text-xs font-bold text-zinc-800 shrink-0">
                    {formatCurrency(alt.priceEstimate, alt.currency)}
                  </span>
                </div>
                <p className="text-xs text-zinc-600">{alt.comparisonSummary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Recommendation */}
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950 text-white p-6 sm:p-8 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Final Guidance
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-zinc-200">
          {report.finalRecommendation}
        </p>
      </div>
    </div>
  );
}
