/**
 * API Response Types
 * 
 * Standardized API response structures for consistent
 * error handling and type-safe API consumption.
 */

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  status: number; // HTTP status code (200, 400, 401, 403, 404, 500)
  message: string; // user-friendly error message
  code?: string; // machine-readable error code
  details?: Record<string, string>; // field-specific validation errors
}

// Todo-specific API responses
export interface TodosResponse {
  todos: Todo[];
}

export interface TodoResponse {
  todo: Todo;
}

// Auth-specific API responses
export interface RegisterResponse {
  user: User;
  token: string;
  expiresAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresAt: string;
}

// Generic success response
export interface SuccessResponse {
  success: boolean;
  message?: string;
}

// Import types from other modules
import type { Todo } from './todo';
import type { User } from './auth';
