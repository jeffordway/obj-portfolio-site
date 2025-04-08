"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RiArrowDownSLine } from "@remixicon/react";

// Use HTMLAttributes directly with no additional properties
type ScrollIndicatorProps = React.HTMLAttributes<HTMLDivElement>

export function ScrollIndicator({ className, ...props }: ScrollIndicatorProps) {
  // Track if the indicator should be visible based on scroll position
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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

  return (
    <div
      className={cn(
        // Positioning with appropriate z-index
        "fixed bottom-6 left-1/2 -translate-x-1/2",
        "z-40", // Higher than content (z-30) but not excessively high
        // Animation and transitions
        "animate-bounce",
        "transition-opacity duration-300",
        // Visibility state
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
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
}

ScrollIndicator.displayName = "ScrollIndicator";