"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { CtaButton } from "@/components/ui/CtaButton";
import { MOTION_EASE } from "@/lib/motion";
import { CTA_DATA } from "./cta.data";

const EASE = MOTION_EASE;
const ANIMATE_BG = true;
const ANIMATE_DOTS = true;
const DOT_SIZE = 1.2;
const DOT_GAP = 28;
const DOT_OPACITY = 0.22;

const hidden = { opacity: 0, y: 20 };
const shown = { opacity: 1, y: 0 };

function CtaBackground({ reduced, visible }: { reduced: boolean; visible: boolean }) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const backgroundInView = useInView(backgroundRef, { amount: 0.1 });
  const driftActive = ANIMATE_BG && visible && backgroundInView && !reduced;

  return (
    <motion.div
      ref={backgroundRef}
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0 }}
      animate={visible || reduced ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
      className="cta-card-background"
    >
      <div className="cta-card-background-base" />
      <div className={"cta-card-background-bloom" + (driftActive ? " cta-bg-drifting" : "")} />
      <div className={"cta-card-background-shade" + (driftActive ? " cta-bg-drifting" : "")} />
      <div className="cta-card-background-side-glow" />
      <div className="cta-card-background-sweep" />
    </motion.div>
  );
}

function CtaDotGrid({ reduced, visible }: { reduced: boolean; visible: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const dotInView = useInView(dotRef, { amount: 0.1 });
  const driftActive = ANIMATE_DOTS && visible && dotInView && !reduced;

  return (
    <motion.div
      ref={dotRef}
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0 }}
      animate={visible || reduced ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
      className={"cta-card-dot-grid" + (driftActive ? " cta-dot-drifting" : "")}
      style={
        {
          "--cta-dot-size": DOT_SIZE + "px",
          "--cta-dot-gap": DOT_GAP + "px",
          "--cta-dot-opacity": DOT_OPACITY,
        } as CSSProperties
      }
    />
  );
}

export function BuyWithClaritySection() {
  const reduced = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35, once: true });
  const visible = inView || reduced;
  const cardAnimation = reduced
    ? { opacity: 1, y: 0, scale: 1 }
    : visible
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 32, scale: 0.98 };
  const contentAnimation = reduced ? shown : visible ? shown : hidden;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-heading"
      className="bg-white px-5 py-12 sm:px-8 sm:py-20"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32, scale: 0.98 }}
        animate={cardAnimation}
        transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
        className="relative mx-auto min-h-[472px] max-w-[1120px] overflow-hidden rounded-[60px] bg-[var(--blue)] px-5 py-12 text-center sm:px-10 sm:py-16 lg:px-10 lg:py-20 min-[768px]:rounded-[44px] min-[1024px]:rounded-[60px]"
      >
        <CtaBackground reduced={reduced} visible={visible} />
        <CtaDotGrid reduced={reduced} visible={visible} />

        <div className="relative z-[1] mx-auto flex min-h-[312px] flex-col items-center justify-center">
          <motion.div
            initial={reduced ? false : hidden}
            animate={contentAnimation}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.09, ease: EASE }}
          >
            <SectionBadge tone="onBlue">{CTA_DATA.badge}</SectionBadge>
          </motion.div>

          <motion.h2
            id="cta-heading"
            initial={reduced ? false : hidden}
            animate={contentAnimation}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.18, ease: EASE }}
            className="mt-6 h-[120px] text-[48px] font-medium leading-[1.25] tracking-[-0.035em] text-[#DCE7FC] max-[1023px]:text-[40px] max-[767px]:h-auto max-[767px]:text-[30px]"
          >
            <span className="block">{CTA_DATA.headline.firstLine}</span>
            <span className="block font-bold text-white">{CTA_DATA.headline.secondLine}</span>
          </motion.h2>

          <motion.p
            initial={reduced ? false : hidden}
            animate={contentAnimation}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.27, ease: EASE }}
            className="mt-6 max-w-[800px] text-[19px] font-normal leading-[1.4] text-[#EBF2FE] max-[1023px]:text-lg max-[767px]:mt-5 max-[767px]:text-base max-[767px]:leading-[1.5]"
          >
            {CTA_DATA.subtext}
          </motion.p>

          <motion.div
            initial={reduced ? false : hidden}
            animate={contentAnimation}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.36, ease: EASE }}
            className="mt-6 w-full max-w-[432px] max-[767px]:mt-5"
          >
            <CtaButton href={CTA_DATA.href} trailingIcon={<ArrowRight className="h-4 w-4" />} className={`buy-with-clarity-link w-full ${reduced ? "cta-motion-reduced" : ""}`}>
              {CTA_DATA.buttonLabel}
            </CtaButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
