"use client";

import { useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroMagnifier } from "./HeroMagnifier";
import { ProblemSection } from "./ProblemSection";
import { ScannerLens, SCANNER_RING_RADIUS_RATIO } from "./ScannerLens";
import { useLensController } from "./useLensController";
import { useProblemLensController } from "./useProblemLensController";

type ActiveSection = "hero" | "problem";
type Anchor = { left: number; top: number };

export function InteractiveLensExperience() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroController = useLensController(cardRef, rowRef);
  const problemController = useProblemLensController(stageRef);
  const [activeSection, setActiveSection] = useState<ActiveSection | null>(null);
  const [anchor, setAnchor] = useState<Anchor>({ left: 0, top: 0 });
  const [lensHovered, setLensHovered] = useState(false);

  const heroLensSize = useTransform(
    heroController.radius,
    // The scanner SVG's circle radius is 47.2% of its element size.
    // Match that radius to the hero lens radius, not its diameter.
    (radius) => radius / SCANNER_RING_RADIUS_RATIO,
  );
  const heroLensTransform = useTransform(
    [heroController.displayX, heroController.displayY, heroLensSize],
    (values) => {
      const [x, y, size] = values as number[];
      return `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
    },
  );
  const sharedLensSize = useMotionValue(0);
  const sharedRingRadius = useMotionValue(0);
  const sharedLensTransform = useMotionValue("translate3d(0, 0, 0)");

  useEffect(() => {
    const syncLensValues = () => {
      if (activeSection === "problem") {
        sharedLensSize.set(problemController.lensSize.get());
        sharedRingRadius.set(problemController.ringRadius.get());
        sharedLensTransform.set(problemController.lensTransform.get());
        return;
      }

      sharedLensSize.set(heroLensSize.get());
      sharedRingRadius.set(heroController.radius.get());
      sharedLensTransform.set(heroLensTransform.get());
    };

    const unsubscribers = [
      heroLensSize.on("change", syncLensValues),
      heroController.radius.on("change", syncLensValues),
      heroLensTransform.on("change", syncLensValues),
      problemController.lensSize.on("change", syncLensValues),
      problemController.ringRadius.on("change", syncLensValues),
      problemController.lensTransform.on("change", syncLensValues),
    ];
    syncLensValues();

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, [
    activeSection,
    heroController.radius,
    heroLensSize,
    heroLensTransform,
    problemController.lensSize,
    problemController.lensTransform,
    problemController.ringRadius,
    sharedLensSize,
    sharedLensTransform,
    sharedRingRadius,
  ]);

  useEffect(() => {
    let frame = 0;

    const measureActiveSection = () => {
      frame = 0;
      const heroRect = cardRef.current?.getBoundingClientRect();
      const problemRect = stageRef.current?.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const heroVisible = Boolean(heroRect && heroRect.bottom > 0 && heroRect.top < viewportHeight);
      const problemVisible = Boolean(problemRect && problemRect.bottom > 0 && problemRect.top < viewportHeight);

      let nextSection: ActiveSection | null = null;
      if (problemVisible && problemRect && problemRect.top <= viewportHeight * 0.58) {
        nextSection = "problem";
      } else if (heroVisible) {
        nextSection = "hero";
      } else if (problemVisible) {
        nextSection = "problem";
      }

      setActiveSection((current) => current === nextSection ? current : nextSection);
      const activeRect = nextSection === "problem" ? problemRect : nextSection === "hero" ? heroRect : null;
      if (activeRect) {
        setAnchor({ left: activeRect.left, top: activeRect.top });
      }
    };

    const requestMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measureActiveSection);
    };

    requestMeasure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);

    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeController = activeSection === "problem" ? problemController : heroController;

  return (
    <>
      <section className="relative z-10 mx-auto mt-10 w-full px-5 pb-0">
        <HeroMagnifier cardRef={cardRef} rowRef={rowRef} controller={heroController} />
      </section>

      <ProblemSection stageRef={stageRef} controller={problemController} />

      <ScannerLens
        key={activeSection ?? "inactive"}
        lensSize={sharedLensSize}
        ringRadius={sharedRingRadius}
        lensTransform={sharedLensTransform}
        anchor={anchor}
        visible={activeSection !== null}
        lensHovered={lensHovered}
        setLensHovered={setLensHovered}
        onLensPointerDown={activeController.onLensPointerDown}
        onLensPointerMove={activeController.onLensPointerMove}
        onLensPointerUp={activeController.onLensPointerUp}
      />
    </>
  );
}
