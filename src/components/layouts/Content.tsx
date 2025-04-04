import React from "react";
import { cn } from "@/lib/utils"; // Import cn utility

// --- Component Props Interface ---
interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// --- Content Component ---
export function Content({ children, className, ...props }: ContentProps) {
  return (
    // Outer wrapper: Positioning context and z-index ONLY
    <div
      className={cn(
        "relative z-30", // No background here
        className // Allow minimal style overrides if needed
      )}
      {...props}
    >
      {/* Spacer: Pushes content down, remains transparent */}
      <div className="h-screen" aria-hidden="true"></div>

      {/* Inner wrapper: Applies background ONLY to the actual content area below the spacer */}
      <div className="py-4 md:py-8 bg-background">
        {" "}
        {/* Apply background here */}
        {children} {/* Render the page's content sections */}
      </div>
    </div>
  );
}

Content.displayName = "Content"; // Add display name for debugging
