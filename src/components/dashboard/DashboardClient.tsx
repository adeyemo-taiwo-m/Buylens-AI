"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

  return <DashboardShell><div className="space-y-8 lg:space-y-8">
    <motion.section {...reveal(0)} className="dashboard-header flex items-center justify-between gap-8"><div><h1 className="text-[30px] font-medium leading-[1.25] text-[#333333] sm:text-[40px]">{DASHBOARD_COPY.welcome}<span className="font-bold text-[#2563EB]">{DASHBOARD_USER.firstName}</span></h1><p className="mt-2 text-base leading-[1.5] text-[#5F636B] sm:text-[19px]">{DASHBOARD_COPY.subtext}</p></div><div className="flex shrink-0 items-center gap-[18px] max-[1100px]:flex-col max-[1100px]:items-stretch"><a href="/analyze" className="app-cta inline-flex h-[49px] items-center justify-center gap-3 rounded-full bg-[#2563EB] px-6 text-base font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2">Analyze a purchase <span aria-hidden="true">→</span></a><a href="#recent-analyses" className="app-cta inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#E3ECFC] px-6 text-base font-medium text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2">View History <span aria-hidden="true" className="text-lg">↓</span></a></div></motion.section>
    <motion.div {...reveal(0.09)}><AnalyzeForm /></motion.div>
    <motion.div {...reveal(0.18)}><RecentAnalyses analyses={analyses} /></motion.div>
    <motion.div {...reveal(0.36)}><InsightBanner /></motion.div>
  </div></DashboardShell>;
}
