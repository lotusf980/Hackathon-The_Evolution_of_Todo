/**
 * Mobile Drawer Component
 * 
 * Slide-in navigation drawer for mobile
 */

'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { slideInLeftVariants, fadeInVariants } from '@/components/animations/motion-primitives';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CheckSquare, Settings } from 'lucide-react';

const navigationItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Todos', href: '/dashboard', icon: CheckSquare },
  { title: 'Settings', href: '/dashboard', icon: Settings },
];

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const pathname = usePathname();

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeInVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => onOpenChange(false)}
          />

          {/* Drawer */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={slideInLeftVariants}
            className={cn(
              'fixed left-0 top-0 h-full w-72 bg-background border-r border-border',
              'z-50 overflow-y-auto'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h1 className="text-xl font-bold">Menu</h1>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg',
                      'transition-colors duration-200',
                      'min-h-[44px]', // Touch target
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent text-foreground'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileDrawer;
