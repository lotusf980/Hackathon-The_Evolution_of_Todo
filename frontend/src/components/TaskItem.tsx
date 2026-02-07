'use client';

import React, { useState } from 'react';
import { Task } from '@/types';
import { updateTask, deleteTask, toggleTaskCompletion } from '@/lib/api';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      await updateTask(task.user_id, task.id, {
        title: editData.title,
        description: editData.description
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      setLoading(true);
      try {
        await deleteTask(task.user_id, task.id);
        onTaskDeleted();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleCompletion = async () => {
    setLoading(true);
    try {
      await toggleTaskCompletion(task.user_id, task.id, {
        completed: !task.completed
      });
      onTaskUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
      {error && <div className="text-red-500 mb-2">{error}</div>}

      {isEditing ? (
        <div>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              maxLength={1000}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`px-3 py-1 rounded text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleCompletion}
                disabled={loading}
                className="mr-3 h-5 w-5"
              />
              <div>
                <h3 className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`mt-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Created: {new Date(task.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;