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

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageObject | SanityImageWithAssetStub) {
  return builder.image(source);
}

function isStaticImageData(obj: unknown): obj is StaticImageData {
  return typeof obj === 'object' && obj !== null && 'src' in obj && typeof obj.src === 'string' && 'height' in obj && 'width' in obj;
}

function isSanityImageWithAsset(obj: unknown): obj is SanityImageObject | SanityImageWithAssetStub {
  // More flexible check for Sanity image objects
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'asset' in obj &&
    typeof obj.asset === 'object' &&
    obj.asset !== null &&
    (('_ref' in obj.asset && typeof obj.asset._ref === 'string') ||
     ('url' in obj.asset && typeof obj.asset.url === 'string'))
  );
}

// Define a proper type for the imported video
type VideoImport = {
  src: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
  id?: string;
  poster?: string;
};

interface HeroBackgroundProps {
  videoSrc?: VideoImport | string;
  imageSrc?: SanityImageSource | StaticImageData;
  imageAlt?: string;
  className?: string;
  overlayClassName?: string;
}

export function HeroBackground({
  videoSrc,
  imageSrc,
  imageAlt = 'Background image',
  className,
  overlayClassName,
}: HeroBackgroundProps) {

  console.log("[HeroBackground] Received Props:", { videoSrc, imageSrc });

  let finalSrc: string | StaticImageData | undefined = undefined;
  let finalBlurUrl: string | undefined = undefined;

  if (imageSrc) {
    if (isStaticImageData(imageSrc)) {
      console.log("[HeroBackground] Image type: StaticImageData");
      finalSrc = imageSrc;
      finalBlurUrl = imageSrc.blurDataURL;
    } else if (isSanityImageWithAsset(imageSrc)) {
      console.log("[HeroBackground] Image type: SanityImageWithAsset");
      // Handle both _ref and direct url formats
      if ('asset' in imageSrc && 'url' in imageSrc.asset && typeof imageSrc.asset.url === 'string') {
        finalSrc = imageSrc.asset.url;
        // No blur URL for direct URLs
      } else {
        try {
          finalSrc = urlFor(imageSrc).auto('format').fit('max').url();
          finalBlurUrl = urlFor(imageSrc).width(20).height(20).quality(10).blur(10).url();
        } catch (error) {
          console.error("Error generating Sanity image URL:", error);
        }
      }
    } else if (typeof imageSrc === 'string') {
      // Handle direct string URLs
      console.log("[HeroBackground] Image type: Direct URL string");
      finalSrc = imageSrc;
    } else {
      console.error(
        "HeroBackground: Received unexpected or incomplete imageSrc type.",
        imageSrc
      );
    }
    console.log("[HeroBackground] Calculated Image URLs:", { finalSrc, finalBlurUrl });
  }

  const shouldRenderImage = !videoSrc && finalSrc;
  console.log("[HeroBackground] Render decision:", { hasVideo: !!videoSrc, shouldRenderImage });

  return (
    <div
      className={cn(
        'fixed inset-0 min-h-screen overflow-hidden z-10',
        className,
      )}
      data-has-video={!!videoSrc}
      data-has-image={!!finalSrc}
    >
      {videoSrc && (
        <Video
          src={videoSrc}
          className="w-full h-screen"
          style={{
            position: 'fixed',
            inset: '0px',
            '--media-object-fit': 'cover',
          }}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        />
      )}
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
