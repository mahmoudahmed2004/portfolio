"use client";

import { useEffect } from "react";

export function CursorSpotlight() {
  useEffect(() => {
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--mouse-x",
          `${event.clientX}px`,
        );
        document.documentElement.style.setProperty(
          "--mouse-y",
          `${event.clientY}px`,
        );
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <div className="cursor-spotlight" aria-hidden="true" />;
}
