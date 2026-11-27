import React from "react";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { createImageUrlBuilder, type SanityImageSource, type SanityImageObject, type SanityImageWithAssetStub } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { MeshBackground } from "@/components/ui/background/MeshBackground";

// We'll use standard Sanity types without extensions to keep the code clean

/**
 * Initialize Sanity image URL builder
 */
const builder = createImageUrlBuilder(client);

/**
 * Converts a Sanity image reference to a URL builder
 */
function urlFor(source: SanityImageObject | SanityImageWithAssetStub) {
  return builder.image(source);
}

/**
 * Type guard for Next.js StaticImageData
 */
function isStaticImageData(obj: unknown): obj is StaticImageData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "src" in obj &&
    typeof obj.src === "string" &&
    "height" in obj &&
    "width" in obj
  );
}

/**
 * Type guard for Sanity image objects
 */
function isSanityImageWithAsset(
  obj: unknown
): obj is SanityImageObject | SanityImageWithAssetStub {
  return (
    typeof obj === "object" &&
    obj !== null &&
    (("asset" in obj &&
      typeof obj.asset === "object" &&
      obj.asset !== null &&
      (("_ref" in obj.asset && typeof obj.asset._ref === "string") ||
        ("url" in obj.asset && typeof obj.asset.url === "string"))) ||
      ("_type" in obj && obj._type === "image" && "_ref" in obj))
  );
}

/**
 * Props for the HeroBackground component
 */
interface HeroBackgroundProps {
  /** Coded animation to use as the background (no video or image needed) */
  animation?: "mesh";
  /** Path or URL of a background video file */
  videoSrc?: string;
  /** Still image shown while the video loads */
  videoPoster?: string;
  /** Image source from Sanity CMS or local static import */
  imageSrc?: SanityImageSource | StaticImageData;
  /** Alt text for the image (accessibility) */
  imageAlt?: string;
  /** Additional classes for the container */
  className?: string;
  /** Additional classes for the overlay */
  overlayClassName?: string;
}

export function HeroBackground({
  animation,
  videoSrc,
  videoPoster,
  imageSrc,
  imageAlt = "Background image",
  className,
  overlayClassName,
}: HeroBackgroundProps) {
  // Process image source to get final URL and blur data
  let finalSrc: string | StaticImageData | undefined = undefined;
  let finalBlurUrl: string | undefined = undefined;

  if (imageSrc) {
    if (isStaticImageData(imageSrc)) {
      // Handle locally imported images (via import statement)
      finalSrc = imageSrc;
      finalBlurUrl = imageSrc.blurDataURL;
    } else if (isSanityImageWithAsset(imageSrc)) {
      // Handle Sanity CMS images
      try {
        // Ask Sanity for a screen-sized version, not the full original upload.
        // The image sits behind an overlay, so 2400px wide at quality 80 is plenty.
        finalSrc = urlFor(imageSrc)
          .width(2400)
          .auto("format")
          .fit("max")
          .quality(80)
          .url();

        // Generate a low-quality placeholder for blur effect
        // This is the Next.js recommended approach for blur placeholders
        finalBlurUrl = urlFor(imageSrc)
          .width(20)
          .height(20)
          .quality(20)
          .blur(10)
          .url();
      } catch (error) {
        console.error("Error generating Sanity image URL:", error, imageSrc);
      }
    } else if (typeof imageSrc === "string") {
      // Handle direct string URLs
      finalSrc = imageSrc;
    } else {
      console.error(
        "HeroBackground: Received unexpected or incomplete imageSrc type.",
        imageSrc
      );
    }
  }

  // Only render image if there's no video and we have a valid image source
  const shouldRenderImage = !animation && !videoSrc && finalSrc;

  return (
    <div
      className={cn(
        "fixed inset-0 min-h-screen overflow-hidden z-10",
        className
      )}
      data-has-animation={!!animation}
      data-has-video={!animation && !!videoSrc}
      data-has-image={!!finalSrc}
    >
      {/* Coded animation background */}
      {animation === "mesh" && (
        <div className="fixed inset-0 h-screen w-full bg-background">
          <MeshBackground />
        </div>
      )}

      {/* Video Background */}
      {!animation && videoSrc && (
        <video
          src={videoSrc}
          poster={videoPoster}
          className="w-full h-screen"
          style={{
            position: "fixed",
            inset: "0px",
            objectFit: "cover",
          }}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="metadata"
        />
      )}
      {/* Image Background - handles both Sanity and local images */}
      {shouldRenderImage && finalSrc && (
        <div className="fixed inset-0 w-full h-screen">
          <Image
            src={finalSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={80}
            placeholder={finalBlurUrl ? "blur" : "empty"}
            blurDataURL={finalBlurUrl}
            style={{
              objectFit: "cover",
            }}
            // The 'priority' attribute is the Next.js recommended way to prioritize LCP images
            // It preloads the image resource, sets fetchpriority='high', and disables lazy loading
          />
        </div>
      )}

      {/* Overlay with customizable opacity (the mesh is already subtle, so it gets none) */}
      {!animation && (
        <div
          className={cn(
            "absolute inset-0 bg-background/80 dark:bg-background/60",
            overlayClassName
          )}
          aria-hidden="true"
          style={{ pointerEvents: "none" }}
        />
      )}
    </div>
  );
}

HeroBackground.displayName = "HeroBackground";
