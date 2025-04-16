"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { RiCheckLine } from "@remixicon/react"; 

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  className?: string; // Applies to the root label container (for consistency)
  boxClassName?: string; // Applies to the visual checkbox box
  containerClassName?: string; // Deprecated, kept for backward compatibility
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      className, // Now applies to the root label
      boxClassName, // Applies to the visual box
      containerClassName, // Deprecated
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const checkboxId = React.useId();

    return (
      <label
        htmlFor={props.id || checkboxId}
        className={cn(
          "inline-flex items-center group", // Use group for potential future styling
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          containerClassName, // Deprecated
          className // New: applies to root label
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={props.id || checkboxId}
            checked={checked}
            disabled={disabled}
            className="peer sr-only" // Hide the actual input, use peer for sibling styling
            {...props}
          />
          {/* The visual checkbox */}
          <div
            className={cn(
              "h-5 w-5 shrink-0", // Slightly smaller size than example (h-6 w-6)
              "flex items-center justify-center",
              "border border-foreground/50", // Default border using foreground with opacity
              "rounded-sm transition-colors duration-150 ease-in-out",
              // Checked state
              "peer-checked:bg-accent peer-checked:border-accent",
              // Focus state (visible)
              "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
              // Hover state (only when not disabled)
              !disabled && "peer-hover:border-accent/80 peer-checked:peer-hover:bg-accent/90",
              // Disabled state (overrides others)
              "peer-disabled:opacity-70 peer-disabled:cursor-not-allowed peer-disabled:border-foreground/30 peer-checked:peer-disabled:bg-foreground/30 peer-checked:peer-disabled:border-foreground/30",
              boxClassName // New: custom classes for the box
            )}
            aria-hidden="true" // Hide from screen readers as the input is the control
          >
            {/* Checkmark Icon - Conditionally rendered */}
            <RiCheckLine
              className={cn(
                "h-3.5 w-3.5 text-background", // Icon color contrasts with accent bg
                "transition-opacity duration-100 ease-in-out",
                checked ? "opacity-100" : "opacity-0" // Fade in/out
              )}
            />
          </div>
        </div>
        {/* Optional Label */}
        {label && (
          <span
            className={cn(
              "ml-3 text-sm font-medium", // Adjusted margin from ml-4
              disabled ? "text-foreground/60" : "text-foreground",
              "select-none" // Prevent text selection on click
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
