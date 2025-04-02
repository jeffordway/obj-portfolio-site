import * as React from 'react';
import { cn } from '@/lib/utils';

// Define the possible spans for the first column (2 to 11)
type ColumnSpan = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface TwoColumnGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content for the two columns. Expects exactly two direct children. */
  children: React.ReactNode;
  /** The number of columns (out of 12) the first child should span on desktop. */
  firstColumnWidth?: ColumnSpan;
  /** Optional additional CSS classes for the grid container. */
  className?: string;
}

// Mapping required for Tailwind JIT compilation of dynamic col-span classes
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
  12: 'md:col-span-12',
};

export const TwoColumnGrid = ({
  children,
  firstColumnWidth = 6, // Default to 50/50 split
  className,
  ...props
}: TwoColumnGridProps) => {
  // Filter out invalid children (null, undefined, false) and ensure exactly two remain
  const validChildren = React.Children.toArray(children).filter(Boolean);

  if (validChildren.length !== 2) {
    console.error(
      `TwoColumnGrid Error: Expected exactly two direct children, but received ${validChildren.length}. Rendering null.`
    );
    return null; // Avoid rendering if children structure is incorrect
  }

  const secondColumnWidth = 12 - firstColumnWidth;

  // Get the Tailwind class strings for column spans
  const firstColClass = colSpanClasses[firstColumnWidth];
  const secondColClass = colSpanClasses[secondColumnWidth];

  return (
    <div
      className={cn(
        'grid',
        'grid-cols-1 md:grid-cols-12', // 1 col mobile, 12 cols desktop
        'gap-6 md:gap-8',               // Responsive gap (1.5rem mobile, 2rem desktop)
        className
      )}
      {...props}
    >
      {/* Apply column spans to wrapper divs */}
      <div className={cn(firstColClass)}>{validChildren[0]}</div>
      <div className={cn(secondColClass)}>{validChildren[1]}</div>
    </div>
  );
};
