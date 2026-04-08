/**
 * Framer Motion Primitives
 * 
 * Reusable animation variants and components
 */

import { Variants } from 'framer-motion';

// Page Transition Variants
export const pageTransitionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Stagger List Variants
export const staggerListVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Fade In Variants
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Scale In Variants
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Slide In from Left Variants
export const slideInLeftVariants: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Hover Lift Variants
export const hoverLiftVariants: Variants = {
  rest: {
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    y: -2,
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Checkbox Variants
export const checkboxVariants: Variants = {
  unchecked: {
    scale: 1,
    transition: {
      duration: 0.15,
    },
  },
  checked: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
      ease: 'easeInOut',
    },
  },
};

// Skeleton Shimmer Animation
export const shimmerVariants = {
  shimmer: {
    backgroundPosition: '-1000px 0',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Reduced Motion Check
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Conditional Animation Helper
export const getAnimationProps = (animation: any, disabled?: boolean) => {
  if (disabled || prefersReducedMotion()) {
    return {
      initial: false,
      animate: false,
      exit: false,
    };
  }
  return animation;
};
