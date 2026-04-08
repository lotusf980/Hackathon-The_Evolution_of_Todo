/**
 * User Menu Component
 * 
 * Displays user email and sign out button.
 * Used in the application header.
 */

'use client';

import type { User } from '@/types/auth';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <div className="flex items-center gap-4">
      {/* User Info */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-sm">
            {user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-sm text-gray-700 max-w-[150px] truncate">
          {user.email}
        </span>
      </div>

      {/* Sign Out Button */}
      <Button
        onClick={handleSignOut}
        variant="secondary"
        size="sm"
      >
        Sign Out
      </Button>
    </div>
  );
}

export default UserMenu;
