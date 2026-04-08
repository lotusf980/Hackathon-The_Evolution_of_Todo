/**
 * Todos API Module
 * 
 * Todo CRUD operations API calls with full type safety
 * and automatic JWT handling.
 */

import { apiClient } from './client';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';
import type { ApiResponse } from '@/types/api';

export interface TodosResponse {
  todos: Todo[];
}

export interface TodoResponse {
  todo: Todo;
}

export interface SuccessResponse {
  success: boolean;
}

const API_BASE = '/api';

export const todosApi = {
  /**
   * Fetch all todos for authenticated user
   */
  list: async (): Promise<ApiResponse<TodosResponse>> => {
    return apiClient.get<TodosResponse>(`${API_BASE}/todos`);
  },

  /**
   * Create a new todo
   */
  create: async (data: CreateTodoInput): Promise<ApiResponse<TodoResponse>> => {
    return apiClient.post<TodoResponse>('/api/todos', { 
      body: JSON.stringify(data) 
    });
  },

  /**
   * Get a specific todo by ID
   */
  getById: async (id: string): Promise<ApiResponse<TodoResponse>> => {
    return apiClient.get<TodoResponse>(`/api/todos/${id}`);
  },

  /**
   * Update an existing todo
   */
  update: async (
    id: string, 
    data: UpdateTodoInput
  ): Promise<ApiResponse<TodoResponse>> => {
    return apiClient.put<TodoResponse>(`/api/todos/${id}`, { 
      body: JSON.stringify(data) 
    });
  },

  /**
   * Delete a todo permanently
   */
  delete: async (id: string): Promise<ApiResponse<SuccessResponse>> => {
    return apiClient.delete<SuccessResponse>(`/api/todos/${id}`);
  },

  /**
   * Toggle todo completion status
   */
  toggleComplete: async (
    id: string, 
    completed: boolean
  ): Promise<ApiResponse<TodoResponse>> => {
    return apiClient.patch<TodoResponse>(`/api/todos/${id}/complete`, { 
      body: JSON.stringify({ completed }) 
    });
  },
};
