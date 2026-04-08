/**
 * Date Formatting Utility
 * 
 * Formats ISO date strings into user-friendly formats
 * with relative time support.
 */

/**
 * Format ISO date to user-friendly string
 * Examples: "Today", "Tomorrow", "Dec 30, 2025", "Overdue"
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Normalize to compare dates only (ignore time)
  const normalizeDate = (d: Date) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };
  
  const dateOnly = normalizeDate(date);
  const todayOnly = normalizeDate(today);
  const tomorrowOnly = normalizeDate(tomorrow);
  
  if (dateOnly === todayOnly) {
    return 'Today';
  } else if (dateOnly === tomorrowOnly) {
    return 'Tomorrow';
  } else if (dateOnly < todayOnly) {
    return 'Overdue';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}

/**
 * Format ISO datetime to relative time
 * Examples: "2 hours ago", "in 3 days"
 */
export function formatRelativeTime(dateString: string | undefined): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const absDiff = Math.abs(diffInSeconds);
  
  if (absDiff < 60) {
    return 'just now';
  } else if (absDiff < 3600) {
    const minutes = Math.floor(absDiff / 60);
    return diffInSeconds > 0 
      ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      : `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else if (absDiff < 86400) {
    const hours = Math.floor(absDiff / 3600);
    return diffInSeconds > 0 
      ? `${hours} hour${hours > 1 ? 's' : ''} ago`
      : `in ${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (absDiff < 604800) {
    const days = Math.floor(absDiff / 86400);
    return diffInSeconds > 0 
      ? `${days} day${days > 1 ? 's' : ''} ago`
      : `in ${days} day${days > 1 ? 's' : ''}`;
  } else {
    return formatDate(dateString);
  }
}

/**
 * Format ISO datetime to full datetime string
 */
export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
