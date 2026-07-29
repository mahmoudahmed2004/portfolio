"use client";

import { useEffect, useRef, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  items: NavigationItem[];
};

export function SiteHeader({ items }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a className="site-mark focus-ring" href="#intro" aria-label="Home">
          <span className="site-mark__aperture" aria-hidden="true">
            <span />
          </span>
          <span>MAF / AI</span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <a className="focus-ring" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          className="menu-button focus-ring"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true" className="menu-button__lines">
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!isOpen}
      >
        <ul>
          {items.map((item, index) => (
            <li key={item.href}>
              <a
                className="focus-ring"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
