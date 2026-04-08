/**
 * useToast Hook
 * 
 * Manages toast notifications for user feedback
 */

'use client';

import { useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Global toast state
let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

function notifyListeners() {
  toastListeners.forEach(listener => listener([...toasts]));
}

export function useToast() {
  /**
   * Add a new toast notification
   */
  const addToast = useCallback((message: string, type: ToastType = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type };
    
    toasts = [...toasts, newToast];
    notifyListeners();
    
    // Auto-dismiss after duration
    setTimeout(() => {
      toasts = toasts.filter(t => t.id !== id);
      notifyListeners();
    }, duration);
  }, []);

  /**
   * Remove a toast by ID
   */
  const removeToast = useCallback((id: string) => {
    toasts = toasts.filter(t => t.id !== id);
    notifyListeners();
  }, []);

  /**
   * Show success toast
   */
  const success = useCallback((message: string) => {
    addToast(message, 'success');
  }, [addToast]);

  /**
   * Show error toast
   */
  const error = useCallback((message: string) => {
    addToast(message, 'error');
  }, [addToast]);

  /**
   * Show info toast
   */
  const info = useCallback((message: string) => {
    addToast(message, 'info');
  }, [addToast]);

  /**
   * Subscribe to toast changes
   */
  const subscribe = useCallback((listener: (toasts: Toast[]) => void) => {
    toastListeners = [...toastListeners, listener];
    listener(toasts); // Initial call
    
    return () => {
      toastListeners = toastListeners.filter(l => l !== listener);
    };
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    subscribe,
  };
}

// Export current toasts for Toast component
export function getToasts(): Toast[] {
  return [...toasts];
}
