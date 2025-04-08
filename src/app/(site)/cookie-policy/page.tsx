import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Metadata } from "next";
import { Button } from "@/components/ui/button/Button";
import { cn } from "@/lib/utils";

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "Cookie Policy | Jeff Ordway",
  description: "Details about how cookies are used on this website.",
};

export default function CookiePolicyPage() {
  return (
    <Section maxWidth="narrow" className="py-6 md:py-12">
      <OneColumnGrid gap={4}>
        <Text variant="title">Cookie Policy</Text>
        <Text variant="caption" className="italic text-muted-foreground -mb-2">
          Effective Date: April 4, 2025{" "}
          {/* TODO: Update with actual effective date */}
        </Text>
        <Text variant="caption" className={cn("italic text-muted-foreground")}>
          Last Updated: April 4, 2025{" "}
          {/* TODO: Update with actual last updated date */}
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          What Are Cookies?
        </Text>
        <Text variant="body">
          Cookies are small text files placed on your device when you visit a
          website. They store small pieces of information to help the website
          function properly, enhance your experience, and provide insights into
          how the site is used.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          How We Use Cookies
        </Text>
        <Text variant="body">
          We use cookies for several purposes, including:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>
            <span className="font-semibold">
              Ensuring the Website operates correctly:
            </span>{" "}
            Cookies enable core features like page navigation and access to
            secure areas.
          </li>
          <li>
            <span className="font-semibold">
              Enhancing security measures:
            </span>{" "}
            Cookies help protect user data and maintain site integrity.
          </li>
          <li>
            <span className="font-semibold">
              Improving your user experience:
            </span>{" "}
            Cookies remember your preferences (e.g., language or login
            settings) for a seamless visit.
          </li>
          <li>
            <span className="font-semibold">
              Analyzing Website performance and user interactions:
            </span>{" "}
            Cookies track usage patterns to help us optimize the site.
          </li>
        </ul>
        <Text variant="body" className="mt-4">
          These purposes allow us to maintain a functional, secure, and
          user-friendly website while identifying areas for improvement.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Types of Cookies We Use
        </Text>
        <Text variant="body">
          We use both first-party and third-party cookies, categorized as
          follows:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>
            <span className="font-semibold">Essential Cookies:</span> These
            are necessary for the Website to function properly. They enable
            core features like page navigation and access to secure areas.
            They do not collect personally identifiable information.
          </li>
          <li>
            <span className="font-semibold">
              Analytical/Performance Cookies:
            </span>{" "}
            These help us understand how users interact with the Website by
            tracking usage patterns, allowing us to analyze performance and
            enhance functionality. Some may be set by third-party analytics
            providers.
          </li>
          <li>
            <span className="font-semibold">Functional Cookies:</span> These
            remember your preferences and choices (e.g., language settings) to
            provide a more personalized experience.
          </li>
        </ul>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Cookie Duration
        </Text>
        <Text variant="body">
          Cookies may be session cookies, which are temporary and deleted when
          you close your browser, or persistent cookies, which remain on your
          device for a set period or until you delete them.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Managing Cookie Preferences
        </Text>
        <Text variant="body">
          You can manage your cookie preferences at any time through our cookie
          consent tool. This tool allows you to accept or reject non-essential
          cookies.
        </Text>
        <Button
          variant="outline"
          href="#" // Placeholder link - update with actual settings tool link
          target="_blank" // Open in new tab if it's an external tool
          rel="noopener noreferrer"
          className={cn("w-fit my-3 md:my-4")} // Responsive margin
        >
          Cookie Settings
        </Button>
        <Text variant="body">
          Additionally, you can control cookies directly through your browser
          settings. Below are links to instructions for managing cookies in
          major browsers:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>
            <span className="font-semibold">Chrome:</span>{" "}
            <a
              href="https://support.google.com/accounts/answer/32050"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("underline text-primary")}
            >
              https://support.google.com/accounts/answer/32050
            </a>
          </li>
          <li>
            <span className="font-semibold">Safari:</span>{" "}
            <a
              href="https://support.apple.com/en-in/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("underline text-primary")}
            >
              https://support.apple.com/en-in/guide/safari/sfri11471/mac
            </a>
          </li>
          <li>
            <span className="font-semibold">Firefox:</span>{" "}
            <a
              href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("underline text-primary")}
            >
              https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox
            </a>
          </li>
          <li>
            <span className="font-semibold">Internet Explorer:</span>{" "}
            <a
              href="https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("underline text-primary")}
            >
              https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc
            </a>
          </li>
        </ul>
        <Text variant="body" className="mt-4">
          If you use a different browser, please refer to its official support
          documentation. Be aware that disabling cookies may impact the
          Website&apos;s functionality.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Changes to This Cookie Policy
        </Text>
        <Text variant="body">
          We may update this Cookie Policy from time to time to reflect changes
          in our practices or legal requirements. We encourage you to review
          this policy periodically to stay informed.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Contact Us
        </Text>
        <Text variant="body">
          If you have questions or concerns about our use of cookies, please
          reach out to us at:
          <br />
          <span className="font-semibold">Company:</span> Nielsen Ossowski
          Creative LLC
          <br />
          <span className="font-semibold">Address:</span> 1317 Edgewater Dr STE
          5758, Orlando, FL 32804
          <br />
          <span className="font-semibold">Email:</span>{" "}
          <a
            href="mailto:contact@nielsenossowski.com"
            className={cn("underline text-primary")}
          >
            contact@nielsenossowski.com
          </a>
          <br />
          <span className="font-semibold">Phone:</span> 941-363-1748
        </Text>
      </OneColumnGrid>
    </Section>
  );
}
