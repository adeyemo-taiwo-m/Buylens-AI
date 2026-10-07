"use client";

import { useState } from "react";
import Link from "next/link";
import { getStoredReports } from "@/lib/storage/reports";
import { DecisionReport } from "@/types/analysis";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Plus,
  FileText,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function AppHomePage() {
  const [reports] = useState<DecisionReport[]>(() => getStoredReports());
  const [greeting] = useState(() => {
    if (typeof window === "undefined") return "Good day";
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  });

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "STRONG_BUY":
        return <Badge variant="success" dot>Buy</Badge>;
      case "BUY_WITH_CAUTION":
        return <Badge variant="consider" dot>Worth Considering</Badge>;
      case "REQUEST_MORE_INFO":
        return <Badge variant="neutral" dot>Investigate</Badge>;
      case "OVERPRICED":
        return <Badge variant="warning" dot>Wait</Badge>;
      default:
        return <Badge variant="danger" dot>Avoid</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Greeting and Main Prompt */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
          {greeting}.
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#101828]">
          What are you considering buying?
        </h1>
        <p className="text-sm text-[#667085] max-w-xl">
          Enter an item quotation or listing to verify fair pricing, warranty authenticity, and unstated risks.
        </p>
      </div>

      {/* Primary Action Card */}
      <Card
        variant="default"
        padding="lg"
        className="bg-gradient-to-br from-white to-[#F7F8F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1220]">
            <Sparkles className="h-3.5 w-3.5 text-[#84CC16]" />
            <span>Independent Purchase Audit</span>
          </div>
          <h2 className="text-lg font-bold text-[#101828]">
            Analyze a Proposed Quotation
          </h2>
          <p className="text-xs text-[#667085] max-w-md">
            Paste details from WhatsApp, Jiji, or an in-store quote. Get an immediate Buy Score and seller question checklist.
          </p>
        </div>

        <Link href="/app/analyze" className="shrink-0 w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 text-[#B8F34A]" />
            <span>Analyze a Purchase</span>
          </Button>
        </Link>
      </Card>

      {/* Recent Analyses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#101828]">
            Recent Analyses
          </h2>
          <Link
            href="/app/history"
            className="text-xs font-semibold text-[#667085] hover:text-[#101828] flex items-center gap-1"
          >
            <span>View all</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {reports.length === 0 ? (
          <Card
            variant="default"
            padding="lg"
            className="border-dashed border-1.5 border-[#D0D5DD] bg-transparent text-center py-12"
          >
            <div className="w-12 h-12 rounded-full bg-[#F2F4F0] flex items-center justify-center text-[#667085] mx-auto mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-[#101828]">
              Your purchase intelligence starts here.
            </h3>
            <p className="text-xs text-[#667085] mt-1 mb-5 max-w-xs mx-auto">
              Analyze your first proposed purchase to start building your decision history.
            </p>
            <Link href="/app/analyze">
              <Button variant="primary" size="md">
                <Plus className="h-4 w-4 text-[#B8F34A]" />
                <span>Analyze your first purchase</span>
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reports.slice(0, 3).map((r) => (
              <Link key={r.id} href={`/app/report/${r.id}`}>
                <Card
                  variant="interactive"
                  padding="md"
                  className="h-full flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                        {r.category.replace("_", " ")}
                      </span>
                      {getVerdictBadge(r.verdict)}
                    </div>
                    <h3 className="text-sm font-bold text-[#101828] line-clamp-2">
                      {r.productName}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#E4E7EC] flex items-baseline justify-between">
                    <div>
                      <div className="text-base font-extrabold text-[#101828]">
                        ₦{r.price.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-[#667085]">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-[#0B1220]">{r.score}</span>
                      <span className="text-[10px] text-[#667085] block -mt-1">SCORE</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
