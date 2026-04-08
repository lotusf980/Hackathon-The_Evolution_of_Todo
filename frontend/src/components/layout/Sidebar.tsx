/**
 * Sidebar Component
 *
 * Premium animated sidebar navigation with smooth transitions
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CheckSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Todos',
    href: '/dashboard/todos',
    icon: CheckSquare,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed left-0 top-0 h-full bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 z-40',
        'hidden lg:flex flex-col shadow-xl'
      )}
    >
      {/* Logo Section - Enhanced with gradient */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
        <motion.div
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -10 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn('overflow-hidden', collapsed && 'hidden')}
        >
          <h1 className="text-xl font-bold text-white whitespace-nowrap flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
            >
              <CheckSquare className="w-5 h-5 text-blue-600" />
            </motion.div>
            Todo App
          </h1>
        </motion.div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 text-white hover:bg-white/20 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation - Enhanced with better styling */}
      <nav className="flex-1 py-4 px-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl',
                  'transition-all duration-300 cursor-pointer',
                  'hover:shadow-lg',
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon size={20} className="flex-shrink-0" />
                </motion.div>
                <motion.span
                  initial={false}
                  animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'font-semibold whitespace-nowrap',
                    collapsed && 'hidden'
                  )}
                >
                  {item.title}
                </motion.span>
                {/* Active indicator */}
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Section - Enhanced with gradient and better styling */}
      <div className="p-4 border-t border-gray-200 space-y-2 bg-gradient-to-b from-transparent to-gray-50/50">
        <Link href="/dashboard/profile">
          <motion.div
            whileHover={{ x: 6 }}
            className={cn(
              'flex items-center gap-3 px-3 py-3 rounded-xl',
              'text-gray-700 hover:bg-gray-100 transition-all duration-300 cursor-pointer'
            )}
          >
            <motion.div
              className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm"
              whileHover={{ scale: 1.1 }}
            >
              U
            </motion.div>
            <motion.span
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1 }}
              className={cn('font-semibold whitespace-nowrap', collapsed && 'hidden')}
            >
              Profile
            </motion.span>
          </motion.div>
        </Link>
        <motion.button
          onClick={handleSignOut}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-3 rounded-xl',
            'text-red-600 hover:bg-red-50 transition-all duration-300 cursor-pointer',
            'hover:shadow-md'
          )}
          whileHover={{ x: 6 }}
        >
          <LogOut size={20} className="flex-shrink-0" />
          <motion.span
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1 }}
            className={cn('font-semibold whitespace-nowrap', collapsed && 'hidden')}
          >
            Sign Out
          </motion.span>
        </motion.button>
      </div>
    </motion.aside>
  );
}

// Mobile Drawer Component - Enhanced
export function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Enhanced with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer - Enhanced with gradient */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 z-50 lg:hidden shadow-2xl"
          >
            {/* Header - Enhanced with gradient */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
                >
                  <CheckSquare className="w-5 h-5 text-blue-600" />
                </motion.div>
                Todo App
              </h1>
              <Button variant="ghost" size="sm" onClick={onClose} className="p-2 text-white hover:bg-white/20">
                <X size={20} />
              </Button>
            </div>

            {/* Navigation - Enhanced */}
            <nav className="flex-1 py-4 px-3 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-xl',
                        'transition-all duration-300 cursor-pointer',
                        'hover:shadow-lg',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="font-semibold">{item.title}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* User Section - Enhanced */}
            <div className="p-4 border-t border-gray-200 space-y-2 bg-gradient-to-b from-transparent to-gray-50/50">
              <Link href="/dashboard/profile" onClick={onClose}>
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
                  <motion.div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm"
                  >
                    U
                  </motion.div>
                  <span className="font-semibold">Profile</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all cursor-pointer hover:shadow-md"
              >
                <LogOut size={20} />
                <span className="font-semibold">Sign Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Header Bar Component - Enhanced
export function HeaderBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <motion.button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={20} />
        </motion.button>
      </div>
      {/* User avatar */}
      <motion.div
        className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        U
      </motion.div>
    </header>
  );
}
