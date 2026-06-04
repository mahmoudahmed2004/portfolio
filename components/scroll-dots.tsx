"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type ScrollDot = {
  id: string;
  label: string;
};

export function ScrollDots({ items }: { items: ScrollDot[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.12, 0.3, 0.55, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="scroll-dots" aria-label="Section navigation">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={activeId === item.id ? "scroll-dot is-active" : "scroll-dot"}
          aria-label={`Go to ${item.label}`}
          aria-current={activeId === item.id ? "true" : undefined}
          style={{ "--dot-index": index } as CSSProperties}
        >
          <span className="scroll-dot__label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
