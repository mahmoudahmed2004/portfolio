import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StructuredData } from "@/components/seo/structured-data";

describe("StructuredData", () => {
  it("renders one JSON-LD script and escapes opening angle brackets", () => {
    const { container } = render(
      <StructuredData
        data={{
          "@context": "https://schema.org",
          name: "</script><script>alert('unsafe')</script>",
        }}
      />,
    );

    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts).toHaveLength(1);
    expect(scripts[0]?.textContent).not.toContain("<");
    expect(scripts[0]?.textContent).toContain("\\u003c/script>");
    expect(JSON.parse(scripts[0]?.textContent ?? "{}").name).toBe(
      "</script><script>alert('unsafe')</script>",
    );
  });
});
