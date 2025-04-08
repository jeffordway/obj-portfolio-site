"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * @component ThemeProvider
 * @description Wraps the application with next-themes ThemeProvider to manage theme switching (light, dark, system).
 *
 * @param {ThemeProviderProps} props - Props passed to the next-themes provider.
 * @see https://github.com/pacocoursey/next-themes
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // Apply theme class to <html> tag
      defaultTheme="system" // Default to system preference
      enableSystem // Enable system preference detection
      disableTransitionOnChange // Optional: Disable transitions on theme change to avoid flashes
      {...props} // Pass through any other props
    >
      {children}
    </NextThemesProvider>
  );
}
