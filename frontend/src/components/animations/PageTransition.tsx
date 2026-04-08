/**
 * Page Transition Component
 * 
 * Wraps pages with smooth fade/slide animations
 */

'use client';

import { motion } from 'framer-motion';
import { pageTransitionVariants } from './motion-primitives';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransitionVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
