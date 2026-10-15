"use client";

import type { ReactNode, RefObject } from "react";
import { motion } from "framer-motion";
import type { LensController } from "./useLensController";

type ProductCardLayersProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  controller: LensController;
  children: ReactNode;
};

export function ProductCardLayers({ cardRef, controller, children }: ProductCardLayersProps) {
  return (
    <div
      ref={cardRef}
      onPointerEnter={controller.onCardPointerEnter}
      onPointerMove={controller.onCardPointerMove}
      onPointerLeave={controller.onCardPointerLeave}
      className="hero-card relative min-h-[504px] overflow-visible rounded-[36px] border border-white/80 bg-white/75 shadow-[0_20px_70px_-28px_rgba(37,99,235,.25)] backdrop-blur-sm"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[36px]">
        <div aria-hidden="true" className="relative min-h-[504px]">
          {children}
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 min-h-[504px] bg-white/5 will-change-[backdrop-filter,mask-image]"
          style={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            maskImage: controller.blurMask,
            WebkitMaskImage: controller.blurMask,
          }}
        />
      </div>

    </div>
  );
}
