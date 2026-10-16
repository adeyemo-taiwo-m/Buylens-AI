"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AppWindow, type AppWindowKind } from "./AppWindow";
import { HOW_BANDS, HOW_PIN_DISTANCE, HOW_STEPS } from "./howItWorksData";
import { StackedHowItWorks } from "./StackedHowItWorks";
import { StepTracker } from "./StepTracker";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";

const WINDOW_KINDS: AppWindowKind[] = ['product', 'priorities', 'report'];

function WindowStage({ activeStep, reduced }: { activeStep: number; reduced: boolean }) {
  return (
    <div className="how-window-stage" aria-hidden="true">
      {WINDOW_KINDS.map((kind, index) => {
        const distance = index - activeStep;
        const isActive = distance === 0;
        const hidden = Math.abs(distance) > 1;
        return <motion.div
          className="how-window-slot"
          key={kind}
          initial={false}
          animate={{ x: isActive ? 0 : hidden ? distance < 0 ? -300 : 300 : distance < 0 ? -185 : 185, scale: isActive ? 1 : hidden ? 0.55 : 0.62, opacity: isActive ? 1 : hidden ? 0 : 0.55, filter: isActive ? 'blur(0px)' : hidden ? 'blur(2px)' : 'blur(1.5px)' }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 22, mass: 0.9 }}
          style={{ zIndex: isActive ? 30 : hidden ? 0 : 10 }}
        ><AppWindow kind={kind} active={isActive || reduced} reduced={reduced} /></motion.div>;
      })}
    </div>
  );
}

function HowCopy({ activeStep, progress, onSelect }: { activeStep: number; progress: ReturnType<typeof useScroll>['scrollYProgress']; onSelect: (index: number) => void }) {
  return <div className="how-copy how-pinned-copy">
    <RevealGroup trigger="view">
      <Reveal grouped className="how-badge">HOW IT WORKS</Reveal>
      <Reveal as="h2" grouped className="how-title"><span>From Product Research</span><span>To A Clearer Decision.</span></Reveal>
      <Reveal as="p" grouped className="how-subtitle">Three simple steps to help you understand a product, evaluate the trade-offs and decide what makes sense for you.</Reveal>
      <Reveal grouped><StepTracker activeStep={activeStep} progress={progress} onSelect={onSelect} /></Reveal>
    </RevealGroup>
    <div className="how-live-region" aria-live="polite">Step {activeStep + 1} of 3: {HOW_STEPS[activeStep].title}</div>
  </div>;
}

export function HowItWorksSection() {
  const wrapperRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() === true;
  const [pinned, setPinned] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [scale, setScale] = useState(1);
  const activeRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const update = () => {
      const nextPinned = window.innerWidth >= 1024 && !reduced;
      setPinned(nextPinned);
      setScale(Math.max(0.72, Math.min(1, window.innerHeight / 816)));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [reduced]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!pinned) return;
    const current = activeRef.current;
    let next = current;
    if (current === 0 && value >= 1 / 3 + 0.01) next = 1;
    else if (current === 1 && value < 1 / 3 - 0.01) next = 0;
    else if (current === 1 && value >= 2 / 3 + 0.01) next = 2;
    else if (current === 2 && value < 2 / 3 - 0.01) next = 1;
    if (next !== current) {
      activeRef.current = next;
      setActiveStep(next);
    }
  });

  const scrollToStep = useCallback((index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const top = wrapper.getBoundingClientRect().top + window.scrollY;
    const target = top + window.innerHeight * 3 * HOW_BANDS[index];
    window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  return <section ref={wrapperRef} id="how-it-works" className={`how-section${pinned ? ' is-pinned' : ' is-stacked'}`} style={{ '--how-pin-distance': HOW_PIN_DISTANCE } as CSSProperties}>
    {pinned ? <div className="how-sticky"><div className="how-pinned-content" style={{ '--how-scale': scale } as CSSProperties}>
      <HowCopy activeStep={activeStep} progress={scrollYProgress} onSelect={scrollToStep} />
      <WindowStage activeStep={activeStep} reduced={reduced} />
    </div></div> : <StackedHowItWorks reduced={reduced} />}
  </section>;
}
