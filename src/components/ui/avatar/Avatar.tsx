import * as React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

// --- Style Definitions ---
type AvatarSize = "sm" | "md" | "lg";
type BorderWidth = "none" | "sm" | "md"; // Define border width options

// Map descriptive sizes to pixel dimensions for width/height
const pixelSizes: Record<AvatarSize, number> = {
  sm: 60,
  md: 80,
  lg: 120,
};

// Map border widths to Tailwind classes
const borderStyles: Record<BorderWidth, string> = {
  none: "",          // No border class
  sm: "border-2",   // Small border (2px)
  md: "border-4",   // Medium border (4px)
};

// --- Component Props Interface ---
// Pick necessary ImageProps, EXCLUDING width, height, fill, sizes, style
// as these are controlled by the component
type AllowedImageProps = Pick<
  ImageProps,
  |"priority"
  |"quality"
  |"unoptimized"
  |"onLoadingComplete"
  |"onError"
  |"loading"
>;

// Inherit HTML attributes for the span, excluding children, style, and onError
interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children" | "style" | "onError">, 
    AllowedImageProps {
  src?: string | ImageProps["src"] | null; // Make src optional, allow null
  alt: string;
  size?: AvatarSize;
  borderWidth?: BorderWidth; // Add optional borderWidth prop
}

// --- Avatar Component ---
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = "md",
      borderWidth = "sm", // Default to no border
      className,
      // Destructure Image-specific props
      priority,
      quality,
      unoptimized,
      onLoadingComplete,
      onError,
      loading,
      // Collect remaining props intended for the span
      ...spanProps
    },
    ref
  ) => {
    const dimension = pixelSizes[size]; // Get pixel dimension

    // --- Render Placeholder --- 
    if (!src) {
      return (
        <span
          ref={ref}
          role="img" // Indicate it represents an image
          aria-label={alt || "Placeholder Avatar"} // Use alt or default label
          className={cn(
            "inline-block shrink-0 overflow-hidden rounded-full align-middle bg-muted", // Placeholder styles
            borderWidth !== "none" && "border-foreground", // Add border color if needed
            borderStyles[borderWidth], // Apply border width class
            className // Apply custom classes
          )}
          style={{
            width: dimension,
            height: dimension,
          }}
          {...spanProps} // Spread remaining span props
        />
      );
    }

    // --- Render Image --- 
    // Create an object for Image props
    const imageProps: AllowedImageProps & { width: number; height: number } = {
      width: dimension,
      height: dimension,
      priority,
      quality,
      unoptimized,
      onLoadingComplete,
      onError,
      loading,
    };

    // Filter out undefined values from imageProps before spreading
    Object.keys(imageProps).forEach(
      (key) =>
        imageProps[key as keyof typeof imageProps] === undefined &&
        delete imageProps[key as keyof typeof imageProps]
    );

    return (
      // Span is now mainly for rounded shape and potential custom classes
      <span
        ref={ref}
        className={cn(
          "inline-block shrink-0 overflow-hidden rounded-full align-middle", // Base styles
          borderWidth !== "none" && "border-foreground", // Add border color if needed
          borderStyles[borderWidth], // Apply border width class
          className // Allow overriding styles for the span
        )}
        style={{
          width: dimension,
          height: dimension,
        }}
        {...spanProps} // Spread only span-related props here
      >
        <Image
          src={src} // src is guaranteed to be truthy here
          alt={alt}
          // Explicit width/height, remove fill
          className="aspect-square h-full w-full object-cover" // Still use object-cover
          {...imageProps} // Spread Image-related props + width/height
        />
      </span>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
