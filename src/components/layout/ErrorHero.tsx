import React from 'react';
import { cn } from '@/lib/utils';

interface ErrorHeroProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ErrorHero component - A simplified version of Hero for error pages
 * Doesn't use fixed positioning or pointer-events that might interfere with buttons
 */
export function ErrorHero({
  children,
  className,
}: ErrorHeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center justify-center',
        className,
      )}
    >
      {/* Background Overlay */} 
      <div
        className={cn(
          'absolute inset-0 bg-background dark:bg-background',
        )}
        aria-hidden="true"
      />

      {/* Foreground Content */} 
      <div
        className={cn(
          'relative z-10 flex w-full flex-col items-center justify-center text-center text-foreground',
          'min-h-screen',
        )}
      >
        {children}
      </div>
    </section>
  );
}

// Add displayName for debugging
ErrorHero.displayName = 'ErrorHero';
