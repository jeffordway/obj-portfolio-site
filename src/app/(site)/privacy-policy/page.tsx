import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Metadata } from "next";
import Link from "next/link";

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What jeffordway.com collects, why, and the choices you have. Short version: a contact form and anonymous visit counts.",
};

/**
 * Privacy Policy
 *
 * Keep this page true. If the site starts collecting anything new (a newsletter,
 * an ad or tracking tool, user accounts), update this page in the same change.
 */
export default function PrivacyPolicyPage() {
  return (
    <Section maxWidth="narrow" className="py-6 md:py-12">
      <OneColumnGrid gap={4}>
        <Text variant="title">Privacy Policy</Text>
        <Text variant="caption" className="italic text-muted-foreground">
          Last updated: November 27, 2026
        </Text>

        <Text variant="body">
          This site, jeffordway.com, is the personal portfolio of Jeff Ordway.
          When this page says &quot;I&quot; or &quot;me,&quot; that is who it
          means. The short version: I collect what you send me through the
          contact form, plus anonymous visit counts. I do not sell your
          information, show ads, or track you across other websites.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          What I Collect
        </Text>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-semibold">Contact form messages.</span> If
            you use the{" "}
            <Link href="/contact" className="underline text-primary">
              contact form
            </Link>
            , I receive the name, email address, subject, and message you
            enter. I use them only to read and answer your message. You are
            not added to any mailing list.
          </li>
          <li>
            <span className="font-semibold">Anonymous visit statistics.</span>{" "}
            The site counts page views and measures loading speed. This
            includes the page visited, the referring site, browser, operating
            system, device type, and country. It does not use cookies and
            does not identify you personally.
          </li>
          <li>
            <span className="font-semibold">Technical data.</span> Like any
            website, the servers that deliver this site process your IP
            address and basic request details to load pages, keep the site
            secure, and limit abuse of the contact form.
          </li>
        </ul>

        <Text variant="title" className="mt-4 md:mt-6">
          Cookies
        </Text>
        <Text variant="body">
          This site does not set advertising or tracking cookies. It saves
          one setting in your browser, your choice of light or dark theme, so
          the site looks the same on your next visit. That setting stays on
          your device.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Services That Help Run This Site
        </Text>
        <Text variant="body">
          I do not sell or rent your information. A few service providers
          process it on my behalf so the site can work:
        </Text>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-semibold">Vercel</span> hosts the site and
            provides the anonymous visit and speed statistics.
          </li>
          <li>
            <span className="font-semibold">Resend</span> delivers contact
            form messages to my inbox.
          </li>
          <li>
            <span className="font-semibold">Sanity</span> stores the project
            content and images.
          </li>
        </ul>
        <Text variant="body">
          I may also disclose information if the law requires it.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          How Long I Keep It
        </Text>
        <Text variant="body">
          Contact form messages stay in my inbox for as long as I need them
          to respond and keep a record of the conversation. You can ask me to
          delete yours at any time.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Your Choices
        </Text>
        <Text variant="body">
          You can ask to see, correct, or delete the information you sent me.
          Depending on where you live, you may have additional rights under
          your local privacy laws. To make a request, use the{" "}
          <Link href="/contact" className="underline text-primary">
            contact form
          </Link>
          .
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Children
        </Text>
        <Text variant="body">
          This site is not directed at children under 13, and I do not
          knowingly collect personal information from them.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Links to Other Sites
        </Text>
        <Text variant="body">
          This site links to other websites, such as project demos, code
          repositories, and social profiles. Their privacy practices are
          their own.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Changes
        </Text>
        <Text variant="body">
          If what the site collects changes, I will update this page and the
          date at the top.
        </Text>

        <Text variant="title" className="mt-4 md:mt-6">
          Contact
        </Text>
        <Text variant="body">
          Questions about this policy? Reach me through the{" "}
          <Link href="/contact" className="underline text-primary">
            contact form
          </Link>
          .
        </Text>
      </OneColumnGrid>
    </Section>
  );
}
