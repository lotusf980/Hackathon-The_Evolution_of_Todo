/**
 * useTodos Hook
 * 
 * Manages todo state with optimistic updates,
 * error handling, and rollback on failure.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { todosApi } from '@/lib/api/todos';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all todos on mount
   */
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const result = await todosApi.list();
        
        if (result.error) {
          setError(result.error.message);
          return;
        }

        if (result.data) {
          setTodos(result.data.todos.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch todos:', err);
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  /**
   * Create a new todo with optimistic update
   */
  const createTodo = useCallback(async (data: CreateTodoInput): Promise<Todo | null> => {
    // Optimistic: Create temporary todo
    const tempTodo: Todo = {
      id: `temp-${Date.now()}`,
      ...data,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'current-user', // Will be replaced by backend
    };

    setTodos(prev => [tempTodo, ...prev]);

    try {
      const result = await todosApi.create(data);

      if (result.error) {
        // Rollback on error
        setTodos(prev => prev.filter(t => t.id !== tempTodo.id));
        throw new Error(result.error.message);
      }

      if (result.data) {
        // Replace temp todo with real one
        setTodos(prev =>
          prev.map(t => t.id === tempTodo.id ? result.data!.todo : t)
        );
        return result.data.todo;
      }

      return null;
    } catch (err) {
      console.error('Failed to create todo:', err);
      throw err;
    }
  }, []); // Empty dependency array

  /**
   * Update a todo with optimistic update
   */
  const updateTodo = useCallback(async (
    id: string,
    data: UpdateTodoInput
  ): Promise<Todo | null> => {
    let previousData: Partial<Todo> = {};

    // Optimistic update
    setTodos(prev => {
      const todo = prev.find(t => t.id === id);
      if (todo) {
        previousData = { ...todo };
      }
      return prev.map(t => 
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      );
    });

    try {
      const result = await todosApi.update(id, data);

      if (result.error) {
        // Rollback on error
        setTodos(prev =>
          prev.map(t => t.id === id ? { ...t, ...previousData } : t)
        );
        throw new Error(result.error.message);
      }

      if (result.data) {
        return result.data.todo;
      }

      return null;
    } catch (err) {
      console.error('Failed to update todo:', err);
      throw err;
    }
  }, []); // Empty dependency array

  /**
   * Delete a todo with optimistic update
   */
  const deleteTodo = useCallback(async (id: string): Promise<boolean> => {
    let deletedTodo: Todo | undefined;

    // Optimistic removal
    setTodos(prev => {
      deletedTodo = prev.find(t => t.id === id);
      return prev.filter(t => t.id !== id);
    });

    try {
      const result = await todosApi.delete(id);

      if (result.error) {
        // Rollback on error
        if (deletedTodo) {
          setTodos(prev => [...prev, deletedTodo!]);
        }
        throw new Error(result.error.message);
      }

      return true;
    } catch (err) {
      console.error('Failed to delete todo:', err);
      throw err;
    }
  }, []); // Empty dependency array

  /**
   * Toggle todo completion with optimistic update
   */
  const toggleComplete = useCallback(async (
    id: string,
    completed: boolean
  ): Promise<Todo | null> => {
    let todoToToggle: Todo | undefined;
    
    // Find the todo to toggle
    setTodos(prev => {
      todoToToggle = prev.find(t => t.id === id);
      return prev.map(t => 
        t.id === id ? { ...t, completed, updatedAt: new Date().toISOString() } : t
      );
    });

    try {
      const result = await todosApi.toggleComplete(id, completed);

      if (result.error) {
        // Rollback on error
        if (todoToToggle) {
          setTodos(prev =>
            prev.map(t =>
              t.id === id ? { ...t, completed: todoToToggle!.completed } : t
            )
          );
        }
        throw new Error(result.error.message);
      }

      if (result.data) {
        return result.data.todo;
      }

      return null;
    } catch (err) {
      console.error('Failed to toggle completion:', err);
      throw err;
    }
  }, []); // Empty dependency array - uses functional updates

  /**
   * Get a single todo by ID
   */
  const getTodo = useCallback((id: string): Todo | undefined => {
    return todos.find(t => t.id === id);
  }, [todos]);

  /**
   * Get filtered todos
   */
  const getFilteredTodos = useCallback((filter: 'all' | 'active' | 'completed'): Todo[] => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    getTodo,
    getFilteredTodos,
    refresh: () => window.location.reload(), // Simple refresh, can be improved
  };
}
