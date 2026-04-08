/**
 * Dropdown Menu Component
 * 
 * Premium dropdown with scale/fade animation
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { scaleInVariants } from '@/components/animations/motion-primitives';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
}

export function DropdownMenu({ trigger, children, align = 'end' }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {trigger}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleInVariants}
            className={cn(
              'absolute top-full mt-2 z-50 min-w-[200px] rounded-md border bg-popover p-1 shadow-lg',
              'backdrop-blur-sm',
              align === 'start' && 'left-0',
              align === 'center' && 'left-1/2 -translate-x-1/2',
              align === 'end' && 'right-0'
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function DropdownMenuItem({ children, onClick, className }: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-2 rounded-md',
        'text-sm hover:bg-accent hover:text-accent-foreground',
        'transition-colors duration-200',
        className
      )}
    >
      {children}
    </button>
  );
}

export default DropdownMenu;
