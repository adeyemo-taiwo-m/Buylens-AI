import type { LucideIcon } from "lucide-react";
import { BadgeCheck, MessageSquareText, ReceiptText, Scale } from "lucide-react";

export type HotspotId = "verdict" | "tradeoff" | "review" | "cost";

export type Hotspot = {
  id: HotspotId;
  x: number;
  y: number;
};

export const HOTSPOTS: Record<HotspotId, Hotspot> = {
  verdict: { id: "verdict", x: 0.28, y: 0.61 },
  tradeoff: { id: "tradeoff", x: 0.72, y: 0.52 },
  review: { id: "review", x: 0.49, y: 0.35 },
  cost: { id: "cost", x: 0.51, y: 0.46 },
};

export type Insight = {
  id: HotspotId;
  title: string;
  value: string;
  icon: LucideIcon;
};

export const INSIGHTS: Insight[] = [
  { id: "verdict", title: "VERDICT", value: "Worth considering", icon: BadgeCheck },
  { id: "tradeoff", title: "MAIN TRADE-OFF", value: "9h battery vs 14h", icon: Scale },
  { id: "review", title: "REVIEW PATTERN", value: "Fan noise complaints", icon: MessageSquareText },
  { id: "cost", title: "TRUE COST", value: "$1,399", icon: ReceiptText },
];
