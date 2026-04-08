/**
 * Authentication & User Types
 * 
 * Represents user authentication flow, session management,
 * and JWT token handling for secure multi-user isolation.
 */

export interface User {
  id: string;
  email: string;
  createdAt: string; // ISO 8601 datetime
}

export interface RegisterInput {
  email: string; // valid email format
  password: string; // min 8 characters, at least 1 number
  confirmPassword?: string; // must match password
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string; // JWT token
  expiresAt: string; // ISO 8601 datetime
}

export interface Session {
  user: User | null;
  token: string | null;
  expiresAt: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
