"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BuyScoreGauge } from "@/components/ui/BuyScoreGauge";
import { CtaButton } from "@/components/ui/CtaButton";
import { ProductTile } from "@/components/ui/ProductTile";
import { VerdictPill } from "@/components/ui/VerdictPill";
import { MOTION_EASE } from "@/lib/motion";
import type { DashboardAnalysis } from "./dashboard.data";

export function RecentAnalyses({ analyses, loading = false }: { analyses: DashboardAnalysis[]; loading?: boolean }) {
  const reduced = useReducedMotion() === true;
  return (
    <section id="recent-analyses" className="scroll-mt-[88px]">
      <div className="flex items-end justify-between gap-4">
        <div><h2 className="text-[24px] font-semibold leading-[1.25] text-[#333333]">Recent Analyses</h2><p className="mt-1.5 text-[11px] text-[#5F6B7A]">Pick up where you left</p></div>
        <CtaButton href="/history" variant="ghost" trailingIcon={<ArrowRight className="h-5 w-5" />} className="h-12 px-5 max-[520px]:border-0 max-[520px]:px-0 max-[520px]:text-sm">View All</CtaButton>
      </div>
      <div className="mt-4 overflow-hidden rounded-[24px] bg-white">
        {loading ? <div aria-label="Loading recent analyses" className="divide-y divide-[#E4E8EF] px-5">{[0, 1].map((item) => <SkeletonRow key={item} />)}</div> : analyses.length === 0 ? <EmptyState /> : <div className="px-5">{analyses.slice(0, 2).map((analysis, index) => <motion.div key={analysis.id} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : index * 0.09, ease: MOTION_EASE }}><AnalysisRow analysis={analysis} /></motion.div>)}</div>}
      </div>
    </section>
  );
}

function AnalysisRow({ analysis }: { analysis: DashboardAnalysis }) {
  const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${analysis.date}T12:00:00`));
  return <Link href={`/analysis/${analysis.id}`} aria-label={`${analysis.title}, ${analysis.category}, ${date}, Buy score ${analysis.score} percent, ${analysis.verdict}`} className="dashboard-analysis-row group relative grid min-h-[156px] grid-cols-[minmax(0,1fr)_auto_24px] items-center gap-4 py-4 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB] sm:gap-6"><div className="flex min-w-0 items-center gap-4"><ProductTile src={analysis.image} fallbackSrc={analysis.fallbackImage} alt="" className="h-[76px] w-[76px]" /><div className="min-w-0"><h3 title={analysis.title} className="truncate text-[18px] font-semibold leading-[1.25] text-[#0F1B33] max-[1023px]:whitespace-normal max-[1023px]:line-clamp-2 max-[767px]:text-base">{analysis.title}</h3><p className="mt-2 text-sm text-[#7A7F8C] max-[767px]:text-[13px]">{analysis.category}<span className="mx-2 text-[#B8BFCC]">•</span>{date}</p></div></div><div className="flex items-center justify-center gap-6 max-[1023px]:gap-3 max-[767px]:col-start-2 max-[767px]:col-end-4 max-[767px]:justify-start max-[767px]:pl-[80px]"><BuyScoreGauge score={analysis.score} size="sm" verdict={analysis.verdict} animate="once" interactive={false} /><VerdictPill tone={analysis.tone} size="md" label={analysis.verdict} /></div><ChevronRight className="h-5 w-5 text-[#8A93A5] transition-transform duration-150 group-hover:translate-x-[3px] group-hover:text-[#2563EB]" /></Link>;
}

function SkeletonRow() { return <div className="flex min-h-[156px] items-center gap-4 py-4"><div className="skeleton h-[76px] w-[76px] shrink-0 rounded-[15px]" /><div className="space-y-3"><div className="skeleton h-5 w-72 max-w-[50vw] rounded" /><div className="skeleton h-4 w-40 rounded" /></div></div>; }

function EmptyState() { return <div className="flex min-h-[311px] flex-col items-center justify-center px-5 text-center"><h3 className="text-lg font-semibold text-[#0F1B33]">No analyses yet</h3><p className="mt-2 text-sm text-[#5F6B7A]">Your analyses will appear here.</p><CtaButton href="/analyze" variant="soft" trailingIcon={<ArrowRight className="h-[18px] w-[18px]" />} className="mt-5 h-11">Analyze a purchase</CtaButton></div>; }
