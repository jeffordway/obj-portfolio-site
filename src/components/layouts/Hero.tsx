import React from 'react';
import { cn } from '@/lib/utils'; // Assuming utils location
import Video from 'next-video'; // Import next-video component
import { ScrollIndicator } from '@/components/ui/navigation/ScrollIndicator'; // Import ScrollIndicator

// Using 'any' for the imported video source type is common with next-video

interface HeroProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoSrc?: any; // Accept imported video source, reverting to any as required by next-video
  className?: string; // Allow passing additional classes
  overlayClassName?: string; // Optional class for overlay customization
  contentClassName?: string; // Optional class for content container
  showScrollIndicator?: boolean; // Add prop to control indicator visibility
}

export function Hero({
  children,
  videoSrc, // Use the new prop name
  className,
  overlayClassName,
  contentClassName,
  showScrollIndicator = true, // Default to true
}: HeroProps) {
  return (
    <section
      className={cn(
        'fixed inset-0 flex min-h-screen overflow-hidden', // Change to fixed positioning
        'pointer-events-none', // Allow clicks to pass through the main container
        className,
      )}
    >
      {/* Background Video */} 
      {videoSrc && (
        <Video
          src={videoSrc}
          className="w-full h-screen" // Keep sizing classes
          style={{
            position: 'fixed', // Change to fixed positioning
            inset: '0px',
            zIndex: 0,
            '--media-object-fit': 'cover',
          }} // Apply positioning/z-index directly
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        />
      )}

      {/* Background Overlay */} 
      <div
        className={cn(
          'absolute inset-0 z-10 bg-background/90 dark:bg-background/70', // Keep z-10
          overlayClassName,
        )}
        aria-hidden="true"
      />

      {/* Foreground Content */} 
      <div
        className={cn(
          'relative z-20 flex w-full flex-col items-center justify-center text-center text-foreground', // Keep z-20
          'min-h-screen',
          'pointer-events-auto', // Make the content area interactive
          contentClassName,
        )}
      >
        {children}
      </div>
      {/* Conditionally render the ScrollIndicator OUTSIDE content, as direct child of section */}
      {showScrollIndicator && <ScrollIndicator />}
    </section>
  );
}

// Add displayName for debugging
Hero.displayName = 'Hero';
