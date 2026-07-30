import { describe, expect, it } from "vitest";
import { portfolio } from "@/lib/portfolio-data";

const publicText = JSON.stringify(portfolio);

describe("portfolio data", () => {
  it("uses the approved public identity", () => {
    expect(portfolio.identity.name).toBe("Mahmoud Ahmed Farouk");
    expect(portfolio.identity.headline).toBe(
      "AI Engineer | Machine Learning & Deep Learning | Computer Vision | Automation | Python",
    );
    expect(portfolio.identity.education).toBe(
      "Computer Science Graduate — Modern Academy, Class of 2026",
    );
  });

  it("contains no public phone number", () => {
    expect(publicText).not.toMatch(/01026889007|\(\s*\+20\)|tel:/i);
  });

  it("contains all six verified projects exactly once", () => {
    expect(portfolio.projects.map(({ slug }) => slug)).toEqual([
      "genoscene-app",
      "oralvision",
      "corrective-rag",
      "realistic-face-dcgan",
      "pos-system",
      "genoscene-website",
    ]);
  });

  it("describes the GenoScene evidence as the captured Learn interface", () => {
    const genoScene = portfolio.projects.find(
      ({ slug }) => slug === "genoscene-app",
    );

    expect(genoScene?.evidence[0].alt).toBe(
      "GenoScene Learn interface showing DNA phenotyping guides and media tabs",
    );
  });

  it("contains the three verified certificates", () => {
    expect(portfolio.certificates).toHaveLength(3);
    expect(portfolio.certificates.map(({ slug }) => slug)).toEqual([
      "instant-ai-diploma",
      "digitopia-2025",
      "build-with-ai-masr",
    ]);
  });

  it("keeps safety language on sensitive AI work", () => {
    const genoScene = portfolio.projects.find(
      ({ slug }) => slug === "genoscene-app",
    );
    const oralVision = portfolio.projects.find(
      ({ slug }) => slug === "oralvision",
    );
    expect(genoScene?.responsibleUse).toMatch(/probabilistic|research/i);
    expect(genoScene?.teamContext).toMatch(/team graduation project/i);
    expect(oralVision?.responsibleUse).toMatch(/research|not.*diagnosis/i);
  });

  it("uses only valid public contact links", () => {
    expect(portfolio.identity.links).toEqual([
      {
        label: "GitHub",
        href: "https://github.com/mahmoudahmed2004",
        kind: "social",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mahmoud-farouk-72737924a",
        kind: "social",
      },
      {
        label: "Email",
        href: "mailto:maf.bns@gmail.com",
        kind: "email",
      },
      {
        label: "Download CV",
        href: "/docs/mahmoud-ahmed-farouk-cv.pdf",
        kind: "download",
      },
    ]);
  });
});
