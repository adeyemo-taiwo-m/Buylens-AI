"use client";

import React from "react";
import { MagnifierCard } from "./MagnifierCard";
import { HeroProductCard } from "./HeroProductCard";
import {
  ShieldCheck,
  Scale,
  MessageSquareText,
  CircleDollarSign,
} from "lucide-react";

/**
 * HeroMagnifier — full hero section composition.
 *
 * Renders:
 *  1. The magnifying-lens product card (MagnifierCard → HeroProductCard)
 *  2. Four static insight chips beneath (Verdict, Main Trade-Off, …)
 *
 * The four chips are *outside* MagnifierCard so they stay completely
 * static and unaffected by the lens.
 */
export function HeroMagnifier() {
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* ── Magnifier Card ───────────────────────────────────────── */}
      <div className="relative w-full max-w-[640px] mx-auto">
        {/* Subtle background glow behind card */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-3xl opacity-40 blur-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E4E7EC] shadow-[0_8px_40px_-12px_rgba(37,99,235,0.10)]">
          <MagnifierCard
            lensRadius={100}
            magnification={1.6}
            blurAmount={8}
            idleSpeed={1}
            className="rounded-2xl"
          >
            <HeroProductCard />
          </MagnifierCard>
        </div>
      </div>

      {/* ── Static Insight Chips (outside the lens) ─────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-[720px]">
        {(
          [
            {
              icon: ShieldCheck,
              title: "VERDICT",
              value: "Worth considering",
              accent: "#16a34a",
            },
            {
              icon: Scale,
              title: "MAIN TRADE-OFF",
              value: "9h battery vs 14h",
              accent: "#2563eb",
            },
            {
              icon: MessageSquareText,
              title: "REVIEW PATTERN",
              value: "Fan noise complaints",
              accent: "#7c3aed",
            },
            {
              icon: CircleDollarSign,
              title: "TRUE COST",
              value: "$1,399",
              accent: "#0ea5e9",
            },
          ] as const
        ).map(({ icon: Icon, title, value, accent }) => (
          <div
            key={title}
            className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white border border-[#E4E7EC] shadow-xs"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accent}14` }}
            >
              <Icon className="w-4 h-4" style={{ color: accent }} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#667085] leading-none">
                {title}
              </p>
              <p className="text-xs font-medium text-[#101828] mt-0.5 truncate">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
