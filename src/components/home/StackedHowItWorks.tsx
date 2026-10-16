"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppWindow, type AppWindowKind } from "./AppWindow";
import { HOW_STEPS } from "./howItWorksData";
import { StepTracker } from "./StepTracker";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const kindFor = (index: number): AppWindowKind => index === 0 ? "product" : index === 1 ? "priorities" : "report";

function StackedPreview({ kind, active, reduced }: { kind: AppWindowKind; active: boolean; reduced: boolean }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const measure = () => setScale(Math.min(1, Math.max(0.72, outer.clientWidth / 441)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(outer);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="how-stacked-preview" style={{ height: 469 * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 441, height: 469 }}>
        <AppWindow kind={kind} active={active} reduced={reduced} />
      </div>
    </div>
  );
}

export function StackedHowItWorks({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeStep, setActiveStep] = useState(reduced ? HOW_STEPS.length - 1 : 0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 30%"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduced) return;
    const next = value < 1 / 3 ? 0 : value < 2 / 3 ? 1 : 2;
    setActiveStep((current) => current === next ? current : next);
  });

  const scrollToStep = useCallback((index: number) => {
    stepRefs.current[index]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });
  }, [reduced]);

  return (
    <div ref={sectionRef} className="how-stacked-inner">
      <div className="how-copy how-stacked-copy">
        <RevealGroup trigger="view">
          <Reveal grouped className="how-badge">HOW IT WORKS</Reveal>
          <Reveal as="h2" grouped className="how-title"><span>From Product Research</span><span>To A Clearer Decision.</span></Reveal>
          <Reveal as="p" grouped className="how-subtitle">Three simple steps to help you understand a product, evaluate the trade-offs and decide what makes sense for you.</Reveal>
        </RevealGroup>
      </div>
      <Reveal trigger="view" className="how-stacked-tracker-reveal">
        <StepTracker
          activeStep={activeStep}
          progress={scrollYProgress}
          onSelect={scrollToStep}
          className="how-stacked-tracker"
        />
      </Reveal>
      <div className="how-stacked-steps">
        {HOW_STEPS.map((step, index) => {
          const active = reduced || index <= activeStep;
          return (
            <Reveal
              as="article"
              ref={(node) => { stepRefs.current[index] = node; }}
              className={`how-stacked-step${index === activeStep ? " is-active" : ""}`}
              data-how-stack-step={index}
              trigger="view"
              key={step.id}
            >
              <StackedPreview kind={kindFor(index)} active={active} reduced={reduced} />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
