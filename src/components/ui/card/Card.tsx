import * as React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/typography/Text";
import { Tag } from "@/components/ui/tag/Tag";
import { Button } from "@/components/ui/button/Button";
import { RiArrowRightLine } from "@remixicon/react";

// --- Props Definition ---

interface CardProps {
  /** Source URL or StaticImport for the background image. */
  imageUrl: string | StaticImageData;
  /** Alt text for the background image (required for accessibility). */
  imageAlt: string;
  /** Optional: Preload image if it's above the fold. @default false */
  imagePriority?: boolean;
  /** Optional: Next/image sizes string. See Next.js docs. */
  sizes?: string;
  /** Optional: Internal path for the link. If provided, the card becomes clickable. */
  href?: string;
  /** Optional: Title text displayed on hover. */
  title?: string;
  /** Optional: Description text displayed on hover. */
  description?: string;
  /** Optional: An array of strings or Tag components to display as tags on hover. */
  tags?: (string | React.ReactElement<{ label: string; showTooltip?: boolean }>)[];
  /** Enable hover overlay and zoom effect. @default true */
  hoverEffect?: boolean;
  /** Additional CSS classes to apply to the root element (for grid sizing, etc.). */
  className?: string;
  /** Standard HTML Attributes for the root element (div or a) */
  htmlProps?: Omit<
    React.ComponentPropsWithoutRef<"div"> & React.ComponentPropsWithoutRef<"a">,
    keyof CardProps | "ref"
  >;
}

// --- Component Implementation ---

const Card = React.forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>(
  (
    {
      imageUrl,
      imageAlt,
      imagePriority = false,
      sizes,
      href,
      title,
      description,
      tags,
      hoverEffect = true,
      className,
      htmlProps = {},
      ...rest
    },
    ref
  ) => {
    // Determine if the hover effect should *actually* be applied
    const shouldApplyHoverEffect = hoverEffect && (!!title || !!description);

    // Base classes for the card container
    const containerClasses = cn(
      "relative group block overflow-hidden shadow-md",
      "transition-all duration-500 ease-in-out",
      href && "cursor-pointer",
      className
    );

    // Classes for the image
    const imageClasses = cn(
      "absolute inset-0 w-full h-full object-cover",
      // Only apply zoom if the effect should be active
      shouldApplyHoverEffect && "transition-transform duration-500 ease-in-out group-hover:scale-110"
    );

    // Classes for the hover overlay
    const overlayClasses = cn(
      "absolute inset-0 flex flex-col justify-center items-center p-4 md:p-8",
      "bg-background/80 text-foreground",
      "opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100",
      "z-10 text-center"
    );

    // Content to render inside the card
    const cardContent = (
      <>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority={imagePriority}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className={imageClasses}
        />
        {/* Only render the overlay if the effect should be active */}
        {shouldApplyHoverEffect && (
          <div className={overlayClasses}>
            {title && (
              <Text variant="heading" className="mb-1">
                {title}
              </Text>
            )}
            {description && (
              <Text variant="body-sm" align="center">
                {description}
              </Text>
            )}
            {/* Render tags if provided (sorted alphabetically) */}
            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {[...tags]
                  // Sort tags alphabetically - string tags by their text, React elements by their label prop
                  .sort((a, b) => {
                    // For string tags, compare directly
                    if (typeof a === 'string' && typeof b === 'string') {
                      return a.localeCompare(b);
                    }
                    
                    // For React elements, try to compare by label prop
                    const aLabel = React.isValidElement(a) && a.props.label ? a.props.label : '';
                    const bLabel = React.isValidElement(b) && b.props.label ? b.props.label : '';
                    
                    // If both have labels, compare them
                    if (aLabel && bLabel) {
                      return aLabel.localeCompare(bLabel);
                    }
                    
                    // If only one has a label, prioritize the one with a label
                    return aLabel ? -1 : bLabel ? 1 : 0;
                  })
                  .map((tag, index) => {
                    // For string tags, create a basic Tag component
                    if (typeof tag === 'string') {
                      return <Tag key={tag} label={tag} showTooltip={false} />;
                    }
                    
                    // For React elements (which should be Tag components based on our typing)
                    if (React.isValidElement(tag)) {
                      // Clone the element with the key and disable tooltip
                      return React.cloneElement(tag, {
                        key: tag.key || `tag-${index}`,
                        showTooltip: false
                    });
                  }
                  
                  // Shouldn't reach here with proper typing
                  return null;
                })}
              </div>
            )}
            {/* Render Learn More button if href is provided */}
            {href && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                iconRight={<RiArrowRightLine />}
                aria-hidden="true"
                tabIndex={-1}
              >
                Learn More
              </Button>
            )}
          </div>
        )}
      </>
    );

    // Render as a Link if href is provided, otherwise as a div
    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={containerClasses}
          {...htmlProps}
          {...rest}
        >
          {cardContent}
        </Link>
      );
    }

    return (
      <div
        ref={ref as React.ForwardedRef<HTMLDivElement>}
        className={containerClasses}
        {...htmlProps}
        {...rest}
      >
        {cardContent}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
