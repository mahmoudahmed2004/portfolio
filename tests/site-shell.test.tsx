import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { portfolio } from "@/lib/portfolio-data";

describe("site shell", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
        media: "(min-width: 48rem)",
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
    vi.stubGlobal("IntersectionObserver", undefined);
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("connects navigation anchors to labelled page landmarks", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(
      within(screen.getByRole("banner")).getByRole("link", { name: "Home" }),
    ).toHaveTextContent("MAF / AI");

    for (const item of portfolio.navigation) {
      const section = document.querySelector(item.href);
      expect(section).toBeInstanceOf(HTMLElement);
    }

    for (const section of main.querySelectorAll("section[aria-labelledby]")) {
      const labelId = section.getAttribute("aria-labelledby");
      const heading = labelId ? document.getElementById(labelId) : null;
      expect(heading?.matches("h1, h2")).toBe(true);
      expect(heading).toHaveTextContent(/\S/);
    }
  });

  it("marks the five connected observatory phases", () => {
    render(<Home />);

    expect(
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-observatory-phase]"),
        (section) => section.dataset.observatoryPhase,
      ),
    ).toEqual(["seed", "expertise", "work", "timeline", "contact"]);
  });
});
