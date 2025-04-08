"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

// --- Component Props Interface ---
// Define our component's specific props first
interface CustomTooltipProps {
  /**
   * Content to display inside the tooltip.
   */
  content: React.ReactNode;
  /**
   * The element that triggers the tooltip on hover. Must be a single ReactElement.
   */
  children: React.ReactElement;
  /**
   * Delay duration in milliseconds before the tooltip appears.
   * @default 700
   */
  delayDuration?: number;
  /**
   * Delay duration in milliseconds before the tooltip disappears when the pointer leaves.
   * @default 300
   */
  skipDelayDuration?: number;
  /**
   * Additional CSS classes to apply to the tooltip content container.
   * Keep className for custom styling on our wrapper/Radix Content.
   */
  className?: string;
}

// Combine our props with Radix's Content props, omitting potential conflicts if necessary
// We mainly pass Radix props through via {...props}
export type TooltipProps = CustomTooltipProps &
  Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, keyof CustomTooltipProps>;

// --- Tooltip Component ---

/**
 * @component Tooltip
 * @description Displays contextual information on hover, using Radix UI for robust positioning and collision handling.
 *
 * @prop {React.ReactNode} content - The content to show inside the tooltip.
 * @prop {React.ReactElement} children - The element that triggers the tooltip.
 * @prop {number} [delayDuration=700] - Delay before showing tooltip.
 * @prop {number} [skipDelayDuration=300] - Delay before hiding tooltip.
 * @prop {string} [className] - Optional classes for the tooltip content element.
 * @prop {TooltipPrimitive.TooltipContentProps} ...props - Accepts other Radix TooltipContent props (e.g., side, sideOffset, align, collisionPadding).
 *
 * @example
 * <Tooltip content="This is a tooltip" sideOffset={5}>
 *   <Button>Hover Me</Button>
 * </Tooltip>
 */
const Tooltip = React.forwardRef< // Forwarding ref to TooltipPrimitive.Content
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(
  (
    {
      children,
      content,
      className,
      delayDuration = 700,
      skipDelayDuration = 300,
      sideOffset = 4, // Default side offset
      collisionPadding = 8, // Default padding from viewport edges
      ...props // Pass remaining props (like side, align) to Radix Content
    },
    ref
  ) => (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref} // Apply the forwarded ref here
            sideOffset={sideOffset}
            collisionPadding={collisionPadding}
            className={cn(
              // Base styles from Radix docs recommendations + project specifics
              "z-50 overflow-hidden",
              // Project-specific appearance
              "px-3 py-1.5 text-sm font-medium whitespace-nowrap",
              "text-foreground bg-background border border-foreground/20",
              "rounded-full", // Kept the rounded-full style
              // Animations (optional, can be customized)
              "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
              "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
              "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
              "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
              // Custom class
              className
            )}
            {...props} // Spread other Radix props
          >
            {content}
            {/* Optional: Add TooltipPrimitive.Arrow for a small arrow indicator */}
            {/* <TooltipPrimitive.Arrow className="fill-background stroke-foreground/20 stroke-1" width={10} height={5} /> */}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
);
Tooltip.displayName = TooltipPrimitive.Content.displayName; // Use Radix display name

// --- Exports ---
export { Tooltip };
