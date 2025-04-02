import * as React from 'react';
import { cn } from '@/lib/utils';

// --- Type Definitions for Alignment ---

// Horizontal alignment (cross-axis for flex-col)
export type AlignItemsOptions = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
// Vertical alignment/distribution (main-axis for flex-col)
export type JustifyContentOptions = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// --- Component Props Interface ---

interface OneColumnGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to be rendered within the grid. */
  children: React.ReactNode;
  /** Horizontal alignment of items within the column. @default 'stretch' */
  alignItems?: AlignItemsOptions;
  /** Vertical alignment/distribution of items within the column. @default 'start' */
  justifyContent?: JustifyContentOptions;
  /** Optional additional CSS classes for the grid container. */
  className?: string;
}

// --- Style Mappings ---

const alignItemsClasses: Record<AlignItemsOptions, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch', // Default flex behavior
  baseline: 'items-baseline',
};

const justifyContentClasses: Record<JustifyContentOptions, string> = {
  start: 'justify-start', // Default flex behavior
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// --- OneColumnGrid Component ---

export const OneColumnGrid = ({
  children,
  alignItems = 'stretch', // Default horizontal alignment
  justifyContent = 'start', // Default vertical alignment
  className,
  ...props
}: OneColumnGridProps) => {
  return (
    <div
      className={cn(
        'flex flex-col', // Arrange children vertically
        'gap-6 md:gap-8', // Responsive gap
        alignItemsClasses[alignItems], // Apply horizontal alignment class
        justifyContentClasses[justifyContent], // Apply vertical alignment class
        className // Merge custom classes last
      )}
      {...props}
    >
      {children}
    </div>
  );
};
