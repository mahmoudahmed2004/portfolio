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
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 48rem)");
    const closeAtDesktop = (
      event: MediaQueryListEvent | MediaQueryList,
    ) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    closeAtDesktop(desktopMedia);
    desktopMedia.addEventListener("change", closeAtDesktop);
    return () =>
      desktopMedia.removeEventListener("change", closeAtDesktop);
  }, []);

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

  useEffect(() => {
    const itemHrefs = new Set(items.map((item) => item.href));
    const updateFromHash = () => {
      if (itemHrefs.has(window.location.hash)) {
        setActiveHref(window.location.hash);
      }
    };

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);

    if (typeof IntersectionObserver === "undefined") {
      return () => window.removeEventListener("hashchange", updateFromHash);
    }

    const visibility = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        const mostVisible = [...visibility.entries()].sort(
          ([, firstRatio], [, secondRatio]) =>
            secondRatio - firstRatio,
        )[0];

        if (mostVisible && mostVisible[1] > 0) {
          setActiveHref(`#${mostVisible[0].id}`);
        }
      },
      {
        rootMargin: "-18% 0px -55%",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const item of items) {
      const section = document.getElementById(item.href.slice(1));
      if (section) {
        visibility.set(section, 0);
        observer.observe(section);
      }
    }

    return () => {
      window.removeEventListener("hashchange", updateFromHash);
      observer.disconnect();
    };
  }, [items]);

  const selectDestination = (href: string) => {
    setActiveHref(href);
    setIsOpen(false);
  };

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
                <a
                  className="focus-ring"
                  href={item.href}
                  aria-current={
                    activeHref === item.href ? "location" : undefined
                  }
                  data-current={
                    activeHref === item.href ? "true" : undefined
                  }
                  onClick={() => selectDestination(item.href)}
                >
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
                aria-current={
                  activeHref === item.href ? "location" : undefined
                }
                data-current={
                  activeHref === item.href ? "true" : undefined
                }
                onClick={() => selectDestination(item.href)}
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
