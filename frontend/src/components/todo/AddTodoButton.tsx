/**
 * Add Todo Button Component
 * 
 * Opens create todo modal with premium styling
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { TodoForm } from './TodoForm';
import { useTodos } from '@/lib/hooks/useTodos';
import { useToast } from '@/lib/hooks/useToast';
import { Plus } from 'lucide-react';
import type { CreateTodoInput, UpdateTodoInput } from '@/types/todo';

export function AddTodoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { createTodo } = useTodos();
  const { success, error } = useToast();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (data: CreateTodoInput | UpdateTodoInput) => {
    if ('title' in data && data.title) {
      try {
        await createTodo(data as CreateTodoInput);
        success('Todo created successfully!');
        handleClose();
      } catch (err) {
        error('Failed to create todo');
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={handleOpen}
          size="lg"
          className="gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl font-bold px-6 py-3 rounded-xl transition-all duration-300"
        >
          <motion.div
            animate={{ rotate: [0, 90, 90, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
          <span className="text-base">Add Task</span>
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogHeader>
          <DialogTitle>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Task ✨
            </span>
          </DialogTitle>
          <DialogDescription>
            Add a new task to boost your productivity
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TodoForm
              mode="create"
              onSubmit={handleSubmit}
              onCancel={handleClose}
            />
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTodoButton;
