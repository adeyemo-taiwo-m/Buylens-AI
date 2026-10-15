"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { PROBLEM_ASSETS } from "./problemData";
import { useProblemLensController } from "./useProblemLensController";
import { ProblemBoardConcernList } from "./ProblemBoard";
import { SceneLayers } from "./SceneLayers";
import { ScannerLens } from "./ScannerLens";

function ProblemLabel({
  className,
  title,
  description,
  controller,
  delay,
}: {
  className: string;
  title: string;
  description?: string;
  controller: ReturnType<typeof useProblemLensController>;
  delay: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`problem-floating-label ${className}`}
      style={{ x: controller.labelParallaxX, y: controller.labelParallaxY }}
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      animate={reduced ? undefined : { y: [0, -6, 0] }}
    >
      <Image
        src={PROBLEM_ASSETS.headphoneIcon}
        alt=""
        width={30}
        height={30}
        aria-hidden="true"
        className="problem-label-thumb"
      />
      <span className="problem-label-copy">
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </motion.div>
  );
}

export function ProblemSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const controller = useProblemLensController(stageRef);
  const reduced = useReducedMotion();

  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="problem-section"
    >
      <div className="problem-copy">
        <motion.div
          className="problem-badge"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          THE PROBLEM
        </motion.div>
        <motion.h2
          id="problem-title"
          className="problem-title"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        >
          <span>A Good Looking Product Isn’t</span>
          <span>Always A Good Purchase.</span>
        </motion.h2>
        <motion.p
          className="problem-subtitle"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
        >
          You&apos;ve found something you like. But is it actually worth your money?
        </motion.p>
      </div>

      <div
        ref={stageRef}
        className="problem-stage"
        onPointerEnter={controller.onStagePointerEnter}
        onPointerMove={controller.onStagePointerMove}
        onPointerLeave={controller.onStagePointerLeave}
      >
        <motion.div
          className="problem-scene-entrance"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SceneLayers controller={controller} />
        </motion.div>

        <motion.div
          className="problem-headphone-wrap"
          style={{ x: controller.parallaxX }}
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          animate={reduced ? undefined : { rotate: [0, 1.5, 0, -1.5, 0] }}
        >
          <motion.div
            className="problem-headphone-float"
            style={{ y: controller.parallaxY }}
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={PROBLEM_ASSETS.headphone}
              alt=""
              width={520}
              height={520}
              priority
              aria-hidden="true"
              className="problem-headphone"
            />
          </motion.div>
        </motion.div>

        <ProblemLabel
          className="problem-label-a"
          title="Wireless Headphone"
          description="A product you are considering"
          controller={controller}
          delay={0.2}
        />
        <ProblemLabel
          className="problem-label-b"
          title="Before you pay, you want answers"
          controller={controller}
          delay={0.3}
        />

        <ScannerLens controller={controller} />
      </div>

      <ProblemBoardConcernList />
    </section>
  );
}
