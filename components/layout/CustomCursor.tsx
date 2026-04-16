"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Dot follows immediately
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 50 });

  // Ring follows with lag
  const ringX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");
    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-magnetic], input, textarea, select, [role='button']")
      ) {
        setIsHovering(true);
        // Check for custom cursor label
        const label = target.closest("[data-cursor]")?.getAttribute("data-cursor");
        setCursorLabel(label || null);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-magnetic], input, textarea, select, [role='button']")
      ) {
        setIsHovering(false);
        setCursorLabel(null);
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [rawX, rawY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[99999] mix-blend-difference"
      />

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 72 : 48,
          height: isHovering ? 72 : 48,
          borderColor: isHovering
            ? "rgba(139, 92, 246, 0.8)"
            : "rgba(250, 250, 250, 0.4)",
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[99998] flex items-center justify-center"
      >
        {cursorLabel && (
          <span className="text-[10px] font-semibold text-white tracking-wider uppercase">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </>
  );
}
