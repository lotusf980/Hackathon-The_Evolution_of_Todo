/**
 * Stagger List Component
 * 
 * Animates list items with staggered delay
 */

'use client';

import { motion } from 'framer-motion';
import { staggerListVariants, staggerItemVariants } from './motion-primitives';

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerList({ children, className, delay = 0.05 }: StaggerListProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerListVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItemVariants}
      custom={index}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default StaggerList;
