import React from 'react';
import { cn } from '@/lib/utils';
import Video from 'next-video';
import Image, { StaticImageData } from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import type {
  SanityImageSource,
  SanityImageObject,
  SanityImageWithAssetStub
} from '@sanity/image-url/lib/types/types';

/**
 * Initialize Sanity image URL builder
 */
const builder = imageUrlBuilder(client);

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
  return typeof obj === 'object' && 
         obj !== null && 
         'src' in obj && 
         typeof obj.src === 'string' && 
         'height' in obj && 
         'width' in obj;
}

/**
 * Type guard for Sanity image objects
 */
function isSanityImageWithAsset(obj: unknown): obj is SanityImageObject | SanityImageWithAssetStub {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (('asset' in obj && 
      typeof obj.asset === 'object' && 
      obj.asset !== null && 
      (('_ref' in obj.asset && typeof obj.asset._ref === 'string') ||
       ('url' in obj.asset && typeof obj.asset.url === 'string'))) ||
     ('_type' in obj && obj._type === 'image' && '_ref' in obj))
  );
}

/**
 * Import the Video component type
 */
import type { VideoProps } from 'next-video';

/**
 * Define a type that matches what next-video expects for the src prop
 * Based on the documentation and error messages
 * Also allows for direct string URLs for videos in public folder
 */
type VideoSource = NonNullable<VideoProps['src']> | string;

/**
 * Props for the HeroBackground component
 */
interface HeroBackgroundProps {
  /** Video source from next-video import or direct URL string */
  videoSrc?: VideoSource;
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
  videoSrc,
  imageSrc,
  imageAlt = 'Background image',
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
        // Standard Sanity image reference format
        finalSrc = urlFor(imageSrc).auto('format').fit('max').url();
        // Generate a low-quality placeholder for blur effect
        finalBlurUrl = urlFor(imageSrc).width(20).height(20).quality(10).blur(10).url();
        console.log('Generated Sanity image URL:', finalSrc);
      } catch (error) {
        console.error("Error generating Sanity image URL:", error, imageSrc);
      }
    } else if (typeof imageSrc === 'string') {
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
  const shouldRenderImage = !videoSrc && finalSrc;

  return (
    <div
      className={cn(
        'fixed inset-0 min-h-screen overflow-hidden z-10',
        className,
      )}
      data-has-video={!!videoSrc}
      data-has-image={!!finalSrc}
    >
      {/* Video Background */}
      {videoSrc && (
        typeof videoSrc === 'string' ? (
          // Direct video URL - use native video element to avoid watermark
          <video
            src={videoSrc}
            className="w-full h-screen"
            style={{
              position: 'fixed',
              inset: '0px',
              objectFit: 'cover',
            }}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />
        ) : (
          // Next-video import
          <Video
            src={videoSrc}
            className="w-full h-screen"
            style={{
              position: 'fixed',
              inset: '0px',
              '--media-object-fit': 'cover',
            } as React.CSSProperties}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
          />
        )
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
            quality={85}
            placeholder={finalBlurUrl ? "blur" : "empty"}
            blurDataURL={finalBlurUrl}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Overlay with customizable opacity */}
      <div
        className={cn(
          'absolute inset-0 bg-background/90 dark:bg-background/70',
          overlayClassName,
        )}
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}

HeroBackground.displayName = 'HeroBackground';
