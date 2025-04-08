import { ContactForm } from "@/components/features/ContactForm";
import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Text } from "@/components/ui/typography/Text";

import React from "react";
import type { Metadata } from "next";

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "Contact | Your Name - Portfolio", // Replace Your Name
  description: "Learn more about my background and journey.", // Simplified description
};

/**
 * About Page Component (Minimal Placeholder)
 * Basic structure for the About page.
 */
export default function ContactPage() {
  return (
    // Main container for the page content
    <Section maxWidth="narrow" className="py-6 md:py-12">
      <OneColumnGrid gap={4}>
        <Text variant="title">Get in Touch</Text>
        <Text variant="body">
          Have a question or want to chat? Fill out the form below and I&apos;ll get
          back to you as soon as possible.
        </Text>
        <ContactForm />
      </OneColumnGrid>
    </Section>
  );
}
