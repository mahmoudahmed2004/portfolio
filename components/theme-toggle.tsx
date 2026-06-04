"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  return (
    <button
      type="button"
      data-theme-toggle="true"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="inline-flex size-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--text-strong)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
    >
      <Sun className="theme-toggle__sun" size={18} />
      <Moon className="theme-toggle__moon" size={18} />
    </button>
  );
}
