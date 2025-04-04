"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { RiArrowDownSLine } from "@remixicon/react";

// Use HTMLAttributes directly with no additional properties
type ScrollIndicatorProps = React.HTMLAttributes<HTMLDivElement>

export function ScrollIndicator({ className, ...props }: ScrollIndicatorProps) {
  // Track if component has mounted (for SSR compatibility)
  const [mounted, setMounted] = useState(false);
  // Track if the indicator should be visible based on scroll position
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Function to handle scroll events
    const handleScrollPosition = () => {
      // Hide the indicator when scrolled past 20% of viewport height
      const scrollThreshold = window.innerHeight * 0.2;
      setIsVisible(window.scrollY < scrollThreshold);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollPosition);
    
    // Clean up event listener on unmount
    return () => {
      setMounted(false);
      window.removeEventListener('scroll', handleScrollPosition);
    };
  }, []);

  const handleScroll = () => {
    // Scroll viewport height - effectively scrolls to the start of the next section
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // The actual indicator component
  const indicator = (
    <div
      className={cn(
        // Positioning: Fixed (not absolute) to ensure it's always visible
        "fixed bottom-6 left-1/2 -translate-x-1/2",
        // Very high z-index to ensure it's above all other content
        "z-[200]",
        // Allow clicks explicitly
        "pointer-events-auto",
        // Custom slow bounce animation
        "animate-bounce",
        // Visibility transition
        "transition-opacity duration-300",
        // Hide when not visible
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        // Override animation speed with inline styles
        className,
      )}
      style={{
        animationDuration: "1.5s", // Slow down the bounce (default is 1s)
      }}
      {...props}
    >
      <button
        onClick={handleScroll}
        aria-label="Scroll to content"
        className={cn(
          // Styling & Interaction
          "flex items-center justify-center p-2 rounded-full", 
          "text-foreground/60 transition-colors duration-500 ease-in-out",
          "hover:text-foreground hover:bg-foreground/10", 
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <RiArrowDownSLine size={72} />
      </button>
    </div>
  );

  // Use a portal to render the indicator at the document body level
  // This ensures it's not affected by parent stacking contexts or overflow settings
  return mounted ? createPortal(indicator, document.body) : null;
}

ScrollIndicator.displayName = "ScrollIndicator";