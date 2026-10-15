"use client";

import { motion } from "framer-motion";
import type { useProblemLensController } from "./useProblemLensController";
import { PROBLEM_BOARD } from "./problemData";
import { ProblemBoard } from "./ProblemBoard";

type SceneLayersProps = {
  controller: ReturnType<typeof useProblemLensController>;
};

function BoardCopy({ scale, leftPct, topPx }: { scale: number; leftPct: number; topPx: number }) {
  return (
    <div
      className="problem-board-scale"
      style={{
        width: PROBLEM_BOARD.designWidth,
        height: PROBLEM_BOARD.designHeight,
        top: topPx,
        left: `${leftPct * 100}%`,
        transform: `scale(${scale})`,
      }}
    >
      <ProblemBoard />
    </div>
  );
}

export function SceneLayers({ controller }: SceneLayersProps) {
  return (
    <div className="problem-scene-layer" aria-hidden="true" inert>
      <div className="problem-scene-layer-wrap problem-scene-blur" aria-hidden="true" inert>
        <BoardCopy scale={controller.boardScale} leftPct={controller.boardLeftPct} topPx={controller.boardTopPx} />
      </div>

      <motion.div
        className="problem-scene-layer-wrap problem-scene-sharp"
        aria-hidden="true"
        inert
        style={{ clipPath: controller.clipPath, WebkitClipPath: controller.clipPath }}
      >
          <BoardCopy scale={controller.boardScale} leftPct={controller.boardLeftPct} topPx={controller.boardTopPx} />
      </motion.div>
    </div>
  );
}
