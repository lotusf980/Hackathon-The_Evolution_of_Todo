/**
 * App Sidebar Component
 * 
 * Collapsible navigation sidebar with smooth animations
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Settings, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { slideInLeftVariants, hoverLiftVariants } from '@/components/animations/motion-primitives';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Todos',
    href: '/dashboard',
    icon: CheckSquare,
  },
  {
    title: 'Settings',
    href: '/dashboard', // TODO: Add settings route
    icon: Settings,
  },
];

interface AppSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AppSidebar({ collapsed = false, onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggle?.();
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '70px' : '260px' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed left-0 top-0 h-full bg-background border-r border-border',
        'flex flex-col',
        'z-40'
      )}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-foreground"
          >
            Todo
          </motion.h1>
        )}
        <motion.button
          onClick={toggleCollapse}
          variants={hoverLiftVariants}
          whileHover="hover"
          whileTap="tap"
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                'transition-colors duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent text-foreground'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.title}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground"
          >
            The Evolution of Todo
          </motion.p>
        )}
      </div>
    </motion.aside>
  );
}

export default AppSidebar;
