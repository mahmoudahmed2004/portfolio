import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/shell/site-header";
import { portfolio } from "@/lib/portfolio-data";

type MediaController = {
  setMatches: (matches: boolean) => void;
};

function installMatchMedia(initialMatches = false): MediaController {
  let matches = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      onchange: null,
      addEventListener: (
        type: string,
        listener: (event: MediaQueryListEvent) => void,
      ) => {
        if (type === "change") {
          listeners.add(listener);
        }
      },
      removeEventListener: (
        type: string,
        listener: (event: MediaQueryListEvent) => void,
      ) => {
        if (type === "change") {
          listeners.delete(listener);
        }
      },
      addListener: (listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener);
      },
      removeListener: (listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener);
      },
      dispatchEvent: () => true,
    })),
  );

  return {
    setMatches(nextMatches) {
      matches = nextMatches;
      const event = { matches, media: "(min-width: 48rem)" };
      listeners.forEach((listener) =>
        listener(event as MediaQueryListEvent),
      );
    },
  };
}

let intersectionCallback: IntersectionObserverCallback | undefined;

function installIntersectionObserver() {
  class TestIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly scrollMargin = "";
    readonly thresholds = [];

    constructor(callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
    }

    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  }

  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
}

function addNavigationTargets() {
  for (const item of portfolio.navigation) {
    const section = document.createElement("section");
    section.id = item.href.slice(1);
    document.body.append(section);
  }
}

describe("SiteHeader", () => {
  beforeEach(() => {
    installMatchMedia();
    installIntersectionObserver();
    window.history.replaceState({}, "", "/");
    intersectionCallback = undefined;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exposes its landmarks, home mark, controls, and destination anchors", () => {
    render(<SiteHeader items={portfolio.navigation} />);

    const header = screen.getByRole("banner");
    const home = within(header).getByRole("link", { name: "Home" });
    const button = within(header).getByRole("button", { name: "Open menu" });
    const mobileNavigation = document.querySelector("#mobile-navigation");

    expect(home).toHaveAttribute("href", "#intro");
    expect(home).toHaveTextContent("MAF / AI");
    expect(button).toHaveAttribute("aria-controls", "mobile-navigation");
    expect(mobileNavigation).toHaveAttribute(
      "aria-label",
      "Mobile navigation",
    );

    for (const item of portfolio.navigation) {
      expect(
        header.querySelectorAll(`a[href="${item.href}"]`),
      ).toHaveLength(2);
    }
  });

  it("opens and closes the mobile navigation accessibly", async () => {
    const user = userEvent.setup();
    render(<SiteHeader items={portfolio.navigation} />);
    const button = screen.getByRole("button", { name: /open menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveFocus();
  });

  it("closes the mobile navigation after a destination is selected", async () => {
    const user = userEvent.setup();
    render(<SiteHeader items={portfolio.navigation} />);
    const button = screen.getByRole("button", { name: /open menu/i });
    await user.click(button);

    const mobileNavigation = screen.getByRole("navigation", {
      name: /mobile/i,
    });
    await user.click(
      within(mobileNavigation).getByRole("link", { name: "Work" }),
    );

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the current section in both navigation landmarks", () => {
    addNavigationTargets();
    render(<SiteHeader items={portfolio.navigation} />);
    const expertise = document.querySelector("#expertise");

    act(() => {
      intersectionCallback?.(
        [
          {
            target: expertise,
            isIntersecting: true,
            intersectionRatio: 0.8,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    const currentLinks = document.querySelectorAll(
      'a[href="#expertise"][aria-current="location"]',
    );
    expect(currentLinks).toHaveLength(2);
    currentLinks.forEach((link) =>
      expect(link).toHaveAttribute("data-current", "true"),
    );
  });

  it("uses a valid location hash as its initial current section", () => {
    window.history.replaceState({}, "", "/#certificates");

    render(<SiteHeader items={portfolio.navigation} />);

    expect(
      document.querySelectorAll(
        'a[href="#certificates"][aria-current="location"]',
      ),
    ).toHaveLength(2);
  });

  it("uses anchor selection as a progressive current-section fallback", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const user = userEvent.setup();
    render(<SiteHeader items={portfolio.navigation} />);
    const desktopNavigation = screen.getByRole("navigation", {
      name: /primary/i,
    });

    await user.click(
      within(desktopNavigation).getByRole("link", { name: "About" }),
    );

    expect(
      document.querySelectorAll(
        'a[href="#about"][aria-current="location"]',
      ),
    ).toHaveLength(2);
  });

  it("closes an open menu at the desktop breakpoint and keeps it closed", async () => {
    const media = installMatchMedia();
    const user = userEvent.setup();
    render(<SiteHeader items={portfolio.navigation} />);
    const button = screen.getByRole("button", { name: "Open menu" });

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    act(() => media.setMatches(true));
    expect(button).toHaveAttribute("aria-expanded", "false");

    act(() => media.setMatches(false));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
