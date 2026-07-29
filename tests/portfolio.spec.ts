import { expect, test } from "@playwright/test";

const approvedHeadline =
  "AI Engineer | Machine Learning & Deep Learning | Computer Vision | Automation | Python";
const approvedIntroduction =
  "I build AI systems that move from data and evaluation to useful, human-facing software.";

test("presents the approved AI-first identity and public actions", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator("#intro");

  await expect(
    hero.getByRole("heading", {
      level: 1,
      name: "Mahmoud Ahmed Farouk",
    }),
  ).toBeVisible();
  await expect(hero.getByText("AI Engineer", { exact: true })).toBeVisible();
  await expect(hero.getByText(approvedHeadline, { exact: true })).toBeVisible();
  await expect(
    hero.getByText(approvedIntroduction, { exact: true }),
  ).toBeVisible();
  await expect(hero.getByRole("link", { name: /explore selected work/i }))
    .toHaveAttribute("href", "#work");
  await expect(hero.getByRole("link", { name: "GitHub" }))
    .toHaveAttribute("href", "https://github.com/mahmoudahmed2004");
  await expect(hero.getByRole("link", { name: "LinkedIn" }))
    .toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/mahmoud-farouk-72737924a",
    );
  await expect(hero.getByRole("link", { name: "Email" }))
    .toHaveAttribute("href", "mailto:maf.bns@gmail.com");
  await expect(hero.getByRole("link", { name: /download cv/i }))
    .toHaveAttribute("href", "/docs/mahmoud-ahmed-farouk-cv.pdf");
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: "Download CV" }),
  ).toHaveAttribute("href", "/docs/mahmoud-ahmed-farouk-cv.pdf");
  await expect(page.locator("body")).not.toContainText("01026889007");
});

test("reserves a decorative neural-bloom slot without portrait imagery", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator("#intro");
  const bloomSlot = hero.locator('[data-scene-slot="neural-bloom"]');

  await expect(hero.getByRole("img")).toHaveCount(0);
  await expect(hero.locator("img, picture")).toHaveCount(0);
  await expect(bloomSlot).toHaveCount(1);
  await expect(bloomSlot).toHaveAttribute("aria-hidden", "true");
  await expect(hero).toContainText("Observe · Learn · Evaluate · Deliver");
});

test("renders grouped expertise as semantic content", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /signal to intelligence/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Machine learning" }))
    .toBeVisible();
  await expect(page.getByRole("heading", { name: "Product engineering" }))
    .toBeVisible();
});

test("groups constellation skills in labelled semantic lists", async ({
  page,
}) => {
  await page.goto("/");
  const constellation = page.locator(
    'section[aria-labelledby="capability-title"]',
  );
  const groups = constellation.locator("ul[aria-labelledby]");

  await expect(
    constellation.getByRole("heading", {
      name: "One system, connected disciplines",
    }),
  ).toBeVisible();
  await expect(groups).toHaveCount(4);
  await expect(
    constellation
      .getByRole("list", { name: "Machine learning" })
      .getByRole("listitem"),
  ).toHaveText(["scikit-learn", "XGBoost", "LightGBM", "Pandas", "NumPy"]);
  await expect(
    constellation
      .getByRole("list", { name: "Product engineering" })
      .getByRole("listitem"),
  ).toHaveText(["FastAPI", "Django REST", "Flutter", "PySide6", "SQL"]);

  const decorativeConnectors = constellation.locator(
    'div[aria-hidden="true"]',
  );
  await expect(decorativeConnectors).toHaveCount(1);
  await expect(decorativeConnectors.locator("span")).toHaveCount(4);
});

test("keeps the core narrative visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  try {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Mahmoud Ahmed Farouk",
      }),
    ).toBeVisible();
    await expect(
      page.getByText(approvedIntroduction, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Signal to intelligence" }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test("keeps revealed content static when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#intro")).toBeVisible();

  const revealContent = page.locator("[data-reveal-content]");
  expect(await revealContent.count()).toBeGreaterThan(0);
  const activeAnimations = await revealContent.evaluateAll((nodes) =>
    nodes.reduce(
      (count, node) => count + node.getAnimations().length,
      0,
    ),
  );
  expect(activeAnimations).toBe(0);
});

test("fits the hero and capability narrative at 320 pixels", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));

  expect(widths.document).toBeLessThanOrEqual(widths.viewport);
  expect(widths.body).toBeLessThanOrEqual(widths.viewport);
  await expect(
    page.locator("#intro").getByRole("link", {
      name: "Explore selected work",
    }),
  ).toBeVisible();
  await expect(
    page.locator('section[aria-labelledby="capability-title"]'),
  ).toBeVisible();
});

test("renders all six verified projects and responsible-use notes", async ({
  page,
}) => {
  await page.goto("/");
  for (const title of [
    "GenoScene",
    "OralVision",
    "Corrective RAG System",
    "Realistic Face DCGAN",
    "Point of Sale System",
    "GenoScene Web Prototype",
  ]) {
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  }
  await expect(page.getByText(/not definitive identity claims/i)).toBeVisible();
  await expect(page.getByText(/not a clinical diagnosis service/i)).toBeVisible();
  await expect(page.getByText(/synthetic model artifact/i)).toBeVisible();
});

test("labels repository-reported metrics with context", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("98.41%")).toBeVisible();
  await expect(
    page.getByText("Repository-reported EfficientNet-B3 evaluation").first(),
  ).toBeVisible();
});
