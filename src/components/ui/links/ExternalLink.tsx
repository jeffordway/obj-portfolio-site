import React from "react";
import { cn } from "@/lib/utils"; // Import cn utility


export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string; // Optional explicit ARIA label
  onClick?: () => void;
}

export const ExternalLink = ({
  href,
  children,
  className,
  ariaLabel, // Use provided label or try to infer
  onClick,
}: ExternalLinkProps) => {

  // Determine base ARIA label from prop or children if it's a simple string
  const baseAriaLabel = ariaLabel || (typeof children === 'string' ? children : undefined);
  // Enhance the label for screen readers to indicate a new tab will open
  const finalAriaLabel = baseAriaLabel ? `${baseAriaLabel} (opens in new tab)` : undefined;

  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer" 
      className={cn(
        "inline-block",
        "text-base font-medium",
        "text-foreground/60 hover:text-foreground",
        "hover:scale-110",
        "transition-all duration-500 ease-in-out",
        className,
      )}
      aria-label={finalAriaLabel}
      onClick={onClick} 
    >

      {children}
    </a>
  );
};
