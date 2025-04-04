import React from 'react';
import { cn } from '@/lib/utils';
import { getIconComponent, type RemixIconType } from '@/lib/icons';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The name of the icon from our icon library */
  name?: string;
  /** The size of the icon (maps to Tailwind width/height classes) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional color variant */
  variant?: 'primary' | 'secondary' | 'muted' | 'inherit';
  /** Optional custom component to use instead of looking up by name */
  component?: RemixIconType;
}

/**
 * Icon component that renders icons from our icon library
 * Can be used either with a name (string) or by passing a component directly
 */
export const Icon = ({
  name,
  component,
  size = 'md',
  variant = 'inherit',
  className,
  ...props
}: IconProps) => {
  // Get the icon component from the name if provided
  const IconComponent = component || (name ? getIconComponent(name) : undefined);
  
  // If no icon found, return null (don't render anything)
  if (!IconComponent) return null;
  
  // Map size to Tailwind classes
  const sizeClasses = {
    sm: 'w-3.5 h-3.5', // Slightly smaller for better fit in tags
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };
  
  // Map variant to Tailwind classes
  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground',
    inherit: 'text-inherit',
  };
  
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <IconComponent className="w-full h-full" />
    </div>
  );
};

Icon.displayName = 'Icon';
