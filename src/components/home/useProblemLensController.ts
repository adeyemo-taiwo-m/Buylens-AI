"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";
import { useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { getProblemBoardLayout, PROBLEM_BOARD, PROBLEM_REST, PROBLEM_WAYPOINTS, type ProblemWaypoint } from "./problemData";

type Size = { width: number; height: number };
const INITIAL_SIZE = { width: 1440, height: 710 };
const LENS_DIAMETER_RATIO = 0.215;
const LENS_SQUARE_RATIO = LENS_DIAMETER_RATIO * 1.06;
const MOBILE_LENS_DIAMETER_RATIO = 0.45;
const RING_RADIUS_RATIO = 0.472;
const MIN_LENS_Y_PCT = 0.2;
const INITIAL_BOARD_WIDTH = INITIAL_SIZE.width * PROBLEM_BOARD.widthPct;
const INITIAL_BOARD_HEIGHT = INITIAL_BOARD_WIDTH * (PROBLEM_BOARD.designHeight / PROBLEM_BOARD.designWidth);
const INITIAL_REST_X = INITIAL_SIZE.width * PROBLEM_BOARD.leftPct + PROBLEM_REST.fx * INITIAL_BOARD_WIDTH;
const INITIAL_REST_Y = PROBLEM_BOARD.topPx + PROBLEM_REST.fy * INITIAL_BOARD_HEIGHT;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function useProblemLensController(stageRef: RefObject<HTMLDivElement | null>) {
  const [stageSize, setStageSize] = useState<Size>(INITIAL_SIZE);
  const [boardScale, setBoardScale] = useState((INITIAL_SIZE.width * PROBLEM_BOARD.widthPct) / PROBLEM_BOARD.designWidth);
  const [entered, setEntered] = useState(false);
  const [lensHovered, setLensHovered] = useState(false);
  const reduced = useReducedMotion() === true;
  const boardLayout = getProblemBoardLayout(stageSize.width);
  const boardWidthPct = boardLayout.widthPct;
  const boardLeftPct = boardLayout.leftPct;
  const boardTopPx = boardLayout.topPx;
  const lensSize = useMotionValue(INITIAL_SIZE.width * LENS_SQUARE_RATIO);
  const ringRadius = useTransform(lensSize, (size) => size * RING_RADIUS_RATIO);
  const targetX = useMotionValue(INITIAL_REST_X);
  const targetY = useMotionValue(INITIAL_REST_Y);
  const springX = useSpring(targetX, { stiffness: 220, damping: 26, mass: 0.8 });
  const springY = useSpring(targetY, { stiffness: 220, damping: 26, mass: 0.8 });
  const x = reduced ? targetX : springX;
  const y = reduced ? targetY : springY;
  const clipPath = useTransform([x, y, ringRadius], (values) => {
    const [px, py, ringR] = values as number[];
    return `circle(${ringR}px at ${px}px ${py}px)`;
  });
  const lensTransform = useTransform([x, y, lensSize], (values) => {
    const [px, py, size] = values as number[];
    return `translate3d(${px - size / 2}px, ${py - size / 2}px, 0)`;
  });
  const headphoneX = useMotionValue(0);
  const headphoneY = useMotionValue(0);
  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);
  const parallaxX = useSpring(headphoneX, { stiffness: 180, damping: 24, mass: 0.7 });
  const parallaxY = useSpring(headphoneY, { stiffness: 180, damping: 24, mass: 0.7 });
  const labelParallaxX = useSpring(labelX, { stiffness: 160, damping: 24, mass: 0.7 });
  const labelParallaxY = useSpring(labelY, { stiffness: 160, damping: 24, mass: 0.7 });

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
      y: clamp(py, height * MIN_LENS_Y_PCT, height * 0.88),
    };
  }, [stageSize]);
  const moveToBoardPoint = useCallback((fractionX: number, fractionY: number) => {
    const boardWidth = stageSize.width * boardWidthPct;
    const boardHeight = boardWidth * (PROBLEM_BOARD.designHeight / PROBLEM_BOARD.designWidth);
    const point = clampPoint(
      stageSize.width * boardLeftPct + fractionX * boardWidth,
      boardTopPx + fractionY * boardHeight,
    );
    targetX.set(point.x);
    targetY.set(point.y);
  }, [boardLeftPct, boardTopPx, boardWidthPct, clampPoint, stageSize.width, targetX, targetY]);
  const moveToWaypoint = useCallback((waypoint: ProblemWaypoint) => moveToBoardPoint(waypoint.fx, waypoint.fy), [moveToBoardPoint]);
  const moveToRest = useCallback(() => moveToBoardPoint(PROBLEM_REST.fx, PROBLEM_REST.fy), [moveToBoardPoint]);
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
  }, []);
  const onLensPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    clearSequences();
    pauseTour(6000);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.stopPropagation();
  }, [clearSequences, pauseTour]);
  const onLensPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
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
      const layout = getProblemBoardLayout(rect.width);
      setBoardScale((rect.width * layout.widthPct) / PROBLEM_BOARD.designWidth);
      lensSize.set(rect.width * (rect.width < 768 ? MOBILE_LENS_DIAMETER_RATIO * 1.06 : LENS_SQUARE_RATIO));
      if (!stageHovered.current && !dragging.current) {
        const boardWidth = rect.width * layout.widthPct;
        const boardHeight = boardWidth * (PROBLEM_BOARD.designHeight / PROBLEM_BOARD.designWidth);
        targetX.set(clamp(
          rect.width * layout.leftPct + PROBLEM_REST.fx * boardWidth,
          rect.width * 0.45,
          rect.width * 0.9,
        ));
        targetY.set(clamp(layout.topPx + PROBLEM_REST.fy * boardHeight, rect.height * MIN_LENS_Y_PCT, rect.height * 0.88));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [lensSize, stageRef, targetX, targetY]);
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
  }, [clearSequences]);

  return {
    stageSize,
    boardScale,
    boardLeftPct,
    boardTopPx,
    lensSize,
    ringRadius,
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
