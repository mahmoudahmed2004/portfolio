import { describe, expect, it } from "vitest";
import {
  resolveSiteUrl,
  VERIFIED_SITE_ORIGIN,
} from "@/lib/site-url";

describe("site URL resolution", () => {
  it("pins the verified Sites production origin", () => {
    expect(VERIFIED_SITE_ORIGIN).toBe(
      "https://portfolio-mocha-eight-67.vercel.app",
    );
  });

  it("normalizes the explicit build-time site origin", () => {
    expect(
      resolveSiteUrl("https://portfolio.example/", "production").href,
    ).toBe("https://portfolio.example/");
  });

  it("uses a localhost URL only during development", () => {
    expect(resolveSiteUrl(undefined, "development").href).toBe(
      "http://localhost:3000/",
    );
    expect(() => resolveSiteUrl(undefined, "production")).toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
  });

  it("rejects non-HTTP and non-origin values", () => {
    expect(() =>
      resolveSiteUrl("javascript:alert(1)", "production"),
    ).toThrow(/HTTP/i);
    expect(() =>
      resolveSiteUrl("https://portfolio.example/path", "production"),
    ).toThrow(/origin/i);
  });
});
