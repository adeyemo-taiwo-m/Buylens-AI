import { cn } from "@/lib/utils";

type DecorativeArcProps = {
  size?: number;
  stroke?: number;
  top?: number;
  right?: number;
  className?: string;
  gradientId?: string;
};

export function DecorativeArc({
  size = 290,
  stroke = 16,
  top = -210,
  right = -153,
  className,
  gradientId = "decorative-arc-gradient",
}: DecorativeArcProps) {
  const radius = (size - stroke) / 2;
  const center = size / 2;

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute z-0", className)}
      style={{ width: size, height: size, top, right }}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1={size * 0.148} y1={size * 0.12} x2={size * 0.88} y2={size * 0.9} gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx={center} cy={center} r={radius} stroke={`url(#${gradientId})`} strokeWidth={stroke} />
    </svg>
  );
}
