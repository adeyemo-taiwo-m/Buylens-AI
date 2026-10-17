"use client";

import { ShieldAlert, Zap } from "lucide-react";
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
            className="h-[125px] w-[125px] rounded-[20px] bg-primary-100"
            imageClassName="p-3"
            sizes="125px"
          />
          <div className="min-w-0">
            <h1 id="report-title" className="max-w-[900px] text-[32px] font-bold leading-[1.12] tracking-[-0.035em] text-ink sm:whitespace-nowrap sm:text-[44px]">
              {report.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-base text-ink-muted">
              <Zap className="h-4 w-4 fill-current" aria-hidden="true" />
              <span>{report.category}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
              <time dateTime={report.analyzedAt}>{dateFormatter.format(new Date(report.analyzedAt))}</time>
            </div>
          </div>
        </div>
      </section>

      <Card variant="default" padding="none" className="overflow-hidden rounded-[16px] border-line p-6 shadow-[0_1px_3px_rgba(16,24,40,0.04)] sm:p-10">
        <div className="grid md:grid-cols-[1fr_1.1fr_1fr]">
          <div className="relative flex min-h-[232px] flex-col justify-center md:pr-10 md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-[110px] md:after:w-px md:after:-translate-y-1/2 md:after:bg-line">
            <span className="text-base font-medium text-ink-muted">{REPORT_COPY.quotedPrice}</span>
            <span className="mt-2 whitespace-nowrap text-[56px] font-bold leading-none tracking-[-0.035em] tabular-nums text-ink">
              {currencyFormatter.format(report.quotedPrice)}
            </span>
            <span className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-primary-50 px-4 text-[13px] text-ink-muted">
              {REPORT_COPY.quotedPriceNote}
            </span>
          </div>

          <div className="relative flex min-h-[232px] flex-col items-center justify-center px-6 py-7 md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-[110px] md:after:w-px md:after:-translate-y-1/2 md:after:bg-line">
            <span className="text-lg font-medium text-ink-muted">{REPORT_COPY.buyScore}</span>
            <BuyScoreGauge
              score={report.buyScore}
              size="lg"
              width={220}
              verdict={report.scoreLabel.toLowerCase()}
              animate="once"
              tone={scoreTone.gauge}
            />
            <VerdictPill tone={scoreTone.pill} label={report.scoreLabel} className="mt-3 h-8 px-3 text-[13px]" />
          </div>

          <div className="flex min-h-[232px] items-center md:pl-10">
            <div className={`w-full rounded-[20px] border p-6 ${riskStyle.card}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-base text-ink-muted">{REPORT_COPY.riskAssessment}</span>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${riskStyle.icon}`}>
                  <ShieldAlert className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink">{report.risk.level}</p>
              <span className={`mt-5 inline-flex h-8 items-center gap-2 rounded-full px-3 text-xs font-medium ${riskStyle.pill}`}>
                <i aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                {report.risk.note}
              </span>
            </div>
          </div>

          <div className={`relative col-span-full mt-6 h-[95px] overflow-hidden rounded-[16px] px-6 py-6 ${scoreTone.banner}`}>
            <div className="relative z-10 flex min-w-0 max-w-[850px] items-start gap-4 pr-[140px] max-[639px]:pr-[70px]">
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold ${scoreTone.bannerIcon}`} aria-hidden="true">!</span>
              <div className="min-w-0">
                <h2 className="line-clamp-1 text-[22px] font-semibold leading-tight text-ink">{report.verdict.title}</h2>
                <p className="mt-1 line-clamp-1 text-base text-ink-muted">{report.verdict.body}</p>
              </div>
            </div>
            <Image src="/analysis/questions@2x.webp" alt="" aria-hidden="true" width={160} height={111} sizes="130px" className="pointer-events-none absolute bottom-0 right-0 h-[110px] w-[130px] object-contain" />
          </div>

          <div className="col-span-full mt-6 grid gap-4 md:grid-cols-2">
            <ReportStatusCard
              variant="promising"
              title={REPORT_COPY.promisingTitle}
              items={report.promising}
              imageSrc="/analysis/promising@2x.webp"
              tone={report.scoreTone}
            />
            <ReportStatusCard
              variant="verify"
              title={REPORT_COPY.verifyTitle}
              items={report.verifyFirst}
              imageSrc="/analysis/risks@2x.webp"
              tone={report.scoreTone}
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
