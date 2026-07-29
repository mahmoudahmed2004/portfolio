import { expect, test } from "@playwright/test";

test("presents Mahmoud as an AI Engineer with public contact actions", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Mahmoud Ahmed Farouk",
    }),
  ).toBeVisible();
  await expect(page.getByText("AI Engineer", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /explore selected work/i }))
    .toHaveAttribute("href", "#work");
  await expect(page.getByRole("link", { name: /download cv/i }))
    .toHaveAttribute("href", "/docs/mahmoud-ahmed-farouk-cv.pdf");
  await expect(page.locator("body")).not.toContainText("01026889007");
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
