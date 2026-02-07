'use client';

import React from 'react';
import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const HomePage: React.FC = () => {
  // Check if user is authenticated to redirect appropriately
  if (isAuthenticated()) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Todo Application
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            Manage your tasks efficiently with our secure and user-friendly todo app.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Task Management</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Easily create, update, and manage your tasks with our intuitive interface.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Secure Authentication</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Your data is protected with industry-standard security measures.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Responsive Design</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access your tasks from any device with our responsive web design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;