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
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

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

type FooterLensProps = {
  interactionRootRef?: RefObject<HTMLElement | null>;
  artSourceRef?: RefObject<HTMLElement | null>;
  contentSourceRef?: RefObject<HTMLElement | null>;
};

export function FooterLens({
  interactionRootRef,
  artSourceRef,
  contentSourceRef,
}: FooterLensProps) {
  const reduced = useReducedMotion() === true;
  const interactionRef = useRef<HTMLDivElement>(null);
  const contentCopyHostRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const metricsRef = useRef<FooterArtMetrics | null>(null);
  const artHoveredRef = useRef(false);
  const contentHoveredRef = useRef(false);
  const lensInsideRef = useRef(false);
  const draggingRef = useRef(false);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ clientX: 0, clientY: 0 });
  const returnTimerRef = useRef<number | null>(null);
  const tapTimerRef = useRef<number | null>(null);

  const artInView = useInView(interactionRef, { amount: 0.05 });
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
  const artOffsetX = useMotionValue(0);
  const artOffsetY = useMotionValue(0);
  const contentSourceX = useMotionValue(0);
  const contentSourceY = useMotionValue(0);
  const contentSourceWidth = useMotionValue(0);
  const contentSourceHeight = useMotionValue(0);
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

  const portalLensLeft = useTransform([lensLeft, artOffsetX], (values: number[]) => {
    const [left, offset] = values as number[];
    return left + offset;
  });
  const portalLensTop = useTransform([lensTop, artOffsetY], (values: number[]) => {
    const [top, offset] = values as number[];
    return top + offset;
  });
  const contentCopyLeft = useTransform(
    [baseRadius, magnification, pointerX, contentSourceX],
    (values: number[]) => {
      const [radius, scale, point, source] = values as number[];
      return radius - scale * (point - source);
    },
  );
  const contentCopyTop = useTransform(
    [baseRadius, magnification, pointerY, contentSourceY],
    (values: number[]) => {
      const [radius, scale, point, source] = values as number[];
      return radius - scale * (point - source);
    },
  );
  const contentCopyScale = magnification;

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

  const pointFromClient = useCallback((clientX: number, clientY: number) => {
    const metrics = metricsRef.current;
    if (!metrics) return null;
    return {
      x: clientX - metrics.left,
      y: clientY - metrics.top,
    };
  }, []);

  const refreshContentCopy = useCallback(() => {
    const source = contentSourceRef?.current;
    const host = contentCopyHostRef.current;
    if (!source || !host) return;

    const clone = source.cloneNode(true) as HTMLElement;
    clone.removeAttribute("id");
    clone.setAttribute("aria-hidden", "true");
    clone.style.position = "absolute";
    clone.style.inset = "0";
    clone.style.width = "100%";
    clone.style.maxWidth = "none";
    clone.style.height = "100%";
    clone.style.margin = "0";
    clone.style.opacity = "1";
    clone.style.transform = "none";
    clone.style.pointerEvents = "none";

    clone.querySelectorAll<HTMLElement>("[style]").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });

    host.replaceChildren(clone);
  }, [contentSourceRef]);

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
    const root = interactionRootRef?.current;
    if (!root) return;

    const isContentTarget = (target: EventTarget | null, clientX: number, clientY: number) => {
      const source = contentSourceRef?.current;
      if (target instanceof Node && source?.contains(target)) return true;
      const rect = source?.getBoundingClientRect();
      return Boolean(
        rect &&
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom,
      );
    };

    const updateFromRootPointer = (event: globalThis.PointerEvent) => {
      const point = pointFromClient(event.clientX, event.clientY);
      if (!point) return null;
      lastPointerRef.current = { clientX: event.clientX, clientY: event.clientY };
      pointerX.set(point.x);
      pointerY.set(point.y);
      setPosition(point.x, point.y);
      return point;
    };

    const isWithinLens = (point: { x: number; y: number } | null) => {
      const metrics = metricsRef.current;
      if (!point || !metrics) return false;
      return Math.hypot(point.x - displayX.get(), point.y - displayY.get()) <= metrics.radius * 1.2;
    };

    const onRootPointerOver = (event: globalThis.PointerEvent) => {
      clearReturnTimer();
      artHoveredRef.current = true;
      const overContent = isContentTarget(event.target, event.clientX, event.clientY);
      const point = updateFromRootPointer(event);
      hoverTarget.set(overContent || isWithinLens(point) ? 1 : 0);
      if (overContent && !contentHoveredRef.current) {
        contentHoveredRef.current = true;
        refreshContentCopy();
        replaySweep();
      }
    };

    const onRootPointerMove = (event: globalThis.PointerEvent) => {
      if (draggingRef.current) {
        if (dragPointerIdRef.current !== event.pointerId) return;
        event.preventDefault();
        const point = pointFromClient(event.clientX, event.clientY);
        if (!point) return;
        const nextX = point.x + dragOffsetRef.current.x;
        const nextY = point.y + dragOffsetRef.current.y;
        pointerX.set(nextX);
        pointerY.set(nextY);
        setPosition(nextX, nextY, true);
        return;
      }

      clearReturnTimer();
      artHoveredRef.current = true;
      const overContent = isContentTarget(event.target, event.clientX, event.clientY);
      const point = updateFromRootPointer(event);
      hoverTarget.set(overContent || isWithinLens(point) ? 1 : 0);
      if (overContent && !contentHoveredRef.current) {
        contentHoveredRef.current = true;
        refreshContentCopy();
        replaySweep();
      } else if (!overContent) {
        contentHoveredRef.current = false;
      }
    };

    const onRootPointerDown = (event: globalThis.PointerEvent) => {
      const point = pointFromClient(event.clientX, event.clientY);
      const metrics = metricsRef.current;
      if (!point || !metrics) return;
      const target = event.target;
      const interactive = target instanceof Element && target.closest("a,button,input,textarea,select,[role='button']");
      if (interactive || Math.hypot(point.x - displayX.get(), point.y - displayY.get()) > metrics.radius * 1.2) return;

      clearReturnTimer();
      artHoveredRef.current = true;
      lensInsideRef.current = true;
      draggingRef.current = true;
      dragPointerIdRef.current = event.pointerId;
      draggingTarget.set(1);
      hoverTarget.set(1);
      dragOffsetRef.current = { x: displayX.get() - point.x, y: displayY.get() - point.y };
      dragStartRef.current = { x: point.x, y: point.y };
      pointerX.set(displayX.get());
      pointerY.set(displayY.get());
      root.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const finishRootDrag = (event: globalThis.PointerEvent) => {
      if (!draggingRef.current || dragPointerIdRef.current !== event.pointerId) return;
      const point = pointFromClient(event.clientX, event.clientY);
      const moved = point
        ? Math.hypot(point.x - dragStartRef.current.x, point.y - dragStartRef.current.y) > 5
        : true;
      draggingRef.current = false;
      dragPointerIdRef.current = null;
      draggingTarget.set(0);
      if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
      if (event.pointerType === "touch" && !moved) activateTap();
    };

    const onRootPointerLeave = () => {
      contentHoveredRef.current = false;
      if (draggingRef.current) return;
      artHoveredRef.current = false;
      hoverTarget.set(0);
      scheduleReturn();
    };

    root.addEventListener("pointerover", onRootPointerOver);
    root.addEventListener("pointermove", onRootPointerMove, { passive: false });
    root.addEventListener("pointerdown", onRootPointerDown, { passive: false });
    root.addEventListener("pointerup", finishRootDrag);
    root.addEventListener("pointercancel", finishRootDrag);
    root.addEventListener("pointerleave", onRootPointerLeave);

    return () => {
      root.removeEventListener("pointerover", onRootPointerOver);
      root.removeEventListener("pointermove", onRootPointerMove);
      root.removeEventListener("pointerdown", onRootPointerDown);
      root.removeEventListener("pointerup", finishRootDrag);
      root.removeEventListener("pointercancel", finishRootDrag);
      root.removeEventListener("pointerleave", onRootPointerLeave);
    };
  }, [
    activateTap,
    clearReturnTimer,
    contentSourceRef,
    displayX,
    displayY,
    draggingTarget,
    hoverTarget,
    interactionRootRef,
    pointFromClient,
    pointerX,
    pointerY,
    refreshContentCopy,
    replaySweep,
    scheduleReturn,
    setPosition,
  ]);

  useEffect(() => {
    setPortalTarget(interactionRootRef?.current ?? null);
  }, [interactionRootRef]);

  useEffect(() => {
    const rootElement = interactionRootRef?.current;
    const artElement = artSourceRef?.current;
    if (!rootElement || !artElement) return;

    const measure = () => {
      const rect = rootElement.getBoundingClientRect();
      const artRect = artElement.getBoundingClientRect();
      if (!rect.width || !rect.height || !artRect.width || !artRect.height) return;

      const fitScale = Math.max(
        artRect.width / FOOTER_LENS_CONFIG.SOURCE_WIDTH,
        artRect.height / FOOTER_LENS_CONFIG.SOURCE_HEIGHT,
      );
      const renderedWidth = FOOTER_LENS_CONFIG.SOURCE_WIDTH * fitScale;
      const renderedHeight = FOOTER_LENS_CONFIG.SOURCE_HEIGHT * fitScale;
      const offsetX = artRect.left - rect.left + (artRect.width - renderedWidth) / 2;
      const offsetY = artRect.top - rect.top + artRect.height - renderedHeight;
      const contentRect = contentSourceRef?.current?.getBoundingClientRect();
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
      artOffsetX.set(artRect.left - rect.left);
      artOffsetY.set(artRect.top - rect.top);
      contentSourceX.set((contentRect?.left ?? rect.left) - rect.left);
      contentSourceY.set((contentRect?.top ?? rect.top) - rect.top);
      contentSourceWidth.set(contentRect?.width ?? 0);
      contentSourceHeight.set(contentRect?.height ?? 0);

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
    observer.observe(rootElement);
    observer.observe(artElement);
    if (contentSourceRef?.current) observer.observe(contentSourceRef.current);
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
  }, [
    artOffsetX,
    artOffsetY,
    artSourceRef,
    baseRadius,
    contentSourceHeight,
    contentSourceRef,
    contentSourceWidth,
    contentSourceX,
    contentSourceY,
    imageHeight,
    imageOffsetX,
    imageOffsetY,
    imageWidth,
    interactionRootRef,
    pointerX,
    pointerY,
    positionSpringX,
    positionSpringY,
    targetX,
    targetY,
  ]);

  const renderLensVisual = (portal = false) => (
    <motion.div
      className={`footer-lens ${portal ? "footer-lens-visual" : "footer-lens-hit-target"}`}
      style={{
        left: portal ? portalLensLeft : lensLeft,
        top: portal ? portalLensTop : lensTop,
        width: lensDiameter,
        height: lensDiameter,
        scale: lensScale,
        rotate: tilt,
      }}
      onPointerEnter={portal ? undefined : onLensPointerEnter}
      onPointerLeave={portal ? undefined : onLensPointerLeave}
      onPointerDown={portal ? undefined : onLensPointerDown}
      onPointerMove={portal ? undefined : onLensPointerMove}
      onPointerUp={portal ? undefined : onLensPointerUp}
      onPointerCancel={portal ? undefined : onLensPointerUp}
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
          <motion.div
            ref={portal ? contentCopyHostRef : undefined}
            className="footer-lens-content-copy"
            style={{
              left: contentCopyLeft,
              top: contentCopyTop,
              width: contentSourceWidth,
              height: contentSourceHeight,
              scale: contentCopyScale,
            }}
          />
          <motion.div className="footer-lens-band" style={{ y: bandY, filter: bandBlur }} />
          <motion.div className="footer-lens-sweep" animate={sweepControls} />
          <motion.div className="footer-lens-specular" style={{ opacity: specularOpacity }} />
        </motion.div>
        <svg
          className="footer-lens-scanner-visual"
          viewBox="0 0 1000 1000"
          width="100%"
          height="100%"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={portal ? "footer-ring-gradient-portal" : "footer-ring-gradient-hit"} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7DB0FA" />
              <stop offset="1" stopColor="#4A8CF0" />
            </linearGradient>
            <linearGradient id={portal ? "footer-bracket-gradient-portal" : "footer-bracket-gradient-hit"} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#60A5FA" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <circle
            cx="500"
            cy="500"
            r="472"
            stroke={`url(#${portal ? "footer-ring-gradient-portal" : "footer-ring-gradient-hit"})`}
            strokeWidth="9"
          />
          <g
            stroke={`url(#${portal ? "footer-bracket-gradient-portal" : "footer-bracket-gradient-hit"})`}
            strokeWidth="33"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 120 V50 Q17 17 50 17 H120" />
            <path d="M880 17 H950 Q983 17 983 50 V120" />
            <path d="M17 880 V950 Q17 983 50 983 H120" />
            <path d="M983 880 V950 Q983 983 950 983 H880" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <div ref={interactionRef} aria-hidden="true" className="footer-lens-interaction">
        {renderLensVisual()}
      </div>
      {portalTarget
        ? createPortal(
            <div aria-hidden="true" className="footer-lens-portal">
              {renderLensVisual(true)}
            </div>,
            portalTarget,
          )
        : null}
    </>
  );
}
