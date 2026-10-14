"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { PROBLEM_REST, PROBLEM_WAYPOINTS, type ProblemWaypoint } from "./problemData";

type Size = { width: number; height: number };
const INITIAL_SIZE = { width: 1440, height: 710 };
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function useProblemLensController(stageRef: RefObject<HTMLDivElement | null>) {
  const [stageSize, setStageSize] = useState<Size>(INITIAL_SIZE);
  const [entered, setEntered] = useState(false);
  const [lensHovered, setLensHovered] = useState(false);
  const reduced = useReducedMotion() === true;
  const radius = useMotionValue(INITIAL_SIZE.width * 0.1075);
  const targetX = useMotionValue(INITIAL_SIZE.width * PROBLEM_REST.x);
  const targetY = useMotionValue(INITIAL_SIZE.height * PROBLEM_REST.y);
  const springX = useSpring(targetX, { stiffness: 220, damping: 26, mass: 0.8 });
  const springY = useSpring(targetY, { stiffness: 220, damping: 26, mass: 0.8 });
  const x = reduced ? targetX : springX;
  const y = reduced ? targetY : springY;
  const clipPath = useTransform([x, y, radius], (values) => {
    const [px, py, r] = values as number[];
    return `circle(${r}px at ${px}px ${py}px)`;
  });
  const lensTransform = useTransform([x, y, radius], (values) => {
    const [px, py, r] = values as number[];
    return `translate3d(${px - r}px, ${py - r}px, 0)`;
  });
  const headphoneX = useMotionValue(0);
  const headphoneY = useMotionValue(0);
  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);
  const parallaxX = useSpring(headphoneX, { stiffness: 180, damping: 24, mass: 0.7 });
  const parallaxY = useSpring(headphoneY, { stiffness: 180, damping: 24, mass: 0.7 });
  const labelParallaxX = useSpring(labelX, { stiffness: 160, damping: 24, mass: 0.7 });
  const labelParallaxY = useSpring(labelY, { stiffness: 160, damping: 24, mass: 0.7 });

  const returnTimer = useRef<number | null>(null);
  const tourTimer = useRef<number | null>(null);
  const introTimers = useRef<number[]>([]);
  const introPlayed = useRef(false);
  const coarse = useRef(false);
  const dragging = useRef(false);
  const stageHovered = useRef(false);
  const tourPausedUntil = useRef(0);

  const clearTimer = (ref: { current: number | null }) => {
    if (ref.current !== null) window.clearTimeout(ref.current);
    ref.current = null;
  };
  const clearSequences = useCallback(() => {
    clearTimer(tourTimer);
    introTimers.current.forEach((timer) => window.clearTimeout(timer));
    introTimers.current = [];
  }, []);
  const clampPoint = useCallback((px: number, py: number) => {
    const { width, height } = stageSize;
    return {
      x: clamp(px, width * 0.45, width * 0.9),
      y: clamp(py, height * 0.32, height * 0.88),
    };
  }, [stageSize]);
  const moveTo = useCallback((fractionX: number, fractionY: number) => {
    const point = clampPoint(fractionX * stageSize.width, fractionY * stageSize.height);
    targetX.set(point.x);
    targetY.set(point.y);
  }, [clampPoint, stageSize.height, stageSize.width, targetX, targetY]);
  const moveToWaypoint = useCallback((waypoint: ProblemWaypoint) => moveTo(waypoint.x, waypoint.y), [moveTo]);
  const moveToRest = useCallback(() => moveTo(PROBLEM_REST.x, PROBLEM_REST.y), [moveTo]);
  const scheduleRest = useCallback(() => {
    clearTimer(returnTimer);
    returnTimer.current = window.setTimeout(moveToRest, 700);
  }, [moveToRest]);
  const pauseTour = useCallback((duration: number) => {
    clearTimer(tourTimer);
    tourPausedUntil.current = Date.now() + duration;
    tourTimer.current = window.setTimeout(() => { tourPausedUntil.current = 0; }, duration);
  }, []);
  const runTour = useCallback(() => {
    if (reduced || !coarse.current) return;
    clearTimer(tourTimer);
    let index = 0;
    const visit = () => {
      if (stageHovered.current || dragging.current || Date.now() < tourPausedUntil.current) return;
      moveToWaypoint(PROBLEM_WAYPOINTS[index % PROBLEM_WAYPOINTS.length]);
      index += 1;
      tourTimer.current = window.setTimeout(visit, 2600);
    };
    visit();
  }, [moveToWaypoint, reduced]);
  const runIntro = useCallback(() => {
    if (introPlayed.current || reduced) return;
    introPlayed.current = true;
    clearSequences();
    PROBLEM_WAYPOINTS.forEach((waypoint, index) => {
      introTimers.current.push(window.setTimeout(() => moveToWaypoint(waypoint), index * 1000));
    });
    introTimers.current.push(window.setTimeout(() => {
      moveToRest();
      if (coarse.current) runTour();
    }, PROBLEM_WAYPOINTS.length * 1000));
  }, [clearSequences, moveToRest, moveToWaypoint, reduced, runTour]);
  const eventPoint = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return null;
    const rect = stage.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, [stageRef]);
  const onStagePointerEnter = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    clearTimer(returnTimer);
    clearSequences();
    stageHovered.current = true;
    if (!entered) setEntered(true);
    const point = eventPoint(event);
    if (point) {
      const clamped = clampPoint(point.x, point.y);
      targetX.set(clamped.x);
      targetY.set(clamped.y);
    }
  }, [clampPoint, clearSequences, entered, eventPoint, targetX, targetY]);
  const onStagePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || dragging.current) return;
    const point = eventPoint(event);
    if (!point) return;
    const clamped = clampPoint(point.x, point.y);
    targetX.set(clamped.x);
    targetY.set(clamped.y);
    const nx = (event.clientX - (stageRef.current?.getBoundingClientRect().left ?? 0)) / stageSize.width - 0.5;
    const ny = (event.clientY - (stageRef.current?.getBoundingClientRect().top ?? 0)) / stageSize.height - 0.5;
    headphoneX.set(reduced ? 0 : -nx * 12);
    headphoneY.set(reduced ? 0 : -ny * 12);
    labelX.set(reduced ? 0 : nx * 18);
    labelY.set(reduced ? 0 : ny * 18);
  }, [clampPoint, eventPoint, headphoneX, headphoneY, labelX, labelY, reduced, stageRef, stageSize.height, stageSize.width, targetX, targetY]);
  const onStagePointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    stageHovered.current = false;
    scheduleRest();
  }, [scheduleRest]);
  const onLensPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    clearSequences();
    pauseTour(6000);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  }, [clearSequences, pauseTour]);
  const onLensPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const point = eventPoint(event);
    if (point) {
      const clamped = clampPoint(point.x, point.y);
      targetX.set(clamped.x);
      targetY.set(clamped.y);
    }
    event.stopPropagation();
  }, [clampPoint, eventPoint, targetX, targetY]);
  const onLensPointerUp = useCallback((event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const rect = stage.getBoundingClientRect();
      setStageSize({ width: rect.width, height: rect.height });
      radius.set(rect.width * (rect.width < 768 ? 0.225 : 0.1075));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [radius, stageRef]);
  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    coarse.current = media.matches;
    const update = (event: MediaQueryListEvent) => {
      coarse.current = event.matches;
      if (event.matches && !reduced) runTour();
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reduced, runTour]);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        runIntro();
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, [runIntro, stageRef]);
  useEffect(() => () => {
    clearSequences();
    clearTimer(returnTimer);
  }, [clearSequences]);

  return {
    stageSize,
    radius,
    clipPath,
    lensTransform,
    parallaxX: reduced ? headphoneX : parallaxX,
    parallaxY: reduced ? headphoneY : parallaxY,
    labelParallaxX: reduced ? labelX : labelParallaxX,
    labelParallaxY: reduced ? labelY : labelParallaxY,
    entered,
    lensHovered,
    setLensHovered,
    onStagePointerEnter,
    onStagePointerMove,
    onStagePointerLeave,
    onLensPointerDown,
    onLensPointerMove,
    onLensPointerUp,
  };
}
