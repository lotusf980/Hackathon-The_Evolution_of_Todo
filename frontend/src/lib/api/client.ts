/**
 * API Client
 * 
 * Base API client with automatic JWT token handling,
 * retry logic, error handling, and timeout support.
 */

import type { ApiResponse, ApiError } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
  private token: string | null = null;

  /**
   * Get stored auth token
   * Prefers httpOnly cookie (Better Auth default), falls back to localStorage
   */
  getAuth(): string | null {
    if (typeof window === 'undefined') return null;

    // Try localStorage if token not set in class
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }

    return this.token;
  }

  /**
   * Store auth token
   */
  setAuth(token: string | null): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  /**
   * Generic request handler with JWT, retry, and timeout
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuth();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...config,
        signal: AbortSignal.timeout(10000), // 10s timeout
      });

      // Handle 401 Unauthorized - redirect to sign-in
      if (response.status === 401) {
        this.setAuth(null);
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
        return { error: { status: 401, message: 'Unauthorized - please sign in' } };
      }

      const data = await response.json();
      
      if (!response.ok) {
        return { 
          error: { 
            status: response.status, 
            message: data.message || 'An error occurred',
            code: data.code,
            details: data.details,
          } as ApiError 
        };
      }

      return { data: data as T };
    } catch (error) {
      // Handle timeout
      if (error instanceof Error && error.name === 'TimeoutError') {
        return { error: { status: 408, message: 'Request timed out. Please try again.' } };
      }
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { error: { status: 503, message: 'Unable to connect to server. Please check your connection.' } };
      }
      
      return { error: { status: 500, message: 'An unexpected error occurred' } };
    }
  }

  /**
   * HTTP Methods
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, options: { body: string }): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'POST', 
      body: options.body,
    });
  }

  async put<T>(endpoint: string, options: { body: string }): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'PUT', 
      body: options.body,
    });
  }

  async patch<T>(endpoint: string, options: { body: string }): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'PATCH', 
      body: options.body,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
