"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { CTA_DATA } from "./cta.data";

const EASE = [0.22, 1, 0.36, 1] as const;
const SHOW_WATERMARK = true;
const LOGO_OPACITY = 0.1;
const LOGO_WIDTH = 380;
const LOGO_OFFSET_X = -135;
const LOGO_OFFSET_Y = -135;

const hidden = { opacity: 0, y: 20 };
const shown = { opacity: 1, y: 0 };

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
        {SHOW_WATERMARK && (
          <motion.div
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, x: -40, y: 40 }}
            animate={
              visible || reduced
                ? { opacity: LOGO_OPACITY, x: 0, y: 0 }
                : { opacity: 0, x: -40, y: 40 }
            }
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.65, ease: EASE }}
            className="pointer-events-none absolute bottom-[var(--cta-logo-offset-y)] left-[var(--cta-logo-offset-x)] z-0 hidden select-none min-[768px]:block"
            style={{
              "--cta-logo-offset-x": `${LOGO_OFFSET_X}px`,
              "--cta-logo-offset-y": `${LOGO_OFFSET_Y}px`,
              width: `${LOGO_WIDTH}px`,
            } as CSSProperties}
          >
            <Image
              src="/logo-icon.png"
              alt=""
              width={LOGO_WIDTH}
              height={LOGO_WIDTH}
              className="block h-auto w-full brightness-0 invert"
            />
          </motion.div>
        )}

        <div className="relative z-10 mx-auto flex min-h-[312px] flex-col items-center justify-center">
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
            className="mt-6 max-[767px]:mt-5"
          >
            <Link
              href={CTA_DATA.href}
              className={`buy-with-clarity-link ${reduced ? "cta-motion-reduced" : ""}`}
            >
              <span>{CTA_DATA.buttonLabel}</span>
              <ArrowRight aria-hidden="true" className="buy-with-clarity-arrow h-5 w-5 shrink-0" strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
