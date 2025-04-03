import * as React from 'react';
import { cn } from '@/lib/utils';

// Define the props for the Row component
interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to be rendered within the row. */
  children: React.ReactNode;
  /** Optional additional CSS classes for the row container. */
  className?: string;
}


export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex', className)} {...props}>
        {children}
      </div>
    );
  }
);

Row.displayName = 'Row'; // Add display name for debugging
