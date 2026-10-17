"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Check, ChevronDown, ChevronUp, Headphones, Minus, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode, type RefObject } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Reveal } from "@/components/ui/Reveal";
import { MOTION_EASE, REVEAL_VARIANTS } from "@/lib/motion";
import { PROBLEM_ASSETS } from "./problemData";
import { DECISION_FEATURES, REPORT_ACCORDION_ROWS } from "./decisionFeaturesData";

const EASE = MOTION_EASE;
const revealVariants = REVEAL_VARIANTS;

function useCardSpotlight() {
  const frame = useRef<number | null>(null);
  const nextPosition = useRef({ x: "50%", y: "50%" });
  const onPointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    nextPosition.current = { x: `${event.clientX - rect.left}px`, y: `${event.clientY - rect.top}px` };
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      element.style.setProperty("--mx", nextPosition.current.x);
      element.style.setProperty("--my", nextPosition.current.y);
      frame.current = null;
    });
  }, []);
  useEffect(() => () => { if (frame.current !== null) window.cancelAnimationFrame(frame.current); }, []);
  return onPointerMove;
}

function useTouchReveal(cardRef: RefObject<HTMLElement | null>) {
  const [isTouch, setIsTouch] = useState(false);
  const isInView = useInView(cardRef, { amount: 0.6, once: true });
  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isTouch && isInView;
}

function DecisionCard({ children, className = "", delay = 0, cardRef }: { children: ReactNode; className?: string; delay?: number; cardRef?: RefObject<HTMLElement | null> }) {
  const onPointerMove = useCardSpotlight();
  return (
    <Reveal
      as="article"
      ref={cardRef}
      className={`decision-card ${className}`}
      delay={delay}
      onPointerMove={onPointerMove}
    >
      <div className="decision-card-content">{children}</div>
    </Reveal>
  );
}

type DecisionStatus = "success" | "warning" | "info";

function AnimatedStatus({ status, size = 27, delay = 0 }: { status: DecisionStatus; size?: number; delay?: number }) {
  const reduced = useReducedMotion() === true;
  const iconDelay = status === "success" ? delay + 0.1 : delay;
  return (
    <motion.span aria-hidden="true" className={`decision-status-circle decision-status-${status}`} style={{ width: size, height: size }} initial={{ scale: reduced ? 1 : 0 }} whileInView={reduced ? undefined : { scale: 1 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: reduced ? 0 : 0.22, delay, ease: EASE }}>
      {status === "success" && <svg viewBox="0 0 24 24"><motion.path d="m7 12.5 3.2 3.2L17.5 8.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: reduced ? 1 : 0 }} whileInView={reduced ? undefined : { pathLength: 1 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: reduced ? 0 : 0.25, delay: iconDelay, ease: "easeOut" }} /></svg>}
      {status === "warning" && <motion.span initial={{ scaleX: reduced ? 1 : 0 }} whileInView={reduced ? undefined : { scaleX: 1 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: reduced ? 0 : 0.2, delay: iconDelay, ease: EASE }}><Minus aria-hidden="true" strokeWidth={2.5} /></motion.span>}
      {status === "info" && <motion.span initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.8 }} whileInView={reduced ? undefined : { opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: reduced ? 0 : 0.22, delay: iconDelay, ease: EASE }}><Search aria-hidden="true" /></motion.span>}
    </motion.span>
  );
}

function ReportAccordion() {
  const [openRow, setOpenRow] = useState<string | null>(REPORT_ACCORDION_ROWS[0].id);
  const reduced = useReducedMotion() === true;
  return (
    <div className="decision-report-preview">
      <div className="decision-preview-label">YOUR REPORT</div>
      <div className="decision-product-summary">
        <Image src={PROBLEM_ASSETS.headphoneIcon} alt="" width={43} height={43} className="decision-product-thumb" />
        <div><strong>Wireless headphones</strong><span className="decision-confirmed"><i />Product confirmed</span></div>
      </div>
      <div className="decision-accordion">
        {REPORT_ACCORDION_ROWS.map((row, index) => {
          const open = openRow === row.id;
          const contentId = `decision-report-row-${row.id}`;
          return (
            <div className={`decision-accordion-item decision-accordion-item-${row.status}`} key={row.id}>
              <button type="button" className="decision-accordion-trigger" aria-expanded={open} aria-controls={contentId} onClick={() => setOpenRow(open ? null : row.id)}>
                <AnimatedStatus status={row.status} size={27} delay={index * 0.1} />
                <span className="decision-accordion-title">{row.title}</span>
                {open ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
              </button>
              <AnimatePresence initial={false}>
                {open && <motion.div id={contentId} key={`${row.id}-content`} className="decision-accordion-content" initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduced ? undefined : { height: 0, opacity: 0 }} transition={{ height: { duration: reduced ? 0 : 0.3, ease: EASE }, opacity: { duration: reduced ? 0 : 0.18 } }}>
                  <ul>{row.bullets.map((bullet, bulletIndex) => <motion.li key={`${row.id}-${bulletIndex}`} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : bulletIndex * 0.06, duration: reduced ? 0 : 0.22, ease: EASE }}><i />{bullet}</motion.li>)}</ul>
                </motion.div>}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScorePeekCard({ report = false }: { report?: boolean }) {
  return <div className={`decision-peek-card ${report ? "decision-peek-report" : "decision-peek-details"}`}>
    <div className="decision-peek-title">{report ? "Your decision report" : "Product details"}</div>
    {report ? <div className="decision-score-ring"><strong>78</strong><span>SCORE</span></div> : <><Headphones className="decision-peek-headphones" aria-hidden="true" /><span className="decision-peek-skeleton" /><span className="decision-peek-skeleton short" /></>}
  </div>;
}

function FeatureChip({ label, selected, faded = false, onToggle }: { label: string; selected: boolean; faded?: boolean; onToggle: () => void }) {
  return <button type="button" className={`decision-feature-chip${selected ? " is-selected" : ""}${faded ? " decision-secondary-chip" : ""}`} aria-pressed={selected} onClick={onToggle}>
    <motion.span className="decision-chip-check" animate={{ scale: selected ? 1 : 0 }} transition={{ duration: 0.15, ease: EASE }}><Check aria-hidden="true" /></motion.span><span>{label}</span>
  </button>;
}

function AnalysisPanel() {
  const [upperBudget, setUpperBudget] = useState(250);
  const [useCase, setUseCase] = useState("Commuting");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([...DECISION_FEATURES.selectedFeatures]);
  const toggleFeature = (label: string) => setSelectedFeatures((current) => current.includes(label) ? current.filter((feature) => feature !== label) : [...current, label]);
  const budgetProgress = `${((upperBudget - 50) / 450) * 100}%`;
  return <div className="decision-analysis-panel">
    <div className="decision-preview-label">YOUR REPORT</div>
    <div className="decision-panel-row decision-budget-row"><span>Budget</span><label className="decision-slider" style={{ "--budget-progress": budgetProgress } as CSSProperties}><input type="range" min="50" max="500" step="10" value={upperBudget} aria-label="Maximum budget" aria-valuetext={`$150 - $${upperBudget}`} onChange={(event) => setUpperBudget(Math.max(200, Number(event.target.value)))} /></label><strong>$150 - ${upperBudget}</strong></div>
    <div className="decision-panel-row decision-use-row"><span>Everyday use</span><label className="decision-select-wrap"><select value={useCase} aria-label="Everyday use" onChange={(event) => setUseCase(event.target.value)}><option>Commuting</option><option>Gym</option><option>Travel</option><option>Office</option></select><ChevronDown aria-hidden="true" /></label></div>
    <div className="decision-panel-row decision-must-row"><span>Must-have features:</span><div className="decision-chip-groups"><div className="decision-chip-row">{DECISION_FEATURES.selectedFeatures.map((label) => <FeatureChip key={label} label={label} selected={selectedFeatures.includes(label)} onToggle={() => toggleFeature(label)} />)}</div><div className="decision-chip-row decision-secondary-chip-row">{DECISION_FEATURES.secondaryFeatures.map((label) => <FeatureChip key={label} label={label} selected={selectedFeatures.includes(label)} faded onToggle={() => toggleFeature(label)} />)}</div></div></div>
  </div>;
}

function AnalysisNeedsCard() {
  const cardRef = useRef<HTMLElement>(null);
  const touchRevealed = useTouchReveal(cardRef);
  return <DecisionCard cardRef={cardRef} delay={0.08} className={`decision-card-wide decision-card-b${touchRevealed ? " is-touch-revealed" : ""}`}>
    <div className="decision-card-b-copy"><h3>Analysis around your<br />needs</h3><p>Evaluate a product against your budget, intended use and personal priorities, not features in isolation.</p><div className="decision-peek-stage" aria-hidden="true"><ScorePeekCard /><ScorePeekCard report /></div></div>
    <AnalysisPanel />
  </DecisionCard>;
}

const TRADEOFFS = [
  { id: "works", title: "What works in its favor", detail: "Benefits relevant to your priorities", status: "success" as const },
  { id: "closer", title: "What deserves a closer look", detail: "Limitations and details to verify", status: "warning" as const },
];

function TradeoffCard() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion() === true;
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
  }, []);

  const emphasize = (id: string) => {
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    setActive(id);
    resetTimer.current = setTimeout(() => setActive(null), 4500);
  };
  return <DecisionCard delay={0.16} className="decision-card-c"><h3>Clearer trade-offs</h3><p>Understand what a product offers, where it may fall short and which compromises deserve attention.</p><div className="decision-tradeoff-grid">{TRADEOFFS.map((item, index) => { const emphasized = active === item.id; return <motion.button type="button" key={item.id} className={"decision-mini-card decision-mini-card-" + item.status + (hovered && hovered !== item.id ? " is-dimmed" : "")} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(item.id)} onBlur={() => setHovered(null)} onClick={() => emphasize(item.id)} aria-pressed={emphasized} animate={{ scale: emphasized && !reduced ? 1.06 : 1, rotate: emphasized && !reduced ? (index === 0 ? -2 : 2) : 0, zIndex: emphasized ? 2 : 1 }} whileHover={reduced ? undefined : { y: -3 }} transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}><span className="decision-mini-heading"><AnimatedStatus status={item.status} size={24} delay={index * 0.15} /><strong>{item.title}</strong></span><span className="decision-mini-detail">{item.detail}</span></motion.button>; })}</div></DecisionCard>;
}

function LegacyHistoryCard() {
  const cardRef = useRef<HTMLElement>(null);
  const touchRevealed = useTouchReveal(cardRef);
  const [expanded, setExpanded] = useState<string | null>(null);
  return <DecisionCard cardRef={cardRef} delay={0.24} className={`decision-card-d${touchRevealed ? " is-touch-revealed" : ""}`}><h3>Purchase analysis<br />history</h3><p>Return to previous analyses and revisit your research when you&apos;re ready to decide.</p><div className="decision-history-stack">{DECISION_FEATURES.historyItems.map((item, index) => { const isExpanded = expanded === item.id; return <button type="button" key={item.id} className={`decision-history-item decision-history-item-${index + 1}`} onClick={() => setExpanded(isExpanded ? null : item.id)} aria-expanded={isExpanded}><Image src={PROBLEM_ASSETS.headphoneIcon} alt="" width={28} height={28} /><span><strong>{item.title}</strong><small>{item.detail}</small></span><ChevronDown aria-hidden="true" /><AnimatePresence initial={false}>{isExpanded && <motion.span className="decision-history-extra" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }}>Analysed 3 days ago · Score 78</motion.span>}</AnimatePresence></button>; })}</div></DecisionCard>;
}

function HistoryCard() {
  const cardRef = useRef<HTMLElement>(null);
  const touchRevealed = useTouchReveal(cardRef);
  const reduced = useReducedMotion() === true;
  const products = DECISION_FEATURES.historyProducts;
  const [pinnedIndex, setPinnedIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [zIndexFront, setZIndexFront] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const hoverEnterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const demoTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const demoStarted = useRef(false);
  const demoCanceled = useRef(false);
  const shownIndex = hovering ? (pinnedIndex === 0 ? 1 : 0) : pinnedIndex;
  const announcement = "Showing " + products[shownIndex].title;

  useEffect(() => {
    if (shownIndex === zIndexFront) return;
    setIsSwapping(true);
    const zTimer = setTimeout(() => setZIndexFront(shownIndex), reduced ? 0 : 180);
    const doneTimer = setTimeout(() => setIsSwapping(false), reduced ? 200 : 450);
    return () => {
      clearTimeout(zTimer);
      clearTimeout(doneTimer);
    };
  }, [reduced, shownIndex, zIndexFront]);

  useEffect(() => () => {
    if (hoverEnterTimer.current !== null) clearTimeout(hoverEnterTimer.current);
    if (hoverLeaveTimer.current !== null) clearTimeout(hoverLeaveTimer.current);
    demoTimers.current.forEach((timer) => clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (!touchRevealed || reduced || demoStarted.current || demoCanceled.current) return;
    demoStarted.current = true;
    const swapToLaptop = setTimeout(() => {
      if (demoCanceled.current) return;
      setPinnedIndex(1);
    }, 1000);
    const swapBack = setTimeout(() => {
      if (demoCanceled.current) return;
      setPinnedIndex(0);
    }, 3000);
    demoTimers.current = [swapToLaptop, swapBack];
    return () => {
      clearTimeout(swapToLaptop);
      clearTimeout(swapBack);
    };
  }, [products, reduced, touchRevealed]);

  const cancelDemo = () => {
    demoCanceled.current = true;
    demoTimers.current.forEach((timer) => clearTimeout(timer));
  };

  const selectProduct = (index: number) => {
    cancelDemo();
    setHovering(false);
    setPinnedIndex(index);
  };

  const swapToOther = () => selectProduct(pinnedIndex === 0 ? 1 : 0);

  const handleStackEnter = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (hoverLeaveTimer.current !== null) clearTimeout(hoverLeaveTimer.current);
    if (hoverEnterTimer.current !== null) clearTimeout(hoverEnterTimer.current);
    hoverEnterTimer.current = setTimeout(() => setHovering(true), 150);
  };

  const handleStackLeave = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (hoverEnterTimer.current !== null) clearTimeout(hoverEnterTimer.current);
    if (hoverLeaveTimer.current !== null) clearTimeout(hoverLeaveTimer.current);
    hoverLeaveTimer.current = setTimeout(() => setHovering(false), 300);
  };

  return <DecisionCard cardRef={cardRef} delay={0.24} className="decision-card-d">
    <h3>Purchase analysis<br />history</h3>
    <p>Return to previous analyses and revisit your research when you&apos;re ready to decide.</p>
    <div className="decision-history-stack" role="group" aria-label="Purchase analysis history">
      <div className="decision-history-deck" onMouseEnter={handleStackEnter} onMouseLeave={handleStackLeave}>
        {products.map((product, index) => {
          const isFront = index === shownIndex;
          const nextProduct = products[(pinnedIndex + 1) % products.length];
          return <motion.button
            type="button"
            key={product.id}
            className={"decision-history-product decision-history-product-" + index}
            initial={reduced ? { y: 0, scale: 1, opacity: isFront ? 1 : 0 } : { y: index === 0 ? 0 : 25, scale: index === 0 ? 1 : 0.97, opacity: index === 0 ? 1 : 0.6 }}
            animate={reduced ? { y: 0, scale: 1, opacity: isFront ? 1 : 0 } : isFront ? { y: [25, 0], scale: [0.97, 1], opacity: [0.6, 1] } : { y: [0, -6, 25], scale: [1, 0.99, 0.97], opacity: [1, 0.8, 0.6] }}
            transition={reduced ? { duration: 0.2, ease: "easeOut" } : { duration: 0.45, times: isFront ? [0, 1] : [0, 0.25, 1], ease: EASE }}
            style={{ zIndex: index === zIndexFront ? 2 : 1, willChange: isSwapping ? "transform" : undefined }}
            tabIndex={isFront ? 0 : -1}
            aria-hidden={isFront ? undefined : true}
            aria-label={isFront ? "Showing " + product.title + ". Press to show " + nextProduct.title : undefined}
            onClick={swapToOther}
          >
            <Image src={product.src} alt="" width={28} height={28} />
            <span><strong>{product.title}</strong><small>{product.detail}</small></span>
            <ChevronDown aria-hidden="true" />
          </motion.button>;
        })}
      </div>
    </div>
    <span className="sr-only" aria-live="polite">{announcement}</span>
  </DecisionCard>;
}

export function DecisionFeaturesSection() {
  const reduced = useReducedMotion() === true;
  const headerTransition = (delay: number) => ({ duration: reduced ? 0 : 0.6, delay, ease: EASE });
  return <motion.section id="features" className="decision-features-section"><div className="decision-features-inner">
    <div className="decision-features-header"><motion.div initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "visible"} variants={revealVariants} transition={headerTransition(0)}><SectionBadge>BUILT FOR BETTER DECISIONS</SectionBadge></motion.div><motion.h2 initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "visible"} variants={revealVariants} transition={headerTransition(0.09)}><span>Everything You Need To Look</span><span>Beyond The Product Page.</span></motion.h2><motion.p initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "visible"} variants={revealVariants} transition={headerTransition(0.18)}>Bring the important parts of purchase research into one structured experience, so you can focus on making the right decision for your needs.</motion.p></div>
    <div className="decision-features-grid"><DecisionCard delay={0} className="decision-card-a"><h3>Structured decision<br />reports</h3><p>See product strengths, potential drawbacks and important considerations organized in one clear report.</p><ReportAccordion /></DecisionCard><AnalysisNeedsCard /><TradeoffCard /><HistoryCard /></div>
    <motion.div initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "visible"} variants={revealVariants} transition={headerTransition(0.55)} className="decision-features-cta-wrap"><Link href="/analyze" className="decision-features-cta">Analyze a purchase <ArrowRight aria-hidden="true" /></Link></motion.div>
  </div></motion.section>;
}
