import React from 'react';
import { cn } from '@/lib/utils';
import Video from 'next-video';
import Image, { StaticImageData } from 'next/image';
import { ScrollIndicator } from '@/components/ui/navigation/ScrollIndicator';

interface HeroProps {
  children: React.ReactNode;
  // Background media options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoSrc?: any; // Accept imported video source
  imageSrc?: string | StaticImageData; // Accept image source
  imageAlt?: string; // Alt text for image
  // Styling options
  className?: string; // Allow passing additional classes
  overlayClassName?: string; // Optional class for overlay customization
  contentClassName?: string; // Optional class for content container
  // Behavior options
  showScrollIndicator?: boolean; // Add prop to control indicator visibility
}

export function Hero({
  children,
  videoSrc,
  imageSrc,
  imageAlt = 'Background image',
  className,
  overlayClassName,
  contentClassName,
  showScrollIndicator = true, // Default to true
}: HeroProps) {
  return (
    <section
      className={cn(
        'fixed inset-0 flex min-h-screen overflow-hidden', // Fixed positioning for full-screen effect
        className,
      )}
    >
      {/* Background Media - Video or Image */}
      {videoSrc && (
        <Video
          src={videoSrc}
          className="w-full h-screen"
          style={{
            position: 'fixed',
            inset: '0px',
            zIndex: 0,
            '--media-object-fit': 'cover',
          }}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        />
      )}
      {!videoSrc && imageSrc && (
        <div 
          className="fixed inset-0 z-0 w-full h-screen"
          style={{ position: 'relative' }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={85}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
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
