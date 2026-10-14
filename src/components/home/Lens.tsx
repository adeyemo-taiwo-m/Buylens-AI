"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import type { LensController } from "./useLensController";

type LensProps = { controller: LensController };

export function Lens({ controller }: LensProps) {
  const reduceMotion = useReducedMotion();
  const diameter = useTransform(controller.radius, (value) => value * 2);
  const idle = controller.activeId === null && controller.pinnedId === null;

  return (
    <motion.div
      aria-hidden="true"
      className="absolute left-0 top-0 z-[5] cursor-grab select-none will-change-transform active:cursor-grabbing"
      style={{
        width: diameter,
        height: diameter,
        transform: controller.lensTransform,
        touchAction: "none",
        pointerEvents: "auto",
      }}
      onPointerDown={controller.onLensPointerDown}
      onPointerMove={controller.onLensPointerMove}
      onPointerUp={controller.onLensPointerUp}
      onPointerCancel={controller.onLensPointerUp}
    >
      <motion.div
        className="relative h-full w-full"
        animate={idle && !reduceMotion ? { y: [0, -4, 0] } : { y: 0 }}
        transition={idle && !reduceMotion ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.15 }}
      >
        <img
          src="/hero/lens-ring-handle.svg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute left-0 top-0 h-[139%] w-[139%] max-w-none object-contain"
        />
        <span className="pointer-events-none absolute inset-[4%] rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,.16),rgba(255,255,255,0)_68%)]" />
      </motion.div>
    </motion.div>
  );
}
