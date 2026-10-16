"use client";

import {
  type ElementType,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { m, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import {
  MOTION_EASE,
  MOTION_TOKENS,
  REVEAL_VARIANTS,
  REVEAL_VIEWPORT,
} from "@/lib/motion";

type RevealTag = "article" | "div" | "h1" | "h2" | "p" | "section";

type RevealProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  children: ReactNode;
  as?: RevealTag;
  delay?: number;
  trigger?: "load" | "view";
  grouped?: boolean;
};

type RevealGroupProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  delay?: number;
  trigger?: "load" | "view";
};

const groupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_TOKENS.stagger,
    },
  },
};

const motionTag = (tag: RevealTag) => {
  if (tag === "article") return m.article;
  if (tag === "h1") return m.h1;
  if (tag === "h2") return m.h2;
  if (tag === "p") return m.p;
  if (tag === "section") return m.section;
  return m.div;
};

export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  {
    as = "div",
    children,
    className,
    delay = 0,
    grouped = false,
    trigger = "view",
    ...rest
  },
  ref,
) {
  const reduced = useReducedMotion() === true;
  const MotionTag = motionTag(as) as unknown as ElementType;
  const transition = {
    duration: reduced ? 0 : MOTION_TOKENS.reveal.duration,
    delay: reduced ? 0 : delay,
    ease: MOTION_EASE,
  };

  const motionProps: HTMLMotionProps<"div"> = grouped
    ? { variants: REVEAL_VARIANTS }
    : reduced
      ? { initial: false, animate: "visible" }
      : trigger === "load"
        ? { initial: "hidden", animate: "visible", transition }
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: REVEAL_VIEWPORT,
            transition,
          };

  return (
    <MotionTag
      {...(rest as Record<string, unknown>)}
      {...motionProps}
      ref={ref as never}
      className={`motion-reveal${className ? ` ${className}` : ""}`}
    >
      {children}
    </MotionTag>
  );
});

Reveal.displayName = "Reveal";

export function RevealGroup({
  children,
  className,
  delay = 0,
  trigger = "view",
  ...rest
}: RevealGroupProps) {
  const reduced = useReducedMotion() === true;
  const motionProps = reduced
    ? { initial: false, animate: "visible" as const }
    : trigger === "load"
      ? {
          initial: "hidden" as const,
          animate: "visible" as const,
          transition: { delay, ease: MOTION_EASE },
        }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: REVEAL_VIEWPORT,
          transition: { delay, ease: MOTION_EASE },
        };

  return (
    <m.div
      {...(rest as Record<string, unknown>)}
      {...motionProps}
      variants={groupVariants}
      className={`motion-reveal-group${className ? ` ${className}` : ""}`}
    >
      {children}
    </m.div>
  );
}
