/**
 * Skeleton Component
 * 
 * Loading skeleton for content placeholders.
 * Provides visual feedback during data fetching.
 */

'use client';

import { cn } from '@/lib/utils/cn';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave';
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  animation = 'pulse',
}: SkeletonProps) {
  const baseStyles = cn(
    'bg-gray-200',
    animation === 'pulse' && 'animate-pulse',
    animation === 'wave' && 'animate-shimmer',
    variant === 'circular' && 'rounded-full',
    variant === 'rounded' && 'rounded-lg',
    variant === 'rectangular' && 'rounded-none',
    className
  );

  const style: React.CSSProperties = {};

  if (width !== undefined) {
    style.width = typeof width === 'string' ? width : `${width}px`;
  }

  if (height !== undefined) {
    style.height = typeof height === 'string' ? height : `${height}px`;
  }

  if (variant === 'text') {
    style.height = style.height || '1em';
    style.borderRadius = '4px';
  }

  return <div className={baseStyles} style={style} aria-hidden="true" />;
}

/**
 * Skeleton List Component
 * 
 * Renders multiple skeleton items for list loading
 */
export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
          <Skeleton variant="circular" width={20} height={20} />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height={18} />
            <Skeleton width="40%" height={14} />
          </div>
          <Skeleton variant="rectangular" width={32} height={32} />
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
