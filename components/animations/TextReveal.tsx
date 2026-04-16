"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { easeOutExpo } from "@/lib/animations";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "chars";
}

export function TextReveal({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.05,
  splitBy = "words",
}: TextRevealProps) {
  /**
   * We attach the IntersectionObserver ref to a plain <div> sentinel that
   * sits directly before the heading in the DOM. This avoids the TypeScript
   * ref-type mismatch AND avoids the display:contents zero-box problem that
   * breaks IntersectionObserver.
   */
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { once: true, margin: "-50px 0px" });

  const units =
    splitBy === "words" ? children.split(" ") : children.split("");

  return (
    <>
      {/* Zero-height sentinel the observer can see */}
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 0, overflow: "hidden" }} />
      <Tag className={className} aria-label={children}>
        {/* Visually-hidden accessible label is on the Tag above */}
        <span style={{ display: "inline" }} aria-hidden="true">
          {units.map((unit, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
              }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "105%", opacity: 0 }}
                animate={
                  isInView
                    ? { y: "0%", opacity: 1 }
                    : { y: "105%", opacity: 0 }
                }
                transition={{
                  duration: 0.55,
                  ease: easeOutExpo,
                  delay: delay + i * stagger,
                }}
              >
                {unit}
                {splitBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </span>
      </Tag>
    </>
  );
}
