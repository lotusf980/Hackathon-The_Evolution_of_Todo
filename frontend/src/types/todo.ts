/**
 * Todo Entity Types
 * 
 * Represents a task in the todo application with all required fields
 * for tracking, completion status, and user ownership.
 */

export interface Todo {
  id: string;
  title: string;
  notes?: string;
  dueDate?: string; // ISO 8601 date (YYYY-MM-DD)
  completed: boolean;
  createdAt: string; // ISO 8601 datetime
  updatedAt: string; // ISO 8601 datetime
  userId: string;
}

export interface CreateTodoInput {
  title: string; // required, min 1 char, max 200
  notes?: string; // optional, max 1000 chars
  dueDate?: string; // optional, future date preferred
}

export interface UpdateTodoInput {
  title?: string;
  notes?: string;
  dueDate?: string;
  completed?: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export type TodoSort = 'createdAt' | 'dueDate' | 'title';
