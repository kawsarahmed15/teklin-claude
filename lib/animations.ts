// Shared animation configurations for Motion (Framer Motion)

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutSine = [0.37, 0, 0.63, 1] as const;

// Fade up — the standard scroll reveal
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

// Fade in — simple opacity
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Scale up — for cards, images
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

// Stagger container — wraps staggered children
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Text character reveal
export const charReveal = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

// Draw SVG path
export const drawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
};

// Number count up (use with animate())
export const countUpConfig = {
  duration: 2,
  ease: easeOutExpo,
};

// Hover scale for cards
export const cardHover = {
  rest: { scale: 1, transition: { duration: 0.3, ease: easeOutExpo } },
  hover: { scale: 1.02, transition: { duration: 0.3, ease: easeOutExpo } },
};

// Magnetic button offset limits
export const magneticConfig = {
  maxDistance: 100,
  maxOffset: 12,
  springConfig: { stiffness: 200, damping: 20 },
};
