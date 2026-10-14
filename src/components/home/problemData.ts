export type ProblemWaypoint = {
  id: string;
  x: number;
  y: number;
};

export const PROBLEM_REST = { x: 0.73, y: 0.615 } as const;

export const PROBLEM_WAYPOINTS: ProblemWaypoint[] = [
  { id: "waste", x: 0.78, y: 0.5 },
  { id: "specs", x: 0.66, y: 0.62 },
  { id: "reviews", x: 0.7, y: 0.8 },
  { id: "pay", x: 0.88, y: 0.7 },
];

export const PROBLEM_ASSETS = {
  // Version query prevents Next/image and the browser from reusing an older optimized scene.
  scene: "/problem/problem-bg.png?v=20261015-1",
  headphone: "/problem/headset.png",
  headphoneIcon: "/problem/headset.png",
} as const;
