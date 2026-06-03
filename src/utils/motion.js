/** Shared motion tokens — one language across the whole site */
export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.45, 0, 0.55, 1];

export const DURATION = {
  fast: 0.35,
  md: 0.55,
  lg: 0.75,
  xl: 0.95,
};

export const VIEWPORT = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -6% 0px',
};

export const STAGGER = {
  step: 0.08,
  children: 0.1,
};

export const fadeUp = {
  hidden: { opacity: 1, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.lg,
      delay,
      ease: EASE_OUT,
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 1 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.md, delay, ease: EASE_OUT },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 1, x: -32 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.lg, delay, ease: EASE_OUT },
  }),
};

export const fadeRight = {
  hidden: { opacity: 1, x: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.lg, delay, ease: EASE_OUT },
  }),
};

export const scaleIn = {
  hidden: { opacity: 1, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.lg, delay, ease: EASE_OUT },
  }),
};

export const blurUp = {
  hidden: { opacity: 1, y: 20, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.xl, delay, ease: EASE_OUT },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.children,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 1, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT },
  },
};

export const pageTransition = {
  hidden: { opacity: 1, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.md, ease: EASE_OUT },
  },
  exit: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE_IN_OUT },
  },
};

export const bannerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const bannerItem = {
  hidden: { opacity: 1, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.lg, ease: EASE_OUT },
  },
};

export const slideVariants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 48 : -48,
    scale: 1.02,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: DURATION.lg, ease: EASE_OUT },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -48 : 48,
    scale: 0.98,
    transition: { duration: DURATION.md, ease: EASE_IN_OUT },
  }),
};

export const hoverLift = {
  y: -8,
  transition: { duration: 0.35, ease: EASE_OUT },
};

export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.15 },
};

/** Delay index → seconds (Reveal delay prop) */
export function staggerDelay(index = 0) {
  return index * STAGGER.step;
}

export const reducedFadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};
