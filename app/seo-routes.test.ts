import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("SEO metadata routes", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("lists only the public home and CV URLs from the shared site origin", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");

    expect(sitemap().map(({ url }) => url)).toEqual([
      "https://portfolio.example/",
      "https://portfolio.example/cv",
    ]);
  });

  it("allows the public site and references its canonical sitemap", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://portfolio.example");

    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://portfolio.example/sitemap.xml",
    });
  });
});
