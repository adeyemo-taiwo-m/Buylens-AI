"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { HOW_BANDS, HOW_STEPS } from "./howItWorksData";

type StepTrackerProps = {
  activeStep: number;
  progress: MotionValue<number>;
  onSelect: (index: number) => void;
};

const HEAD_POINTS = [41, 121, 201];

const rowTopsFor = (activeStep: number) => {
  if (activeStep === 0) return [0, 163, 243];
  if (activeStep === 1) return [0, 80, 243];
  return [0, 80, 160];
};

export function StepTracker({ activeStep, progress, onSelect }: StepTrackerProps) {
  const headY = useTransform(progress, [0, HOW_BANDS[0], HOW_BANDS[1], HOW_BANDS[2], 1], [15, HEAD_POINTS[0], HEAD_POINTS[1], HEAD_POINTS[2], HEAD_POINTS[2]]);
  const fillHeight = useTransform(headY, (value) => Math.max(0, value - 15));
  const rowTops = rowTopsFor(activeStep);

  return (
    <div className="how-step-tracker" aria-label="How it works steps">
      <motion.div className="how-step-line-fill" style={{ height: fillHeight }} />
      <div className="how-step-line-dashed" aria-hidden="true" />
      <motion.div className="how-step-line-head" style={{ y: headY }} aria-hidden="true" />
      {HOW_STEPS.map((step, index) => {
        const isActive = activeStep === index;
        const isComplete = activeStep > index;
        return (
          <motion.button
            type="button"
            key={step.id}
            className={`how-step-row${isActive ? ' is-active' : ''}`}
            style={{ top: rowTops[index] }}
            onClick={() => onSelect(index)}
            aria-current={isActive ? 'step' : undefined}
            aria-label={`Step ${index + 1} of 3: ${step.title}`}
            layout
          >
            <span className={`how-step-status${isComplete ? ' is-complete' : ''}${isActive ? ' is-current' : ''}`} aria-hidden="true">
              {isComplete ? <Check /> : null}
            </span>
            {isActive ? (
              <span className="how-step-card">
                <span className="how-step-card-number">{step.number}</span>
                <span className="how-step-card-copy"><strong>{step.title}</strong><small>{step.description}</small></span>
              </span>
            ) : (
              <span className="how-step-collapsed"><span>{step.number}</span><strong>{step.title}</strong></span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
