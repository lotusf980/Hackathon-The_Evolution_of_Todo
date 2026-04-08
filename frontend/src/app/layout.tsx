/**
 * Root Layout
 * 
 * Main application layout with providers and global styles.
 * Wraps all pages with necessary context providers.
 */

import type { Metadata } from 'next';
import { ToastContainer } from '@/components/ui/Toast';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'The Evolution of Todo - Phase II',
  description: 'A beautiful, simple way to stay organized',
  keywords: ['todo', 'tasks', 'productivity', 'organization'],
  authors: [{ name: 'Hackathon Participant' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
