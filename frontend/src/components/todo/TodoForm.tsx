/**
 * Todo Form Component
 * 
 * Premium form for creating/editing todos with validation
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { validateTodo } from '@/lib/utils/validation';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo';

export interface TodoFormProps {
  todo?: Todo;
  mode: 'create' | 'edit';
  onSubmit: (data: CreateTodoInput | UpdateTodoInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TodoForm({ todo, mode, onSubmit, onCancel, isLoading = false }: TodoFormProps) {
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    notes: todo?.notes || '',
    dueDate: todo?.dueDate || '',
    completed: todo?.completed || false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when todo changes (edit mode)
  useEffect(() => {
    if (todo && mode === 'edit') {
      setFormData({
        title: todo.title,
        notes: todo.notes || '',
        dueDate: todo.dueDate || '',
        completed: todo.completed,
      });
    }
  }, [todo, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const validation = validateTodo(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Submit
    await onSubmit(formData);
  };

  const isDirty = () => {
    if (!todo) return formData.title !== '' || formData.notes !== '' || formData.dueDate !== '';
    return (
      formData.title !== todo.title ||
      formData.notes !== (todo.notes || '') ||
      formData.dueDate !== (todo.dueDate || '')
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title *"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="What needs to be done?"
        error={errors.title}
        required
        autoFocus
      />

      <Textarea
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Add any additional details..."
        error={errors.notes}
        rows={4}
        hint="Optional - up to 1000 characters"
      />

      <Input
        label="Due Date"
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        error={errors.dueDate}
        min={new Date().toISOString().split('T')[0]}
      />

      {mode === 'edit' && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="completed"
            checked={formData.completed}
            onChange={(e) => setFormData(prev => ({ ...prev, completed: e.target.checked }))}
          />
          <label htmlFor="completed" className="text-sm font-medium">
            Mark as complete
          </label>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1"
          isLoading={isLoading}
        >
          {isLoading ? 'Saving...' : mode === 'create' ? 'Create Todo' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}

export default TodoForm;
