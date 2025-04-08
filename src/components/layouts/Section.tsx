import * as React from "react";
import { cn } from "@/lib/utils";

// Define the possible max-width options
type MaxWidthOptions = "full" | "container" | "narrow";

// Map the options to Tailwind classes
const maxWidthClasses: Record<MaxWidthOptions, string> = {
  full: "px-4 lg:px-8",      // Standard padding
  container: "px-4 lg:px-0 max-w-5xl",     // Uses Tailwind's container class (centered, max-width based on breakpoints)
  narrow: "px-6 lg:px-0 max-w-prose",    // Limits width for optimal readability (prose plugin),
};

// Define the props for the Section component
// It extends standard div props and adds our custom ones
interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  maxWidth?: MaxWidthOptions;
}

/**
 * Section Component - Renders a div with layout styles
 *
 * A layout component that provides consistent horizontal padding and max-width options.
 * Renders as a `div` element.
 */
const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      children,
      className,
      maxWidth = "full", // Default maxWidth
      ...props // Rest of the standard div props
    },
    ref // The ref is automatically typed by forwardRef<HTMLDivElement, ...>
  ) => {
    return (
      <div // Always render a div
        ref={ref} // Forward the ref to the div
        className={cn(
          "w-full", // Ensure the section takes full width available
          "mx-auto", // Center the content horizontally
          maxWidthClasses[maxWidth], // Apply the specific max-width/padding class
          className // Merge any additional classes passed in
        )}
        {...props} // Spread the remaining standard div props
      >
        {children}
      </div>
    );
  }
);

Section.displayName = "Section"; // Add display name for debugging

export { Section }; // Use named export as per project rules
