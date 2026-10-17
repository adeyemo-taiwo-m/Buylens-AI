"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

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
const SEGMENT_COUNT = 20;
const VIEWBOX_WIDTH = 217;
const VIEWBOX_HEIGHT = 112;
const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = 99;
const INNER_RADIUS = 59;
const OUTER_RADIUS = 76;
const SEGMENT_ANGLES = Array.from({ length: SEGMENT_COUNT }, (_, index) => 180 + (180 / (SEGMENT_COUNT - 1)) * index);

function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced || !active ? (active ? target : 0) : 0);

  useEffect(() => {
    if (!active) {
      const frame = window.requestAnimationFrame(() => setValue(0));
      return () => window.cancelAnimationFrame(frame);
    }
    if (reduced) {
      const frame = window.requestAnimationFrame(() => setValue(target));
      return () => window.cancelAnimationFrame(frame);
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

function pointAt(radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: CENTER_X + radius * Math.cos(radians),
    y: CENTER_Y + radius * Math.sin(radians),
  };
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
  const boundedScore = Math.max(0, Math.min(100, score));
  const displayedScore = useCountUp(boundedScore, active, reduced || animate === false);
  const filledSegments = Math.round((boundedScore / 100) * SEGMENT_COUNT);
  const gaugeWidth = width ?? SIZE_WIDTHS[size];

  return (
    <div ref={gaugeRef} className="group/gauge relative flex shrink-0 flex-col items-center" style={{ width: gaugeWidth }}>
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label={`Buy score ${score} percent, ${verdict}`}
        tabIndex={interactive ? 0 : undefined}
      >
        {SEGMENT_ANGLES.map((angle, index) => {
          const inner = pointAt(INNER_RADIUS, angle);
          const outer = pointAt(OUTER_RADIUS, angle);
          const filled = active && index < filledSegments;
          const thickness = 6 + Math.sin((index / (SEGMENT_COUNT - 1)) * Math.PI) * 3;

          return (
            <motion.line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              strokeLinecap="round"
              initial={{ opacity: 1 }}
              animate={{
                opacity: 1,
                stroke: filled ? "var(--primary-600)" : "var(--primary-100)",
              }}
              transition={{
                stroke: { duration: reduced || animate === false ? 0 : 0.18, delay: reduced || animate === false ? 0 : index * 0.035 },
              }}
              strokeWidth={thickness}
            />
          );
        })}
        <text
          x={CENTER_X}
          y="87"
          textAnchor="middle"
          dominantBaseline="middle"
          aria-hidden="true"
          fontSize={36}
          fontWeight={600}
          className="fill-ink tabular-nums"
        >
          {displayedScore}%
        </text>
      </svg>
      {interactive && (
        <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-20 w-[220px] -translate-x-1/2 translate-y-1 rounded-[10px] border border-line bg-white px-3 py-2 text-center text-xs leading-[1.35] text-ink-muted opacity-0 shadow-[0_8px_24px_rgba(15,27,51,0.12)] transition duration-150 group-hover/gauge:translate-y-0 group-hover/gauge:opacity-100 group-focus-within/gauge:translate-y-0 group-focus-within/gauge:opacity-100">
          How the score works: based on price, specs, reviews and warranty clarity.
        </span>
      )}
    </div>
  );
}
