/**
 * Dashboard Page - Direct Route
 * Main todo dashboard
 */

'use client';

import { TodoList } from '@/components/todo/TodoList';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          My Dashboard
        </h2>
        <p className="text-gray-600">
          Manage your tasks efficiently
        </p>
      </div>

      <TodoList />
    </div>
  );
}
