"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { HOTSPOTS, type HotspotId } from "./heroLensData";

type Size = { width: number; height: number };

const DEFAULT_SIZE: Size = { width: 800, height: 504 };
const DEFAULT_X = 0.62;
const DEFAULT_Y = 0.4;
const RETURN_DELAY = 600;
const TOUR_HOLD = 2800;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function useLensController(
  cardRef: RefObject<HTMLDivElement | null>,
  rowRef: RefObject<HTMLDivElement | null>,
) {
  const [cardSize, setCardSize] = useState<Size>(DEFAULT_SIZE);
  const [rowWidth, setRowWidth] = useState(890);
  const [activeId, setActiveId] = useState<HotspotId | null>(null);
  const [pinnedId, setPinnedId] = useState<HotspotId | null>(null);
  const reducedMotion = useReducedMotion() === true;

  const radius = useMotionValue(DEFAULT_SIZE.width * 0.17);
  const targetX = useMotionValue(DEFAULT_SIZE.width * DEFAULT_X);
  const targetY = useMotionValue(DEFAULT_SIZE.height * DEFAULT_Y);
  const springX = useSpring(targetX, { stiffness: 220, damping: 26, mass: 0.8 });
  const springY = useSpring(targetY, { stiffness: 220, damping: 26, mass: 0.8 });
  const displayX = reducedMotion ? targetX : springX;
  const displayY = reducedMotion ? targetY : springY;

  const clipPath = useTransform(
    [displayX, displayY, radius],
    (values) => {
      const [x, y, r] = values as number[];
      return `circle(${r}px at ${x}px ${y}px)`;
    },
  );
  const lensTransform = useTransform(
    [displayX, displayY, radius],
    (values) => {
      const [x, y, r] = values as number[];
      return `translate3d(${x - r}px, ${y - r}px, 0)`;
    },
  );
  const blurMask = useTransform(
    [displayX, displayY, radius],
    (values) => {
      const [x, y, r] = values as number[];
      const inner = Math.max(r - 2, 0);
      return `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0, transparent ${inner}px, #000 ${r}px)`;
    },
  );

  const cardHovered = useRef(false);
  const dragging = useRef(false);
  const pinnedRef = useRef<HotspotId | null>(null);
  const returnTimer = useRef<number | null>(null);
  const tourTimer = useRef<number | null>(null);
  const introTimers = useRef<number[]>([]);
  const introPlayed = useRef(false);
  const coarsePointer = useRef(false);
  const tourPausedUntil = useRef(0);

  const clearTimer = (timer: { current: number | null }) => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const clearIntro = useCallback(() => {
    introTimers.current.forEach((timer) => window.clearTimeout(timer));
    introTimers.current = [];
  }, []);

  const pointFor = useCallback(
    (id: HotspotId) => ({
      x: HOTSPOTS[id].x * cardSize.width,
      y: HOTSPOTS[id].y * cardSize.height,
    }),
    [cardSize],
  );

  const setTarget = useCallback(
    (x: number, y: number) => {
      const r = radius.get();
      const pad = r * 0.1;
      targetX.set(clamp(x, -pad, cardSize.width + pad));
      targetY.set(clamp(y, -pad, cardSize.height + pad));
    },
    [cardSize.height, cardSize.width, radius, targetX, targetY],
  );

  const setTargetFor = useCallback(
    (id: HotspotId) => {
      const point = pointFor(id);
      setTarget(point.x, point.y);
    },
    [pointFor, setTarget],
  );

  const setDefault = useCallback(() => {
    setTarget(cardSize.width * DEFAULT_X, cardSize.height * DEFAULT_Y);
    setActiveId(null);
  }, [cardSize.height, cardSize.width, setTarget]);

  const scheduleDefault = useCallback(() => {
    clearTimer(returnTimer);
    if (pinnedRef.current || cardHovered.current) return;
    returnTimer.current = window.setTimeout(setDefault, RETURN_DELAY);
  }, [setDefault]);

  const pauseTour = useCallback((duration: number) => {
    clearTimer(tourTimer);
    tourPausedUntil.current = Date.now() + duration;
    if (coarsePointer.current) {
      tourTimer.current = window.setTimeout(() => {
        if (!pinnedRef.current && !cardHovered.current) tourPausedUntil.current = 0;
      }, duration);
    }
  }, []);

  const cancelInteractionAnimation = useCallback(() => {
    clearIntro();
    clearTimer(tourTimer);
  }, [clearIntro]);

  const runTour = useCallback(() => {
    if (!coarsePointer.current || reducedMotion || pinnedRef.current) return;
    clearTimer(tourTimer);
    if (Date.now() < tourPausedUntil.current) return;
    const ids: HotspotId[] = ["verdict", "tradeoff", "review", "cost"];
    let index = 0;
    const visit = () => {
      if (cardHovered.current || pinnedRef.current || Date.now() < tourPausedUntil.current) return;
      const id = ids[index % ids.length];
      setActiveId(id);
      setTargetFor(id);
      index += 1;
      tourTimer.current = window.setTimeout(visit, TOUR_HOLD);
    };
    visit();
  }, [reducedMotion, setTargetFor]);

  const runIntro = useCallback(() => {
    if (introPlayed.current || reducedMotion) return;
    introPlayed.current = true;
    clearIntro();
    const ids: HotspotId[] = ["verdict", "tradeoff", "review", "cost"];
    ids.forEach((id, index) => {
      introTimers.current.push(window.setTimeout(() => {
        setActiveId(id);
        setTargetFor(id);
      }, index * 1000));
    });
    introTimers.current.push(window.setTimeout(() => {
      setDefault();
      if (coarsePointer.current) runTour();
    }, ids.length * 1000));
  }, [clearIntro, reducedMotion, runTour, setDefault, setTargetFor]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const measure = () => {
      const rect = card.getBoundingClientRect();
      const next = { width: rect.width, height: rect.height };
      setCardSize(next);
      radius.set(rect.width * 0.17);
    };
    const measureRow = () => {
      const row = rowRef.current;
      if (row) setRowWidth(row.getBoundingClientRect().width);
    };
    measure();
    measureRow();
    const observer = new ResizeObserver(() => {
      measure();
      measureRow();
    });
    observer.observe(card);
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [cardRef, radius, rowRef]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(pointer: coarse)");
    coarsePointer.current = media.matches;
    const update = (event: MediaQueryListEvent) => {
      coarsePointer.current = event.matches;
      if (event.matches && !reducedMotion) runTour();
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reducedMotion, runTour]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        runIntro();
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(card);
    return () => observer.disconnect();
  }, [cardRef, runIntro]);

  useEffect(() => () => {
    clearIntro();
    clearTimer(returnTimer);
    clearTimer(tourTimer);
  }, [clearIntro]);

  const cardPoint = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, [cardRef]);

  const onCardPointerEnter = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    cancelInteractionAnimation();
    cardHovered.current = true;
    pinnedRef.current = null;
    setPinnedId(null);
    setActiveId(null);
    clearTimer(returnTimer);
  }, [cancelInteractionAnimation]);

  const onCardPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || dragging.current) return;
    const point = cardPoint(event);
    if (point) setTarget(point.x, point.y);
  }, [cardPoint, setTarget]);

  const onCardPointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    cardHovered.current = false;
    scheduleDefault();
  }, [scheduleDefault]);

  const onLensPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    cancelInteractionAnimation();
    dragging.current = true;
    pauseTour(6000);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  }, [cancelInteractionAnimation, pauseTour]);

  const onLensPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const point = cardPoint(event);
    if (point) setTarget(point.x, point.y);
    event.stopPropagation();
  }, [cardPoint, setTarget]);

  const onLensPointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.stopPropagation();
  }, []);

  const focusChip = useCallback((id: HotspotId) => {
    cancelInteractionAnimation();
    clearTimer(returnTimer);
    setActiveId(id);
    setTargetFor(id);
  }, [cancelInteractionAnimation, setTargetFor]);

  const onChipEnter = useCallback((id: HotspotId) => {
    if (!coarsePointer.current) focusChip(id);
  }, [focusChip]);

  const onChipLeave = useCallback(() => scheduleDefault(), [scheduleDefault]);
  const onChipFocus = useCallback((id: HotspotId) => focusChip(id), [focusChip]);
  const onChipBlur = useCallback(() => scheduleDefault(), [scheduleDefault]);

  const onChipClick = useCallback((id: HotspotId) => {
    cancelInteractionAnimation();
    pauseTour(6000);
    pinnedRef.current = id;
    setPinnedId(id);
    setActiveId(id);
    setTargetFor(id);
  }, [cancelInteractionAnimation, pauseTour, setTargetFor]);

  return {
    cardSize,
    rowWidth,
    radius,
    displayX,
    displayY,
    clipPath,
    lensTransform,
    blurMask,
    activeId,
    pinnedId,
    onCardPointerEnter,
    onCardPointerMove,
    onCardPointerLeave,
    onLensPointerDown,
    onLensPointerMove,
    onLensPointerUp,
    onChipEnter,
    onChipLeave,
    onChipFocus,
    onChipBlur,
    onChipClick,
  };
}

export type LensController = ReturnType<typeof useLensController>;
export type LensMotionStyle = {
  clipPath: MotionValue<string>;
};
