/**
 * Todo Item Component - Premium UI
 * 
 * Enhanced with glassmorphism, hover animations, and premium styling
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils/formatDate';
import { cn } from '@/lib/utils/cn';
import { hoverLiftVariants, checkboxVariants } from '@/components/animations/motion-primitives';
import { Checkbox } from '@/components/ui/Checkbox';
import type { Todo } from '@/types/todo';
import { Clock, Edit2, Trash2 } from 'lucide-react';

export interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export function TodoItem({ todo, onToggleComplete, onEdit, onDelete }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await onToggleComplete(todo.id, e.target.checked);
  };

  const getDueDateStyle = () => {
    if (!todo.dueDate) return { color: 'text-muted-foreground', bg: 'bg-muted/50' };

    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { color: 'text-destructive', bg: 'bg-destructive/10' };
    if (diffDays <= 2) return { color: 'text-warning', bg: 'bg-warning/10' };
    return { color: 'text-success', bg: 'bg-success/10' };
  };

  const dueDateStyle = getDueDateStyle();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      variants={hoverLiftVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-lg border',
        'bg-background/80 backdrop-blur-sm',
        'hover:bg-accent/50 hover:shadow-md',
        'transition-all duration-200',
        todo.completed && 'bg-muted/50 opacity-75'
      )}
    >
      {/* Checkbox */}
      <motion.div variants={checkboxVariants}>
        <Checkbox
          checked={todo.completed}
          onChange={handleCheckboxChange}
          className="h-5 w-5"
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className={cn(
          'font-medium transition-all duration-200',
          todo.completed && 'line-through text-muted-foreground'
        )}>
          {todo.title}
        </h3>
        
        {todo.notes && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {todo.notes}
          </p>
        )}

        {todo.dueDate && (
          <div className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium',
            dueDateStyle.bg,
            dueDateStyle.color
          )}>
            <Clock className="w-3 h-3" />
            <span>{formatDate(todo.dueDate)}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className={cn(
        'flex items-center gap-2 transition-opacity duration-200',
        isHovered ? 'opacity-100' : 'opacity-0'
      )}>
        <motion.button
          onClick={() => onEdit(todo)}
          className="p-2 rounded-lg hover:bg-background transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Edit todo"
        >
          <Edit2 className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          onClick={() => onDelete(todo)}
          className="p-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Delete todo"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default TodoItem;
