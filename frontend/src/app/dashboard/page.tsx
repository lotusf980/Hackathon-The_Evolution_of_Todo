'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { getCurrentUser, isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { User } from '@/types';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      redirect('/login');
    } else {
      // Get current user
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, {user.name || user.email}</h2>
          <p className="text-gray-600">Manage your tasks below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TaskForm userId={user.id} onTaskCreated={() => {}} />
          </div>

          <div>
            <TaskList userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;