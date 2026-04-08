/**
 * Sign Up Form Component
 *
 * Premium registration form with smooth animations
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/hooks/useAuth';
import { validateRegistration } from '@/lib/utils/validation';
import { useToast } from '@/lib/hooks/useToast';

export function SignUpForm() {
  const router = useRouter();
  const { register } = useAuth();
  const { error: toastError, success: toastSuccess } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const validation = validateRegistration(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    const result = await register({
      email: formData.email,
      password: formData.password,
    });

    if (result.error) {
      toastError(result.error.message || 'Failed to create account');
      setErrors({ email: result.error.message || 'Registration failed' });
      setIsLoading(false);
      return;
    }

    toastSuccess('Account created successfully!');
    router.push('/');
  };

  const features = [
    'Organize your tasks effortlessly',
    'Track your productivity',
    'Secure and private',
  ];

  return (
    <div className="w-full">
      {/* Header - Enhanced with animated gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl"
        >
          <UserPlus className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3"
        >
          Create Account
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-600 text-lg"
        >
          Start your productivity journey and organize your tasks like a pro
        </motion.p>
      </motion.div>

      {/* Form - Enhanced with glassmorphism card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-200"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
              required
              autoComplete="email"
              icon={<Mail className="w-5 h-5 text-gray-500" />}
              className="h-12"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
              autoComplete="new-password"
              icon={<Lock className="w-5 h-5 text-gray-500" />}
              className="h-12"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
              icon={<Lock className="w-5 h-5 text-gray-500" />}
              className="h-12"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="pt-2"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                size="lg"
                className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl h-12 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                {isLoading ? (
                  'Creating account...'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <UserPlus className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>

      {/* Features - Enhanced with better styling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
      >
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Why choose us?</h3>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
              className="flex items-center gap-3 text-sm text-gray-700"
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.2 }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer - Enhanced */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-600 text-base">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold transition-all duration-300 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default SignUpForm;
