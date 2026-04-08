/**
 * Landing Page
 * 
 * Public landing page for unauthenticated users.
 * Showcases app features and provides sign-in/sign-up CTAs.
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header - Enhanced with glassmorphism */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <CheckSquare className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Todo App
            </h1>
          </motion.div>
          <div className="flex gap-3">
            <Link href="/sign-in">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="secondary" className="border-gray-300 hover:border-blue-500 transition-colors">
                  Sign In
                </Button>
              </motion.div>
            </Link>
            <Link href="/sign-up">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Enhanced with animated elements */}
      <main className="flex-1">
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-8 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">The Evolution of Task Management</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Manage Your Tasks
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              A beautiful, intuitive platform that helps you stay organized, boost productivity, and achieve your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/sign-up">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl px-8 py-6 text-lg font-semibold">
                    Start for Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/sign-in">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary" size="lg" className="border-2 border-gray-300 hover:border-blue-500 px-8 py-6 text-lg font-semibold bg-white hover:bg-gray-50">
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '1M+', label: 'Tasks Completed' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section - Enhanced with gradient cards */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h3 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                Everything You Need to Stay Organized
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features designed to help you work smarter, not harder
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl" />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                >
                  <Plus className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  Quick Task Capture
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Add tasks in seconds with our intuitive interface. Never lose track of what needs to be done.
                </p>
              </motion.div>

              {/* Feature 2 - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-green-50 border-2 border-green-200 hover:border-green-400 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl" />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                >
                  <TrendingUp className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  Track Your Progress
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Mark tasks complete and watch your productivity grow. Visual feedback keeps you motivated.
                </p>
              </motion.div>

              {/* Feature 3 - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 hover:border-purple-400 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-2xl" />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                >
                  <Shield className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  Secure & Private
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Your tasks are encrypted and only accessible to you. Multi-user isolation guaranteed.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced with gradient */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
          {/* Animated pattern */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h3 className="text-5xl font-extrabold text-white mb-6">
              Ready to Get Organized?
            </h3>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of users who trust Todo to manage their tasks and boost their productivity.
            </p>
            <Link href="/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-50 shadow-2xl px-10 py-6 text-lg font-bold">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer - Enhanced */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 py-10 px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              The Evolution of Todo
            </span>
          </div>
          <p className="text-gray-600">&copy; 2025 The Evolution of Todo. Built with Next.js & Better Auth.</p>
        </div>
      </motion.footer>
    </div>
  );
}
