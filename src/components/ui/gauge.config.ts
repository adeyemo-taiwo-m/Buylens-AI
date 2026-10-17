export const BUY_SCORE_GAUGE_VIEWBOX = { width: 217, height: 112 } as const;
export const BUY_SCORE_GAUGE_PETAL_COUNT = 9;
export const BUY_SCORE_GAUGE_ANGLES = [-80, -60, -40, -20, 0, 20, 40, 60, 80] as const;

type GaugePoint = { x: number; y: number };

function moveAlong(from: GaugePoint, to: GaugePoint, distance: number) {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const ratio = Math.min(distance / length, 0.45);
  return { x: from.x + (to.x - from.x) * ratio, y: from.y + (to.y - from.y) * ratio };
}

export function createBuyScoreGaugePetalPath() {
  const points: GaugePoint[] = [
    { x: -7, y: -48 },
    { x: -11.5, y: -108 },
    { x: 11.5, y: -108 },
    { x: 7, y: -48 },
  ];
  const cornerRadii = [4, 7, 7, 4];
  const before = points.map((point, index) =>
    moveAlong(point, points[(index + points.length - 1) % points.length], cornerRadii[index])
  );
  const after = points.map((point, index) =>
    moveAlong(point, points[(index + 1) % points.length], cornerRadii[index])
  );
  const format = (point: GaugePoint) => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;

  return [
    `M ${format(after[0])}`,
    `L ${format(before[1])}`,
    `Q ${format(points[1])} ${format(after[1])}`,
    `L ${format(before[2])}`,
    `Q ${format(points[2])} ${format(after[2])}`,
    `L ${format(before[3])}`,
    `Q ${format(points[3])} ${format(after[3])}`,
    `L ${format(before[0])}`,
    `Q ${format(points[0])} ${format(after[0])}`,
    "Z",
  ].join(" ");
}

export const BUY_SCORE_GAUGE_PETAL_PATH = createBuyScoreGaugePetalPath();
