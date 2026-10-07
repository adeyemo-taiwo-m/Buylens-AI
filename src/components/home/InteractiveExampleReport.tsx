"use client";

import React, { useState } from "react";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "score" | "verdict" | "strengths" | "risks" | "questions";

export function InteractiveExampleReport() {
  const [activeTab, setActiveTab] = useState<TabKey>("score");
  const report = DEMO_SOLAR_REPORT;

  const tabs: Array<{ id: TabKey; label: string }> = [
    { id: "score", label: "Score" },
    { id: "verdict", label: "Verdict" },
    { id: "strengths", label: "Strengths" },
    { id: "risks", label: "Risks" },
    { id: "questions", label: "Questions" },
  ];

  return (
    <Card variant="default" padding="lg" className="border border-[#E4E7EC] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E4E7EC]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
              INTERACTIVE DEMO REPORT
            </span>
            <span className="text-[#E4E7EC]">•</span>
            <span className="text-xs text-[#667085]">Solar / Power System</span>
          </div>
          <h3 className="text-lg font-bold text-[#101828]">{report.productName}</h3>
          <p className="text-xs text-[#667085] mt-0.5">Quoted: ₦850,000 via WhatsApp</p>
        </div>

        {/* Tab segmented row per INTERACTIONS.md Section 1.4 */}
        <div
          role="tablist"
          className="flex items-center gap-1 p-1 bg-[#F2F4F0] rounded-[10px] self-start sm:self-auto overflow-x-auto max-w-full"
        >
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-[8px] transition-all duration-200 select-none",
                  isSelected
                    ? "bg-white text-[#0B1220] shadow-xs"
                    : "text-[#667085] hover:text-[#101828]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="pt-6 min-h-[180px]">
        {activeTab === "score" && (
          <div
            id="panel-score"
            role="tabpanel"
            aria-labelledby="tab-score"
            className="animate-in fade-in slide-in-from-bottom-2 duration-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#0B1220] text-white flex flex-col items-center justify-center shrink-0 border border-[rgba(255,255,255,0.10)]">
                <span className="text-3xl font-black text-[#B8F34A]">{report.score}</span>
                <span className="text-[10px] text-[#A8B3C7] uppercase font-semibold">BUY SCORE</span>
              </div>
              <div className="space-y-1">
                <Badge variant="consider" dot>
                  Worth Considering
                </Badge>
                <p className="text-xs text-[#667085] mt-1">
                  High-value battery chemistry. Verification required for warranty.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F2F4F0] p-4 rounded-[10px]">
              <div>
                <span className="text-[#667085] block">Price Benchmark</span>
                <span className="font-bold text-[#101828]">92 / 100</span>
              </div>
              <div>
                <span className="text-[#667085] block">Value Index</span>
                <span className="font-bold text-[#101828]">84 / 100</span>
              </div>
              <div>
                <span className="text-[#667085] block">Risk Level</span>
                <span className="font-bold text-[#B45309]">Medium</span>
              </div>
              <div>
                <span className="text-[#667085] block">Completeness</span>
                <span className="font-bold text-[#101828]">64%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "verdict" && (
          <div
            id="panel-verdict"
            role="tabpanel"
            aria-labelledby="tab-verdict"
            className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-3"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4D7C0F] bg-[#F7FEE7] px-3 py-1 rounded-full border border-[#D9F99D]">
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>WORTH CONSIDERING</span>
            </div>
            <p className="text-sm text-[#475467] leading-relaxed">
              {report.verdictSummary}
            </p>
            <div className="pt-2 text-xs text-[#667085] border-t border-[#E4E7EC]">
              Price is fair at ₦850,000, but critical manufacturer warranty terms must be verified before payment.
            </div>
          </div>
        )}

        {activeTab === "strengths" && (
          <div
            id="panel-strengths"
            role="tabpanel"
            aria-labelledby="tab-strengths"
            className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-2.5"
          >
            {report.positiveFindings.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475467]">
                <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "risks" && (
          <div
            id="panel-risks"
            role="tabpanel"
            aria-labelledby="tab-risks"
            className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-3"
          >
            {report.risks.map((r) => (
              <div key={r.id} className="p-3 rounded-[8px] bg-[#FFFAEB] border border-[#FEDF89] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#101828]">{r.title}</span>
                  <span className="text-[10px] font-bold text-[#B45309] uppercase">{r.severity} Risk</span>
                </div>
                <p className="text-[#667085]">{r.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "questions" && (
          <div
            id="panel-questions"
            role="tabpanel"
            aria-labelledby="tab-questions"
            className="animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-2.5"
          >
            {report.sellerQuestions.slice(0, 3).map((q, idx) => (
              <div key={q.id} className="flex items-start gap-2.5 text-xs text-[#475467] p-2.5 rounded-[8px] bg-[#F2F4F0]">
                <span className="font-bold text-[#0B1220] bg-white h-5 w-5 rounded flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-medium text-[#101828]">{q.question}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
