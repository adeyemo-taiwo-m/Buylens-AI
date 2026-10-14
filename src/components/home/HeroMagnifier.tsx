"use client";

import React from "react";
import { MagnifierCard } from "./MagnifierCard";
import { HeroProductCard } from "./HeroProductCard";
import { BadgeCheck, Scale, MessageSquareText, ReceiptText } from "lucide-react";

const insights = [
  { icon: BadgeCheck, title: "VERDICT", value: "Worth considering" },
  { icon: Scale, title: "MAIN TRADE-OFF", value: "9h battery vs 14h" },
  { icon: MessageSquareText, title: "REVIEW PATTERN", value: "Fan noise complaints" },
  { icon: ReceiptText, title: "TRUE COST", value: "$1,399" },
];

export function HeroMagnifier() {
  return (
    <div className="hero-visual mx-auto flex w-full flex-col items-center">
      <div className="hero-card-wrap relative w-full max-w-[800px]">
        <div className="hero-card relative overflow-hidden rounded-[36px] border border-white/80 bg-white/75 shadow-[0_20px_70px_-28px_rgba(37,99,235,.25)] backdrop-blur-sm">
          <MagnifierCard lensRadius={138} magnification={1} blurAmount={8} idleSpeed={0.35} className="min-h-[504px] rounded-[36px]">
            <HeroProductCard />
          </MagnifierCard>
        </div>
        <svg className="hero-connectors pointer-events-none absolute inset-0 z-[4] h-full w-full overflow-visible" viewBox="0 0 800 610" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="#7FB0F5" strokeWidth="1.2">
            <polyline points="85,570 130,500 214,305" />
            <polyline points="294,570 335,470 390,165" />
            <polyline points="504,570 440,488 410,320" />
            <polyline points="715,570 650,475 522,285" />
          </g>
          <g fill="#fff" stroke="#7FB0F5" strokeWidth="1.5">
            <circle cx="214" cy="305" r="3" /><circle cx="390" cy="165" r="3" />
            <circle cx="410" cy="320" r="3" /><circle cx="522" cy="285" r="3" />
          </g>
        </svg>
      </div>
      <div className="hero-insights relative z-[6] -mt-1 grid w-full max-w-[890px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {insights.map(({ icon: Icon, title, value }, index) => (
          <div key={title} className="animate-fade-up flex min-h-[66px] items-center gap-3 rounded-2xl border border-[#D6E6FC] bg-[#EEF5FF] px-3 sm:px-4 lg:px-4" style={{ animationDelay: `${320 + index * 80}ms` }}>
            <Icon className="h-[22px] w-[22px] shrink-0 text-[#2563EB]" strokeWidth={1.8} />
            <div className="min-w-0 text-left">
              <p className="truncate text-[11px] font-medium tracking-[.04em] text-[#2563EB] sm:text-xs">{title}</p>
              <p className="truncate text-[11px] text-[#6F9BE8] sm:text-[13px]">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
