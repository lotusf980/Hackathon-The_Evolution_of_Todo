/**
 * App Header Component
 * 
 * Top header with user profile dropdown
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, User, LogOut } from 'lucide-react';
import { scaleInVariants } from '@/components/animations/motion-primitives';
import { useAuth } from '@/lib/hooks/useAuth';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await logout();
    setDropdownOpen(false);
  };

  return (
    <header className={cn(
      'sticky top-0 z-30',
      'bg-background/80 backdrop-blur-sm border-b border-border',
      'h-16 px-4 flex items-center justify-between'
    )}>
      {/* Left: Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-accent transition-colors lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Center: Title (hidden on mobile) */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      {/* Right: Profile Dropdown */}
      {isAuthenticated && user && (
        <div className="relative">
          <motion.button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Open user menu"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline text-sm font-medium">
              {user.email}
            </span>
          </motion.button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={scaleInVariants}
                className={cn(
                  'absolute right-0 mt-2 w-56 rounded-lg border border-border bg-background shadow-lg',
                  'z-50 overflow-hidden'
                )}
              >
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-muted-foreground">Signed in</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleSignOut}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-md',
                      'text-sm text-destructive hover:bg-accent',
                      'transition-colors'
                    )}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default AppHeader;
