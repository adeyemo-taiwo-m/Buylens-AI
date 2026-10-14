"use client";

import React, {
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * MagnifierCard
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * A reusable interactive magnifying-lens overlay.
 *
 * HOW THE TWO LAYERS STAY ALIGNED
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * Both layers render the *exact same* children inside absolutely-positioned
 * containers that share identical `inset: 0` bounds. The sharp (magnified)
 * layer uses `transform-origin` set to the lens centre and `scale(mag)` so
 * the content directly under the lens stays fixed while its surroundings
 * enlarge. A `clip-path: circle(R at X Y)` on the sharp layer reveals only
 * the circular region. Because both layers render from the same (0,0)
 * origin and the transform-origin matches the clip centre, the sharp
 * content is always visually aligned with the blurred content beneath it.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export interface MagnifierCardProps {
  /** Card content rendered in both layers.                      */
  children: ReactNode;
  /** Lens circle radius in px.                        @default 100 */
  lensRadius?: number;
  /** Scale factor for the sharp layer.                @default 1.6 */
  magnification?: number;
  /** Gaussian blur for the base layer (px).           @default 8   */
  blurAmount?: number;
  /** Speed multiplier for the idle drift (1 = normal).@default 1   */
  idleSpeed?: number;
  /** Extra CSS classes on the outer wrapper.                       */
  className?: string;
}

/* â”€â”€ tiny helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

export function MagnifierCard({
  children,
  lensRadius = 100,
  magnification = 1.6,
  blurAmount = 8,
  idleSpeed = 1,
  className,
}: MagnifierCardProps) {
  /* â”€â”€ refs (no React state â†’ zero re-renders on move) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const containerRef = useRef<HTMLDivElement>(null);
  const sharpRef     = useRef<HTMLDivElement>(null);
  const lensRef      = useRef<HTMLDivElement>(null);
  const rafId        = useRef(0);

  // Mutable animation state
  const pos          = useRef({ x: 0, y: 0 });   // current lens centre
  const mouseTarget  = useRef({ x: 0, y: 0 });   // cursor position (card-relative)
  const box          = useRef({ w: 0, h: 0, top: 0, left: 0 });
  const hovering     = useRef(false);
  const hoverBlend   = useRef(0);                 // 0 = idle only, 1 = cursor only
  const t0           = useRef(0);
  const visible      = useRef(true);
  const reducedMotion = useRef(false);

  /* â”€â”€ idle drift: two sine waves with different periods â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const idleXY = useCallback(
    (elapsed: number) => {
      const pX = 7000 / idleSpeed;          // period X ~7 s
      const pY = 9000 / idleSpeed;          // period Y ~9 s
      const { w, h } = box.current;
      const ampX = w * 0.10;                // ~10 % of card width
      const ampY = h * 0.08;                // ~8 % of card height
      return {
        x: w * 0.48 + Math.sin((elapsed / pX) * Math.PI * 2) * ampX * 0.2,
        y: h * 0.25 + Math.cos((elapsed / pY) * Math.PI * 2) * ampY * 0.2,
      };
    },
    [idleSpeed],
  );

  /* â”€â”€ push position straight to the DOM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const paint = useCallback(
    (x: number, y: number) => {
      const sharp = sharpRef.current;
      const lens  = lensRef.current;
      if (!sharp || !lens) return;

      // Clip the sharp layer to a circle
      sharp.style.clipPath = `circle(${lensRadius}px at ${x}px ${y}px)`;
      // Scale around the lens centre so content under it stays fixed
      sharp.style.transformOrigin = `${x}px ${y}px`;
      sharp.style.transform = `scale(${magnification})`;

      // Move the decorative lens overlay (ring + handle)
      lens.style.transform = `translate(${x - lensRadius}px, ${y - lensRadius}px)`;
    },
    [lensRadius, magnification],
  );

  /* â”€â”€ animation loop â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const loop = useCallback(
    (now: number) => {
      if (!visible.current) {
        // Still schedule so we pick back up immediately when visible
        rafId.current = requestAnimationFrame(loop);
        return;
      }

      const elapsed = now - t0.current;

      /* Smoothly animate the blend weight toward 0 (idle) or 1 (hover).
         A step of ~0.055/frame at 60 fps â‰ˆ 600 ms full transition.       */
      const goal = hovering.current ? 1 : 0;
      hoverBlend.current = lerp(hoverBlend.current, goal, 0.055);
      if (Math.abs(hoverBlend.current - goal) < 0.002) {
        hoverBlend.current = goal;
      }

      // Compute the idle position (or static centre if reduced-motion)
      const idle = reducedMotion.current
        ? { x: box.current.w / 2, y: box.current.h / 2 }
        : idleXY(elapsed);

      // Blend idle â†” cursor
      const w = hoverBlend.current;
      const bx = lerp(idle.x, mouseTarget.current.x, w);
      const by = lerp(idle.y, mouseTarget.current.y, w);

      // Lerp current position toward blended target (smooth trailing)
      const factor = w > 0.5 ? 0.14 : 0.07;
      pos.current.x = lerp(pos.current.x, bx, factor);
      pos.current.y = lerp(pos.current.y, by, factor);

      // Clamp so the ring stays mostly within the card (allow ~15 % overshoot)
      const pad = lensRadius * 0.15;
      pos.current.x = clamp(pos.current.x, -pad, box.current.w + pad);
      pos.current.y = clamp(pos.current.y, -pad, box.current.h + pad);

      paint(pos.current.x, pos.current.y);
      rafId.current = requestAnimationFrame(loop);
    },
    [paint, idleXY, lensRadius],
  );

  /* â”€â”€ lifecycle setup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  useEffect(() => {
    /* prefers-reduced-motion */
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mql.matches;
    const onMql = (e: MediaQueryListEvent) => { reducedMotion.current = e.matches; };
    mql.addEventListener("change", onMql);

    /* measure card rect */
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      box.current = { w: r.width, h: r.height, top: r.top + window.scrollY, left: r.left + window.scrollX };
    };
    measure();

    // Initialise position to card centre
    pos.current        = { x: box.current.w / 2, y: box.current.h / 2 };
    mouseTarget.current = { ...pos.current };

    /* ResizeObserver keeps rect fresh */
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);

    /* scroll + resize â†’ re-measure client rect offsets */
    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure,  { passive: true });

    /* IntersectionObserver â€” pause rAF work when off-screen */
    const io = new IntersectionObserver(
      ([entry]) => { visible.current = entry.isIntersecting; },
      { threshold: 0 },
    );
    if (containerRef.current) io.observe(containerRef.current);

    /* kick off the loop */
    t0.current = performance.now();
    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mql.removeEventListener("change", onMql);
    };
  }, [loop]);

  /* â”€â”€ pointer handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mouseTarget.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  const onPointerEnter = useCallback(() => { hovering.current = true; }, []);
  const onPointerLeave = useCallback(() => { hovering.current = false; }, []);

  /* â”€â”€ render â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  const diameter = lensRadius * 2;

  return (
    <div
      ref={containerRef}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`relative overflow-hidden select-none ${className ?? ""}`}
      style={{ touchAction: "pan-y" }}
    >
      {/* â”€â”€ Layer 1 â€” blurred base â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        aria-hidden="true"
        className="will-change-[filter]"
        style={{ filter: `blur(${blurAmount}px)`, opacity: 0.65 }}
      >
        {children}
      </div>

      {/* â”€â”€ Layer 2 â€” sharp magnified copy (clipped to circle) â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        ref={sharpRef}
        aria-hidden="true"
        className="absolute inset-0 will-change-[clip-path,transform]"
        style={{
          clipPath:       `circle(${lensRadius}px at 50% 50%)`,
          transformOrigin: "50% 50%",
          transform:       `scale(${magnification})`,
        }}
      >
        {children}
      </div>

      {/* â”€â”€ Layer 3 â€” decorative lens visual (ring + handle) â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        ref={lensRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none will-change-transform"
        style={{ width: diameter, height: diameter }}
      >
        {/* Glass ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2.5px solid rgba(147, 197, 253, 0.55)",
            boxShadow: [
              "inset 0 0 24px 4px rgba(147, 197, 253, 0.10)",   // inner glow
              "0 4px 20px -4px rgba(30, 64, 175, 0.15)",         // soft drop shadow
              "0 0 0 1px rgba(255, 255, 255, 0.40)",             // thin white rim
            ].join(", "),
            background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)",
          }}
        />

        {/* Handle â€” rounded rectangle attached at ~45Â° bottom-right */}
        <div
          className="absolute"
          style={{
            width: 45,
            height: 230,
            bottom: -74,
            right: -64,
            transform: "rotate(-45deg)",
            transformOrigin: "top center",
            borderRadius: 999,
            background: "linear-gradient(180deg, #60a5fa 0%, #2563eb 45%, #1d4ed8 100%)",
            boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
          }}
        />
      </div>
    </div>
  );
}


