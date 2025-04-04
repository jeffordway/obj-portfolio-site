import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the TwoColumnGrid component.
 */
interface TwoColumnGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The direct children elements to be placed in the grid.
   * Expects exactly two children for the two-column layout.
   */
  children: React.ReactNode;
  /**
   * The Tailwind CSS column span for the first child element (1-11).
   * The second child's span will be calculated automatically (12 - firstColSpan).
   * Defaults to 6 if not provided.
   * @default 6
   */
  firstColSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  /**
   * The gap between grid columns and rows, using Tailwind gap scale (e.g., 4, 6, 8).
   * Applies both column-gap and row-gap (for stacked view).
   * Defaults to 6 if not provided.
   * @default 6
   */
  gap?: number;
  /**
   * Optional additional CSS class names.
   */
  className?: string;
}

/**
 * A responsive two-column grid layout component using Tailwind CSS.
 *
 * It expects exactly two children. The width of the columns can be controlled
 * via the `firstColSpan` prop, which sets the span for the first child,
 * and the second child's span is calculated to fill the remaining space in a 12-column grid.
 * On smaller screens (below `md`), the columns stack vertically.
 *
 * @example
 * // Equal columns (6 + 6)
 * <TwoColumnGrid>
 *   <div>First Column Content</div>
 *   <div>Second Column Content</div>
 * </TwoColumnGrid>
 *
 * @example
 * // Uneven columns (4 + 8) with custom gap
 * <TwoColumnGrid firstColSpan={4} gap={8}>
 *   <div>First Column Content (Smaller)</div>
 *   <div>Second Column Content (Larger)</div>
 * </TwoColumnGrid>
 */
const TwoColumnGrid = React.forwardRef<HTMLDivElement, TwoColumnGridProps>(
  (
    {
      className,
      children,
      firstColSpan: firstColSpanProp, // Rename prop to avoid conflict with default assignment
      gap: gapProp, // Rename prop
      ...props
    },
    ref
  ) => {
    // Assign defaults safely
    const firstColSpan = firstColSpanProp ?? 6;
    const gap = gapProp ?? 6;

    // Validate firstColSpan is within the acceptable range (1-11)
    // Calculation now correctly uses the defaulted 'firstColSpan' variable
    const validFirstColSpan = Math.max(1, Math.min(11, firstColSpan));
    const secondColSpan = 12 - validFirstColSpan;

    const childrenArray = React.Children.toArray(children);

    // Warn in development if the number of children is not exactly 2
    if (process.env.NODE_ENV === 'development' && childrenArray.length !== 2) {
      console.warn(
        `TwoColumnGrid: Expected exactly 2 children, but received ${childrenArray.length}. Layout might not work as intended.`
      );
    }

    // Map column span numbers to fixed Tailwind classes for better compatibility with JIT
    const colSpanClasses: Record<number, string> = {
      1: 'md:col-span-1',
      2: 'md:col-span-2',
      3: 'md:col-span-3',
      4: 'md:col-span-4',
      5: 'md:col-span-5',
      6: 'md:col-span-6',
      7: 'md:col-span-7',
      8: 'md:col-span-8',
      9: 'md:col-span-9',
      10: 'md:col-span-10',
      11: 'md:col-span-11',
      12: 'md:col-span-12'
    };
    
    // Use fixed classes from the mapping
    const firstColSpanClass = colSpanClasses[validFirstColSpan];
    const secondColSpanClass = colSpanClasses[secondColSpan];

    // Map gap number to fixed Tailwind class
    const gapClasses: Record<number, string> = {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16'
    };
    
    // Use fixed gap class or default to gap-6
    const gapClass = gapClasses[gap] || 'gap-6';

    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-1 md:grid-cols-12', // Stack on mobile, 12 cols on medium+
          gapClass, // Apply gap
          className // Allow extending classes
        )}
        {...props}
      >
        {/* Apply column spans only to the first two children */}
        {childrenArray.map((child, index) => {
          // Ensure we are only attempting to clone valid React elements
          if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
            let colSpanClass = '';
            // Apply specific spans only on medium screens and up
            if (index === 0) {
              colSpanClass = firstColSpanClass;
            } else if (index === 1) {
              colSpanClass = secondColSpanClass;
            }

            // Clone the element, adding the responsive column span class
            // Safely access existing className
            return React.cloneElement(child, {
              key: index,
              className: cn(
                child.props.className, // Access className safely
                colSpanClass
              ),
            });
          }
          return child; // Return non-element children (like strings, numbers) as is
        })}
      </div>
    );
  }
);

TwoColumnGrid.displayName = 'TwoColumnGrid';

export { TwoColumnGrid };
