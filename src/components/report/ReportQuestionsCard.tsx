"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/copyToClipboard";
import { REPORT_COPY } from "./purchaseReport.data";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";

type ReportQuestionsCardProps = {
  report: PurchaseReport;
  onCopyAll: () => Promise<boolean>;
};

export function ReportQuestionsCard({ report, onCopyAll }: ReportQuestionsCardProps) {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<number | "all" | null>(null);

  const copyQuestion = async (question: string, index: number) => {
    if (!(await copyToClipboard(question))) return;
    setCopiedId(index);
    toast("Copied", "success");
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  const copyAll = async () => {
    if (!(await onCopyAll())) return;
    setCopiedId("all");
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <Card variant="default" padding="lg" className="rounded-[16px] border-line shadow-sm sm:p-10">
      <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-[28px] font-bold leading-[1.15] text-ink">{REPORT_COPY.questionsTitle}</h2>
          <p className="mt-2 text-sm text-ink-muted">{REPORT_COPY.questionsSubtitle}</p>
        </div>
        <Button type="button" variant="primary" size="lg" onClick={copyAll} className="h-12 shrink-0 px-6">
          {copiedId === "all" ? "Copied" : REPORT_COPY.copyQuestions}
        </Button>
      </div>

      <ol className="divide-y divide-line">
        {report.sellerQuestions.map((question, index) => (
          <li key={question} className="flex min-h-[66px] items-center gap-3 py-3 text-sm text-ink-muted transition-colors hover:bg-primary-50 sm:gap-4">
            <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[11px] font-semibold text-white">{index + 1}</span>
            <span className="min-w-0 flex-1 leading-[1.4]">{question}</span>
            <button
              type="button"
              aria-label={`Copy question ${index + 1}`}
              onClick={() => void copyQuestion(question, index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-50 text-primary-600 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              {copiedId === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </li>
        ))}
      </ol>
    </Card>
  );
}
