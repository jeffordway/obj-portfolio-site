import React from "react";
import { cn } from "@/lib/utils"; // Import cn utility
import { Section } from "./Section";

// Import the MaxWidthOptions type from Section or redefine it here
type MaxWidthOptions = "full" | "container" | "narrow";

// --- Component Props Interface ---
interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Controls the maximum width of the content section
   * @default "container"
   */
  maxWidth?: MaxWidthOptions;
}

// --- Content Component ---
export function Content({
  children,
  className,
  maxWidth = "full",
  ...props
}: ContentProps) {
  return (
    <div
      className={cn(
        "relative", // Relative positioning for normal document flow
        className
      )}
      {...props}
    >
      {/* Spacer: Creates space equal to viewport height to position content below hero */}
      <div className="h-screen w-full pointer-events-none" aria-hidden="true" />

      {/* Content wrapper: Higher z-index to appear above hero when scrolling */}
      <div className="relative z-30 bg-background py-4 md:py-8">
        <Section maxWidth={maxWidth}>{children}</Section>
      </div>
    </div>
  );
}

Content.displayName = "Content"; // Add display name for debugging
