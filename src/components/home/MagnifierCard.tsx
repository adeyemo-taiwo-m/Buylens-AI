"use client";

import React, {
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* ─────────────────────────────────────────────────────────
   MagnifierCard — reusable interactive magnifying-lens effect
   ───────────────────────────────────────────────────────── */

export interface MagnifierCardProps {
  /** The card content to render in both layers. */
  children: ReactNode;
  /** Lens circle radius in px                      (default 110) */
  lensRadius?: number;
  /** Scale factor for the sharp layer              (default 1.6) */
  magnification?: number;
  /** Blur amount for the base layer in px          (default 8)   */
  blurAmount?: number;
  /** Multiplier for idle-drift speed (1 = normal)  (default 1)   */
  idleSpeed?: number;
  /** Extra classes forwarded to the outer wrapper */
  className?: string;
}

/* ── helpers ─────────────────────────────────────────────── */

/** Linear interpolation */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Clamp between min and max */
const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

export function MagnifierCard({
  children,
  lensRadius = 110,
  magnification = 1.6,
  blurAmount = 8,
  idleSpeed = 1,
  className,
}: MagnifierCardProps) {
  /* ── refs ─────────────────────────────────────────────── */
  const containerRef = useRef<HTMLDivElement>(null);
  const sharpLayerRef = useRef<HTMLDivElement>(null);
  const lensGroupRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  // Mutable position state (no re-renders)
  const pos = useRef({ x: 0, y: 0 }); // current lens centre
  const target = useRef({ x: 0, y: 0 }); // mouse target (card-relative)
  const rect = useRef({ w: 0, h: 0, top: 0, left: 0 });
  const isHovering = useRef(false);
  const hoverWeight = useRef(0); // 0 = idle, 1 = following cursor
  const startTime = useRef(0);
  const isVisible = useRef(true);
  const prefersReducedMotion = useRef(false);

  /* ── idle drift maths ─────────────────────────────────── */
  const idlePos = useCallback(
    (t: number) => {
      // Two sine waves with different periods → organic loop
      const periodX = 7000 / idleSpeed;
      const periodY = 9000 / idleSpeed;
      const { w, h } = rect.current;
      const ampX = w * 0.1; // ~10% of card width
      const ampY = h * 0.1;
      return {
        x: w / 2 + Math.sin((t / periodX) * Math.PI * 2) * ampX,
        y: h / 2 + Math.cos((t / periodY) * Math.PI * 2) * ampY,
      };
    },
    [idleSpeed],
  );

  /* ── apply position to DOM (no state, no re-render) ──── */
  const applyPosition = useCallback(
    (x: number, y: number) => {
      const sharp = sharpLayerRef.current;
      const lens = lensGroupRef.current;
      if (!sharp || !lens) return;

      // Clip the sharp layer to a circle at (x, y)
      sharp.style.clipPath = `circle(${lensRadius}px at ${x}px ${y}px)`;

      // Scale transform: keep content under lens centre fixed
      sharp.style.transformOrigin = `${x}px ${y}px`;
      sharp.style.transform = `scale(${magnification})`;

      // Move the lens visual (ring + handle) so its centre is at (x, y)
      lens.style.transform = `translate(${x - lensRadius}px, ${y - lensRadius}px)`;
    },
    [lensRadius, magnification],
  );

  /* ── animation loop ───────────────────────────────────── */
  const tick = useCallback(
    (now: number) => {
      if (!isVisible.current) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startTime.current;

      // Smoothly animate hover weight
      const hoverTarget = isHovering.current ? 1 : 0;
      // ~600ms transition: per-frame step depends on frame rate; 0.06 at 60fps ≈ 600ms
      const weightStep = 0.06;
      hoverWeight.current = lerp(
        hoverWeight.current,
        hoverTarget,
        weightStep,
      );
      // Snap to exact 0 / 1 to avoid infinite micro-lerp
      if (Math.abs(hoverWeight.current - hoverTarget) < 0.001) {
        hoverWeight.current = hoverTarget;
      }

      const idle = prefersReducedMotion.current
        ? { x: rect.current.w / 2, y: rect.current.h / 2 }
        : idlePos(elapsed);

      // Blend between idle and cursor-following
      const w = hoverWeight.current;
      const blendX = lerp(idle.x, target.current.x, w);
      const blendY = lerp(idle.y, target.current.y, w);

      // Smooth trailing (lerp towards blended target)
      const lerpFactor = w > 0.5 ? 0.15 : 0.08;
      pos.current.x = lerp(pos.current.x, blendX, lerpFactor);
      pos.current.y = lerp(pos.current.y, blendY, lerpFactor);

      // Clamp so the lens ring stays roughly inside
      const pad = lensRadius * 0.15; // allow slight overflow
      pos.current.x = clamp(pos.current.x, -pad, rect.current.w + pad);
      pos.current.y = clamp(pos.current.y, -pad, rect.current.h + pad);

      applyPosition(pos.current.x, pos.current.y);

      rafId.current = requestAnimationFrame(tick);
    },
    [applyPosition, idlePos, lensRadius],
  );

  /* ── lifecycle ────────────────────────────────────────── */
  useEffect(() => {
    // Reduced-motion check
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener("change", onMotionChange);

    // Initial rect
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      rect.current = { w: r.width, h: r.height, top: r.top, left: r.left };
    };
    measure();

    // Initialise position to card centre
    pos.current = { x: rect.current.w / 2, y: rect.current.h / 2 };
    target.current = { ...pos.current };

    // ResizeObserver keeps rect fresh
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);

    // Also re-measure on scroll (rect.top/left shift)
    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    // IntersectionObserver — pause when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    if (containerRef.current) io.observe(containerRef.current);

    // Start the loop
    startTime.current = performance.now();
    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mql.removeEventListener("change", onMotionChange);
    };
  }, [tick]);

  /* ── pointer handlers (no setState) ───────────────────── */
  const onPointerEnter = useCallback(() => {
    isHovering.current = true;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    // Use cached rect — refresh only on scroll/resize
    const r = rect.current;
    target.current = {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    };
  }, []);

  const onPointerLeave = useCallback(() => {
    isHovering.current = false;
  }, []);

  /* ── render ───────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative overflow-hidden select-none ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* ── Layer 1: Blurred base ────────────────────────── */}
      <div
        aria-hidden="true"
        className="will-change-[filter]"
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: 0.7,
        }}
      >
        {children}
      </div>

      {/* ── Layer 2: Sharp magnified copy ────────────────── */}
      <div
        ref={sharpLayerRef}
        aria-hidden="true"
        className="absolute inset-0 will-change-[clip-path,transform]"
        style={{
          /* initial values — immediately overwritten by rAF */
          clipPath: `circle(${lensRadius}px at 50% 50%)`,
          transformOrigin: "50% 50%",
          transform: `scale(${magnification})`,
        }}
      >
        {children}
      </div>

      {/* ── Layer 3: Lens visual (ring + handle) ─────────── */}
      <div
        ref={lensGroupRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
        style={{
          width: lensRadius * 2,
          height: lensRadius * 2,
        }}
      >
        {/* Glass ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2.5px solid rgba(147, 197, 253, 0.6)", // light blue
            boxShadow: [
              "inset 0 0 30px 4px rgba(147, 197, 253, 0.12)", // inner glow
              "0 4px 24px -4px rgba(30, 64, 175, 0.18)",       // outer shadow
              "0 0 0 1px rgba(255, 255, 255, 0.45)",           // thin white rim
            ].join(", "),
          }}
        />

        {/* Handle — rounded rectangle at ~45° bottom-right */}
        <div
          className="absolute"
          style={{
            /* Position the handle at the bottom-right edge of the ring.
               The handle starts at the ring perimeter and extends outward
               along a 45° diagonal. */
            width: 18,
            height: 80,
            bottom: -30,
            right: -30,
            transform: "rotate(-45deg)",
            transformOrigin: "top center",
            borderRadius: 9,
            background:
              "linear-gradient(180deg, #60a5fa 0%, #2563eb 50%, #1d4ed8 100%)",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
          }}
        />
      </div>
    </div>
  );
}
