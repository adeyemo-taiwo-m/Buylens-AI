"use client";

import { use, useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Card } from "@/components/ui/Card";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ReportView } from "@/components/report/ReportView";
import { toPurchaseReport } from "@/components/report/purchaseReport.data";
import { DEMO_SOLAR_REPORT } from "@/data/demo";
import { getStoredReports } from "@/lib/storage/reports";
import type { DecisionReport } from "@/types/analysis";

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isDemo = id === "demo" || id === DEMO_SOLAR_REPORT.id;
  const [report, setReport] = useState<DecisionReport | null>(isDemo ? DEMO_SOLAR_REPORT : null);
  const [loading, setLoading] = useState(!isDemo);

  useEffect(() => {
    if (isDemo) return;
    const frame = window.requestAnimationFrame(() => {
      const storedReport = getStoredReports().find((item) => item.id === id) ?? null;
      setReport(storedReport);
      setLoading(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [id, isDemo]);

  return (
    <DashboardShell>
      {loading ? <ReportLoadingState /> : report ? <ReportView report={toPurchaseReport(report)} /> : <MissingReportState />}
    </DashboardShell>
  );
}

function ReportLoadingState() {
  return (
    <div className="mx-auto w-full max-w-[1060px] space-y-6 pb-8" aria-label="Loading purchase report" role="status">
      <div className="h-9 w-36 animate-pulse rounded-full bg-primary-100" />
      <div className="flex items-center gap-6">
        <div className="h-[132px] w-[132px] animate-pulse rounded-[20px] bg-primary-100" />
        <div className="space-y-3">
          <div className="h-10 w-[min(70vw,720px)] animate-pulse rounded-lg bg-primary-100" />
          <div className="h-5 w-64 animate-pulse rounded-lg bg-primary-100" />
        </div>
      </div>
      <div className="h-[520px] animate-pulse rounded-[16px] bg-surface" />
    </div>
  );
}

function MissingReportState() {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-[700px] items-center justify-center py-12">
      <Card variant="default" padding="lg" className="w-full text-center shadow-sm">
        <h1 className="text-3xl font-bold text-ink">Purchase report unavailable</h1>
        <p className="mx-auto mt-3 max-w-[480px] text-sm leading-6 text-ink-muted">
          This report could not be found. Start a new analysis to create a fresh purchase report.
        </p>
        <CtaButton href="/analyze" variant="primary" className="mt-6">
          Analyze a purchase
        </CtaButton>
      </Card>
    </div>
  );
}
