"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { memo, useCallback, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type Ref } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { DEFAULT_FAQ_ID, FAQ_ITEMS, type FaqEntry } from "./faq.data";

const EASE = [0.22, 1, 0.36, 1] as const;
const LOGO_OFFSET_X = -100;
const LOGO_OFFSET_Y = -100;
const LOGO_OPACITY = 0.12;

function FaqIcon({ open, reduced }: { open: boolean; reduced: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-150 max-[767px]:h-7 max-[767px]:w-7 ${open ? "border border-[#E1ECFC] bg-[#EEF4FF]" : "bg-[#2563EB] group-hover/faq:bg-[#1D4ED8]"}`}
    >
      <motion.span
        initial={false}
        animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
        transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
        className="absolute inset-0 inline-flex items-center justify-center text-white"
      >
        <Plus className="h-4 w-4 max-[767px]:h-3.5 max-[767px]:w-3.5" strokeWidth={1.5} />
      </motion.span>
      <motion.span
        initial={false}
        animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : -90 }}
        transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
        className="absolute inset-0 inline-flex items-center justify-center text-[#2563EB]"
      >
        <Minus className="h-4 w-4 max-[767px]:h-3.5 max-[767px]:w-3.5" strokeWidth={1.5} />
      </motion.span>
    </span>
  );
}

type FaqItemProps = {
  item: FaqEntry;
  index: number;
  isOpen: boolean;
  visible: boolean;
  reduced: boolean;
  onToggle: (id: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  buttonRef: Ref<HTMLButtonElement>;
};

const FaqItem = memo(function FaqItem({ item, index, isOpen, visible, reduced, onToggle, onKeyDown, buttonRef }: FaqItemProps) {
  const headerId = `faq-header-${item.id}`;
  const panelId = `faq-panel-${item.id}`;
  const entranceHidden = reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };

  return (
    <motion.article
      initial={reduced ? false : entranceHidden}
      animate={visible || reduced ? { opacity: 1, y: 0 } : entranceHidden}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.09, ease: EASE }}
      className={`group/faq overflow-hidden rounded-2xl border bg-white transition-colors duration-150 ${isOpen ? "border-[#D4E4FB]" : "border-[var(--faq-border)] hover:border-[#BFD6F8] hover:bg-[#FAFCFF]"}`}
    >
      <h3>
        <button
          ref={buttonRef}
          id={headerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
          onKeyDown={(event) => onKeyDown(event, index)}
          className={`flex w-full cursor-pointer items-center justify-between gap-4 px-5 text-left text-[19px] font-medium leading-[1.4] text-[var(--ink)] outline-none transition-colors duration-100 focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 active:bg-[#F3F8FF] max-[767px]:min-h-16 max-[767px]:px-4 max-[767px]:text-base ${isOpen ? "min-h-[66px]" : "min-h-[74px]"}`}
        >
          <span className="min-w-0 pr-2">{item.question}</span>
          <FaqIcon open={isOpen} reduced={reduced} />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: reduced ? 0 : 0.28, ease: EASE }, opacity: { duration: reduced ? 0.15 : 0.22 } }}
            className="overflow-hidden"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.2, delay: reduced ? 0 : 0.06, ease: EASE }}
              className="px-5 pb-5 max-[767px]:px-4 max-[767px]:pb-4"
            >
              <div aria-hidden="true" className="h-px w-[458px] max-w-[50%] bg-gradient-to-r from-[#E4ECF8] to-transparent max-[767px]:max-w-[60%]" />
              <p className="mt-[14px] max-w-[820px] text-[15px] font-normal leading-[21px] tracking-[0.005em] text-[#6B7280] max-[767px]:text-sm max-[767px]:leading-[1.5]">{item.answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

export function FaqSection() {
  const reduced = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: true });
  const [openId, setOpenId] = useState<string | null>(DEFAULT_FAQ_ID);
  const headerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleItem = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % FAQ_ITEMS.length;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + FAQ_ITEMS.length) % FAQ_ITEMS.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = FAQ_ITEMS.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      headerRefs.current[nextIndex]?.focus();
    }
  }, []);

  const headerRefCallbacks = useMemo(
    () => FAQ_ITEMS.map((_, index) => (node: HTMLButtonElement | null) => { headerRefs.current[index] = node; }),
    [],
  );

  const visible = inView || reduced;
  const reveal = reduced ? { opacity: 1, y: 0 } : visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };

  return (
    <section ref={sectionRef} id="faq" aria-labelledby="faq-heading" style={{ "--faq-logo-offset-x": `${LOGO_OFFSET_X}px`, "--faq-logo-offset-y": `${LOGO_OFFSET_Y}px`, "--faq-logo-opacity": LOGO_OPACITY } as CSSProperties} className="relative overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-20">
      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, x: 40, y: 40, rotate: -12 }}
        animate={visible ? { opacity: 1, x: 0, y: 0, rotate: -8 } : reduced ? { opacity: 1, x: 0, y: 0, rotate: -8 } : { opacity: 0, x: 40, y: 40, rotate: -12 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.45, ease: EASE }}
        className="faq-logo-watermark pointer-events-none absolute z-0 w-[360px] select-none max-[1439px]:w-[280px] max-[767px]:w-[180px]"
      >
        <div className="faq-logo-tint">
          <Image src="/logo-icon.png" alt="" width={360} height={360} className="block h-auto w-full" />
        </div>
      </motion.div>
      <div className="relative z-10 mx-auto max-w-[936px]">
        <div className="text-center">
          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={reveal} transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}>
            <SectionBadge className="faq-section-badge border-[#C9DDFA] bg-[#DCE9FD] px-0 text-xs text-[#2563EB]">FAQ</SectionBadge>
          </motion.div>
          <motion.h2 id="faq-heading" initial={reduced ? false : { opacity: 0, y: 24 }} animate={reveal} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.09, ease: EASE }} className="mx-auto mt-6 whitespace-nowrap text-h1-medium tracking-[-0.035em] text-[#333333] max-[1023px]:text-[40px] max-[767px]:whitespace-normal max-[767px]:text-[30px]">
            Questions Before <span className="font-bold text-[var(--blue)]">You Buy?</span>
          </motion.h2>
          <motion.p initial={reduced ? false : { opacity: 0, y: 24 }} animate={reveal} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.18, ease: EASE }} className="mx-auto mt-6 max-w-[800px] text-title-1 text-[#555555] max-[1023px]:text-lg max-[767px]:max-w-full max-[767px]:text-base max-[767px]:leading-[1.5]">
            Everything you need to know about using BuyLens to make more informed purchase<br className="hidden min-[768px]:inline" /> decisions.
          </motion.p>
        </div>

        <div className="mt-[72px] flex flex-col gap-4 max-[767px]:mt-10">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              visible={visible}
              reduced={reduced}
              onToggle={toggleItem}
              onKeyDown={handleKeyDown}
              buttonRef={headerRefCallbacks[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
