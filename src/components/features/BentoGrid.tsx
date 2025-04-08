import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card/Card";
import { StaticImageData } from "next/image";
import { Tag } from "@/components/ui/tag/Tag";

/**
 * BentoGridItem interface defines the structure for each item in the grid
 */
export interface BentoGridItem {
  /** Unique identifier for the item */
  id: string | number;
  /** URL or StaticImageData for the item's image */
  imageUrl: string | StaticImageData;
  /** Alt text for the image (important for accessibility) */
  imageAlt: string;
  /** Whether the image should be loaded with priority (for LCP optimization) */
  imagePriority?: boolean;
  /** Optional link for the card */
  href?: string;
  /** Title of the card */
  title?: string;
  /** Description text for the card */
  description?: string;
  /** Tags to display on the card (can be strings or React elements) */
  tags?: (string | React.ReactElement)[];
  /** Custom Tailwind classes for positioning and sizing within the grid */
  className?: string;
}

/**
 * Props for the BentoGrid component
 */
export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of items to display in the grid */
  items: BentoGridItem[];
  /** Optional classes for the grid container (overrides default grid settings) */
  gridClassName?: string;
  /** Gap between grid items (defaults to 'md') */
  gap?: "sm" | "md" | "lg";
  /** Whether to use a fixed aspect ratio for items (defaults to false) */
  fixedAspectRatio?: boolean;
}

/**
 * BentoGrid Component
 *
 * A responsive grid layout for displaying cards in a "bento box" style arrangement
 * with support for different item sizes and spans.
 *
 * - Mobile: 1-column or 2-column layout
 * - Desktop: 3-column layout with support for spanning items
 */
export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  (
    {
      items,
      className,
      gridClassName,
      gap = "md",
      fixedAspectRatio = false,
      ...props
    },
    ref
  ) => {
    // Map gap size to Tailwind classes with smaller gaps on mobile
    const gapClasses = {
      sm: "gap-2 md:gap-4",
      md: "gap-3 md:gap-6",
      lg: "gap-4 md:gap-8",
    };

    // Base grid layout classes with responsive behavior
    const defaultGridClasses = cn(
      "grid grid-cols-2 md:grid-cols-3", // 2 columns on mobile, 3 on desktop
      gapClasses[gap],
      "auto-rows-auto"
    );

    return (
      <div
        ref={ref}
        className={cn(defaultGridClasses, gridClassName, className)}
        {...props}
      >
        {items.map((item) => {
          // Determine appropriate image size based on column span for responsive loading
          const isWideItem = item.className?.includes("col-span-2");
          const isTallItem = item.className?.includes("row-span-2");

          const sizes = isWideItem
            ? "(max-width: 640px) 100vw, (max-width: 768px) 100vw, 66vw" // Wide item
            : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"; // Standard or tall item

          // Process tags to ensure they're in the correct format
          const processedTags = item.tags?.map((tag, index) => {
            // For string tags, create a basic Tag component
            if (typeof tag === "string") {
              return <Tag key={`${item.id}-tag-${index}`} label={tag} />;
            }

            // For React elements, ensure they have a key
            // This cast is safe because our interface guarantees tags are either strings or ReactElements
            return React.cloneElement(tag as React.ReactElement, {
              key: (tag as React.ReactElement).key || `${item.id}-tag-${index}`,
            });
          });

          return (
            <Card
              key={item.id}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              imagePriority={item.imagePriority}
              href={item.href}
              title={item.title}
              description={item.description}
              tags={processedTags}
              sizes={sizes}
              className={cn(
                "h-full w-full", // Base sizing
                // Mobile: Always square regardless of position
                fixedAspectRatio && "aspect-square",
                // Desktop: Apply special aspect ratios only on md+ screens
                fixedAspectRatio && isTallItem && "md:aspect-[1/2]",
                fixedAspectRatio && isWideItem && "md:aspect-[2/1]",
                // Only apply positioning classes on md+ screens
                item.className?.includes("md:col-span-")
                  ? item.className
                  : null,
                item.className?.includes("md:row-span-") ? item.className : null
              )}
            />
          );
        })}
      </div>
    );
  }
);

BentoGrid.displayName = "BentoGrid";
