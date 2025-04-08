import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollIndicator } from '@/components/ui/navigation/ScrollIndicator';

interface HeroContentProps {
  children: React.ReactNode;
  className?: string;
  showScrollIndicator?: boolean;
}

export function HeroContent({
  children,
  className,
  showScrollIndicator = true,
}: HeroContentProps) {
  return (
    <div className="fixed inset-0 min-h-screen w-full z-20 pointer-events-auto">
      {/* Foreground Content */} 
      <div
        className={cn(
          'flex w-full h-full flex-col items-center justify-center text-center text-foreground',
          className,
        )}
      >
        {children}
      </div>
      
      {/* Conditionally render the ScrollIndicator */}
      {showScrollIndicator && (
        <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2">
          <ScrollIndicator />
        </div>
      )}
    </div>
  );
}

// Add displayName for debugging
HeroContent.displayName = 'HeroContent';
