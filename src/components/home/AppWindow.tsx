"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Search } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { HOW_ASSETS } from "./howItWorksData";

export type AppWindowKind = "product" | "priorities" | "report";

type AppWindowProps = {
  kind: AppWindowKind;
  active: boolean;
  reduced?: boolean;
};

const typeText = (
  text: string,
  setter: (value: string) => void,
  timers: number[],
  start: number,
  speed = 45,
) => {
  [...text].forEach((character, index) => {
    timers.push(window.setTimeout(() => setter(text.slice(0, index + 1)), start + index * speed));
  });
};

function WindowChrome() {
  return (
    <div className="how-window-chrome">
      <div className="how-window-dots" aria-hidden="true">
        <i /><i /><i />
      </div>
      <div className="how-window-address">
        <Search aria-hidden="true" />
        <span>BuyLens AI / Analyze a purchase</span>
      </div>
    </div>
  );
}

function WindowHeading({ children }: { children: ReactNode }) {
  return (
    <div className="how-window-heading">
      <h3>{children}</h3>
      <span>Example</span>
    </div>
  );
}

function HeadphoneThumb() {
  return (
    <span className="how-window-thumb">
      <Image src={HOW_ASSETS.headphone} alt="" width={38} height={38} aria-hidden="true" />
    </span>
  );
}

function WindowProducts({ active, reduced }: Omit<AppWindowProps, "kind">) {
  const fullQuery = "Wireless headphones";
  const [query, setQuery] = useState(reduced && active ? fullQuery : "");
  const [showResult, setShowResult] = useState(reduced && active);
  const [showDetails, setShowDetails] = useState(reduced && active);

  useEffect(() => {
    const timers: number[] = [];
    if (!active) {
      timers.push(window.setTimeout(() => {
        setQuery("");
        setShowResult(false);
        setShowDetails(false);
      }, 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    if (reduced) {
      timers.push(window.setTimeout(() => {
        setQuery(fullQuery);
        setShowResult(true);
        setShowDetails(true);
      }, 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    typeText(fullQuery, setQuery, timers, 300);
    timers.push(window.setTimeout(() => setShowResult(true), 300 + fullQuery.length * 45 + 120));
    timers.push(window.setTimeout(() => setShowDetails(true), 300 + fullQuery.length * 45 + 300));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active, reduced]);

  return (
    <div className="how-window-body">
      <WindowHeading>Choose a product</WindowHeading>
      <div className="how-window-search-row">
        <Search aria-hidden="true" />
        <span>{query || "Search for a product"}</span>
        <button type="button">Find</button>
      </div>
      <motion.div className="how-window-result" initial={false} animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : 8 }}>
        <HeadphoneThumb />
        <strong>Wireless headphones</strong>
        <span className="how-window-status">Product found</span>
      </motion.div>
      <motion.div className="how-window-detail-block" initial={false} animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 8 }}>
        <p className="how-window-label">Product details</p>
        {[['Type', 'Over-ear, wireless'], ['Price', '$199'], ['Rating', '4.4 (2,310 reviews)']].map(([label, value]) => (
          <div className="how-window-detail-row" key={label}><i /> <span>{label}</span><strong>{value}</strong></div>
        ))}
        <p className="how-window-label how-window-label-gap">Features</p>
        {['40mm driver', 'Active noise cancelling', '30h battery'].map((feature) => (
          <div className="how-window-detail-row" key={feature}><i /> <span>{feature}</span></div>
        ))}
      </motion.div>
      <button type="button" className="how-window-primary">Confirm product</button>
    </div>
  );
}

const PRIORITY_CHIPS = ['Battery life', 'Price', 'Comfort', 'Sound quality', 'Noise cancelling', 'Durability'];

function WindowPriorities({ active, reduced }: Omit<AppWindowProps, "kind">) {
  const fullUse = "Commuting and everyday listening";
  const fullNote = "I need something comfortable for long commutes.";
  const [useFor, setUseFor] = useState(reduced && active ? fullUse : "");
  const [note, setNote] = useState(reduced && active ? fullNote : "");
  const [selected, setSelected] = useState<string[]>(reduced && active ? ['Battery life', 'Price'] : []);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timers: number[] = [];
    if (!active) {
      timers.push(window.setTimeout(() => {
        setUseFor("");
        setNote("");
        setSelected([]);
        setPulse(false);
      }, 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    if (reduced) {
      timers.push(window.setTimeout(() => {
        setUseFor(fullUse);
        setNote(fullNote);
        setSelected(['Battery life', 'Price']);
        setPulse(false);
      }, 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    typeText(fullUse, setUseFor, timers, 300);
    timers.push(window.setTimeout(() => setSelected(['Battery life']), 300 + fullUse.length * 45 + 180));
    timers.push(window.setTimeout(() => setSelected(['Battery life', 'Price']), 300 + fullUse.length * 45 + 480));
    typeText(fullNote, setNote, timers, 300 + fullUse.length * 45 + 700, 35);
    timers.push(window.setTimeout(() => setPulse(true), 300 + fullUse.length * 45 + 700 + fullNote.length * 35 + 180));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active, reduced]);

  return (
    <div className="how-window-body">
      <WindowHeading>Your priorities</WindowHeading>
      <div className="how-window-product-row"><HeadphoneThumb /><strong>Wireless headphones</strong><span className="how-window-status"><i />Product confirmed</span></div>
      <label className="how-window-field-label">What will you use it for?</label>
      <div className="how-window-input">{useFor}</div>
      <label className="how-window-field-label">What&apos;s most important to you?</label>
      <div className="how-window-chip-grid">
        {PRIORITY_CHIPS.map((chip) => {
          const isSelected = selected.includes(chip);
          return <span key={chip} className={`how-window-chip${isSelected ? ' is-selected' : ''}`}><motion.i initial={false} animate={{ scale: isSelected ? 1 : 0 }}><Check aria-hidden="true" /></motion.i>{chip}</span>;
        })}
      </div>
      <label className="how-window-field-label">Anything else we should know?</label>
      <div className="how-window-textarea">{note}</div>
      <button type="button" className={`how-window-primary${pulse ? ' is-pulsing' : ''}`}>Generate my analysis</button>
    </div>
  );
}

const STRENGTHS = ['30h battery suits daily commutes', '$199, 20% below its usual price', 'Noise cancelling works well on transport'];
const TRADE_OFFS = ['Comfort reviews are mixed on long wear', 'Some reports of failures within weeks', 'Bulkier than similar models'];

function WindowReport({ active, reduced }: Omit<AppWindowProps, "kind">) {
  const [score, setScore] = useState(reduced && active ? 78 : 0);
  const [showBody, setShowBody] = useState(reduced && active);
  useEffect(() => {
    const timers: number[] = [];
    if (!active) {
      timers.push(window.setTimeout(() => {
        setScore(0);
        setShowBody(false);
      }, 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    if (reduced) {
      timers.push(window.setTimeout(() => {
        setScore(78);
        setShowBody(true);
      }, 0));
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    let frame = 0;
    const start = window.setTimeout(() => {
      const started = performance.now();
      const tick = (now: number) => {
        const value = Math.min(78, Math.round(((now - started) / 900) * 78));
        setScore(value);
        if (value < 78) frame = window.requestAnimationFrame(tick);
        else setShowBody(true);
      };
      frame = window.requestAnimationFrame(tick);
    }, 300);
    return () => { window.clearTimeout(start); if (frame) window.cancelAnimationFrame(frame); };
  }, [active, reduced]);

  const circumference = 2 * Math.PI * 23;
  const offset = circumference * (1 - score / 100);
  return (
    <div className="how-window-body">
      <WindowHeading>Your decision report</WindowHeading>
      <div className="how-report-verdict">
        <div className="how-score-ring">
          <svg viewBox="0 0 56 56" aria-hidden="true"><circle className="how-score-track" cx="28" cy="28" r="23" /><circle className="how-score-progress" cx="28" cy="28" r="23" style={{ strokeDasharray: circumference, strokeDashoffset: offset }} /></svg>
          <strong>{score}</strong><small>SCORE</small>
        </div>
        <div><strong>Worth considering</strong><p>A strong match for commuting, with some comfort concerns.</p></div>
      </div>
      <motion.div className="how-report-sections" initial={false} animate={{ opacity: showBody ? 1 : 0, y: showBody ? 0 : 8 }}>
        <ReportList title="Strengths" items={STRENGTHS} positive />
        <ReportList title="Trade-offs" items={TRADE_OFFS} />
      </motion.div>
      <button type="button" className="how-window-primary">Save my report</button>
    </div>
  );
}

function ReportList({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return <div className="how-report-list"><p className="how-window-label">{title}</p>{items.map((item) => <div key={item}><span className={positive ? 'how-report-check' : 'how-report-alert'}>{positive ? <Check aria-hidden="true" /> : <AlertTriangle aria-hidden="true" />}</span><span>{item}</span></div>)}</div>;
}

export function AppWindow({ kind, active, reduced = false }: AppWindowProps) {
  return (
    <div className="how-app-window" aria-hidden="true" inert>
      <WindowChrome />
      {kind === 'product' ? <WindowProducts active={active} reduced={reduced} /> : null}
      {kind === 'priorities' ? <WindowPriorities active={active} reduced={reduced} /> : null}
      {kind === 'report' ? <WindowReport active={active} reduced={reduced} /> : null}
    </div>
  );
}
