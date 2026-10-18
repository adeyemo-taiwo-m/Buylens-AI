"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { PlasmaWaveProps } from "@/components/backgrounds/PlasmaWave";

const PlasmaWave = dynamic<PlasmaWaveProps>(() => import("@/components/backgrounds/PlasmaWave"), { ssr: false });

export const PLASMA_LOGIN_CONFIG = {
  colors: ["#2563eb", "#60a5fa"],
  lightMode: true,
  speed: 0.7,
  speed1: 0.05,
  speed2: 0.05,
  dir2: 1,
  bend1: 1,
  bend2: 0.5,
  thickness: 0.3,
  focalLength: 1.25,
  rotationDeg: 0,
  brightness: 0.9,
  glow: 0.9,
  core: 0.5,
  grain: 0.02,
  fade: 0.25,
  opacity: 0.85,
  quality: 0.8,
  dpr: 1.5,
  mouseInteraction: true,
  intro: true,
} satisfies Omit<PlasmaWaveProps, "className">;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function LoginPanelBackground() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isCoarsePointer = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (!isLargeScreen) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      <PlasmaWave
        {...PLASMA_LOGIN_CONFIG}
        mouseInteraction={!isCoarsePointer && !prefersReducedMotion}
        intro={!prefersReducedMotion}
        paused={prefersReducedMotion}
      />
    </div>
  );
}
