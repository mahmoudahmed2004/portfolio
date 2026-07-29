import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("shell configuration", () => {
  it("uses the approved AI Engineer metadata description", () => {
    const layout = readFileSync(resolve("app/layout.tsx"), "utf8");

    expect(layout).toContain(
      "AI Engineer building computer vision, deep learning, retrieval, automation, and Python systems.",
    );
  });

  it("does not redefine the display font token as itself", () => {
    const globals = readFileSync(resolve("app/globals.css"), "utf8");

    expect(globals).not.toMatch(
      /--font-display:\s*var\(--font-display\)/,
    );
  });
});
