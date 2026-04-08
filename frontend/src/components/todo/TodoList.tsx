/**
 * Todo List Component - Premium UI
 * 
 * Enhanced with stagger animations and premium styling
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodos } from '@/lib/hooks/useTodos';
import { useToast } from '@/lib/hooks/useToast';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { SkeletonList } from '@/components/animations/Skeleton';
import { AddTodoButton } from './AddTodoButton';
import { StaggerList, StaggerItem } from '@/components/animations/StaggerList';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import type { Todo } from '@/types/todo';

export function TodoList() {
  const { todos, loading, error, toggleComplete, updateTodo, deleteTodo } = useTodos();
  const { success, error: toastError } = useToast();
  
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleDelete = (todo: Todo) => {
    setDeletingTodo(todo);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateSubmit = async (data: any) => {
    if (!editingTodo) return;
    
    try {
      await updateTodo(editingTodo.id, data);
      success('Todo updated successfully!');
      setIsEditModalOpen(false);
      setEditingTodo(null);
    } catch (err) {
      toastError('Failed to update todo');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTodo) return;
    
    try {
      await deleteTodo(deletingTodo.id);
      success('Todo deleted successfully!');
      setIsDeleteModalOpen(false);
      setDeletingTodo(null);
    } catch (err) {
      toastError('Failed to delete todo');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">My Tasks</h2>
          <AddTodoButton />
        </div>
        <SkeletonList count={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Failed to load todos</p>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Tasks</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {todos.filter(t => !t.completed).length} active,{' '}
            {todos.filter(t => t.completed).length} completed
          </p>
        </div>
        <AddTodoButton />
      </div>

      {/* List or Empty State */}
      {todos.length === 0 ? (
        <EmptyState onAddTodo={() => {}} />
      ) : (
        <StaggerList>
          {todos.map((todo, index) => (
            <StaggerItem key={todo.id} index={index}>
              <TodoItem
                todo={todo}
                onToggleComplete={async (id, completed) => {
                  try {
                    await toggleComplete(id, completed);
                    success(completed ? 'Task completed!' : 'Task reopened');
                  } catch (err) {
                    toastError('Failed to update todo');
                  }
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </StaggerItem>
          ))}
        </StaggerList>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          {editingTodo && (
            <TodoForm
              mode="edit"
              todo={editingTodo}
              onSubmit={handleUpdateSubmit}
              onCancel={() => setIsEditModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogHeader>
          <DialogTitle>Delete Todo?</DialogTitle>
          <DialogDescription>
            This action cannot be undone
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-1">
                Are you sure you want to delete
              </p>
              <p className="font-semibold text-foreground">
                "{deletingTodo?.title}"?
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This action cannot be undone.
              </p>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TodoList;

// Import TodoForm for edit modal
import { TodoForm } from './TodoForm';
