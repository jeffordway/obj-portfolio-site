"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// --- Position Styles ---
const positionStyles = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

// --- Base Component Props Interface ---
// Defines only the props specific to the Tooltip component itself.
interface TooltipBaseProps {
  /**
   * Content to display inside the tooltip.
   */
  content: React.ReactNode;
  /**
   * The element that triggers the tooltip on hover. Must be a single ReactElement.
   */
  children: React.ReactElement;
  /**
   * Position of the tooltip relative to the trigger element.
   * @default "top"
   */
  position?: keyof typeof positionStyles;
  /**
   * Additional CSS classes to apply to the tooltip content container.
   */
  className?: string;
  /**
   * Additional CSS classes to apply to the trigger wrapper div.
   */
  triggerClassName?: string;
}

// --- Final Component Props Type ---
// Combines base props with standard div attributes, omitting the conflicting 'content' attribute.
export type TooltipProps = TooltipBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">;

// --- Tooltip Component ---

/**
 * @component Tooltip
 * @description Displays contextual information on hover.
 *
 * @prop {React.ReactNode} content - The content to show inside the tooltip.
 * @prop {React.ReactElement} children - The element that triggers the tooltip.
 * @prop {"top" | "bottom" | "left" | "right"} [position="top"] - Tooltip position.
 * @prop {string} [className] - Optional classes for the tooltip content element.
 * @prop {string} [triggerClassName] - Optional classes for the wrapper div.
 *
 * @example
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover Me</Button>
 * </Tooltip>
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = "top",
      className,
      triggerClassName,
      ...props // Capture any other props passed in (like id, aria-*, etc.)
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div
        ref={ref} // Forward ref to the main wrapper div
        className={cn("relative inline-block", triggerClassName)} // Wrapper styles
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        {...props} // Spread the captured props onto the div
      >
        {/* The trigger element */}
        {children}

        {/* The tooltip content, conditionally rendered */}
        {isVisible && (
          <div
            role="tooltip" // Accessibility: identify the element as a tooltip
            className={cn(
              // Base styles
              "absolute z-50 px-3 py-1.5 text-sm font-medium whitespace-nowrap",
              // Theme colors (using example, consider popover variants if available)
              "text-background/60 bg-foreground",
              // Rounding
              "rounded-full", // Add fully rounded corners
              // Positioning
              positionStyles[position],
              // Custom classes
              className
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip"; // Set display name for React DevTools

// --- Exports ---
export { Tooltip }; // Use named export
