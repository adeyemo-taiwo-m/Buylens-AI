"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ReportView } from "@/components/report/ReportView";
import { DecisionReport } from "@/types/analysis";
import { getStoredReportById } from "@/lib/storage/reports";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  ArrowLeft,
  Printer,
  Share2,
  Scale,
  HelpCircle,
  Check,
} from "lucide-react";

export default function AppReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { toast } = useToast();
  const [report, setReport] = useState<DecisionReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = getStoredReportById(id);
    setReport(found || DEMO_SOLAR_REPORT);
    setLoading(false);
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Report link copied to clipboard", "success");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !report) {
    return (
      <div className="py-20 text-center text-sm text-[#667085]">
        Loading Decision Report...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top navigation actions toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4E7EC] print:hidden">
        <Link
          href="/app/history"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#101828]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Analyses</span>
        </Link>

        <div className="flex items-center flex-wrap gap-2">
          <Link href={`/app/report/${report.id}/questions`}>
            <Button variant="secondary" size="sm">
              <HelpCircle className="h-3.5 w-3.5 text-[#0B1220]" />
              <span>Seller Questions</span>
            </Button>
          </Link>

          <Link href={`/app/report/${report.id}/compare`}>
            <Button variant="secondary" size="sm">
              <Scale className="h-3.5 w-3.5 text-[#0B1220]" />
              <span>Compare Alternatives</span>
            </Button>
          </Link>

          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Share2 className="h-3.5 w-3.5 text-[#667085]" />
            <span>Share</span>
          </Button>

          <Button variant="secondary" size="sm" onClick={handlePrint}>
            <Printer className="h-3.5 w-3.5 text-[#667085]" />
            <span>PDF</span>
          </Button>
        </div>
      </div>

      {/* Main Report View */}
      <ReportView report={report} />
    </div>
  );
}
