/**
 * AuthGuard HOC
 * 
 * Higher-Order Component that protects routes by requiring authentication.
 * Redirects unauthenticated users to sign-in page.
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';

export interface AuthGuardProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function AuthGuard({ children, isAuthenticated, isLoading }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      // Redirect to sign-in with return URL
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
}

/**
 * useAuthGuard Hook
 * 
 * Convenience hook for using AuthGuard logic in components
 */
export function useAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();

  const redirectToSignIn = () => {
    const returnUrl = encodeURIComponent(pathname);
    router.push(`/sign-in?returnUrl=${returnUrl}`);
  };

  return {
    redirectToSignIn,
    returnUrl: pathname,
  };
}

export default AuthGuard;
