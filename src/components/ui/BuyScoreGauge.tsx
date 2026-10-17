"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion";
import {
  BUY_SCORE_GAUGE_ANGLES,
  BUY_SCORE_GAUGE_PETAL_COUNT,
  BUY_SCORE_GAUGE_PETAL_PATH,
  BUY_SCORE_GAUGE_VIEWBOX,
} from "./gauge.config";

export type BuyScoreGaugeSize = "sm" | "md" | "lg";

type BuyScoreGaugeProps = {
  score: number;
  size?: BuyScoreGaugeSize;
  width?: number;
  verdict: string;
  animate?: "once" | false;
  interactive?: boolean;
};

const SIZE_WIDTHS: Record<BuyScoreGaugeSize, number> = { sm: 125, md: 170, lg: 217 };

function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced || !active ? (active ? target : 0) : 0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    if (reduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / 700, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, reduced, target]);

  return value;
}

export function BuyScoreGauge({
  score,
  size = "md",
  width,
  verdict,
  animate = "once",
  interactive = false,
}: BuyScoreGaugeProps) {
  const reduced = useReducedMotion() === true;
  const gaugeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gaugeRef, { amount: 0.4, once: true });
  const active = animate === false || reduced || inView;
  const displayedScore = useCountUp(Math.max(0, Math.min(100, score)), active, reduced || animate === false);
  const [hovered, setHovered] = useState(false);
  const id = useId().replace(/:/g, "");
  const filledPetals = Math.round((Math.max(0, Math.min(100, score)) / 100) * BUY_SCORE_GAUGE_PETAL_COUNT);
  const gaugeWidth = width ?? SIZE_WIDTHS[size];

  return (
    <div
      ref={gaugeRef}
      className="group/gauge relative flex shrink-0 flex-col items-center"
      style={{ width: gaugeWidth }}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      onFocus={() => interactive && setHovered(true)}
      onBlur={() => interactive && setHovered(false)}
    >
      <svg
        viewBox={`0 0 ${BUY_SCORE_GAUGE_VIEWBOX.width} ${BUY_SCORE_GAUGE_VIEWBOX.height}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`Buy score ${score} percent, ${verdict}`}
        tabIndex={interactive ? 0 : undefined}
      >
        <defs>
          <clipPath id={`buy-score-gauge-clip-${id}`}>
            <rect x="0" y="0" width="217" height="112" />
          </clipPath>
        </defs>
        <g clipPath={`url(#buy-score-gauge-clip-${id})`}>
          {BUY_SCORE_GAUGE_ANGLES.map((angle, index) => {
            const filled = active && index < filledPetals;
            return (
              <g key={angle} transform={`translate(108.5 112) rotate(${angle})`}>
                <motion.path
                  d={BUY_SCORE_GAUGE_PETAL_PATH}
                  initial={reduced || animate === false ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 0.9 }}
                  animate={{
                    fill: filled ? "var(--primary-600)" : "var(--primary-100)",
                    opacity: 1,
                    scale: hovered && interactive && !reduced ? 1.05 : active ? 1 : 0.9,
                  }}
                  transition={{
                    fill: { duration: reduced || animate === false ? 0 : 0.18, delay: reduced || animate === false ? 0 : index * 0.06 },
                    scale: { duration: reduced || animate === false ? 0 : 0.22, delay: reduced || animate === false ? 0 : index * 0.06, ease: MOTION_EASE },
                  }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              </g>
            );
          })}
        </g>
        <text
          x="108.5"
          y="101"
          textAnchor="middle"
          dominantBaseline="middle"
          aria-hidden="true"
          fontSize={26}
          fontWeight={600}
          className="fill-ink tabular-nums"
        >
          {displayedScore}%
        </text>
      </svg>
      {interactive && (
        <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-20 w-[220px] -translate-x-1/2 translate-y-1 rounded-[10px] border border-[#E4ECF8] bg-white px-3 py-2 text-center text-xs leading-[1.35] text-[#42516A] opacity-0 shadow-[0_8px_24px_rgba(15,27,51,0.12)] transition duration-150 group-hover/gauge:translate-y-0 group-hover/gauge:opacity-100 group-focus-within/gauge:translate-y-0 group-focus-within/gauge:opacity-100">
          How the score works: based on price, specs, reviews and warranty clarity.
        </span>
      )}
    </div>
  );
}
