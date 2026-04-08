/**
 * Sign In Page
 *
 * User authentication page with email/password form.
 */

import { Suspense } from 'react';
import { SignInForm } from '@/components/auth/SignInForm';
import { Spinner } from '@/components/ui/Spinner';

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
