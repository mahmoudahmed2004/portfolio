"use client";

import type { HTMLAttributes } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealProps = HTMLAttributes<HTMLDivElement>;

export function Reveal({
  children,
  className,
  ...htmlAttributes
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const canObserve = typeof IntersectionObserver === "function";

  return (
    <div {...htmlAttributes} className={cn("reveal", className)}>
      <motion.div
        className="reveal__motion"
        initial={false}
        whileInView={
          reduceMotion || !canObserve
            ? undefined
            : {
                opacity: [0.78, 1],
                y: [18, 0],
              }
        }
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
