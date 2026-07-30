"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "motion/react";

export type ObservatoryPhase =
  | "seed"
  | "expertise"
  | "work"
  | "timeline"
  | "contact";

export type ObservatoryState = {
  scrollYProgress: MotionValue<number>;
  activePhase: ObservatoryPhase;
  motionAllowed: boolean;
};

type ObservatoryProviderProps = {
  children: ReactNode;
};

const phases = new Set<ObservatoryPhase>([
  "seed",
  "expertise",
  "work",
  "timeline",
  "contact",
]);
const thresholds = Array.from({ length: 11 }, (_, index) => index / 10);
const ObservatoryContext = createContext<ObservatoryState | null>(null);

function getPhase(element: Element): ObservatoryPhase | null {
  const phase = element.getAttribute("data-observatory-phase");

  return phase && phases.has(phase as ObservatoryPhase)
    ? (phase as ObservatoryPhase)
    : null;
}

export function ObservatoryProvider({
  children,
}: ObservatoryProviderProps) {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const [activePhase, setActivePhase] =
    useState<ObservatoryPhase>("seed");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-observatory-phase]"),
    ).filter((section) => getPhase(section) !== null);

    if (sections.length === 0) {
      return;
    }

    const visibleRatios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        let mostVisiblePhase: ObservatoryPhase | null = null;
        let mostVisibleRatio = 0;

        for (const section of sections) {
          const ratio = visibleRatios.get(section) ?? 0;
          if (ratio > mostVisibleRatio) {
            mostVisibleRatio = ratio;
            mostVisiblePhase = getPhase(section);
          }
        }

        if (mostVisiblePhase) {
          setActivePhase(mostVisiblePhase);
        }
      },
      { threshold: thresholds },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const value = useMemo<ObservatoryState>(
    () => ({
      scrollYProgress,
      activePhase,
      motionAllowed: reducedMotion !== true,
    }),
    [activePhase, reducedMotion, scrollYProgress],
  );

  return (
    <ObservatoryContext.Provider value={value}>
      {children}
    </ObservatoryContext.Provider>
  );
}

export function useObservatory(): ObservatoryState {
  const context = useContext(ObservatoryContext);

  if (!context) {
    throw new Error("useObservatory must be used within ObservatoryProvider");
  }

  return context;
}
