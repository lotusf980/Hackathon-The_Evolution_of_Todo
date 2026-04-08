/**
 * Dashboard Page - Premium SaaS UI
 *
 * Main dashboard with premium styling and animations
 */

'use client';

import { motion } from 'framer-motion';
import { staggerListVariants, staggerItemVariants } from '@/components/animations/motion-primitives';
import { CheckSquare, Plus, Clock, TrendingUp, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/animations/Skeleton';
import { useTodos } from '@/lib/hooks/useTodos';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { AddTodoButton } from '@/components/todo/AddTodoButton';
import { useState } from 'react';

export default function DashboardPage() {
  const { todos, loading, toggleComplete, deleteTodo } = useTodos();
  const [hoveredTodo, setHoveredTodo] = useState<string | null>(null);

  const stats = [
    {
      title: 'Total Tasks',
      value: todos.length,
      icon: CheckSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: todos.filter(t => t.completed).length,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      title: 'Pending',
      value: todos.filter(t => !t.completed).length,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
  ];

  const handleToggle = async (id: string, completed: boolean) => {
    await toggleComplete(id, !completed);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTodo(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section - Premium Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl p-8 lg:p-12"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 25px 50px -12px rgba(102, 126, 234, 0.4)'
        }}
      >
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          />
          {/* Floating circles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3
              }}
              className="absolute w-3 h-3 bg-white/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 20}%`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-4xl">👋</span>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-lg text-white/90 mt-2 font-medium">
                  Let's make today productive and achieve your goals ✨
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <AddTodoButton />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards - Premium Glassmorphism Design */}
      <motion.div
        variants={staggerListVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const gradients = [
            'from-blue-500 via-blue-600 to-blue-700',
            'from-green-500 via-green-600 to-green-700',
            'from-amber-500 via-amber-600 to-amber-700'
          ];
          const bgGradients = [
            'from-blue-50 to-blue-100',
            'from-green-50 to-green-100',
            'from-amber-50 to-amber-100'
          ];
          
          return (
            <motion.div
              key={stat.title}
              variants={staggerItemVariants}
              custom={index}
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradients[index]} p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 backdrop-blur-sm`}
              >
                {/* Gradient orb in background */}
                <div
                  className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradients[index]} rounded-full opacity-20 blur-2xl`}
                />
                
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradients[index]}`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                        {stat.title}
                      </p>
                      {loading ? (
                        <Skeleton width="80px" height={40} />
                      ) : (
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                          className="text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                        >
                          {stat.value}
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${gradients[index]} shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200/50">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: stat.title === 'Total Tasks' 
                            ? '100%' 
                            : stat.title === 'Completed' 
                            ? `${todos.length > 0 ? (todos.filter(t => t.completed).length / todos.length) * 100 : 0}%`
                            : `${todos.length > 0 ? (todos.filter(t => !t.completed).length / todos.length) * 100 : 0}%`
                        }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${gradients[index]} rounded-full`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">
                      {stat.title === 'Total Tasks' 
                        ? 'All tasks' 
                        : stat.title === 'Completed' 
                        ? `${todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0}%`
                        : `${todos.length > 0 ? Math.round((todos.filter(t => !t.completed).length / todos.length) * 100) : 0}%`}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Todo List - Premium Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm bg-white/80"
      >
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        {/* Header */}
        <div className="border-b border-gray-200/50 px-8 py-6 bg-gradient-to-r from-white to-gray-50/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Your Tasks
              </h2>
              {todos.length > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 mt-2 font-semibold flex items-center gap-2"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    {todos.filter(t => !t.completed).length} Active
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                    <span className="w-2 h-2 bg-green-600 rounded-full" />
                    {todos.filter(t => t.completed).length} Done
                  </span>
                </motion.p>
              )}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AddTodoButton />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Skeleton height={80} />
                </motion.div>
              ))}
            </div>
          ) : todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 px-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 8, -8, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-[2rem] flex items-center justify-center shadow-2xl"
              >
                <CheckSquare className="w-16 h-16 text-white" />
              </motion.div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">
                No tasks yet! 🚀
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                Start your productivity journey by creating your first task. Every great achievement begins with a single step!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AddTodoButton />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerListVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {todos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  variants={staggerItemVariants}
                  custom={index}
                  onMouseEnter={() => setHoveredTodo(todo.id)}
                  onMouseLeave={() => setHoveredTodo(null)}
                  whileHover={{ x: 8, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={cn(
                    'group relative rounded-2xl p-6',
                    'transition-all duration-500',
                    'hover:shadow-2xl',
                    todo.completed 
                      ? 'bg-gradient-to-r from-gray-50 to-gray-100/50 opacity-75 border border-gray-200'
                      : 'bg-gradient-to-r from-white to-blue-50/30 border-2 border-transparent hover:border-blue-400'
                  )}
                >
                  {/* Left gradient accent on hover */}
                  <div className={cn(
                    'absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl transition-all duration-500',
                    hoveredTodo === todo.id 
                      ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500' 
                      : 'bg-transparent'
                  )} />
                  
                  <div className="flex items-start gap-5 ml-2">
                    {/* Checkbox */}
                    <motion.button
                      onClick={() => handleToggle(todo.id, todo.completed)}
                      className={cn(
                        'mt-1 w-7 h-7 rounded-xl border-3 flex items-center justify-center',
                        'transition-all duration-500 cursor-pointer',
                        todo.completed
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent shadow-xl'
                          : 'border-gray-300 hover:border-blue-500 hover:shadow-lg hover:scale-110'
                      )}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {todo.completed && (
                        <motion.svg
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', duration: 0.5 }}
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                      )}
                    </motion.button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={cn(
                          'text-xl font-bold transition-all duration-500',
                          todo.completed 
                            ? 'line-through text-gray-400' 
                            : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                        )}
                      >
                        {todo.title}
                      </h4>
                      {todo.notes && (
                        <p className="text-base text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                          {todo.notes}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        {todo.dueDate && (
                          <motion.div 
                            className={cn(
                              'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold',
                              'shadow-lg hover:shadow-xl transition-all',
                              'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            )}
                            whileHover={{ scale: 1.08, y: -2 }}
                          >
                            <Clock className="w-4 h-4" />
                            <span>Due {new Date(todo.dueDate).toLocaleDateString()}</span>
                          </motion.div>
                        )}
                        {todo.createdAt && (
                          <div className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                            <span className="text-gray-400">Created</span>
                            <span className="text-gray-700">{new Date(todo.createdAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div
                      className={cn(
                        'flex items-center gap-3 transition-all duration-500',
                        hoveredTodo === todo.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      )}
                    >
                      <motion.button
                        onClick={() => {}}
                        className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                        whileHover={{ scale: 1.15, rotate: 12 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit className="w-6 h-6" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(todo.id)}
                        className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all"
                        whileHover={{ scale: 1.15, rotate: -12 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
