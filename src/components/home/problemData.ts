export type ProblemWaypoint = {
  id: string;
  fx: number;
  fy: number;
};

export const PROBLEM_BOARD = {
  designWidth: 1312,
  designHeight: 1090,
  widthPct: 0.66,
  leftPct: 0.34,
  topPx: 56,
  tablet: {
    widthPct: 0.8,
    leftPct: 0.1,
    topPx: 700,
  },
  mobile: {
    widthPct: 1,
    leftPct: 0,
    topPx: 360,
  },
} as const;

export function getProblemBoardLayout(stageWidth: number) {
  if (stageWidth < 768) return PROBLEM_BOARD.mobile;
  if (stageWidth < 1024) return PROBLEM_BOARD.tablet;
  return PROBLEM_BOARD;
}

// Keep the resting lens a little farther right over the problem board.
export const PROBLEM_REST = { fx: 0.8, fy: 0.46 } as const;

export const PROBLEM_WAYPOINTS: ProblemWaypoint[] = [
  { id: "waste-drawback-gap", fx: 0.64, fy: 0.11 },
  { id: "specs-reviews", fx: 0.49, fy: 0.46 },
  { id: "reviews", fx: 0.75, fy: 0.46 },
  { id: "deal-checkout", fx: 0.66, fy: 0.82 },
];

export const PROBLEM_ASSETS = {
  headphone: "/problem/headset.png",
  headphoneIcon: "/problem/headset.png",
} as const;
