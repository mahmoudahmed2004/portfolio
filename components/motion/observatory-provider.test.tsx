import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ObservatoryProvider,
  useObservatory,
} from "@/components/motion/observatory-provider";

const motionState = vi.hoisted(() => ({
  reducedMotion: false,
  scrollYProgress: {
    get: () => 0.42,
  },
}));

vi.mock("motion/react", () => ({
  useReducedMotion: () => motionState.reducedMotion,
  useScroll: () => ({ scrollYProgress: motionState.scrollYProgress }),
}));

let intersectionCallback: IntersectionObserverCallback;
let disconnect: ReturnType<typeof vi.fn>;
let observed: Element[];

function installIntersectionObserver() {
  disconnect = vi.fn();
  observed = [];

  class TestIntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [];

    constructor(callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
    }

    disconnect = disconnect;
    observe = vi.fn((element: Element) => observed.push(element));
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }

  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
}

function Probe() {
  const { activePhase, motionAllowed, scrollYProgress } = useObservatory();

  return (
    <output data-testid="observatory-value">
      {activePhase}:{motionAllowed ? "motion" : "still"}:
      {scrollYProgress.get()}
    </output>
  );
}

describe("ObservatoryProvider", () => {
  beforeEach(() => {
    motionState.reducedMotion = false;
    installIntersectionObserver();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders children immediately and selects the most visible phase", () => {
    const { unmount } = render(
      <ObservatoryProvider>
        <Probe />
        <section data-observatory-phase="seed">Hero</section>
        <section data-observatory-phase="expertise">Expertise</section>
        <section data-observatory-phase="work">Work</section>
      </ObservatoryProvider>,
    );

    expect(screen.getByText("Hero")).toBeVisible();
    expect(screen.getByTestId("observatory-value")).toHaveTextContent(
      "seed:motion:0.42",
    );
    expect(observed).toHaveLength(3);

    act(() =>
      intersectionCallback(
        [
          {
            target: observed[1],
            isIntersecting: true,
            intersectionRatio: 0.38,
          },
          {
            target: observed[2],
            isIntersecting: true,
            intersectionRatio: 0.72,
          },
        ] as IntersectionObserverEntry[],
        {} as IntersectionObserver,
      ),
    );
    expect(screen.getByTestId("observatory-value")).toHaveTextContent(
      "work:motion:0.42",
    );

    act(() =>
      intersectionCallback(
        [
          {
            target: observed[2],
            isIntersecting: true,
            intersectionRatio: 0.12,
          },
        ] as IntersectionObserverEntry[],
        {} as IntersectionObserver,
      ),
    );
    expect(screen.getByTestId("observatory-value")).toHaveTextContent(
      "expertise:motion:0.42",
    );

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("disables motion when the user requests reduced motion", () => {
    motionState.reducedMotion = true;

    render(
      <ObservatoryProvider>
        <Probe />
      </ObservatoryProvider>,
    );

    expect(screen.getByTestId("observatory-value")).toHaveTextContent(
      "seed:still:0.42",
    );
  });
});
