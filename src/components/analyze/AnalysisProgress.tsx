"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CheckCircle2, CircleDashed, Sparkles } from "lucide-react";

const STEPS = ["Reading the listing…", "Checking price and specs…", "Spotting risks…", "Preparing your report…"];

export function AnalysisProgress() {
  const reduced = useReducedMotion() === true;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setStep((value) => Math.min(value + 1, STEPS.length - 1)), 2200);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 px-5 py-8 backdrop-blur-[2px]" role="status" aria-live="polite" aria-label="Preparing your purchase report">
      <div className="w-full max-w-[430px] rounded-[24px] border border-primary-100 bg-primary-50 p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-600"><Sparkles className="h-6 w-6 animate-pulse" aria-hidden="true" /></span>
        <h2 className="mt-4 text-xl font-semibold text-ink">Building your decision report</h2>
        <p className="mt-2 text-sm text-ink-muted">This usually takes a few seconds.</p>
        <div className="mt-6 space-y-3 text-left">
          {STEPS.map((label, index) => <div key={label} className="flex items-center gap-3 text-sm"><span className={index < step ? "text-status-success" : index === step ? "text-primary-600" : "text-ink-faint"}>{index < step ? <CheckCircle2 className="h-4 w-4" /> : <CircleDashed className={index === step ? "h-4 w-4 animate-spin" : "h-4 w-4"} />}</span><span className={index <= step ? "font-medium text-ink" : "text-ink-faint"}>{label}</span></div>)}
        </div>
      </div>
    </div>
  );
}
