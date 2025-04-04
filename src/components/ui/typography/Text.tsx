import * as React from "react";
import { cn } from "@/lib/utils";

// --- Type Definitions ---

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

export type TextVariant =
  | "title"
  | "heading"
  | "subtitle"
  | "lead"
  | "body"
  | "body-sm"
  | "quote"
  | "eyebrow"
  | "label"
  | "caption";

export type TextAlign = "left" | "center" | "right" | "justify";

// --- Component Props Interface ---

// Added Generic Type E for the element type
type BaseTextProps<E extends TextElement = "p"> = {
  // Defaulting E to 'p'
  /** The HTML element to render. Overrides default mapping from variant. */
  as?: E; // Use the generic E
  /** Style variant to apply. Determines default HTML element. @default 'body' */
  variant?: TextVariant;
  /** Text alignment. @default 'left' */
  align?: TextAlign;
  /** Apply muted styling (reduced opacity). @default false */
  truncate?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Content of the text element. */
  children: React.ReactNode;
};

// Combine BaseTextProps with standard HTML attributes for the specific element E
// Omit the props defined in BaseTextProps from the standard HTML attributes to avoid conflicts
export type TextProps<E extends TextElement = "p"> = BaseTextProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof BaseTextProps<E>>;

// --- Style Mappings ---

const variantStyles: Record<TextVariant, string> = {
  // Primary Display Text
  title: "text-xl md:text-2xl text-foreground/60 font-medium tracking-widest",
  subtitle: "text-2xl md:text-3xl font-normal leading-relaxed",
  heading: "text-base md:text-lg font-semibold",

  // Body Text & Variations
  lead: "text-lg md:text-xl font-medium leading-relaxed",
  body: "text-base md:text-lg leading-relaxed",
  "body-sm": "text-sm md:text-base leading-relaxed",

  // Other Specific Styles
  quote: "italic border-l-4 border-border pl-4 py-2 my-4 text-md md:text-lg",
  eyebrow:
    "text-xs md:text-sm text-foreground/60 font-semibold tracking-wide uppercase",
  label: "text-xs md:text-sm font-medium uppercase tracking-wider",
  caption: "text-xs md:text-sm text-foreground/60 font-normal",
};

const alignClasses: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

// --- Default Element Mapping ---

const variantToElementMap: Partial<Record<TextVariant, TextElement>> = {
  title: "h1",
  subtitle: "h2",
  heading: "h3",
  lead: "p",
  body: "p",
  "body-sm": "p",
  quote: "blockquote",
  eyebrow: "div",
  label: "div",
  caption: "span",
};

// --- Text Component ---

// Define directly inside forwardRef with generics
export const Text = React.forwardRef(
  <E extends TextElement = "p">(
    {
      as: ComponentProp,
      variant = "body",
      align = "left",
      truncate = false,
      className,
      children,
      ...props
    }: TextProps<E>,
    ref: React.ForwardedRef<React.ElementRef<E>>
  ) => {
    const Component = (ComponentProp ||
      variantToElementMap[variant] ||
      "p") as React.ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          variantStyles[variant],
          alignClasses[align],
          truncate && "truncate",
          "text-pretty",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";
