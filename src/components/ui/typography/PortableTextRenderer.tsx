import React from 'react';
import { PortableText as SanityPortableText, PortableTextComponents } from '@portabletext/react';
import { Text } from './Text'; // Assuming Text component is in the same directory
import Link from 'next/link';
import { cn } from '@/lib/utils'; // Import your utility for class names
import type { PortableTextBlock } from '@portabletext/types'; // Import PortableTextBlock

// --- Props Definition ---

interface PortableTextProps {
  /** The Portable Text value from Sanity */
  value: PortableTextBlock[]; // Use PortableTextBlock[] instead of any
  /** Optional additional class names */
  className?: string;
}

// --- Custom Component Renderers ---

const portableTextComponents: PortableTextComponents = {
  // Block Types
  block: {
    h1: ({ children }) => <Text variant="title" className="mb-4 mt-8 first:mt-0">{children}</Text>,
    h2: ({ children }) => <Text variant="subtitle" className="mb-4 mt-8 first:mt-0">{children}</Text>,
    h3: ({ children }) => <Text variant="heading" className="mb-4 mt-8 first:mt-0">{children}</Text>,
    // Add h4, h5, h6 if needed, mapping to appropriate Text variants or styles
    normal: ({ children }) => <Text variant="body" className="mb-4">{children}</Text>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 mb-6 border-l-2 border-primary pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  // List Types
  list: {
    bullet: ({ children }) => <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
    number: ({ children }) => <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  // Mark Types (Inline Styles)
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    'strike-through': ({ children }) => <span className="line-through">{children}</span>,
    // Custom link handling
    link: ({ children, value }) => {
      const href = value?.href;
      if (!href) {
        return <span>{children}</span>; // Render as plain text if no href
      }
      
      // Determine if it's an internal or external link
      const isInternal = href.startsWith('/') || href.startsWith('#');
      
      if (isInternal) {
        return (
          <Link href={href} className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary">
            {children}
          </Link>
        );
      } else {
        return (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary"
          >
            {children}
          </a>
        );
      }
    },
    // Add code mark handling if needed
    // code: ({ children }) => <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{children}</code>,
  },
  // Custom Types (e.g., images, code blocks - requires schema definition in Sanity)
  // types: {
  //   image: ({ value }) => { /* Custom image rendering logic */ },
  //   code: ({ value }) => { /* Custom code block rendering logic */ },
  // },
};

// --- Component Implementation ---

export const PortableText: React.FC<PortableTextProps> = ({ value, className }) => {
  if (!value) {
    return null; // Return null if no value is provided
  }

  return (
    <div className={cn('prose dark:prose-invert max-w-none', className)}> 
      {/* Using prose for default spacing/styling fallbacks, adjust as needed */}
      <SanityPortableText value={value} components={portableTextComponents} />
    </div>
  );
};

PortableText.displayName = 'PortableText';
