/**
 * Class Name Utility
 * 
 * Combines multiple class names conditionally,
 * similar to clsx or classnames package.
 */

export function cn(...classes: Array<string | boolean | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Extended version with conditional classes
 */
export function cx(
  ...classes: Array<string | Record<string, boolean | null | undefined>>
): string {
  const result: string[] = [];
  
  for (const item of classes) {
    if (typeof item === 'string') {
      result.push(item);
    } else if (typeof item === 'object') {
      for (const [key, value] of Object.entries(item)) {
        if (value) {
          result.push(key);
        }
      }
    }
  }
  
  return result.join(' ');
}
