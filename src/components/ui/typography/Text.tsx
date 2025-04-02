import * as React from 'react';
import { cn } from '@/lib/utils';

// --- Type Definitions ---

// Allowed HTML elements for the component
export type TextElement =
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'figcaption';

// Available style presets (Revised again)
export type TextPreset =
  | 'title' | 'heading' | 'subtitle'      // Primary display text
  | 'lead' | 'body' | 'body-lg' | 'body-sm' // Body text variations
  | 'quote' | 'eyebrow' | 'label' | 'caption'; // Other specific styles

// Available text alignments (kept separate)
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

// --- Component Props Interface ---

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** The HTML element to render. @default 'p' */
  as?: TextElement;
  /** Style preset to apply. @default 'body' */
  preset?: TextPreset;
  /** Text alignment. @default 'left' */
  align?: TextAlign;
  /** Apply muted styling (reduced opacity). @default false */
  muted?: boolean;
  /** Truncate text with ellipsis if it overflows. @default false */
  truncate?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Content of the text element. */
  children: React.ReactNode;
}

// --- Style Mappings ---

// Maps preset name to Tailwind classes (Revised again)
const presetStyles: Record<TextPreset, string> = {
  // Primary Display Text
  title:    'text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6', // Old h1 style
  heading:  'text-3xl md:text-4xl font-semibold tracking-tight leading-snug mb-5', // Old h2 style
  subtitle: 'text-lg md:text-xl text-foreground/70 font-normal mb-3', // Kept from previous

  // Body Text & Variations
  lead:     'text-lg md:text-xl text-foreground/90 leading-relaxed mb-4',
  body:     'text-base text-foreground leading-relaxed', // Default body
  'body-lg':'text-lg text-foreground leading-relaxed',
  'body-sm':'text-sm text-foreground leading-normal',

  // Other Specific Styles
  quote:    'italic border-l-4 border-border pl-4 py-2 my-4 text-lg text-foreground/80', // New quote style
  eyebrow:  'text-sm text-foreground/60 font-semibold tracking-wide uppercase mb-2',
  label:    'text-xs text-foreground font-medium uppercase tracking-wider',
  caption:  'text-xs text-foreground/60 font-normal',
};

// Maps alignment prop to Tailwind classes
const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

// --- Text Component ---

/**
 * Versatile Text Component
 *
 * Renders text with predefined style presets ('title', 'heading', 'body', etc.)
 * Allows overriding the HTML tag with 'as' and controlling alignment,
 * muted state, and truncation independently.
 */
export const Text = ({
  as: Component = 'p', // Default to 'p' tag
  preset = 'body',     // Default to 'body' preset
  align = 'left',      // Default alignment
  muted = false,
  truncate = false,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <Component
      className={cn(
        presetStyles[preset], // Apply preset styles
        alignClasses[align], // Apply alignment
        muted && 'text-foreground/60', // Apply muted style (adjust opacity if needed)
        truncate && 'truncate', // Apply truncation if true
        className // Merge custom classes last
      )}
      {...props}
    >
      {children}
    </Component>
  );
};