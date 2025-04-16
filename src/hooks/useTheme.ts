"use client";

import { useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";

/**
 * Extended theme hook that provides additional functionality beyond next-themes
 * - Handles client-side mounting to prevent hydration mismatch
 * - Provides theme cycling functionality
 * - Returns current theme status and helper methods
 */
export function useTheme() {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Determine the next theme in the cycle: light -> dark -> system -> light
   */
  const getNextTheme = (): string => {
    if (theme === "system") return "light";
    if (theme === "light") return "dark";
    return "system"; // If theme is 'dark' or any other value
  };

  /**
   * Cycle to the next theme in sequence
   */
  const cycleTheme = (): void => {
    setTheme(getNextTheme());
  };

  /**
   * Get a formatted label for the current theme
   */
  const getCurrentThemeLabel = (): string => {
    return theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "";
  };

  /**
   * Get a formatted label for the next theme
   */
  const getNextThemeLabel = (): string => {
    const nextTheme = getNextTheme();
    return nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1);
  };

  return {
    theme,
    setTheme,
    mounted,
    getNextTheme,
    cycleTheme,
    getCurrentThemeLabel,
    getNextThemeLabel,
  };
}
