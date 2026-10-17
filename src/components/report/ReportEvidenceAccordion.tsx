"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, FileText } from "lucide-react";
import type { PurchaseReport } from "@/lib/validation/purchaseReport";
import { REPORT_COPY } from "./purchaseReport.data";

export function ReportEvidenceAccordion({ evidence }: { evidence: PurchaseReport["evidence"] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() === true;
  const contentId = useId();

  return (
    <section className="overflow-hidden rounded-[16px] border border-line bg-surface shadow-[0_1px_3px_rgba(16,24,40,0.04)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-[100px] w-full items-center gap-4 px-6 text-left transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-600 sm:px-8"
      >
        <FileText className="h-8 w-8 shrink-0 text-primary-600" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block text-[22px] font-semibold leading-tight text-ink">{REPORT_COPY.evidenceTitle}</span>
          <span className="mt-1 block text-base text-ink-muted">{REPORT_COPY.evidenceSubtitle}</span>
        </span>
        <ChevronRight className={`h-5 w-5 shrink-0 text-primary-600 transition-transform duration-200 ${open ? "rotate-90" : ""}`} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={contentId} initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduced ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
            <div className="border-t border-line px-6 py-5 sm:px-8">
              <ul className="space-y-4">
                {evidence.map((item) => (
                  <li key={item.label} className="grid gap-1 text-sm sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-5">
                    <span className="font-semibold text-ink">{item.label}</span>
                    <span className="text-ink-muted">{item.source ?? "User-provided quote"}{item.note ? ` - ${item.note}` : ""}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
