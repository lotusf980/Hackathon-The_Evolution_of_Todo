/**
 * Auth API Module
 * 
 * Authentication-related API calls for user registration,
 * login, logout, and session management.
 */

import { apiClient } from './client';
import type { RegisterInput, LoginInput, AuthResponse } from '@/types/auth';
import type { ApiResponse } from '@/types/api';

export const authApi = {
  /**
   * Register a new user
   */
  register: async (data: RegisterInput): Promise<ApiResponse<AuthResponse>> => {
    const { confirmPassword, ...registerData } = data;
    return apiClient.post<AuthResponse>('/api/auth/register', { 
      body: JSON.stringify(registerData) 
    });
  },

  /**
   * Sign in existing user
   */
  login: async (data: LoginInput): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<AuthResponse>('/api/auth/login', { 
      body: JSON.stringify(data) 
    });
  },

  /**
   * Sign out user (clear local token)
   * Backend cookie will be cleared by server
   */
  logout: async (): Promise<void> => {
    apiClient.setAuth(null);
  },

  /**
   * Get current session token
   */
  getToken: (): string | null => {
    return apiClient.getAuth();
  },

  /**
   * Set session token (called after successful login/register)
   */
  setToken: (token: string | null): void => {
    apiClient.setAuth(token);
  },
};
