import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the AutoGrid component.
 */
interface AutoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The direct children elements to be placed in the grid.
   * Can be any number of children.
   */
  children: React.ReactNode;
  /**
   * The gap between grid items, using Tailwind gap scale (e.g., 4, 6, 8).
   * Applies both column-gap and row-gap.
   * Defaults to 6 if not provided.
   * @default 6
   */
  gap?: number;
  /**
   * Optional additional CSS class names for the grid container.
   */
  className?: string;
  // Future enhancement: Could add props for responsive columns like `cols`, `mdCols`, `lgCols`
}

/**
 * A responsive grid layout component that automatically arranges children
 * into columns and wraps them onto new rows as needed.
 *
 * Defaults to a single column on mobile (`xs`) and two columns on
 * medium screens (`md`) and up.
 *
 * @example
 * <AutoGrid gap={8}>
 *   <Card />
 *   <Card />
 *   <Card />
 *   <Card />
 * </AutoGrid>
 */
const AutoGrid = React.forwardRef<HTMLDivElement, AutoGridProps>(
  ({ className, children, gap: gapProp, ...props }, ref) => {
    // Assign defaults safely
    const gap = gapProp ?? 6;
    const gapClass = `gap-${gap}`;

    // Filter out invalid children (null, undefined, false) before mapping
    const validChildren = React.Children.toArray(children).filter(Boolean);

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          'grid-cols-1 md:grid-cols-2', // Default: 1 col mobile, 2 cols medium+
          gapClass, // Apply gap
          className // Allow extending classes
        )}
        {...props}
      >
        {/* Render valid children directly within the grid */}
        {validChildren}
      </div>
    );
  }
);

AutoGrid.displayName = 'AutoGrid';

export { AutoGrid };
