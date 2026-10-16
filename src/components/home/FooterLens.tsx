"use client";

import {
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";

const FOOTER_LENS_CONFIG = {
  BASE_MAGNIFICATION: 1.6,
  HOVER_SCALE: 1.08,
  HOVER_MAGNIFICATION: 2.0,
  DRAG_SCALE: 1.12,
  TILT_MAX: 8,
  RETURN_DELAY: 600,
  SOURCE_WIDTH: 2160,
  SOURCE_HEIGHT: 794,
  LENS_CENTER_X: 1385,
  LENS_CENTER_Y: 482,
  LENS_RADIUS: 112,
} as const;

const SPRING = { stiffness: 190, damping: 25, mass: 0.72 };
const TRAIL_SPRING = { stiffness: 125, damping: 21, mass: 0.7 };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type FooterArtMetrics = {
  width: number;
  height: number;
  left: number;
  top: number;
  imageWidth: number;
  imageHeight: number;
  imageOffsetX: number;
  imageOffsetY: number;
  radius: number;
  parkedX: number;
  parkedY: number;
};

const IDLE_SHADOW = "0 0 0 3px rgba(147, 189, 255, 0.18), 0 18px 40px rgba(37, 99, 235, 0.24)";
const HOVER_SHADOW = "0 0 0 6px rgba(147, 189, 255, 0.35), 0 22px 48px rgba(37, 99, 235, 0.35)";
const DRAG_SHADOW = "0 0 0 7px rgba(147, 189, 255, 0.42), 0 28px 58px rgba(23, 57, 170, 0.42)";

export function FooterLens() {
  const reduced = useReducedMotion() === true;
  const artRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<FooterArtMetrics | null>(null);
  const artHoveredRef = useRef(false);
  const lensInsideRef = useRef(false);
  const draggingRef = useRef(false);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ clientX: 0, clientY: 0 });
  const returnTimerRef = useRef<number | null>(null);
  const tapTimerRef = useRef<number | null>(null);

  const artInView = useInView(artRef, { amount: 0.05 });
  const sweepControls = useAnimationControls();

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const positionSpringX = useSpring(targetX, SPRING);
  const positionSpringY = useSpring(targetY, SPRING);
  const displayX = useTransform([targetX, positionSpringX], (values: number[]) => {
    const [target, spring] = values as number[];
    return reduced ? target : spring;
  });
  const displayY = useTransform([targetY, positionSpringY], (values: number[]) => {
    const [target, spring] = values as number[];
    return reduced ? target : spring;
  });

  const hoverTarget = useMotionValue(0);
  const hoverSpring = useSpring(hoverTarget, SPRING);
  const hover = useTransform([hoverTarget, hoverSpring], (values: number[]) => {
    const [target, spring] = values as number[];
    return reduced ? target : spring;
  });
  const draggingTarget = useMotionValue(0);
  const draggingSpring = useSpring(draggingTarget, SPRING);
  const dragging = useTransform([draggingTarget, draggingSpring], (values: number[]) => {
    const [target, spring] = values as number[];
    return reduced ? target : spring;
  });

  const lensScaleGoal = useTransform([hover, dragging], (values: number[]) => {
    const [hoverValue, draggingValue] = values as number[];
    return draggingValue > 0.5
      ? FOOTER_LENS_CONFIG.DRAG_SCALE
      : 1 + (FOOTER_LENS_CONFIG.HOVER_SCALE - 1) * hoverValue;
  });
  const lensScaleSpring = useSpring(lensScaleGoal, SPRING);
  const lensScale = useTransform([lensScaleGoal, lensScaleSpring], (values: number[]) => {
    const [target, spring] = values as number[];
    return reduced ? target : spring;
  });

  const magnificationGoal = useTransform(
    hover,
    [0, 1],
    [FOOTER_LENS_CONFIG.BASE_MAGNIFICATION, FOOTER_LENS_CONFIG.HOVER_MAGNIFICATION] as number[],
  );
  const magnificationSpring = useSpring(magnificationGoal, SPRING);
  const magnification = useTransform([magnificationGoal, magnificationSpring], (values: number[]) => {
    const [target, spring] = values as number[];
    return reduced ? target : spring;
  });

  const xVelocity = useVelocity(displayX);
  const tiltGoal = useTransform(xVelocity, (velocity) => {
    if (reduced) return 0;
    return clamp(velocity * 0.02, -FOOTER_LENS_CONFIG.TILT_MAX, FOOTER_LENS_CONFIG.TILT_MAX);
  });
  const tiltSpring = useSpring(tiltGoal, SPRING);
  const tilt = useTransform([tiltGoal, tiltSpring], (values: number[]) => {
    const [target, spring] = values as number[];
    return reduced ? target : spring;
  });

  const baseRadius = useMotionValue(0);
  const imageWidth = useMotionValue(0);
  const imageHeight = useMotionValue(0);
  const imageOffsetX = useMotionValue(0);
  const imageOffsetY = useMotionValue(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const lensLeft = useTransform([displayX, baseRadius], (values: number[]) => {
    const [x, radius] = values as number[];
    return x - radius;
  });
  const lensTop = useTransform([displayY, baseRadius], (values: number[]) => {
    const [y, radius] = values as number[];
    return y - radius;
  });
  const lensDiameter = useTransform(baseRadius, (radius) => radius * 2);

  const trailX = useSpring(displayX, TRAIL_SPRING);
  const trailY = useSpring(displayY, TRAIL_SPRING);
  const handleOffsetX = useTransform([trailX, displayX], (values: number[]) => {
    const [trail, current] = values as number[];
    return reduced ? 0 : trail - current;
  });
  const handleOffsetY = useTransform([trailY, displayY], (values: number[]) => {
    const [trail, current] = values as number[];
    return reduced ? 0 : trail - current;
  });

  const magnifiedImageWidth = useTransform([imageWidth, magnification], (values: number[]) => {
    const [width, scale] = values as number[];
    return width * scale;
  });
  const magnifiedImageHeight = useTransform([imageHeight, magnification], (values: number[]) => {
    const [height, scale] = values as number[];
    return height * scale;
  });
  const magnifiedImageLeft = useTransform(
    [baseRadius, magnification, pointerX, imageOffsetX],
    (values: number[]) => {
      const [radius, scale, point, offset] = values as number[];
      return radius - scale * (point - offset);
    },
  );
  const magnifiedImageTop = useTransform(
    [baseRadius, magnification, pointerY, imageOffsetY],
    (values: number[]) => {
      const [radius, scale, point, offset] = values as number[];
      return radius - scale * (point - offset);
    },
  );

  const ringShadow = useTransform([hover, dragging], (values: number[]) => {
    const [hoverValue, draggingValue] = values as number[];
    if (draggingValue > 0.5) return DRAG_SHADOW;
    return hoverValue > 0.5 ? HOVER_SHADOW : IDLE_SHADOW;
  });
  const specularOpacity = useTransform(hover, [0, 1], [0.72, 1]);
  const bandY = useTransform(hover, [0, 1], [0, 4]);
  const bandBlur = useTransform(hover, [0, 1], ["blur(10px)", "blur(6px)"]);

  const setPosition = useCallback((x: number, y: number, direct = false) => {
    const metrics = metricsRef.current;
    if (!metrics) return;
    const radius = metrics.radius;
    const nextX = clamp(x, radius, metrics.width - radius);
    const nextY = clamp(y, radius, metrics.height - radius);
    targetX.set(nextX);
    targetY.set(nextY);
    if (direct) {
      positionSpringX.set(nextX);
      positionSpringY.set(nextY);
    }
  }, [positionSpringX, positionSpringY, targetX, targetY]);

  const pointFromEvent = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const metrics = metricsRef.current;
    if (!metrics) return null;
    return {
      x: event.clientX - metrics.left,
      y: event.clientY - metrics.top,
    };
  }, []);

  const replaySweep = useCallback(() => {
    if (reduced || !artInView) return;
    sweepControls.stop();
    sweepControls.set({ x: "-120%", opacity: 0 });
    void sweepControls.start({
      x: "120%",
      opacity: [0, 0.35, 0],
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [artInView, reduced, sweepControls]);

  const clearReturnTimer = useCallback(() => {
    if (returnTimerRef.current !== null) {
      window.clearTimeout(returnTimerRef.current);
      returnTimerRef.current = null;
    }
  }, []);

  const scheduleReturn = useCallback(() => {
    clearReturnTimer();
    returnTimerRef.current = window.setTimeout(() => {
      const metrics = metricsRef.current;
      if (!metrics || artHoveredRef.current || draggingRef.current) return;
      pointerX.set(metrics.parkedX);
      pointerY.set(metrics.parkedY);
      hoverTarget.set(0);
      setPosition(metrics.parkedX, metrics.parkedY);
      returnTimerRef.current = null;
    }, FOOTER_LENS_CONFIG.RETURN_DELAY);
  }, [clearReturnTimer, hoverTarget, pointerX, pointerY, setPosition]);

  const activateTap = useCallback(() => {
    if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
    hoverTarget.set(1);
    replaySweep();
    tapTimerRef.current = window.setTimeout(() => {
      hoverTarget.set(0);
      tapTimerRef.current = null;
    }, 1200);
  }, [hoverTarget, replaySweep]);

  const onArtPointerEnter = useCallback((event: PointerEvent<HTMLDivElement>) => {
    clearReturnTimer();
    artHoveredRef.current = true;
    const point = pointFromEvent(event);
    if (!point || draggingRef.current) return;
    pointerX.set(point.x);
    pointerY.set(point.y);
    setPosition(point.x, point.y);
  }, [clearReturnTimer, pointFromEvent, pointerX, pointerY, setPosition]);

  const onArtPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    lastPointerRef.current = { clientX: event.clientX, clientY: event.clientY };
    if (draggingRef.current) return;
    const point = pointFromEvent(event);
    if (!point) return;
    pointerX.set(point.x);
    pointerY.set(point.y);
    setPosition(point.x, point.y);
  }, [pointFromEvent, pointerX, pointerY, setPosition]);

  const onArtPointerLeave = useCallback(() => {
    artHoveredRef.current = false;
    lensInsideRef.current = false;
    if (!draggingRef.current) hoverTarget.set(0);
    scheduleReturn();
  }, [hoverTarget, scheduleReturn]);

  const onLensPointerEnter = useCallback(() => {
    clearReturnTimer();
    artHoveredRef.current = true;
    lensInsideRef.current = true;
    hoverTarget.set(1);
    replaySweep();
  }, [clearReturnTimer, hoverTarget, replaySweep]);

  const onLensPointerLeave = useCallback(() => {
    lensInsideRef.current = false;
    if (!draggingRef.current) hoverTarget.set(0);
  }, [hoverTarget]);

  const onLensPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    clearReturnTimer();
    artHoveredRef.current = true;
    lensInsideRef.current = true;
    draggingRef.current = true;
    dragPointerIdRef.current = event.pointerId;
    draggingTarget.set(1);
    hoverTarget.set(1);
    const point = pointFromEvent(event);
    const metrics = metricsRef.current;
    if (point && metrics) {
      const currentX = displayX.get();
      const currentY = displayY.get();
      dragOffsetRef.current = { x: currentX - point.x, y: currentY - point.y };
      dragStartRef.current = { x: point.x, y: point.y };
      pointerX.set(currentX);
      pointerY.set(currentY);
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  }, [clearReturnTimer, displayX, displayY, draggingTarget, hoverTarget, pointFromEvent, pointerX, pointerY]);

  const onLensPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || dragPointerIdRef.current !== event.pointerId) return;
    const point = pointFromEvent(event);
    if (!point) return;
    const nextX = point.x + dragOffsetRef.current.x;
    const nextY = point.y + dragOffsetRef.current.y;
    pointerX.set(clamp(nextX, 0, metricsRef.current?.width ?? nextX));
    pointerY.set(clamp(nextY, 0, metricsRef.current?.height ?? nextY));
    setPosition(nextX, nextY, true);
  }, [pointFromEvent, pointerX, pointerY, setPosition]);

  const onLensPointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || dragPointerIdRef.current !== event.pointerId) return;
    const point = pointFromEvent(event);
    const moved = point
      ? Math.hypot(point.x - dragStartRef.current.x, point.y - dragStartRef.current.y) > 5
      : true;
    draggingRef.current = false;
    dragPointerIdRef.current = null;
    draggingTarget.set(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (event.pointerType === "touch" && !moved) activateTap();
    if (!point || point.x < 0 || point.y < 0 || point.x > (metricsRef.current?.width ?? 0) || point.y > (metricsRef.current?.height ?? 0)) {
      artHoveredRef.current = false;
      lensInsideRef.current = false;
      scheduleReturn();
    }
  }, [activateTap, draggingTarget, pointFromEvent, scheduleReturn]);

  useEffect(() => {
    const measure = () => {
      const element = artRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const fitScale = Math.max(
        rect.width / FOOTER_LENS_CONFIG.SOURCE_WIDTH,
        rect.height / FOOTER_LENS_CONFIG.SOURCE_HEIGHT,
      );
      const renderedWidth = FOOTER_LENS_CONFIG.SOURCE_WIDTH * fitScale;
      const renderedHeight = FOOTER_LENS_CONFIG.SOURCE_HEIGHT * fitScale;
      const offsetX = (rect.width - renderedWidth) / 2;
      const offsetY = rect.height - renderedHeight;
      const next: FooterArtMetrics = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top,
        imageWidth: renderedWidth,
        imageHeight: renderedHeight,
        imageOffsetX: offsetX,
        imageOffsetY: offsetY,
        radius: FOOTER_LENS_CONFIG.LENS_RADIUS * fitScale,
        parkedX: FOOTER_LENS_CONFIG.LENS_CENTER_X * fitScale + offsetX,
        parkedY: FOOTER_LENS_CONFIG.LENS_CENTER_Y * fitScale + offsetY,
      };
      metricsRef.current = next;
      baseRadius.set(next.radius);
      imageWidth.set(next.imageWidth);
      imageHeight.set(next.imageHeight);
      imageOffsetX.set(next.imageOffsetX);
      imageOffsetY.set(next.imageOffsetY);

      if (!artHoveredRef.current && !draggingRef.current) {
        pointerX.set(next.parkedX);
        pointerY.set(next.parkedY);
        targetX.set(next.parkedX);
        targetY.set(next.parkedY);
        positionSpringX.set(next.parkedX);
        positionSpringY.set(next.parkedY);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (artRef.current) observer.observe(artRef.current);
    let frame = 0;
    const requestMeasure = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
      if (returnTimerRef.current !== null) window.clearTimeout(returnTimerRef.current);
      if (tapTimerRef.current !== null) window.clearTimeout(tapTimerRef.current);
    };
  }, [baseRadius, imageHeight, imageOffsetX, imageOffsetY, imageWidth, pointerX, pointerY, positionSpringX, positionSpringY, targetX, targetY]);

  return (
    <div
      ref={artRef}
      aria-hidden="true"
      className="footer-lens-interaction"
      onPointerEnter={onArtPointerEnter}
      onPointerMove={onArtPointerMove}
      onPointerLeave={onArtPointerLeave}
    >
      <motion.div
        className="footer-lens"
        style={{ left: lensLeft, top: lensTop, width: lensDiameter, height: lensDiameter, scale: lensScale, rotate: tilt }}
        onPointerEnter={onLensPointerEnter}
        onPointerLeave={onLensPointerLeave}
        onPointerDown={onLensPointerDown}
        onPointerMove={onLensPointerMove}
        onPointerUp={onLensPointerUp}
        onPointerCancel={onLensPointerUp}
      >
        <motion.div
          className="footer-lens-float"
          animate={artInView && !reduced ? { y: [0, -3, 0] } : { y: 0 }}
          transition={artInView && !reduced ? { duration: 5.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
        >
          <motion.div className="footer-lens-glass" style={{ boxShadow: ringShadow }}>
            <motion.img
              src="/footer/footer-hills.svg"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="footer-lens-magnified-art"
              style={{ width: magnifiedImageWidth, height: magnifiedImageHeight, left: magnifiedImageLeft, top: magnifiedImageTop }}
            />
            <motion.div className="footer-lens-band" style={{ y: bandY, filter: bandBlur }} />
            <motion.div className="footer-lens-sweep" animate={sweepControls} />
            <motion.div className="footer-lens-specular" style={{ opacity: specularOpacity }} />
          </motion.div>
          <motion.div
            className="footer-lens-ring-layer"
            aria-hidden="true"
          >
            <img src="/hero/lens-ring-handle.svg" alt="" draggable={false} />
          </motion.div>
          <motion.div
            className="footer-lens-handle-layer"
            aria-hidden="true"
            style={{ x: handleOffsetX, y: handleOffsetY }}
          >
            <img src="/hero/lens-ring-handle.svg" alt="" draggable={false} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
