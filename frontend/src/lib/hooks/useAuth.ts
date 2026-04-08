/**
 * useAuth Hook
 * 
 * Manages authentication state, login, register, and logout
 * with automatic session persistence.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { authApi } from '@/lib/api/auth';
import type { User, RegisterInput, LoginInput, Session, AuthStatus } from '@/types/auth';
import type { ApiResponse } from '@/types/api';

export function useAuth() {
  const [session, setSession] = useState<Session>({
    user: null,
    token: null,
    expiresAt: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const [status, setStatus] = useState<AuthStatus>('loading');

  // Initialize session on mount
  useEffect(() => {
    const initSession = async () => {
      try {
        const token = authApi.getToken();
        
        if (!token) {
          setSession({
            user: null,
            token: null,
            expiresAt: null,
            isLoading: false,
            isAuthenticated: false,
          });
          setStatus('unauthenticated');
          return;
        }

        // Token exists, user is authenticated
        // In a real app, you'd validate the token with backend here
        setSession({
          user: null, // User details will be loaded separately if needed
          token,
          expiresAt: null,
          isLoading: false,
          isAuthenticated: true,
        });
        setStatus('authenticated');
      } catch (error) {
        console.error('Failed to initialize session:', error);
        setStatus('unauthenticated');
      }
    };

    initSession();
  }, []);

  /**
   * Register a new user
   */
  const register = useCallback(async (data: RegisterInput) => {
    setStatus('loading');
    
    const result: ApiResponse<{ user: User; token: string; expiresAt: string }> = 
      await authApi.register(data);
    
    if (result.error) {
      setStatus('unauthenticated');
      return { error: result.error };
    }

    if (result.data) {
      authApi.setToken(result.data.token);
      
      setSession({
        user: result.data.user,
        token: result.data.token,
        expiresAt: result.data.expiresAt,
        isLoading: false,
        isAuthenticated: true,
      });
      setStatus('authenticated');
      
      return { data: result.data };
    }

    return { error: { status: 500, message: 'Unexpected error' } };
  }, []);

  /**
   * Sign in existing user
   */
  const login = useCallback(async (data: LoginInput) => {
    setStatus('loading');
    
    const result: ApiResponse<{ user: User; token: string; expiresAt: string }> = 
      await authApi.login(data);
    
    if (result.error) {
      setStatus('unauthenticated');
      return { error: result.error };
    }

    if (result.data) {
      authApi.setToken(result.data.token);
      
      setSession({
        user: result.data.user,
        token: result.data.token,
        expiresAt: result.data.expiresAt,
        isLoading: false,
        isAuthenticated: true,
      });
      setStatus('authenticated');
      
      return { data: result.data };
    }

    return { error: { status: 500, message: 'Unexpected error' } };
  }, []);

  /**
   * Sign out user
   */
  const logout = useCallback(async () => {
    await authApi.logout();
    
    setSession({
      user: null,
      token: null,
      expiresAt: null,
      isLoading: false,
      isAuthenticated: false,
    });
    setStatus('unauthenticated');
  }, []);

  return {
    ...session,
    status,
    register,
    login,
    logout,
  };
}
