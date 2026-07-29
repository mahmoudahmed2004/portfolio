import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Neural Bloom fallback asset", () => {
  it("contains six translucent vector petals and no raster or animation", async () => {
    const svg = await readFile(
      path.join(
        process.cwd(),
        "public",
        "images",
        "neural-bloom-fallback.svg",
      ),
      "utf8",
    );

    expect(svg.match(/class="neural-bloom__petal"/g)).toHaveLength(6);
    expect(svg).toMatch(/radialGradient|linearGradient/);
    expect(svg).not.toMatch(/<image\b|data:image|<animate\b|<animateTransform\b/);
  });
});
