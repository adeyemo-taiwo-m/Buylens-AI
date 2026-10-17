"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Bolt, Check, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SAMPLES, type Sample } from "@/lib/samples";

type SampleModalProps = { open: boolean; triggerRef: RefObject<HTMLButtonElement | null>; onClose: () => void; onSelect: (sample: Sample) => void };
const money = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });

export function SampleModal({ open, triggerRef, onClose, onSelect }: SampleModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); trigger?.focus(); };
  }, [open, onClose, triggerRef]);

  if (!open) return null;
  return createPortal(
    <div className="sample-modal-backdrop fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="sample-modal-title" aria-describedby="sample-modal-description" className="sample-modal-sheet w-full max-w-[880px] overflow-y-auto rounded-t-[24px] bg-surface p-5 shadow-lg sm:max-h-[90vh] sm:rounded-[24px] sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div><div className="flex items-center gap-2 text-primary-600"><Sparkles className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-[0.08em]">Quick start</span></div><h2 id="sample-modal-title" className="mt-2 text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">Try a sample</h2><p id="sample-modal-description" className="mt-2 max-w-[650px] text-sm leading-6 text-ink-muted">Pick a listing and we&apos;ll fill the form for you. You can edit anything before analyzing.</p></div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close sample chooser" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">{SAMPLES.map((sample) => <SampleCard key={sample.id} sample={sample} onSelect={onSelect} />)}</div>
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line pt-5 text-sm text-ink-muted sm:flex-row"><span>Or close this and enter your own listing.</span><button type="button" onClick={onClose} className="rounded-full px-4 py-2 font-medium text-primary-600 transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">Enter my own</button></div>
      </div>
    </div>,
    document.body,
  );
}

function SampleCard({ sample, onSelect }: { sample: Sample; onSelect: (sample: Sample) => void }) {
  const [imageSrc, setImageSrc] = useState(sample.imageUrl);
  const choose = () => onSelect(sample);
  return <article tabIndex={0} role="group" aria-label={`Sample listing: ${sample.title}`} onClick={choose} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); choose(); } }} className={cn("group flex min-w-0 cursor-pointer flex-col rounded-[20px] border border-line bg-surface p-5 text-left transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-primary-600 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2")}>
    <div className="flex h-24 items-center justify-center overflow-hidden rounded-[16px] bg-primary-50"><Image src={imageSrc} alt="" width={120} height={96} className="h-full w-full object-contain p-2" onError={() => setImageSrc("/analysis/solar.png")} /></div>
    <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-medium text-primary-600"><Bolt className="h-3 w-3" aria-hidden="true" />{sample.category}</span>
    <h3 className="mt-3 line-clamp-2 min-h-[46px] text-[18px] font-semibold leading-[1.28] text-ink">{sample.title}</h3>
    <p className="mt-3 text-[22px] font-bold leading-none tabular-nums text-ink">{money.format(sample.price)}</p>
    <p className="mt-3 min-h-[40px] text-sm leading-5 text-ink-muted">{sample.hint}</p>
    <button type="button" onClick={(event) => { event.stopPropagation(); choose(); }} aria-label={`Use sample: ${sample.title}`} className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"><Check className="h-4 w-4" aria-hidden="true" />Use this sample</button>
  </article>;
}
