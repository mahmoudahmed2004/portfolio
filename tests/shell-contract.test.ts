import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  createRouteMetadata,
  HOME_DESCRIPTION,
  HOME_TITLE,
} from "@/lib/route-metadata";

describe("shell configuration", () => {
  it("uses the approved route-specific AI Engineer metadata", () => {
    const metadata = createRouteMetadata({
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      pathname: "/",
    });

    expect(metadata.title).toBe("Mahmoud Ahmed Farouk — AI Engineer");
    expect(metadata.description).toBe(
      "AI Engineer building machine learning, deep learning, computer vision, retrieval, automation, and Python systems.",
    );
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.openGraph?.url).toBe("/");
  });

  it("does not redefine the display font token as itself", () => {
    const globals = readFileSync(resolve("app/globals.css"), "utf8");

    expect(globals).not.toMatch(
      /--font-display:\s*var\(--font-display\)/,
    );
  });
});
