import * as React from "react";
import { cn } from "@/lib/utils"; 
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import { Text } from "@/components/ui/typography/Text";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The text content of the tag */
  label: string;
  /** Optional icon component to display to the left of the label */
  icon?: React.ReactNode;
  /** Optional tooltip content to show on hover */
  tooltipContent?: React.ReactNode;
  /** Whether to show the tooltip when tooltipContent is provided */
  showTooltip?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const baseStyles = cn(
  "inline-flex items-center", 
  "px-4 py-1", 
  "text-xs font-medium",
  "bg-foreground/10 hover:bg-foreground/20", 
  "text-foreground/60", 
  "rounded-full",
  "transition-colors duration-200" 
);

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ label, icon, className, tooltipContent, showTooltip = true, ...props }, ref) => {
    const tagElement = (
      <span ref={ref} className={cn(baseStyles, className)} {...props}>
        {icon && (
          <span className="mr-1.5 flex items-center justify-center" style={{ fontSize: '0.75rem', lineHeight: 1 }}>
            {icon}
          </span>
        )}
        <Text variant="caption" as="span">{label}</Text>
      </span>
    );

    if (tooltipContent && showTooltip) {
      return <Tooltip content={tooltipContent}>{tagElement}</Tooltip>;
    }

    return tagElement;
  }
);

Tag.displayName = "Tag"; 
