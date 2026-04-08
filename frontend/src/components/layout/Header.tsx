/**
 * Header Component
 * 
 * Application header with logo, user menu, and sign out button.
 * Used in the dashboard layout.
 */

'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { UserMenu } from './UserMenu';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-blue-600">
              Todo
            </h1>
            <span className="text-sm text-gray-500 hidden sm:inline">
              Phase II
            </span>
          </div>

          {/* User Menu */}
          {user && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
