"use client";

import { motion } from "framer-motion";
import type { useProblemLensController } from "./useProblemLensController";

type ScannerLensProps = {
  controller: ReturnType<typeof useProblemLensController>;
};

export function ScannerLens({ controller }: ScannerLensProps) {
  const {
    radius,
    lensTransform,
    entered,
    lensHovered,
    setLensHovered,
    onLensPointerDown,
    onLensPointerMove,
    onLensPointerUp,
  } = controller;

  return (
    <motion.div
      className="problem-scanner-lens"
      style={{ width: radius, height: radius, transform: lensTransform, touchAction: "none" }}
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
        className="problem-scanner-frame"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{
          opacity: entered ? 1 : 0,
          scale: lensHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <span className="problem-bracket problem-bracket-tl" />
        <span className="problem-bracket problem-bracket-tr" />
        <span className="problem-bracket problem-bracket-bl" />
        <span className="problem-bracket problem-bracket-br" />
        <span className="problem-lens-glass" />
      </motion.div>
    </motion.div>
  );
}
