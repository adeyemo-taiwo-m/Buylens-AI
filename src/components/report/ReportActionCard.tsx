"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaButton } from "@/components/ui/CtaButton";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";
import { REPORT_COPY } from "./purchaseReport.data";

export function ReportActionCard({ report, onCopyAll }: { report: PurchaseReport; onCopyAll: () => Promise<boolean> }) {
  const [copied, setCopied] = useState(false);

  const copyQuestions = async () => {
    if (!(await onCopyAll())) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card variant="default" padding="lg" className="rounded-[16px] border-line shadow-sm sm:p-5">
      <div className="flex items-start gap-4 px-1 py-1 sm:px-3 sm:py-2">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <ShieldAlert className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-2xl font-semibold leading-[1.2] text-ink">{REPORT_COPY.finalTitle}</h2>
          <p className="mt-1.5 text-sm text-ink-muted">{REPORT_COPY.finalSubtitle}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {report.nextSteps.map((step, index) => (
          <article key={step.title} className="relative min-h-[158px] overflow-hidden rounded-[12px] bg-primary-50 p-5">
            <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">{index + 1}</span>
            <h3 className="relative z-10 mt-4 text-[21px] font-semibold leading-[1.2] text-ink">{step.title}</h3>
            <p className="relative z-10 mt-3 max-w-[250px] text-sm leading-[1.45] text-ink-muted">{step.description}</p>
            <span aria-hidden="true" className="absolute -right-5 -top-5 flex h-24 w-24 items-end justify-start rounded-full bg-primary-200/80 p-4 text-white">
              <Check className="h-8 w-8" strokeWidth={3} />
            </span>
          </article>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-5 rounded-[20px] bg-primary-600 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 text-white">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary-600"><ShieldAlert className="h-6 w-6" aria-hidden="true" /></span>
          <p className="max-w-[410px] text-lg font-semibold leading-[1.25]">{REPORT_COPY.finalCta}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaButton href="/analyze" variant="primary" trailingIcon={<ArrowRight className="h-4 w-4" />} className="h-11 border border-white/70 bg-transparent px-5 text-sm text-white shadow-none hover:bg-white/10">
            {REPORT_COPY.analyzeNewPurchase}
          </CtaButton>
          <Button type="button" variant="secondary-new" onClick={() => void copyQuestions()} className="h-11 bg-white px-5 text-sm text-primary-600 hover:bg-primary-50">
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            <span>{REPORT_COPY.copyQuestionsAction}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
