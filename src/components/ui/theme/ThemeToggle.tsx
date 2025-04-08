"use client";

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { RiMoonFill, RiSunFill, RiComputerLine } from '@remixicon/react';

type ThemeToggleProps = React.HTMLAttributes<HTMLButtonElement>;

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { 
    theme, 
    mounted, 
    cycleTheme, 
    getNextTheme,
    getCurrentThemeLabel,
    getNextThemeLabel 
  } = useTheme();

  // Determine which icon to display based on the *currently selected* theme setting
  const renderIcon = () => {
    if (theme === 'system') {
      return <RiComputerLine className="h-6 w-6 text-foreground" aria-hidden="true" />;
    }
    if (theme === 'dark') {
      return <RiMoonFill className="h-6 w-6 text-foreground" aria-hidden="true" />;
    }
    // Default to light theme icon
    return <RiSunFill className="h-6 w-6 text-foreground" aria-hidden="true" />;
  };

  // Don't render anything until mounted or theme is determined
  if (!mounted || !theme) {
    // Optionally render a placeholder or skeleton during mount
    return (
      <div
        className={cn(
          "fixed bottom-6 right-6 z-40",
          "flex items-center justify-center",
          "w-12 h-12 rounded-full",
          "bg-background/80 backdrop-blur-sm",
          "shadow-lg ring-1 ring-foreground/10",
          className
        )}
        style={{ visibility: 'hidden' }} // Keep space but hide content
        aria-hidden="true"
      />
    );
  }

  // Get labels for accessibility and title
  const nextThemeLabel = getNextThemeLabel();
  const currentThemeLabel = getCurrentThemeLabel();

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Current theme: ${currentThemeLabel}. Click to switch to ${nextThemeLabel} mode.`}
      title={`Current theme: ${currentThemeLabel}. Switch to ${nextThemeLabel} mode`}
      className={cn(
        // Positioning
        "fixed bottom-6 right-6 z-40",
        // Appearance
        "flex items-center justify-center",
        "w-12 h-12 rounded-full",
        "bg-background/80 backdrop-blur-sm",
        "shadow-lg ring-1 ring-foreground/10",
        // Interaction
        "transition-all duration-300 ease-in-out",
        "hover:ring-foreground/20 hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {/* Render icon based on currently selected theme setting */}
      {renderIcon()}
      {/* Visually hidden text for screen readers showing the selected theme setting */}
      <span className="sr-only">Current theme: {theme}</span>
    </button>
  );
}

// Add displayName for debugging
ThemeToggle.displayName = 'ThemeToggle';
