"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { useProblemLensController } from "./useProblemLensController";
import { PROBLEM_ASSETS } from "./problemData";

type SceneLayersProps = {
  controller: ReturnType<typeof useProblemLensController>;
};

export function SceneLayers({ controller }: SceneLayersProps) {
  return (
    <div className="problem-scene-layer" aria-hidden="true">
      <div className="problem-scene-art problem-scene-blur">
        <Image src={PROBLEM_ASSETS.scene} alt="" fill sizes="(max-width: 767px) 100vw, 78vw" className="object-cover object-left-top" />
      </div>

      <motion.div
        className="problem-scene-sharp"
        style={{ clipPath: controller.clipPath, WebkitClipPath: controller.clipPath }}
      >
        <div className="problem-scene-art">
          <Image src={PROBLEM_ASSETS.scene} alt="" fill sizes="(max-width: 767px) 100vw, 78vw" className="object-cover object-left-top" />
        </div>
      </motion.div>
    </div>
  );
}
