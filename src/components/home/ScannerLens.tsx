"use client";

import { motion, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import type { useProblemLensController } from "./useProblemLensController";

type ScannerLensProps = {
  controller: ReturnType<typeof useProblemLensController>;
};

export function ScannerLens({ controller }: ScannerLensProps) {
  const {
    lensSize,
    ringRadius,
    lensTransform,
    entered,
    lensHovered,
    setLensHovered,
    onLensPointerDown,
    onLensPointerMove,
    onLensPointerUp,
  } = controller;
  const [debug, setDebug] = useState(false);
  const ringDiameter = useTransform(ringRadius, (value) => value * 2);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setDebug(new URLSearchParams(window.location.search).get("debugLens") === "1");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      className="problem-scanner-lens"
      style={{ width: lensSize, height: lensSize, transform: lensTransform, touchAction: "none" }}
      onPointerDown={onLensPointerDown}
      onPointerMove={onLensPointerMove}
      onPointerUp={onLensPointerUp}
      onPointerCancel={onLensPointerUp}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setLensHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setLensHovered(false);
      }}
      role="presentation"
      aria-hidden="true"
    >
      <motion.div
        className="problem-lens-sheen"
        style={{ width: ringDiameter, height: ringDiameter }}
      />
      <motion.div
        className="problem-scanner-frame"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{
          opacity: entered ? 1 : 0,
          scale: lensHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <svg
          className="problem-scanner-svg"
          viewBox="0 0 1000 1000"
          width="100%"
          height="100%"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="problem-ring-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7DB0FA" />
              <stop offset="1" stopColor="#4A8CF0" />
            </linearGradient>
            <linearGradient id="problem-bracket-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#60A5FA" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <circle
            cx="500"
            cy="500"
            r="472"
            stroke="url(#problem-ring-gradient)"
            strokeWidth="9"
            fill="none"
          />
          <g
            stroke="url(#problem-bracket-gradient)"
            strokeWidth="33"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M17 120 V50 Q17 17 50 17 H120" />
            <path d="M880 17 H950 Q983 17 983 50 V120" />
            <path d="M17 880 V950 Q17 983 50 983 H120" />
            <path d="M983 880 V950 Q983 983 950 983 H880" />
          </g>
        </svg>
      </motion.div>
      {debug ? (
        <>
          <motion.div
            className="problem-lens-debug-circle"
            style={{ width: ringDiameter, height: ringDiameter }}
          />
          <span className="problem-lens-debug-crosshair problem-lens-debug-crosshair-x" />
          <span className="problem-lens-debug-crosshair problem-lens-debug-crosshair-y" />
          <span className="problem-lens-debug-square" />
        </>
      ) : null}
    </motion.div>
  );
}
