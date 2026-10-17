"use client";

import { CalendarDays, ShieldAlert, Zap } from "lucide-react";
import Image from "next/image";
import { BuyScoreGauge } from "@/components/ui/BuyScoreGauge";
import { Card } from "@/components/ui/Card";
import { ProductTile } from "@/components/ui/ProductTile";
import { VerdictPill } from "@/components/ui/VerdictPill";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/copyToClipboard";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";
import { ReportActionCard } from "./ReportActionCard";
import { ReportEvidenceAccordion } from "./ReportEvidenceAccordion";
import { ReportQuestionsCard } from "./ReportQuestionsCard";
import { ReportStatusCard } from "./ReportStatusCard";
import { REPORT_COPY, RISK_STYLES, SCORE_TONE_STYLES } from "./purchaseReport.data";

type ReportViewProps = {
  report: PurchaseReport;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function ReportView({ report }: ReportViewProps) {
  const { toast } = useToast();
  const scoreTone = SCORE_TONE_STYLES[report.scoreTone];
  const riskStyle = RISK_STYLES[report.risk.level];

  const copyAllQuestions = async () => {
    const content = report.sellerQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n");
    const copied = await copyToClipboard(content);
    if (copied) toast("Copied", "success");
    return copied;
  };

  return (
    <div className="mx-auto w-full max-w-[1060px] space-y-6 pb-8">
      <section aria-labelledby="report-title" className="pt-1 sm:pt-2">
        <span className="inline-flex h-9 items-center rounded-full border border-primary-200 bg-primary-50 px-5 text-xs font-medium tracking-[0.02em] text-primary-600">
          {REPORT_COPY.badge}
        </span>

        <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
          <ProductTile
            src={report.imageUrl}
            alt={report.title}
            className="h-[132px] w-[132px] rounded-[20px] bg-primary-100"
            imageClassName="p-3"
            sizes="132px"
          />
          <div className="min-w-0">
            <h1 id="report-title" className="max-w-[900px] text-[32px] font-bold leading-[1.12] tracking-[-0.035em] text-ink sm:text-[44px]">
              {report.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-base text-ink-muted">
              <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{report.category}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <time dateTime={report.analyzedAt}>{dateFormatter.format(new Date(report.analyzedAt))}</time>
            </div>
          </div>
        </div>
      </section>

      <Card variant="default" padding="none" className="overflow-hidden rounded-[16px] border-line shadow-sm">
        <div className="grid md:grid-cols-[1fr_1.1fr_1fr]">
          <div className="flex min-h-[232px] flex-col justify-center border-b border-line px-6 py-8 sm:px-10 md:border-b-0 md:border-r">
            <span className="text-sm font-medium text-ink-muted">{REPORT_COPY.quotedPrice}</span>
            <span className="mt-2 text-[42px] font-extrabold leading-none tracking-[-0.035em] text-ink sm:text-[52px]">
              {currencyFormatter.format(report.quotedPrice)}
            </span>
            <span className="mt-5 inline-flex h-9 items-center justify-center rounded-full bg-primary-50 px-4 text-xs text-ink-muted">
              {REPORT_COPY.quotedPriceNote}
            </span>
          </div>

          <div className="flex min-h-[232px] flex-col items-center justify-center border-b border-line px-6 py-7 md:border-b-0 md:border-r">
            <span className="text-sm font-medium text-ink-muted">{REPORT_COPY.buyScore}</span>
            <BuyScoreGauge
              score={report.buyScore}
              size="lg"
              width={220}
              verdict={report.scoreLabel.toLowerCase()}
              animate="once"
            />
            <VerdictPill tone={scoreTone.pill} label={report.scoreLabel} />
          </div>

          <div className="flex min-h-[232px] items-center px-5 py-6 sm:px-7">
            <div className={`w-full rounded-[16px] border p-6 ${riskStyle.card}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-ink-muted">{REPORT_COPY.riskAssessment}</span>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${riskStyle.icon}`}>
                  <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 text-[32px] font-semibold leading-none tracking-[-0.02em] text-ink">{report.risk.level}</p>
              <span className={`mt-5 inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs font-medium ${riskStyle.pill}`}>
                <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                {report.risk.note}
              </span>
            </div>
          </div>

          <div className={`relative col-span-full mx-5 mb-5 overflow-hidden rounded-[10px] border px-5 py-5 sm:mx-10 sm:px-5 ${scoreTone.banner}`}>
            <div className="relative z-10 flex max-w-[760px] items-start gap-3">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${scoreTone.bannerIcon}`} aria-hidden="true">!</span>
              <div>
                <h2 className="text-lg font-semibold leading-tight text-ink">{report.verdict.title}</h2>
                <p className="mt-1 text-sm text-ink-muted">{report.verdict.body}</p>
              </div>
            </div>
            <Image src="/analysis/question.png" alt="" aria-hidden="true" width={150} height={126} sizes="150px" className="pointer-events-none absolute -bottom-10 right-2 h-[112px] w-[130px] object-contain opacity-90 sm:h-[126px] sm:w-[150px]" />
          </div>

          <div className="col-span-full grid gap-4 px-5 pb-5 sm:px-10 sm:pb-7 md:grid-cols-2">
            <ReportStatusCard
              variant="promising"
              title={REPORT_COPY.promisingTitle}
              items={report.promising}
              imageSrc="/analysis/promise.png"
            />
            <ReportStatusCard
              variant="verify"
              title={REPORT_COPY.verifyTitle}
              items={report.verifyFirst}
              imageSrc="/analysis/risks.png"
            />
          </div>
        </div>
      </Card>

      <ReportQuestionsCard report={report} onCopyAll={copyAllQuestions} />
      <ReportEvidenceAccordion evidence={report.evidence} />
      <ReportActionCard report={report} onCopyAll={copyAllQuestions} />
    </div>
  );
}
