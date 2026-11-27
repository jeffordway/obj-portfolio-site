import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Metadata } from "next";
import Link from "next/link";

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using jeffordway.com, Jeff Ordway's portfolio.",
};

/**
 * Terms of Use
 *
 * This page also covers what the old Disclaimer page said. Keep it short and
 * true. If the site ever sells something, takes user content, or is owned by a
 * company, have a lawyer review this page.
 */
export default function TermsPage() {
  return (
    <Section maxWidth="narrow" className="py-6 md:py-12">
      <OneColumnGrid gap={4}>
        <Text variant="title">Terms of Use</Text>
        <Text variant="caption" className="italic text-muted-foreground">
          Last updated: November 27, 2026
        </Text>

        <Text variant="body">
          This site, jeffordway.com, is the personal portfolio of Jeff Ordway.
          By using it, you agree to these terms. If you do not agree, please
          do not use the site.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          My Own Views
        </Text>
        <Text variant="body">
          Everything here is my own work and opinion. It does not represent
          any employer, client, or organization I work with, now or in the
          past.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Who Owns the Content
        </Text>
        <Text variant="body">
          Unless noted otherwise, the text, design, and code on this site are
          &copy; Jeff Ordway. Some images and media come from third parties
          and remain theirs. Product names, logos, and trademarks shown in
          projects belong to their owners and appear only to describe the
          work. You are welcome to link to and share pages from this site.
          Please do not copy or reuse the content without my permission.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Information Only
        </Text>
        <Text variant="body">
          This site shows examples of my work and shares general information.
          It is not professional advice of any kind, and nothing here is an
          offer or a guarantee of results. The site is provided &quot;as
          is,&quot; without warranties of any kind, and I do not promise it
          will always be available, accurate, or free of errors.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Limitation of Liability
        </Text>
        <Text variant="body">
          To the fullest extent the law allows, I am not liable for any
          damages that result from your use of this site or from relying on
          its content. You use the site at your own risk.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Links to Other Sites
        </Text>
        <Text variant="body">
          This site links to websites I do not control. I am not responsible
          for their content or practices.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Fair Use of the Site
        </Text>
        <Text variant="body">
          Please do not misuse the site. That includes trying to disrupt it,
          probing it for weaknesses, or sending spam or harmful content
          through the contact form.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Privacy
        </Text>
        <Text variant="body">
          The{" "}
          <Link href="/privacy-policy" className="underline text-primary">
            Privacy Policy
          </Link>{" "}
          explains what this site collects and why.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Changes
        </Text>
        <Text variant="body">
          I may update these terms. When I do, I will change the date at the
          top of this page.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Contact
        </Text>
        <Text variant="body">
          Questions or legal notices can be sent through the{" "}
          <Link href="/contact" className="underline text-primary">
            contact form
          </Link>
          .
        </Text>
      </OneColumnGrid>
    </Section>
  );
}
