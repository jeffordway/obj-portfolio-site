import * as React from "react";
import Link from "next/link"; // Import Next.js Link
import { cn } from "@/lib/utils"; // Assuming utils path
import { Spinner } from "@/components/ui/icon/Spinner"; // Import Spinner

// --- Type Definitions ---

export type ButtonVariant = "primary" | "outline" | "link" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

// --- Component Props Interface ---

// Base props common to both button and anchor
interface BaseButtonProps {
  /** The content of the button. */
  children: React.ReactNode;
  /** Optional CSS classes for the button. */
  className?: string;
  /** Visual style of the button. @default 'primary' */
  variant?: ButtonVariant;
  /** Size of the button. @default 'lg' */
  size?: ButtonSize;
  /** Optional icon to display on the left side. */
  iconLeft?: React.ReactNode;
  /** Optional icon to display on the right side. */
  iconRight?: React.ReactNode;
  /** Show loading spinner instead of content. @default false */
  isLoading?: boolean;
  /** Whether the element is disabled (visual styling + aria/native attribute). @default false */
  disabled?: boolean;
}

// Props specific to button element
interface ButtonElementProps
  extends BaseButtonProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "type" | "children" | "disabled"
    > {
  /** Specifies the element is a button (no href) */
  href?: undefined;
  /** Button type attribute. @default 'button' */
  type?: "button" | "submit" | "reset";
}

// Props specific to anchor element
interface AnchorElementProps
  extends BaseButtonProps,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "href" | "children" | "disabled"
    > {
  /** Specifies the element is a link (requires href) */
  href: string;
  /** Anchor type attribute is not applicable */
  type?: undefined;
}

// Union type for all possible Button props
export type ButtonProps = ButtonElementProps | AnchorElementProps;

// --- Style Mappings ---

const baseStyles = cn(
  "inline-flex items-center justify-center", // Layout
  "gap-2", // Add gap for icon spacing
  "font-medium whitespace-nowrap", // Typography
  "transition-all duration-500 ease-in-out", // Base transition
  "transform hover:scale-110 active:scale-100", // Scale animation
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring" // Focus (using theme 'ring' color)
  // Disabled styles are applied conditionally based on `isDisabled` below
);

// Map button size to spinner size
const spinnerSizeMap: Record<ButtonSize, "sm" | "md"> = {
  sm: "sm",
  md: "sm",
  lg: "md",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 min-w-36 px-3 text-xs", // Added padding back for content fit
  md: "h-12 min-w-44 px-5 text-sm", // Added padding back
  lg: "h-16 min-w-64 px-6 text-base", // Added padding back
};

// Variant styles including base, hover, and active states
const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-foreground text-background" // Base
  ),
  outline: cn(
    "border border-foreground text-foreground bg-transparent" // Base
  ),
  link: cn(
    "text-foreground bg-transparent underline-offset-4 p-0 h-auto min-w-0 rounded-none", // Reset min-width for links
    "hover:text-foreground/60 hover:underline" // Hover
  ),
  ghost: cn(
    "text-foreground bg-transparent", // Base
   
  ),
};

// --- Button Component ---

// Use a generic type for the ref to handle both button and anchor elements
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "lg",
      iconLeft,
      iconRight,
      isLoading = false,
      disabled = false,
      ...props // Capture the rest of the props
    },
    ref
  ) => {
    const isDisabled = isLoading || disabled;

    const commonClasses = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      isDisabled && "pointer-events-none opacity-50", // Apply disabled styles universally
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Spinner size={spinnerSizeMap[size]} className="text-current" />
        ) : (
          <>
            {iconLeft}
            {children}
            {iconRight}
          </>
        )}
      </>
    );

    // Render as an anchor if href is provided
    if (props.href) {
      // Separate anchor-specific props
      const { href, ...anchorProps } = props as AnchorElementProps;

      // Determine if it's an internal or external link
      const isInternal = href.startsWith("/") || href.startsWith("#");

      if (isInternal) {
        return (
          <Link
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>} // Cast ref type
            className={commonClasses}
            aria-disabled={isDisabled || undefined} // Set aria-disabled based on state
            {...anchorProps} // Spread remaining anchor props
          >
            {content}
          </Link>
        );
      } else {
        // External link, render a regular <a> tag
        return (
          <a
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>} // Cast ref type
            className={commonClasses}
            aria-disabled={isDisabled || undefined} // Set aria-disabled based on state
            // Add safety for external links
            target="_blank"
            rel="noopener noreferrer"
            {...anchorProps} // Spread remaining anchor props
          >
            {content}
          </a>
        );
      }
    }

    // Render as a button if no href is provided
    const { ...buttonProps } = props as ButtonElementProps;
    const buttonType = (props as ButtonElementProps).type || "button";
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>} // Cast ref type
        type={buttonType}
        className={commonClasses}
        disabled={isDisabled} // Use the native disabled attribute for buttons
        {...buttonProps} // Spread remaining button props
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
