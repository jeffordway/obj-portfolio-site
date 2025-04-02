import * as React from "react";
import { cn } from "@/lib/utils";

// --- Type Definitions ---

// Allowed HTML elements for the component
export type TextElement =
  | "p"
  | "span"
  | "div"
  | "label"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "figcaption"
  | "blockquote"
  | "cite";

// Available style presets (Revised again)
export type TextPreset =
  | "title"
  | "heading"
  | "subtitle" // Primary display text
  | "lead"
  | "body"
  | "body-sm" // Body text variations
  | "quote"
  | "eyebrow"
  | "label"
  | "caption"; // Other specific styles

// Available text alignments (kept separate)
export type TextAlign = "left" | "center" | "right" | "justify";

// --- Component Props Interface ---

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /** The HTML element to render. @default 'p' */
  as?: TextElement;
  /** Style preset to apply. @default 'body' */
  preset?: TextPreset;
  /** Text alignment. @default 'left' */
  align?: TextAlign;
  /** Apply muted styling (reduced opacity). @default false */
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
  title: "text-xl md:text-2xl text-foreground/60 font-medium tracking-widest",
  subtitle: "text-2xl md:text-3xl font-normal",
  heading: "text-3xl md:text-lg font-semibold",

  // Body Text & Variations
  lead: "text-lg md:text-xl font-medium leading-relaxed",
  body: "text-base md:text-lg leading-relaxed", // Default body
  "body-sm": "text-sm md:text-base leading-relaxed",

  // Other Specific Styles
  quote:
    "italic border-l-4 border-border pl-4 py-2 my-4 text-md md:text-lg", // New quote style
  eyebrow:
    "text-xs md:text-sm text-foreground/60 font-semibold tracking-wide uppercase",
  label: "text-xs md:text-sm font-medium uppercase tracking-wider",
  caption: "text-xs md:text-sm text-foreground/60 font-normal",
};

// Maps alignment prop to Tailwind classes
const alignClasses: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

// --- Default Element Mapping ---

// Maps presets to their default semantic HTML elements
const presetToElementMap: Partial<Record<TextPreset, TextElement>> = {
  title: "h1",
  subtitle: "h2",
  heading: "h3",
  quote: "blockquote",
  // label often pairs with <label>, but <p> or <span> might be safer defaults
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
  as: ComponentProp, // Rename incoming prop to avoid conflict
  preset = "body",
  align = "left",
  truncate = false,
  className,
  children,
  ...props
}: TextProps) => {
  // Determine the component to render:
  // 1. Use explicit `as` prop if provided.
  // 2. Check map for preset default.
  // 3. Fallback to 'p'.
  const Component = ComponentProp || presetToElementMap[preset] || "p";

  return (
    <Component
      className={cn(
        presetStyles[preset], // Apply preset styles
        alignClasses[align], // Apply alignment
        truncate && "truncate", // Apply truncation if true
        className // Merge custom classes last
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
