import { act, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NeuralBloomLoader } from "@/components/scene/neural-bloom-loader";
import type { NeuralBloomScene } from "@/components/scene/neural-bloom-scene";

const sceneState = vi.hoisted(() => ({
  activePhase: "seed" as const,
  markContextLost: vi.fn(),
  onCreated: undefined as
    | ComponentProps<typeof NeuralBloomScene>["onCreated"]
    | undefined,
  quality: "static" as "static" | "low" | "high",
  scrollYProgress: { get: () => 0 },
}));

vi.mock("next/dynamic", () => ({
  default: () =>
    function SceneStub(props: ComponentProps<typeof NeuralBloomScene>) {
      sceneState.onCreated = props.onCreated;
      return (
        <canvas
          data-testid="neural-bloom-canvas"
          data-quality={props.quality}
        />
      );
    },
}));

vi.mock("@/components/scene/use-scene-quality", () => ({
  useSceneQuality: () => ({
    quality: sceneState.quality,
    markContextLost: sceneState.markContextLost,
  }),
}));

vi.mock("@/components/motion/observatory-provider", () => ({
  useObservatory: () => ({
    activePhase: sceneState.activePhase,
    motionAllowed: true,
    scrollYProgress: sceneState.scrollYProgress,
  }),
}));

describe("NeuralBloomLoader", () => {
  beforeEach(() => {
    sceneState.markContextLost.mockReset();
    sceneState.onCreated = undefined;
    sceneState.quality = "static";
  });

  it("renders only the semantic-hidden local fallback for static quality", () => {
    const { container } = render(<NeuralBloomLoader />);

    expect(container.firstElementChild).toHaveAttribute(
      "data-scene-quality",
      "static",
    );
    expect(screen.getByRole("presentation", { hidden: true })).toHaveAttribute(
      "src",
      "/images/neural-bloom-fallback.svg",
    );
    expect(
      screen.getByRole("presentation", { hidden: true }),
    ).toHaveAttribute("alt", "");
    expect(container.querySelector(".neural-bloom-fallback")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("keeps the fallback beneath capable scenes and fades in after creation", () => {
    sceneState.quality = "high";
    const { container } = render(<NeuralBloomLoader />);

    expect(
      screen.getByRole("presentation", { hidden: true }),
    ).toHaveAttribute("src", "/images/neural-bloom-fallback.svg");
    expect(screen.getByTestId("neural-bloom-canvas")).toHaveAttribute(
      "data-quality",
      "high",
    );

    const sceneLayer = container.querySelector(".neural-bloom-scene-layer");
    expect(sceneLayer).toHaveAttribute("data-scene-ready", "false");

    act(() => sceneState.onCreated?.());

    expect(sceneLayer).toHaveAttribute("data-scene-ready", "true");
    expect(container.querySelector(".neural-bloom-fallback")).toBeInTheDocument();
  });

  it.each([
    ["high", "low"],
    ["low", "high"],
  ] as const)(
    "keeps the retained canvas ready across a %s to %s tier change",
    (initialQuality, nextQuality) => {
      sceneState.quality = initialQuality;
      const { container, rerender } = render(<NeuralBloomLoader />);
      const canvas = screen.getByTestId("neural-bloom-canvas");

      act(() => sceneState.onCreated?.());
      expect(
        container.querySelector(".neural-bloom-scene-layer"),
      ).toHaveAttribute("data-scene-ready", "true");

      sceneState.quality = nextQuality;
      rerender(<NeuralBloomLoader />);

      expect(screen.getByTestId("neural-bloom-canvas")).toBe(canvas);
      expect(canvas).toHaveAttribute("data-quality", nextQuality);
      expect(
        container.querySelector(".neural-bloom-scene-layer"),
      ).toHaveAttribute("data-scene-ready", "true");
      expect(
        container.querySelector(".neural-bloom-fallback"),
      ).toBeInTheDocument();
    },
  );

  it("waits for a new canvas after returning from static quality", () => {
    sceneState.quality = "high";
    const { container, rerender } = render(<NeuralBloomLoader />);
    const originalCanvas = screen.getByTestId("neural-bloom-canvas");

    act(() => sceneState.onCreated?.());
    expect(
      container.querySelector(".neural-bloom-scene-layer"),
    ).toHaveAttribute("data-scene-ready", "true");

    sceneState.quality = "static";
    rerender(<NeuralBloomLoader />);
    expect(container.querySelector("canvas")).toBeNull();

    sceneState.quality = "high";
    rerender(<NeuralBloomLoader />);

    expect(screen.getByTestId("neural-bloom-canvas")).not.toBe(originalCanvas);
    expect(
      container.querySelector(".neural-bloom-scene-layer"),
    ).toHaveAttribute("data-scene-ready", "false");
    expect(
      container.querySelector(".neural-bloom-fallback"),
    ).toBeInTheDocument();
  });
});
