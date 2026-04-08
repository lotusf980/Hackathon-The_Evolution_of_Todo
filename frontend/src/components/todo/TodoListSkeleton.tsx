/**
 * Todo List Skeleton
 * 
 * Loading skeleton for todo list.
 */

'use client';

import { Skeleton } from '@/components/ui/Skeleton';

export function TodoListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
        >
          <Skeleton variant="circular" width={20} height={20} />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height={18} />
            <Skeleton width="40%" height={14} />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="rectangular" width={36} height={36} />
            <Skeleton variant="rectangular" width={36} height={36} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoListSkeleton;
