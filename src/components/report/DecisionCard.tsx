"use client";

import React from "react";
import { RecommendationVerdict } from "@/types/analysis";
import {
  CheckCircle2,
  ThumbsUp,
  Clock,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

interface DecisionCardProps {
  score: number;
  verdict: RecommendationVerdict;
  verdictSummary: string;
  confidenceScore?: number;
  completenessScore?: number;
}

export function DecisionCard({
  score,
  verdict,
  verdictSummary,
  confidenceScore = 88,
  completenessScore = 84,
}: DecisionCardProps) {
  const getVerdictDetails = (v: RecommendationVerdict) => {
    switch (v) {
      case "STRONG_BUY":
        return {
          label: "Buy",
          icon: CheckCircle2,
          color: "#16A34A",
          dot: "bg-[#16A34A]",
        };
      case "BUY_WITH_CAUTION":
        return {
          label: "Worth Considering",
          icon: ThumbsUp,
          color: "#84CC16",
          dot: "bg-[#84CC16]",
        };
      case "REQUEST_MORE_INFO":
        return {
          label: "Need More Info",
          icon: HelpCircle,
          color: "#64748B",
          dot: "bg-[#64748B]",
        };
      case "OVERPRICED":
        return {
          label: "Wait",
          icon: Clock,
          color: "#F59E0B",
          dot: "bg-[#F59E0B]",
        };
      case "HIGH_RISK":
      case "DO_NOT_BUY":
      default:
        return {
          label: "Avoid",
          icon: ShieldAlert,
          color: "#DC2626",
          dot: "bg-[#DC2626]",
        };
    }
  };

  const vInfo = getVerdictDetails(verdict);
  const VerdictIcon = vInfo.icon;

  // SVG Score Ring Calculation (radius 44, circumference 2 * pi * 44 = ~276.46)
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-[18px] bg-[#0B1220] text-white p-6 sm:p-10 border border-[rgba(255,255,255,0.08)] shadow-[0_20px_40px_-16px_rgba(11,18,32,0.35),inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* Decorative top hairline with electric lime glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8F34A]/50 to-transparent pointer-events-none" />

      {/* Very subtle ambient radial highlight */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(184,243,74,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[rgba(255,255,255,0.10)]">
        {/* Left side: Score numeral & Ring */}
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[rgba(255,255,255,0.10)]"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Electric Lime Progress Stroke */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#B8F34A"
                strokeWidth="8"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white tracking-tight">{score}</span>
              <span className="text-[10px] uppercase font-semibold text-[#A8B3C7]">/ 100</span>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#A8B3C7] mb-1.5">
              BUY SCORE
            </div>
            {/* Verdict Pill on Navy */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.14)] text-xs font-semibold text-white">
              <span className={`w-2 h-2 rounded-full ${vInfo.dot}`} />
              <VerdictIcon className="w-3.5 h-3.5" style={{ color: vInfo.color }} />
              <span>{vInfo.label}</span>
            </div>
          </div>
        </div>

        {/* Right side: Secondary confidence and completeness meters */}
        <div className="flex items-center gap-6 text-sm border-t md:border-t-0 pt-4 md:pt-0 border-[rgba(255,255,255,0.08)]">
          <div className="text-left md:text-right">
            <div className="text-xs text-[#A8B3C7] font-medium">Confidence</div>
            <div className="text-xl font-bold text-white">{confidenceScore}%</div>
            <div className="w-20 h-1 bg-[rgba(255,255,255,0.10)] rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${confidenceScore}%` }}
              />
            </div>
          </div>

          <div className="h-8 w-[1px] bg-[rgba(255,255,255,0.10)]" />

          <div className="text-left md:text-right">
            <div className="text-xs text-[#A8B3C7] font-medium">Completeness</div>
            <div className="text-xl font-bold text-white">{completenessScore}%</div>
            <div className="w-20 h-1 bg-[rgba(255,255,255,0.10)] rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-[#B8F34A] rounded-full"
                style={{ width: `${completenessScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Verdict Summary Text */}
      <div className="pt-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#A8B3C7] mb-2">
          EXECUTIVE DECISION SUMMARY
        </div>
        <p className="text-base sm:text-lg leading-relaxed text-[#E4E9F2]">
          {verdictSummary}
        </p>
      </div>
    </div>
  );
}
