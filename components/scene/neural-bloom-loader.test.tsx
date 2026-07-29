import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NeuralBloomLoader } from "@/components/scene/neural-bloom-loader";

vi.mock("@/components/scene/use-scene-quality", () => ({
  useSceneQuality: () => ({
    quality: "static",
    markContextLost: vi.fn(),
  }),
}));

describe("NeuralBloomLoader", () => {
  it("renders only the semantic-hidden local 2D fallback", () => {
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
});
