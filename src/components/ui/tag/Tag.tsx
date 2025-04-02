import * as React from "react";
import { cn } from "@/lib/utils"; 
import { Tooltip } from "@/components/ui/tooltip/Tooltip"; 

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  tooltipContent?: React.ReactNode;
  className?: string;
}

const baseStyles = cn(
  "inline-flex items-center", 
  "px-2.5 py-1", 
  "text-xs font-medium",
  "bg-background/20", 
  "text-foreground/60", 
  "rounded-full" 
);

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ label, className, tooltipContent, ...props }, ref) => {
    const tagElement = (
      <span ref={ref} className={cn(baseStyles, className)} {...props}>
        {label}
      </span>
    );

    if (tooltipContent) {
      return <Tooltip content={tooltipContent}>{tagElement}</Tooltip>;
    }

    return tagElement;
  }
);

Tag.displayName = "Tag"; 
