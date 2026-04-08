/**
 * Empty State Component
 * 
 * Friendly empty state with illustration and CTA
 */

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CheckSquare } from 'lucide-react';

export interface EmptyStateProps {
  onAddTodo: () => void;
}

export function EmptyState({ onAddTodo }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12 px-4"
    >
      {/* Illustration */}
      <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
        <CheckSquare className="w-10 h-10 text-muted-foreground" />
      </div>
      
      {/* Text */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        You're all caught up!
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        No tasks yet. Add one to get started and stay organized.
      </p>

      {/* CTA Button */}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button onClick={onAddTodo} size="lg" className="gap-2">
          <span className="text-lg">+</span>
          Add Your First Task
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default EmptyState;
