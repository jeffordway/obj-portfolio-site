import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "Privacy Policy | Jeff Ordway",
  description: "Privacy policy for Jeff Ordway's portfolio website.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section maxWidth="narrow" className="py-6 md:py-12">
      <OneColumnGrid gap={4}>
        <Text variant="title">Privacy Policy</Text>
        <Text variant="caption" className="italic text-muted-foreground -mb-2">
          Effective Date: April 4, 2025{" "}
          {/* TODO: Update with actual effective date */}
        </Text>
        <Text variant="caption" className={cn("italic text-muted-foreground")}>
          Last Updated: April 4, 2025{" "}
          {/* TODO: Update with actual last updated date */}
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          How We Collect Your Information
        </Text>
        <Text variant="body">
          We may collect the following types of information when you use the
          Service:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>
            <span className="font-semibold">Personal Information:</span>{" "}
            Includes your name, email address, phone number, or other details
            you voluntarily provide (e.g., via contact forms or newsletter
            sign-ups).
          </li>
          <li>
            <span className="font-semibold">Usage Data:</span> Automatically
            collected data such as your IP address, browser type, pages
            visited, and time spent on the Website.
          </li>
          <li>
            <span className="font-semibold">
              Cookies and Tracking Technologies:
            </span>{" "}
            We use cookies and similar tools to enhance your experience. See
            our{" "}
            <Link
              href="/cookie-policy"
              className={cn("underline text-primary")}
            >
              Cookie Policy
            </Link>{" "}
            for details.
          </li>
        </ul>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          How We Use Your Information
        </Text>
        <Text variant="body">
          We use the information we collect for the following purposes:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>
            <span className="font-semibold">
              Marketing and Promotional Activities:
            </span>{" "}
            To send you newsletters, updates, or promotional materials (with
            your consent).
          </li>
          <li>
            <span className="font-semibold">Administrative Purposes:</span> To
            respond to inquiries, manage requests, and improve the Service&apos;s
            functionality.
          </li>
          <li>
            <span className="font-semibold">Analytics:</span> To analyze user
            behavior and enhance our offerings.
          </li>
        </ul>
        <Text variant="body" className="mt-4">
          We will not use your information for any other purpose without your
          explicit consent, unless required by law. If we seek to use your data
          for a new purpose, we will obtain your consent beforehand.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          How We Share Your Information
        </Text>
        <Text variant="body">
          We do not sell or share your personal information with third parties
          without your consent, except in these limited circumstances:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>
            <span className="font-semibold">Analytics Providers:</span> We may
            share data with trusted third parties (e.g., analytics services)
            to help us operate and improve the Service. These providers are
            bound by contract to use your information only for the intended
            purpose and not retain it longer than necessary.
          </li>
          <li>
            <span className="font-semibold">Legal Obligations:</span> We may
            disclose your information to comply with laws, regulations, court
            orders, or legal processes, or to enforce our agreements,
            including this Privacy Policy.
          </li>
          <li>
            <span className="font-semibold">Business Transfers:</span> If
            Nielsen Ossowski Creative LLC merges, is acquired, or sells
            assets, your information may be transferred to the new owner. We
            will notify you of any such transfer.
          </li>
        </ul>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Your Rights
        </Text>
        <Text variant="body">
          Depending on applicable law, you may have the following rights
          regarding your personal information:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>
            <span className="font-semibold">Access and Correction:</span>{" "}
            Request access to or updates to your data.
          </li>
          <li>
            <span className="font-semibold">Erasure:</span> Request deletion
            of your personal data.
          </li>
          <li>
            <span className="font-semibold">Data Portability:</span> Obtain a
            copy of your data in a structured format.
          </li>
          <li>
            <span className="font-semibold">Restriction or Objection:</span>{" "}
            Limit or object to how we process your data.
          </li>
          <li>
            <span className="font-semibold">Withdraw Consent:</span> Revoke
            consent for data processing where applicable.
          </li>
        </ul>
        <Text variant="body" className="mt-4">
          To exercise these rights, email us at{" "}
          <a
            href="mailto:contact@nielsenossowski.com"
            className={cn("underline text-primary")}
          >
            contact@nielsenossowski.com
          </a>
          . We will respond within a reasonable period, as required by
          applicable law. Note that restricting or withdrawing consent may limit
          your ability to use certain Service features.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Cookies and Tracking Technologies
        </Text>
        <Text variant="body">
          We use cookies and similar technologies to improve your experience.
          For more details and to manage your preferences, please refer to our{" "}
          <Link href="/cookie-policy" className={cn("underline text-primary")}>
            Cookie Policy
          </Link>
          .
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Security
        </Text>
        <Text variant="body">
          We take reasonable measures, such as encryption and access controls,
          to safeguard your information from loss, misuse, or unauthorized
          access. However, no internet transmission is entirely secure, and we
          cannot guarantee absolute security. You provide your information at
          your own risk.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Third-Party Links
        </Text>
        <Text variant="body">
          The Service may include links to external websites not operated by us.
          This Privacy Policy does not apply to those sites, and we are not
          responsible for their practices. We encourage you to review the
          privacy policies of any third-party sites you visit.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Children&apos;s Privacy
        </Text>
        <Text variant="body">
          The Service is not designed for individuals under 18. We do not
          knowingly collect personal information from children. If we learn we
          have such data, we will delete it promptly.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Data Retention
        </Text>
        <Text variant="body">
          We retain your personal information only as long as necessary for the
          purposes outlined in this Privacy Policy, unless a longer retention
          period is required by law.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Changes to This Privacy Policy
        </Text>
        <Text variant="body">
          We may revise this Privacy Policy as needed. Updates will be posted on
          the Service, and significant changes (e.g., those affecting your
          rights or how we use your data) will take effect 180 days after
          posting. Your continued use of the Service after that period indicates
          your acceptance of the changes.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Contact Us
        </Text>
        <Text variant="body">
          For questions, concerns, or to exercise your rights, contact us at:
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
          <br />
          <br />
          You may also reach our Grievance Officer at the above email for data
          protection inquiries or concerns. We will address your issues in
          accordance with applicable law.
        </Text>
      </OneColumnGrid>
    </Section>
  );
}
