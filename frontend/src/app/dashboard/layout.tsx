/**
 * Dashboard Layout - Direct Route
 * Protected layout for authenticated users
 */

'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <AuthGuard isAuthenticated={isAuthenticated} isLoading={isLoading}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}

import { useAuth } from '@/lib/hooks/useAuth';
