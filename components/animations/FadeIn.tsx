"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { fadeUp, fadeIn, scaleUp, slideInLeft, slideInRight } from "@/lib/animations";

type Variant = "fadeUp" | "fadeIn" | "scaleUp" | "slideLeft" | "slideRight";

interface FadeInProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants = {
  fadeUp,
  fadeIn,
  scaleUp,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
};

export function FadeIn({
  children,
  variant = "fadeUp",
  delay = 0,
  duration,
  className,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px 0px" });

  const selectedVariant = variants[variant];
  const customVariant = duration
    ? {
        ...selectedVariant,
        visible: {
          ...selectedVariant.visible,
          transition: { ...selectedVariant.visible.transition, duration, delay },
        },
      }
    : delay
    ? {
        ...selectedVariant,
        visible: {
          ...selectedVariant.visible,
          transition: { ...selectedVariant.visible.transition, delay },
        },
      }
    : selectedVariant;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}
