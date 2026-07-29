import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/shell/site-header";
import { portfolio } from "@/lib/portfolio-data";

describe("SiteHeader", () => {
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
});
