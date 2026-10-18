"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Info, Sparkles, Zap } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LoginPanelBackground } from "@/components/auth/LoginPanelBackground";
import { BuyScoreGauge } from "@/components/ui/BuyScoreGauge";
import { VerdictPill } from "@/components/ui/VerdictPill";
import { ReportStatusCard } from "@/components/report/ReportStatusCard";
import { RiskCard } from "@/components/report/RiskCard";
import { REPORT_COPY, SCORE_TONE_STYLES } from "@/components/report/purchaseReport.data";
import { getSampleReport } from "@/lib/sample-reports";
import { SAMPLES, type Sample } from "@/lib/samples";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

const FALLBACK_SAMPLE: Sample = {
  id: "inverter-5kva",
  title: "5kVA Hybrid Inverter + 5kWh Lithium Battery",
  category: "Solar & Power",
  price: 850000,
  currency: "NGN",
  listingUrl: "",
  sellerName: "",
  description: "",
  useCase: "",
  budget: 900000,
  notes: "",
  hint: "Promising, but verify key details first.",
  expectedTone: "positive",
  imageUrl: "/analysis/solar.png",
};

const FALLBACK_REPORT: PurchaseReport = {
  id: "inverter-5kva",
  title: FALLBACK_SAMPLE.title,
  category: FALLBACK_SAMPLE.category,
  imageUrl: FALLBACK_SAMPLE.imageUrl,
  analyzedAt: "2026-10-11T00:00:00.000Z",
  quotedPrice: FALLBACK_SAMPLE.price,
  currency: "NGN",
  buyScore: 82,
  scoreLabel: "Worth considering",
  scoreTone: "positive",
  risk: { level: "Medium", note: "More information needed" },
  verdict: { title: "Promising, but verify key details first.", body: "Warranty and installation costs need confirmation before you pay." },
  promising: ["Specific inverter and battery system quoted", "Stated capacity fits your description"],
  verifyFirst: ["Warranty coverage unconfirmed", "Installation cost unclear"],
  sellerQuestions: [],
  evidence: [],
  nextSteps: [],
};

const PREVIEW_SAMPLES = SAMPLES.length > 0 ? SAMPLES : [FALLBACK_SAMPLE];
const SHORT_NAMES: Record<string, string> = {
  "inverter-5kva": "Inverter + battery",
  "solar-kit-too-good": "Solar kit",
  "inverter-documented": "Felicity system",
};

export function LoginPreviewPanel() {
  const reduced = useReducedMotion() === true;
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [autoStopped, setAutoStopped] = useState(false);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeSample = PREVIEW_SAMPLES[activeIndex] ?? FALLBACK_SAMPLE;
  const activeReport = useMemo(() => getSampleReport(activeSample.id) ?? FALLBACK_REPORT, [activeSample.id]);
  const toneStyles = SCORE_TONE_STYLES[activeReport.scoreTone];
  const VerdictIcon = activeReport.scoreTone === "positive" ? CheckCircle2 : activeReport.scoreTone === "negative" ? AlertTriangle : Info;

  const selectSample = (index: number, stop = true) => {
    const nextSample = PREVIEW_SAMPLES[index];
    if (!nextSample) return;
    if (index !== activeIndex) {
      setPreviousScore(activeReport.buyScore);
      setActiveIndex(index);
    }
    if (stop) setAutoStopped(true);
  };

  const stopAutoPlay = () => setAutoStopped(true);

  useEffect(() => {
    if (reduced || autoStopped || PREVIEW_SAMPLES.length < 2) return;
    let elapsed = 0;
    let lastTick = Date.now();
    const timer = window.setInterval(() => {
      const now = Date.now();
      if (document.visibilityState === "hidden") {
        lastTick = now;
        return;
      }
      elapsed += now - lastTick;
      lastTick = now;
      if (elapsed >= 5000) {
        window.clearInterval(timer);
        setPreviousScore(activeReport.buyScore);
        setActiveIndex((current) => (current + 1) % PREVIEW_SAMPLES.length);
        return;
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [activeIndex, activeReport.buyScore, autoStopped, reduced]);

  const handleChipKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex = activeIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (activeIndex + 1) % PREVIEW_SAMPLES.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (activeIndex - 1 + PREVIEW_SAMPLES.length) % PREVIEW_SAMPLES.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = PREVIEW_SAMPLES.length - 1;
    if (nextIndex === activeIndex && event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    stopAutoPlay();
    selectSample(nextIndex);
    window.requestAnimationFrame(() => chipRefs.current[nextIndex]?.focus());
  };

  return (
    <section className="login-preview-grid relative isolate hidden min-h-screen overflow-hidden rounded-tr-[32px] rounded-br-[32px] bg-gradient-to-b from-primary-50 via-primary-50 to-surface px-8 py-10 lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-12 xl:px-16" aria-label="Interactive sample report preview">
      <LoginPanelBackground />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.42)_45%,transparent_82%)]" />
      <Link href="/" className="absolute left-8 top-8 z-20 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 xl:left-12">
        <BrandLogo size="header" priority />
      </Link>

      <div className="relative z-10 flex w-full max-w-[620px] flex-col items-center text-center">
        <motion.h1 initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.06 }} className="mt-5 max-w-[520px] text-[36px] leading-[1.08] tracking-[-0.035em] text-[var(--hero-text-heading)]"><span className="font-medium">Know before </span><span className="font-semibold text-primary-600">you pay.</span></motion.h1>
        <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.12 }} className="mt-3 max-w-[500px] text-base leading-6 text-ink-muted">Pick a listing and watch BuyLens AI judge it. Then try it yourself.</motion.p>
        <motion.div initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.18 }} className="relative mt-8 w-full max-w-[520px]">
          <div className="pointer-events-none absolute inset-8 rounded-[32px] bg-primary-200/30 blur-3xl" aria-hidden="true" />
          <motion.div animate={reduced ? { y: 0 } : { y: [0, -4, 0, 4, 0] }} transition={reduced ? { duration: 0 } : { duration: 6, ease: "easeInOut", repeat: Infinity }} role="img" aria-label={`Sample report: ${activeReport.title}, buy score ${activeReport.buyScore} percent, ${activeReport.scoreLabel}, ${activeReport.risk.level} risk`} className="relative min-h-[550px] rounded-[24px] border border-line bg-surface p-5 text-left shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="line-clamp-2 text-[18px] font-semibold leading-6 text-ink">{activeReport.title}</h2>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-[13px] font-medium text-primary-700"><Zap className="h-3.5 w-3.5 fill-current" aria-hidden="true" />{activeReport.category}</span>
              </div>
              <span className="shrink-0 text-right text-[24px] font-bold leading-none tabular-nums text-ink">{currency.format(activeReport.quotedPrice)}</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeSample.id} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="flex min-w-0 flex-col items-center justify-center rounded-[16px] border border-line bg-surface p-3">
                    <BuyScoreGauge score={activeReport.buyScore} fromScore={previousScore} width={180} verdict={activeReport.scoreLabel.toLowerCase()} animate="once" animationDuration={0.6} tone={toneStyles.gauge} />
                    <VerdictPill tone={toneStyles.pill} label={activeReport.scoreLabel} className="mt-1 h-7 px-2.5 text-[13px]" />
                  </div>
                  <RiskCard risk={activeReport.risk} compact />
                </div>

                <div className={cn("mt-4 flex min-w-0 items-center gap-2 rounded-[14px] px-3 py-3", toneStyles.banner)}>
                  <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", toneStyles.bannerIcon)}><VerdictIcon className="h-4 w-4" aria-hidden="true" /></span>
                  <p className="min-w-0 truncate text-[14px] font-semibold text-ink">{activeReport.verdict.title}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <ReportStatusCard variant="promising" title={REPORT_COPY.promisingTitle} items={activeReport.promising} tone={activeReport.scoreTone} compact />
                  <ReportStatusCard variant="verify" title={REPORT_COPY.verifyTitle} items={activeReport.verifyFirst} tone={activeReport.scoreTone} compact />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <motion.div initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.24 }} className="mt-6 w-full max-w-[620px]">
          <div role="radiogroup" aria-label="Choose a sample listing" className="flex flex-wrap justify-center gap-2">
            {PREVIEW_SAMPLES.map((sample, index) => {
              const report = getSampleReport(sample.id) ?? FALLBACK_REPORT;
              const selected = index === activeIndex;
              return <button key={sample.id} ref={(element) => { chipRefs.current[index] = element; }} type="button" role="radio" aria-checked={selected} tabIndex={selected ? 0 : -1} onClick={() => selectSample(index)} onMouseEnter={stopAutoPlay} onFocus={stopAutoPlay} onKeyDown={handleChipKeyDown} className={cn("inline-flex min-h-11 min-w-0 max-w-full items-center gap-2 rounded-full border px-3 py-2 text-left text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2", selected ? "border-primary-600 bg-primary-50 text-primary-700" : "border-line bg-surface text-ink-muted hover:border-primary-600")}>
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="max-w-[145px] truncate">{SHORT_NAMES[sample.id] ?? sample.title}</span>
                <span className="shrink-0 tabular-nums">{currency.format(sample.price)}</span>
                <span className="sr-only">Score {report.buyScore}</span>
              </button>;
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function LoginSampleStrip() {
  return (
    <div className="mb-5 lg:hidden">
      <p className="mb-2 text-[13px] font-medium text-ink-muted">Try a sample</p>
      <div className="flex min-w-0 gap-2 overflow-x-auto pb-1" aria-label="Sample listing preview">
        {PREVIEW_SAMPLES.map((sample) => {
          const report = getSampleReport(sample.id) ?? FALLBACK_REPORT;
          const tone = SCORE_TONE_STYLES[report.scoreTone];
          return <div key={sample.id} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-3 text-[13px] text-ink-muted"><span className="max-w-[130px] truncate">{SHORT_NAMES[sample.id] ?? sample.title}</span><span className={cn("rounded-full px-2 py-1 text-[13px] font-semibold", tone.banner)}>{report.buyScore}%</span></div>;
        })}
      </div>
    </div>
  );
}
