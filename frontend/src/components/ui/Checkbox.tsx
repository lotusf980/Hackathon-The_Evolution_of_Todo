/**
 * Checkbox Component
 * 
 * Premium checkbox with smooth toggle animation
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            className={cn(
              'peer h-5 w-5 shrink-0 rounded border border-input',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'checked:bg-primary checked:border-primary',
              'transition-all duration-200',
              className
            )}
            ref={ref}
            {...props}
          />
          <Check
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-4 h-4 text-primary-foreground',
              'opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100',
              'transition-all duration-200'
            )}
          />
        </div>
        {label && (
          <span className="text-sm font-medium group-hover:text-foreground transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };

export default Checkbox;
