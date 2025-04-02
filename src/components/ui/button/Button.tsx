import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming utils path

// --- Type Definitions ---

export type ButtonVariant = "primary" | "outline" | "link";
export type ButtonSize = "sm" | "md" | "lg";

// --- Component Props Interface ---

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style variant of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: ButtonSize;
  /** Additional CSS classes. */
  className?: string;
  /** Content of the button. */
  children: React.ReactNode;
}

// --- Style Mappings ---

const baseStyles = cn(
  "inline-flex items-center justify-center", // Layout
  "font-medium whitespace-nowrap", // Typography
  "transition-all duration-500 ease-in-out", // Base transition
  "transform hover:scale-110 active:scale-100", // Scale animation
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring", // Focus (using theme 'ring' color)
  "disabled:pointer-events-none disabled:opacity-50" // Disabled state
);

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 min-w-36 text-xs", // Added small rounding for consistency
  md: "h-12 min-w-44 text-sm", // Default size, md rounding
  lg: "h-16 min-w-54 text-base", // Added lg rounding
};

// Variant styles including base, hover, and active states
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-foreground text-background", // Base
    "hover:bg-foreground/80" // Hover
  ),
  outline: cn(
    "border border-foreground text-foreground bg-transparent", // Base
    "hover:border-foreground/60 hover:text-foreground/60" // Hover - subtle background + text dim
  ),
  link: cn(
    "text-foreground bg-transparent underline-offset-4 p-0 h-auto rounded-none", // Base - specific reset for padding/height/rounding
    "hover:text-foreground/60 hover:underline", // Hover - text dim + underline
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
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          sizeStyles[size], // Apply size styles (includes rounding)
          variantStyles[variant], // Apply variant styles
          className // Allow custom classes
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Optional: Default export if preferred, but named is generally better for tree-shaking
// export default Button;
