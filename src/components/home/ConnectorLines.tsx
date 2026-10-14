"use client";

import { motion } from "framer-motion";
import { HOTSPOTS, type HotspotId } from "./heroLensData";

type ConnectorLinesProps = {
  cardWidth: number;
  cardHeight: number;
  rowWidth: number;
  activeId: HotspotId | null;
};

export function ConnectorLines({ cardWidth, cardHeight, rowWidth, activeId }: ConnectorLinesProps) {
  const safeRowWidth = Math.max(rowWidth, cardWidth);
  const gap = safeRowWidth < 600 ? 12 : 20;
  const chipWidth = (safeRowWidth - gap * 3) / 4;
  const cardOffset = (safeRowWidth - cardWidth) / 2;
  const chipTop = cardHeight + 54;
  const height = chipTop + 66;
  const ids: HotspotId[] = ["verdict", "tradeoff", "review", "cost"];

  return (
    <svg
      aria-hidden="true"
      className="hero-connectors pointer-events-none absolute left-1/2 top-0 z-[4] -translate-x-1/2 overflow-visible"
      width={safeRowWidth}
      height={height}
      viewBox={`0 0 ${safeRowWidth} ${height}`}
    >
      {ids.map((id, index) => {
        const hotspot = HOTSPOTS[id];
        const startX = index * (chipWidth + gap) + chipWidth / 2;
        const endX = cardOffset + hotspot.x * cardWidth;
        const endY = hotspot.y * cardHeight;
        const bendX = startX + (endX - startX) * 0.55;
        const bendY = endY + (chipTop - endY) * 0.45;
        const active = activeId === id;
        const color = active ? "#2F6FEB" : "#7FB0F5";

        return (
          <g key={id} opacity={active ? 1 : 0.7}>
            <motion.polyline
              points={`${startX},${chipTop} ${bendX},${bendY} ${endX},${endY}`}
              fill="none"
              stroke={color}
              strokeWidth={active ? 1.5 : 1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            />
            <circle
              cx={endX}
              cy={endY}
              r={active ? 3 : 2.5}
              fill={active ? color : "white"}
              stroke={color}
              strokeWidth={1.2}
            />
          </g>
        );
      })}
    </svg>
  );
}
