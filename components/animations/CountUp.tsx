"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated && ref.current) {
      setHasAnimated(true);
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent =
              prefix + Math.round(latest).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, suffix, prefix, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
