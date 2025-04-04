import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming utils path
import { Spinner } from '@/components/ui/icon/Spinner'; // Import Spinner

// --- Type Definitions ---

export type ButtonVariant = "primary" | "outline" | "link";
export type ButtonSize = "sm" | "md" | "lg";

// --- Component Props Interface ---

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The content of the button. */
  children: React.ReactNode;
  /** Optional CSS classes for the button. */
  className?: string;
  /** Visual style of the button. @default 'primary' */
  variant?: ButtonVariant;
  /** Size of the button. @default 'lg' */
  size?: ButtonSize;
  /** Whether the button is disabled. @default false */
  disabled?: boolean;
  /** Optional icon to display on the left side. */
  iconLeft?: React.ReactNode;
  /** Optional icon to display on the right side. */
  iconRight?: React.ReactNode;
  /** Show loading spinner instead of content. @default false */
  isLoading?: boolean;
  /** Button type attribute. @default 'button' */
  type?: "button" | "submit" | "reset";
}

// --- Style Mappings ---

const baseStyles = cn(
  "inline-flex items-center justify-center", // Layout
  "gap-2", // Add gap for icon spacing
  "font-medium whitespace-nowrap", // Typography
  "transition-all duration-500 ease-in-out", // Base transition
  "transform hover:scale-110 active:scale-100", // Scale animation
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring", // Focus (using theme 'ring' color)
  "disabled:pointer-events-none disabled:opacity-50" // Disabled state
);

// Map button size to spinner size
const spinnerSizeMap: Record<ButtonSize, 'sm' | 'md'> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 min-w-36 px-3 text-xs", // Added padding back for content fit
  md: "h-12 min-w-44 px-5 text-sm", // Added padding back
  lg: "h-16 min-w-64 px-6 text-base", // Added padding back
};

// Variant styles including base, hover, and active states
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-foreground text-background", // Base
    "hover:bg-foreground/60" // Hover
  ),
  outline: cn(
    "border border-foreground text-foreground bg-transparent", // Base
    "hover:border-foreground/60 hover:text-foreground/60" // Hover
  ),
  link: cn(
    "text-foreground bg-transparent underline-offset-4 p-0 h-auto min-w-0 rounded-none", // Reset min-width for links
    "hover:text-foreground/60 hover:underline" // Hover
  ),
};

// --- Button Component ---

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "lg",
      disabled = false,
      iconLeft,
      iconRight,
      isLoading = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = isLoading || disabled; // Combine loading and disabled state

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          isLoading && 'relative', // Needed if spinner uses absolute positioning, but ours doesn't
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          // Show spinner when loading - centered implicitly by flex
          <Spinner size={spinnerSizeMap[size]} className="text-current" />
        ) : (
          // Show icons and children when not loading
          <>
            {iconLeft}
            {children}
            {iconRight}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
