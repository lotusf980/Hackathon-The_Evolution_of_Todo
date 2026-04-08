/**
 * Validation Utilities
 * 
 * Client-side validation for forms with clear error messages.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * Requirements: min 8 characters, at least 1 number
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 8 && /\d/.test(password);
}

/**
 * Get password validation error message
 */
export function getPasswordError(password: string): string | null {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }
  return null;
}

/**
 * Validate registration form
 */
export function validateRegistration(data: {
  email: string;
  password: string;
  confirmPassword?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Password validation
  const passwordError = getPasswordError(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  // Confirm password validation
  if (data.confirmPassword && data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate login form
 */
export function validateLogin(data: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate todo creation form
 */
export function validateTodo(data: {
  title: string;
  notes?: string;
  dueDate?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  
  if (!data.title || data.title.trim() === '') {
    errors.title = 'Title is required';
  } else if (data.title.length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }
  
  if (data.notes && data.notes.length > 1000) {
    errors.notes = 'Notes must be less than 1000 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
