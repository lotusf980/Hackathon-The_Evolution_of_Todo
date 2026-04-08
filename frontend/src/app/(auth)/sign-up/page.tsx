/**
 * Sign Up Page
 *
 * User registration page with email/password form.
 */

import { Suspense } from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Spinner } from '@/components/ui/Spinner';

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    }>
      <SignUpForm />
    </Suspense>
  );
}
