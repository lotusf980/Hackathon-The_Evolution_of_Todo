'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isAuthenticated, getCurrentUser, removeAuthToken } from '@/lib/auth';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const currentUser = getCurrentUser();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/">Todo App</Link>
          </div>

          <div className="flex items-center space-x-4">
            {!authenticated ? (
              <>
                {pathname !== '/login' && (
                  <Link href="/login" className="hover:underline">
                    Login
                  </Link>
                )}
                {pathname !== '/register' && (
                  <Link href="/register" className="hover:underline">
                    Register
                  </Link>
                )}
              </>
            ) : (
              <>
                <span className="hidden md:inline">Hello, {currentUser?.name || currentUser?.email}</span>
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;