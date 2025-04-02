import * as React from "react";
import { cn } from "@/lib/utils";

type MaxWidthOptions = "full" | "normal" | "narrow";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: MaxWidthOptions;
  className?: string;
}

const maxWidthClasses: Record<MaxWidthOptions, string> = {
  full: "",
  normal: "max-w-7xl",
  narrow: "max-w-prose",
};

export const Container = ({
  children,
  maxWidth = "full",
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "w-full",
        "mx-auto", // Center if not full width
        "px-4 lg:px-8", // Responsive padding: 1rem mobile, 2rem large screens+
        maxWidthClasses[maxWidth], // Apply max-width class based on prop
        className // Merge incoming classes
      )}
      {...props}
    >
      {children}
    </div>
  );
};
