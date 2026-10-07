"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { ReportView } from "@/components/report/ReportView";
import { DecisionReport } from "@/types/analysis";
import { getStoredReportById } from "@/lib/storage/reports";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { ArrowLeft, Printer, Share2, Check } from "lucide-react";

export default function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [report] = useState<DecisionReport>(() => {
    if (id === "demo" || id === DEMO_SOLAR_REPORT.id) return DEMO_SOLAR_REPORT;
    return getStoredReportById(id) || DEMO_SOLAR_REPORT;
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };


  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F7F8FA] text-[#111318]">
      <Header />

      <main className="flex-1 pb-16">
        {/* Sub-header navigation toolbar */}
        <div className="border-b border-zinc-200 bg-white/50 backdrop-blur-sm print:hidden">
          <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
            <Link
              href="/history"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Reports History</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Share Report</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors"
              >
                <Printer className="h-3.5 w-3.5 text-zinc-500" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {report && <ReportView report={report} />}
      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500 print:hidden">
        BuyLens AI — Independent Purchase Decision Support
      </footer>
    </div>
  );
}
