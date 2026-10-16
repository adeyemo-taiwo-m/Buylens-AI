export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const MOTION_TOKENS = {
  ease: MOTION_EASE,
  reveal: {
    y: 20,
    duration: 0.6,
  },
  stagger: 0.09,
  interaction: {
    duration: 0.2,
  },
  hoverScale: 1.02,
  spring: {
    type: "spring" as const,
    stiffness: 280,
    damping: 24,
    mass: 0.7,
  },
} as const;

export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -8% 0px",
} as const;

export const REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: MOTION_TOKENS.reveal.y },
  visible: { opacity: 1, y: 0 },
};
