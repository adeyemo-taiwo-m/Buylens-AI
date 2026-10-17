"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { MOTION_EASE } from "@/lib/motion";
import { DashboardShell } from "./DashboardShell";
import { AnalyzeForm } from "./AnalyzeForm";
import { RecentAnalyses } from "./RecentAnalyses";
import { InsightBanner } from "./InsightBanner";
import { DASHBOARD_ANALYSES, DASHBOARD_COPY, DASHBOARD_USER } from "./dashboard.data";

export function DashboardClient() {
  const reduced = useReducedMotion() === true;
  const [analyses] = useState(DASHBOARD_ANALYSES);
  const reveal = (delay: number) => ({ initial: reduced ? false : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: MOTION_EASE } });

  return <DashboardShell><div>
    <motion.section {...reveal(0)} className="dashboard-header flex items-center justify-between gap-8"><div><h1 className="text-[30px] font-medium leading-[1.25] text-[#333333] sm:text-[40px]">{DASHBOARD_COPY.welcome}<span className="font-bold text-[#2563EB]">{DASHBOARD_USER.firstName}</span></h1><p className="mt-2 text-base leading-[1.5] text-[#737373] sm:text-[19px]">{DASHBOARD_COPY.subtext}</p></div><div className="flex shrink-0 items-center gap-[18px] max-[1100px]:flex-col max-[1100px]:items-stretch"><CtaButton href="/analyze" variant="primary" trailingIcon={<ArrowRight className="h-5 w-5" />} className="h-[49px] w-[219px] whitespace-nowrap">Analyze a purchase</CtaButton><CtaButton href="#recent-analyses" variant="soft" trailingIcon={<ArrowDown className="dashboard-scroll-arrow h-5 w-5" />} className="h-12 w-[171px] whitespace-nowrap">View History</CtaButton></div></motion.section>
    <motion.div {...reveal(0.09)} className="mt-7"><AnalyzeForm /></motion.div>
    <motion.div {...reveal(0.18)} className="mt-8"><RecentAnalyses analyses={analyses} /></motion.div>
    <motion.div {...reveal(0.36)} className="mt-6"><InsightBanner /></motion.div>
  </div></DashboardShell>;
}
