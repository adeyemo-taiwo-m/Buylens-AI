"use client";

import { useEffect, useRef, useState } from "react";
import { AppWindow, type AppWindowKind } from "./AppWindow";
import { HOW_STEPS } from "./howItWorksData";

const kindFor = (index: number): AppWindowKind => index === 0 ? 'product' : index === 1 ? 'priorities' : 'report';

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
  return <div ref={outerRef} className="how-stacked-preview" style={{ height: 469 * scale }}><div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 441, height: 469 }}><AppWindow kind={kind} active={active} reduced={reduced} /></div></div>;
}

export function StackedHowItWorks({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState<Set<number>>(() => reduced ? new Set([0, 1, 2]) : new Set());
  useEffect(() => {
    if (reduced) return;
    const root = sectionRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      setSeen((current) => {
        const next = new Set(current);
        entries.forEach((entry) => {
          if (entry.isIntersecting) next.add(Number((entry.target as HTMLElement).dataset.howStackStep));
        });
        return next;
      });
    }, { threshold: 0.4 });
    root.querySelectorAll<HTMLElement>('[data-how-stack-step]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div ref={sectionRef} className="how-stacked-inner">
      <div className="how-copy how-stacked-copy">
        <div className="how-badge">HOW IT WORKS</div>
        <h2 className="how-title"><span>From Product Research</span><span>To A Clearer Decision.</span></h2>
        <p className="how-subtitle">Three simple steps to help you understand a product, evaluate the trade-offs and decide what makes sense for you.</p>
      </div>
      <div className="how-stacked-steps">
        {HOW_STEPS.map((step, index) => {
          const isSeen = seen.has(index);
          return <article className="how-stacked-step" data-how-stack-step={index} key={step.id}>
            <div className="how-stacked-rail"><span className={isSeen ? 'is-complete' : ''}>{isSeen ? '✓' : ''}</span>{index < HOW_STEPS.length - 1 ? <i /> : null}</div>
            <div className="how-stacked-content">
              <div className="how-stacked-card"><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.description}</p></div></div>
              <StackedPreview kind={kindFor(index)} active={isSeen} reduced={reduced} />
            </div>
          </article>;
        })}
      </div>
    </div>
  );
}
