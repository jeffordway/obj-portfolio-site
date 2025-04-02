import type { Metadata } from 'next';

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: 'About Me | Your Name - Portfolio', // Replace Your Name
  description: 'Learn more about my background and journey.', // Simplified description
};

/**
 * About Page Component (Minimal Placeholder)
 * Basic structure for the About page.
 */
export default function AboutPage() {
  return (
    // Main container for the page content
    <main className="container mx-auto px-4 py-16 md:py-24"> {/* Centered container with vertical/horizontal padding */}
      
      {/* Page Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        About Me
      </h1>
      
      {/* Minimal placeholder content */}
      <div className="text-center text-gray-600 dark:text-gray-400">
        <p>Content for the About page will be added here soon.</p>
        {/* TODO: Add detailed content later or fetch from CMS */}
      </div>

    </main>
  );
}