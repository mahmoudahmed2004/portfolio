import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CertificateGallery } from "@/components/sections/certificate-gallery";
import { portfolio } from "@/lib/portfolio-data";

describe("CertificateGallery", () => {
  it("opens a certificate dialog and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(<CertificateGallery certificates={portfolio.certificates} />);
    const trigger = screen.getByRole("button", {
      name: /open ai diploma certificate/i,
    });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: /ai diploma/i })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
