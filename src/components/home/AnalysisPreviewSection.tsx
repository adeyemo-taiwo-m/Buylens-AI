"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Copy, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { MOTION_EASE } from "@/lib/motion";
import { ANALYSIS_PREVIEW_DATA, PLAY_ONCE, type AnalysisTooltipItem } from "./analysisPreviewData";

const PRODUCT_IMAGE = "/analysis/solar.png";
const EASE = MOTION_EASE;
const SCORE = ANALYSIS_PREVIEW_DATA.product.score;
const PETAL_COUNT = 9;
const GAUGE_ANGLES = [-80, -60, -40, -20, 0, 20, 40, 60, 80] as const;

type GaugePoint = { x: number; y: number };

function createGaugePetalPath() {
  const points: GaugePoint[] = [
    { x: -7, y: -48 },
    { x: -11.5, y: -108 },
    { x: 11.5, y: -108 },
    { x: 7, y: -48 },
  ];
  const cornerRadii = [4, 7, 7, 4];
  const moveAlong = (from: GaugePoint, to: GaugePoint, distance: number) => {
    const length = Math.hypot(to.x - from.x, to.y - from.y);
    const ratio = Math.min(distance / length, 0.45);
    return { x: from.x + (to.x - from.x) * ratio, y: from.y + (to.y - from.y) * ratio };
  };
  const before = points.map((point, index) => moveAlong(point, points[(index + points.length - 1) % points.length], cornerRadii[index]));
  const after = points.map((point, index) => moveAlong(point, points[(index + 1) % points.length], cornerRadii[index]));
  const format = (point: GaugePoint) => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  return [`M ${format(after[0])}`, `L ${format(before[1])}`, `Q ${format(points[1])} ${format(after[1])}`, `L ${format(before[2])}`, `Q ${format(points[2])} ${format(after[2])}`, `L ${format(before[3])}`, `Q ${format(points[3])} ${format(after[3])}`, `L ${format(before[0])}`, `Q ${format(points[0])} ${format(after[0])}`, "Z"].join(" ");
}

const GAUGE_PETAL_PATH = createGaugePetalPath();

function useCountUp(target: number, active: boolean, reduced: boolean, duration = 900) {
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reduced) {
      const frame = window.requestAnimationFrame(() => setValue(target));
      return () => window.cancelAnimationFrame(frame);
    }

    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, duration, reduced, target]);

  return value;
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  }
}

function ProductVisual() {
  const [missing, setMissing] = useState(false);

  return (
    <div className="relative flex h-[171px] w-[152px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-[#F1F6FE] max-[1023px]:h-[96px] max-[1023px]:w-[96px]">
      {!missing ? (
        <Image src={PRODUCT_IMAGE} alt="5kVA hybrid inverter and lithium battery" fill sizes="(max-width: 1023px) 96px, 152px" className="object-contain" onError={() => setMissing(true)} />
      ) : (
        <div aria-hidden="true" className="flex flex-col items-center justify-center text-center text-[#2563EB]">
          <div className="flex items-end gap-1.5">
            <span className="h-14 w-9 rounded-[5px] border-2 border-[#8DB9F6] bg-white shadow-[3px_3px_0_#C9DFFF] max-[1023px]:h-9 max-[1023px]:w-6" />
            <span className="h-11 w-8 rounded-[4px] border-2 border-[#8DB9F6] bg-white shadow-[3px_3px_0_#C9DFFF] max-[1023px]:h-7 max-[1023px]:w-5" />
          </div>
          <span className="mt-3 text-[11px] font-bold tracking-[0.08em] max-[1023px]:mt-1 max-[1023px]:text-[7px]">5KVA SYSTEM</span>
        </div>
      )}
    </div>
  );
}

function BuyScoreGauge({ active, reduced, score }: { active: boolean; reduced: boolean; score: number }) {
  const [hovered, setHovered] = useState(false);
  const filledPetals = Math.round((score / 100) * PETAL_COUNT);

  return (
    <div className="group/gauge relative mt-4 flex flex-col items-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}>
      <svg viewBox="0 0 217 112" className="h-auto w-[217px] max-w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]" tabIndex={0} role="img" aria-label={`Buy score ${SCORE} percent, worth considering`}>
        <defs>
          <clipPath id="buy-score-gauge-clip"><rect x="0" y="0" width="217" height="112" /></clipPath>
        </defs>
        <g clipPath="url(#buy-score-gauge-clip)">
          {GAUGE_ANGLES.map((angle, index) => {
            const filled = active && index < filledPetals;
            return (
              <g key={angle} transform={`translate(108.5 112) rotate(${angle})`}>
                <motion.path
                  d={GAUGE_PETAL_PATH}
                  className={filled ? "fill-[#2563EB]" : "fill-[#D9D9D9]"}
                  initial={reduced ? false : { opacity: 1, scale: 0.9 }}
                  animate={{ fill: filled ? "#2563EB" : "#D9D9D9", opacity: 1, scale: hovered && !reduced ? 1.05 : active ? 1 : 0.9 }}
                  transition={{ fill: { duration: reduced ? 0 : 0.18, delay: reduced ? 0 : index * 0.08 }, opacity: { duration: reduced ? 0 : 0.18 }, scale: { duration: reduced ? 0 : 0.22, delay: reduced ? 0 : (hovered ? index * 0.04 : index * 0.08), ease: EASE } }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              </g>
            );
          })}
        </g>
      </svg>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-[10px] z-10 text-[26px] font-medium leading-none tabular-nums text-[#0F1B33]">{score}%</span>
      <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-20 w-[220px] -translate-x-1/2 translate-y-1 rounded-[10px] border border-[#E4ECF8] bg-white px-3 py-2 text-center text-xs leading-[1.35] text-[#42516A] opacity-0 shadow-[0_8px_24px_rgba(15,27,51,0.12)] transition duration-150 group-hover/gauge:translate-y-0 group-hover/gauge:opacity-100 group-focus-within/gauge:translate-y-0 group-focus-within/gauge:opacity-100">How the score works: based on price, specs, reviews and warranty clarity.</span>
    </div>
  );
}

function CornerBrackets({ armed, expanded, reduced }: { armed: boolean; expanded: boolean; reduced: boolean }) {
  const transition = { duration: reduced ? 0 : 0.42, ease: EASE };
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
      <motion.span animate={{ x: armed ? (expanded ? -4 : 0) : -36, y: armed ? (expanded ? -4 : 0) : -36, opacity: armed ? 1 : 0 }} transition={transition} className="absolute -left-[14px] -top-[10px] h-[40px] w-[40px] rounded-tl-[14px] border-l-[5px] border-t-[5px] border-[#2563EB] max-[1023px]:-left-[8px] max-[1023px]:-top-[8px] max-[1023px]:h-[24px] max-[1023px]:w-[24px]" />
      <motion.span animate={{ x: armed ? (expanded ? 4 : 0) : 36, y: armed ? (expanded ? -4 : 0) : -36, opacity: armed ? 1 : 0 }} transition={transition} className="absolute -right-[14px] -top-[10px] h-[40px] w-[40px] rounded-tr-[14px] border-r-[5px] border-t-[5px] border-[#2563EB] max-[1023px]:-right-[8px] max-[1023px]:-top-[8px] max-[1023px]:h-[24px] max-[1023px]:w-[24px]" />
      <motion.span animate={{ x: armed ? (expanded ? -4 : 0) : -36, y: armed ? (expanded ? 4 : 0) : 36, opacity: armed ? 1 : 0 }} transition={transition} className="absolute -bottom-[10px] -left-[14px] h-[40px] w-[40px] rounded-bl-[14px] border-b-[5px] border-l-[5px] border-[#2563EB] max-[1023px]:-bottom-[8px] max-[1023px]:-left-[8px] max-[1023px]:h-[24px] max-[1023px]:w-[24px]" />
      <motion.span animate={{ x: armed ? (expanded ? 4 : 0) : 36, y: armed ? (expanded ? 4 : 0) : 36, opacity: armed ? 1 : 0 }} transition={transition} className="absolute -bottom-[10px] -right-[14px] h-[40px] w-[40px] rounded-br-[14px] border-b-[5px] border-r-[5px] border-[#2563EB] max-[1023px]:-bottom-[8px] max-[1023px]:-right-[8px] max-[1023px]:h-[24px] max-[1023px]:w-[24px]" />
    </div>
  );
}

function InfoTooltip({ item, id, tone, openId, setOpenId }: { item: AnalysisTooltipItem; id: string; tone: "green" | "amber"; openId: string | null; setOpenId: (id: string | null) => void }) {
  const open = openId === id;
  return (
    <button
      type="button"
      data-analysis-tooltip-trigger="true"
      aria-describedby={open ? `analysis-tooltip-${id}` : undefined}
      onClick={() => setOpenId(open ? null : id)}
      onFocus={() => setOpenId(id)}
      onBlur={() => setOpenId(null)}
      onKeyDown={(event) => { if (event.key === "Escape") setOpenId(null); }}
      onMouseEnter={() => setOpenId(id)}
      onMouseLeave={() => setOpenId(null)}
      className="group/tooltip relative flex min-w-0 items-start gap-2 text-left text-sm leading-[1.35] text-[#5B6B8C] outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
    >
      <span className={`mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full ${tone === "green" ? "bg-[#4ADE80]" : "bg-[#F5B731]"}`} />
      <span className="min-w-0 flex-1">{item.text}</span>
      {open && <span id={`analysis-tooltip-${id}`} role="tooltip" className="absolute bottom-[calc(100%+8px)] left-0 z-30 w-[220px] rounded-[10px] border border-[#E4ECF8] bg-white px-3 py-2 text-xs font-normal leading-[1.35] text-[#42516A] shadow-[0_8px_24px_rgba(15,27,51,0.12)]">{item.why}<i aria-hidden="true" className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 border-r border-b border-[#E4ECF8] bg-white" /></span>}
    </button>
  );
}

function ProductBox({ kind, active, visible, reduced, openTooltip, setOpenTooltip }: { kind: "promising" | "risks"; active: boolean; visible: boolean; reduced: boolean; openTooltip: string | null; setOpenTooltip: (id: string | null) => void }) {
  const card = ANALYSIS_PREVIEW_DATA[kind];
  const [hovered, setHovered] = useState(false);
  const promising = kind === "promising";
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: hovered && !reduced ? -3 : 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: reduced ? 0 : 0.52, delay: reduced ? 0 : promising ? 0.08 : 0.2, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative h-auto min-h-[107px] overflow-hidden rounded-[14px] border px-[14px] py-[10px] transition-shadow duration-300 ${promising ? "border-[#C6EED6] bg-[#DDF8E6] hover:shadow-[0_12px_28px_rgba(34,197,94,0.18)]" : "border-[#F6E3A2] bg-[#FDF1C9] hover:shadow-[0_12px_28px_rgba(245,158,11,0.18)]"}`}
    >
      <div className={`relative z-10 ${promising ? "pr-[140px]" : "pr-[120px]"}`}>
        <div className="flex items-center gap-3"><span className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-white ${promising ? "bg-[#34C96B]" : "bg-[#F7C03A]"}`}>{promising ? <Check className="h-[17px] w-[17px]" strokeWidth={3} /> : <Search className="h-[17px] w-[17px]" strokeWidth={2.5} />}</span><h3 className="text-xl font-medium leading-none text-[#0F1B33] max-[767px]:text-[17px]">{card.title}</h3></div>
        <div className="mt-[14px] space-y-[10px]">{card.items.map((item, index) => <InfoTooltip item={item} id={`${kind}-${index}`} tone={promising ? "green" : "amber"} openId={openTooltip} setOpenId={setOpenTooltip} key={item.text} />)}</div>
      </div>
      <motion.div aria-hidden="true" animate={active ? (hovered || reduced || !visible ? { opacity: reduced ? 0.52 : 0.52, y: 0, scale: hovered && !reduced ? 1.08 : 1, rotate: hovered && !reduced ? 3 : 0 } : { opacity: 0.52, y: [0, -3, 0], scale: [1, 1, 1], rotate: 0 }) : { opacity: 0, y: 14, scale: 0.85, rotate: -4 }} transition={hovered || reduced || !visible ? { duration: reduced ? 0 : 0.28, ease: EASE } : { duration: 4.5, repeat: Infinity, delay: promising ? 0 : 0.8, ease: "easeInOut" }} className={`absolute bottom-[-8px] z-0 ${promising ? "right-[20px] w-[140px]" : "right-[24px] w-[120px]"}`}><Image src={promising ? "/analysis/promise.png" : "/analysis/risks.png"} alt="" width={120} height={120} className="h-auto w-full object-contain" /></motion.div>
    </motion.article>
  );
}

function CopyQuestionRow({ question, index, copied, onCopy }: { question: string; index: number; copied: boolean; onCopy: () => void }) {
  return (
    <div className="group/question flex min-w-0 items-center gap-2 text-[15px] leading-[1.35] text-[#4A5A7A]">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-semibold text-white">{index + 1}</span><span className="min-w-0">{question}</span>
      <button type="button" aria-label={`Copy question: ${question}`} onClick={onCopy} className="analysis-copy-control relative ml-0 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#2563EB] opacity-0 transition hover:bg-white/70 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] group-hover/question:opacity-100 group-focus-within/question:opacity-100">{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}</button>
    </div>
  );
}

function QuestionsBox({ active, visible, reduced }: { active: boolean; visible: boolean; reduced: boolean }) {
  const [copied, setCopied] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const questions = ANALYSIS_PREVIEW_DATA.questions.items;
  const announceRef = useRef<HTMLSpanElement>(null);
  const markCopied = useCallback((id: number) => { setCopied(id); if (announceRef.current) announceRef.current.textContent = "Question copied"; window.setTimeout(() => setCopied(null), 1500); }, []);
  const handleCopy = async (question: string, index: number) => { if (await copyText(question)) markCopied(index); };
  return (
    <motion.article initial={reduced ? false : { opacity: 0, y: 24 }} animate={active ? { opacity: 1, y: hovered && !reduced ? -3 : 0 } : { opacity: 0, y: 24 }} transition={{ duration: reduced ? 0 : 0.52, delay: reduced ? 0 : 0.32, ease: EASE }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="group/questions relative h-auto min-h-[107px] overflow-hidden rounded-[14px] border border-[#CFE0FB] bg-[#DDE8FC] px-[14px] py-[10px] max-[767px]:min-h-[138px] max-[767px]:py-3">
      <div className="relative z-10 pr-[145px] max-[767px]:pr-[112px]">
        <div className="flex items-center gap-3"><span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-[19px] font-medium leading-none text-white">?</span><h3 className="text-xl font-medium leading-none text-[#0F1B33] max-[767px]:text-[17px]">{ANALYSIS_PREVIEW_DATA.questions.title}</h3></div>
        <div className="mt-[14px] space-y-[10px]">{questions.map((question, index) => <CopyQuestionRow key={question} question={question} index={index} copied={copied === index} onCopy={() => void handleCopy(question, index)} />)}</div>
      </div>
      <motion.div aria-hidden="true" animate={active ? (hovered || reduced || !visible ? { opacity: reduced ? 0.55 : 0.55, y: 0, scale: hovered && !reduced ? 1.08 : 1, rotate: hovered && !reduced ? 3 : 0 } : { opacity: 0.55, y: [0, -3, 0], scale: [1, 1, 1], rotate: 0 }) : { opacity: 0, y: 14, scale: 0.85, rotate: -4 }} transition={hovered || reduced || !visible ? { duration: reduced ? 0 : 0.28, ease: EASE } : { duration: 4.5, repeat: Infinity, delay: 1.6, ease: "easeInOut" }} className="absolute bottom-[-8px] right-[44px] z-0 w-[145px] max-[767px]:right-[24px] max-[767px]:w-[112px]"><Image src="/analysis/question.png" alt="" width={140} height={140} className="h-auto w-full object-contain" /></motion.div>
      <span ref={announceRef} className="sr-only" aria-live="polite" />
    </motion.article>
  );
}

export function AnalysisPreviewSection() {
  const reduced = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4, once: false });
  const [hasPlayed, setHasPlayed] = useState(reduced);
  const [cardHovered, setCardHovered] = useState(false);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const active = reduced || hasPlayed;
  const score = useCountUp(SCORE, active, reduced);
  const price = useCountUp(ANALYSIS_PREVIEW_DATA.product.price, active, reduced);

  useEffect(() => {
    if (!inView || (PLAY_ONCE && hasPlayed)) return;
    const frame = window.requestAnimationFrame(() => setHasPlayed(true));
    return () => window.cancelAnimationFrame(frame);
  }, [hasPlayed, inView]);
  useEffect(() => { if (!openTooltip) return; const close = (event: PointerEvent) => { if (!(event.target as HTMLElement).closest("[data-analysis-tooltip-trigger]")) setOpenTooltip(null); }; document.addEventListener("pointerdown", close); return () => document.removeEventListener("pointerdown", close); }, [openTooltip]);

  const formattedPrice = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(price);

  return (
    <section ref={sectionRef} id="see-the-analysis" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F7FF_100%)] px-5 py-[92px] text-[#0F1B33] sm:px-8 sm:py-[116px]">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[315px] h-[940px] w-[min(1370px,100vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(147,189,255,0.25)_0%,rgba(147,189,255,0.12)_43%,transparent_75%)]" />
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[820px] text-center"><motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}><SectionBadge className="min-w-[145px]">SEE THE ANALYSIS</SectionBadge></motion.div><motion.h2 initial={reduced ? false : { opacity: 0, y: 24 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.09, ease: EASE }} className="mt-6 flex flex-col text-h1-medium tracking-[-0.035em] text-[#333333] max-[767px]:text-[36px]"><span>A Closer Look At What</span><span className="font-bold text-[#2563EB]">You&apos;re Buying.</span></motion.h2><motion.p initial={reduced ? false : { opacity: 0, y: 24 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.18, ease: EASE }} className="mx-auto mt-6 max-w-[800px] text-title-1 text-[#555555]">See how BuyLens breaks down a purchase into a clear decision, potential risks, and the questions worth asking before you pay.</motion.p></div>

        <div className="relative mx-auto mt-[70px] w-full max-w-[1052px]">
          <motion.div aria-hidden="true" animate={active ? { left: cardHovered ? "-48px" : "-40px", right: cardHovered ? "-48px" : "-40px", opacity: 1 } : { left: 0, right: 0, opacity: 0.7 }} transition={{ duration: reduced ? 0 : 0.6, ease: EASE }} className="analysis-layer-furthest absolute top-[11.5%] h-[77%] rounded-[24px] border border-[#D5E3FA] bg-gradient-to-br from-[#F4F8FF] to-[#EAF2FF] shadow-[0_18px_44px_rgba(37,99,235,0.05)]" />
          <motion.div aria-hidden="true" animate={active ? { left: cardHovered ? "-30px" : "-22px", right: cardHovered ? "-30px" : "-22px", opacity: 1 } : { left: 0, right: 0, opacity: 0.8 }} transition={{ duration: reduced ? 0 : 0.6, ease: EASE }} className="analysis-layer-near absolute top-[8.5%] h-[83%] rounded-[24px] border border-[#D5E3FA] bg-gradient-to-br from-[#F4F8FF] to-[#EAF2FF] shadow-[0_18px_44px_rgba(37,99,235,0.06)]" />

          <motion.article aria-label="Example purchase analysis" initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }} animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }} transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.1, ease: EASE }} onMouseEnter={() => setCardHovered(true)} onMouseLeave={() => setCardHovered(false)} className="relative z-10 rounded-[24px] border border-[#DCE8FA] bg-white px-[42px] pb-6 pt-[42px] shadow-[0_30px_80px_rgba(37,99,235,0.12),0_4px_16px_rgba(15,27,51,0.05)] max-[1023px]:mx-auto max-[1023px]:max-w-[560px] max-[1023px]:rounded-[20px] max-[1023px]:px-5 max-[1023px]:py-5">
            <CornerBrackets armed={active} expanded={cardHovered} reduced={reduced} />
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[24px]"><motion.span aria-hidden="true" animate={active ? { top: ["-2%", "102%"], opacity: [0, 0.9, 0] } : { top: "-2%", opacity: 0 }} transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.55, ease: "easeInOut" }} className="absolute left-0 h-[2px] w-full bg-[rgba(37,99,235,0.35)] shadow-[0_0_14px_2px_rgba(37,99,235,0.28)]" /></div>

            <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.78, ease: EASE }} className="relative z-10 flex min-h-[171px] items-center gap-2.5 max-[1023px]:flex-wrap max-[767px]:min-h-0">
              <div className="flex min-w-0 flex-1 items-center gap-2.5 max-[1023px]:basis-[calc(100%-200px)] max-[767px]:basis-full"><ProductVisual /><div className="min-w-0"><h3 className="max-w-[580px] text-[28px] font-semibold leading-[1.25] tracking-[-0.025em] text-[#0F1B33] max-[1023px]:text-[22px]">{ANALYSIS_PREVIEW_DATA.product.name}</h3><p className="mt-1.5 text-sm text-[#5F6B7A]">{ANALYSIS_PREVIEW_DATA.product.category}</p><span className="mt-2 inline-flex h-5 w-[132px] items-center justify-center gap-1.5 rounded-full bg-[#DCF7E6] px-0 text-xs font-medium text-[#22A55A]"><i className="h-[5px] w-[5px] rounded-full bg-[#22A55A]" />{ANALYSIS_PREVIEW_DATA.product.verdict}</span></div></div>
              <div className="mx-6 h-[100px] w-px shrink-0 bg-[#E4ECF8] max-[1023px]:hidden" />
              <div className="flex w-[250px] shrink-0 flex-col items-center justify-center max-[1023px]:w-[190px] max-[767px]:mt-5 max-[767px]:w-full"><span className="text-base font-medium text-[#0F1B33]">Buy Score</span><BuyScoreGauge active={active} reduced={reduced} score={score} /></div>
            </motion.div>

            <div className="my-[50px] h-px bg-[#E4ECF8] max-[1023px]:my-7" />
            <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.05, ease: EASE }} className="relative flex min-h-[150px] items-center max-[1023px]:flex-col max-[1023px]:items-stretch"><div className="w-[52%] shrink-0 max-[1023px]:w-full"><p className="text-[15px] text-[#4B5565]">Quoted Price</p><p className="mt-2 text-[44px] font-semibold leading-[1.1] tracking-[-0.04em] tabular-nums text-[#0F1B33] max-[1023px]:text-[36px]">{formattedPrice}</p><p className="mt-2.5 text-[15px] text-[#5B6B8C]">Price provided for this analysis</p></div><div className="absolute left-[52%] top-1/2 h-[85px] w-px -translate-y-1/2 bg-[#E4ECF8] max-[1023px]:static max-[1023px]:my-6 max-[1023px]:h-px max-[1023px]:w-full max-[1023px]:translate-y-0" /><div className="min-w-0 flex-1 pl-10 max-[1023px]:w-full max-[1023px]:pl-0"><h3 className="text-xl font-medium text-[#0F1B33]">Decision summary</h3><p className="mt-2 max-w-[440px] text-[15px] leading-[1.4] text-[#5B6B8C]">{ANALYSIS_PREVIEW_DATA.product.summary}</p></div></motion.div>

            <div className="my-5 h-px bg-[#E4ECF8] max-[1023px]:my-4" />
            <div className="relative z-10"><div className="grid grid-cols-2 gap-7 max-[1023px]:grid-cols-1 max-[1023px]:gap-[17px]"><ProductBox kind="promising" active={active} visible={inView} reduced={reduced} openTooltip={openTooltip} setOpenTooltip={setOpenTooltip} /><ProductBox kind="risks" active={active} visible={inView} reduced={reduced} openTooltip={openTooltip} setOpenTooltip={setOpenTooltip} /></div><div className="mt-[17px]"><QuestionsBox active={active} visible={inView} reduced={reduced} /></div><motion.div initial={reduced ? false : { opacity: 0, y: 12 }} animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.9, ease: EASE }} className="mt-5 flex justify-center"><Link href="/report/demo" className="group/cta inline-flex h-[49px] w-[286px] items-center justify-center gap-3 rounded-full border border-[#CFE0FB] bg-[#E1ECFD] text-base font-medium text-[#2563EB] transition hover:-translate-y-0.5 hover:bg-[#D6E6FC] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] max-[1023px]:w-full">Preview of the full report<ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 group-hover/cta:translate-x-1" /></Link></motion.div></div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
