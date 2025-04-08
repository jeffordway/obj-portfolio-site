import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "Terms and Conditions | Jeff Ordway",
  description: "Terms and conditions for Jeff Ordway's portfolio website.",
};

export default function TermsPage() {
  return (
    <Section maxWidth="narrow" className="py-6 md:py-12">
      <OneColumnGrid gap={4}>
        <Text variant="title">Terms and Conditions</Text>
        <Text variant="caption" className="italic text-muted-foreground -mb-2">
          Effective Date: April 3, 2025{" "}
          {/* TODO: Update with actual effective date */}
        </Text>
        <Text variant="caption" className={cn("italic text-muted-foreground")}>
          Last Updated: April 3, 2025{" "}
          {/* TODO: Update with actual last updated date */}
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          1. Acceptance of Terms
        </Text>
        <Text variant="body">
          By accessing or using the Website, you confirm that you are at least 18 years old and capable of entering into legally binding agreements. Your continued use of the Website signifies your acceptance of these Terms and any future updates we may post. Your use of the Website is also governed by our{" "}
          <Link href="/privacy-policy" className={cn("underline text-primary")}>
            Privacy Policy
          </Link>
          , which outlines how we collect, use, and protect your personal information.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          2. Ownership and Operation
        </Text>
        <Text variant="body">
          The Website, jeffordway.com, is owned and operated by Nielsen Ossowski Creative LLC, a Florida-based limited liability company. All content, materials, and services on the Website are the property of Nielsen Ossowski Creative LLC unless otherwise noted.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          3. Use of the Website
        </Text>
        <Text variant="body">
          You agree to use the Website lawfully and in a way that does not harm others or interfere with their use. Prohibited actions include:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>Violating any local, state, or federal laws.</li>
          <li>Impersonating individuals or entities.</li>
          <li>Disrupting the Website&apos;s functionality or security.</li>
          <li>Transmitting harmful code, such as viruses or malware.</li>
          <li>Using the Website for unauthorized commercial purposes (e.g., scraping content for resale).</li>
        </ul>
        <Text variant="body" className="mt-4">
          We reserve the right to suspend or terminate your access to the Website if you breach these Terms.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          4. Intellectual Property
        </Text>
        <Text variant="body">
          All content on jeffordway.com, including but not limited to text, images, logos, graphics, and software, is the intellectual property of Nielsen Ossowski Creative LLC or its licensors. This content is protected by copyright, trademark, and other laws. You may not copy, distribute, modify, or create derivative works from it without our prior written permission.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          5. Disclaimer of Warranties
        </Text>
        <Text variant="body">
          The Website and its content are provided &quot;as is&quot; and &quot;as available,&quot; without any warranties, whether express or implied. Nielsen Ossowski Creative LLC disclaims all warranties, including:
        </Text>
        <ul className={cn("list-disc pl-5 space-y-1 mt-2")}>
          <li>The accuracy or completeness of the content.</li>
          <li>Continuous or error-free operation of the Website.</li>
          <li>The absence of viruses or other harmful elements.</li>
        </ul>
        <Text variant="body" className="mt-4">
          You use the Website at your own risk.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          6. Limitation of Liability
        </Text>
        <Text variant="body">
          To the maximum extent allowed by law, Nielsen Ossowski Creative LLC will not be liable for any damages—direct, indirect, incidental, consequential, or punitive—arising from your use of the Website. This includes, but is not limited to, loss of data, profits, business opportunities, website errors or downtime, and unauthorized access to your information. This applies even if we&apos;ve been notified of the potential for such damages.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          7. Third-Party Links
        </Text>
        <Text variant="body">
          The Website may include links to external sites not controlled by Nielsen Ossowski Creative LLC. We are not responsible for the content, policies, or practices of these third-party sites. Clicking these links is at your own discretion and risk.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          8. User-Generated Content
        </Text>
        <Text variant="body">
          If you submit content (e.g., comments or testimonials) to the Website, you grant Nielsen Ossowski Creative LLC a non-exclusive, royalty-free, worldwide license to use, reproduce, and display it. You are responsible for ensuring your submissions comply with all laws and do not infringe on third-party rights.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          9. Changes to the Terms
        </Text>
        <Text variant="body">
          We may update these Terms at any time. Changes will be posted here with an updated &quot;Last Updated&quot; date. Your continued use of the Website after such changes indicates your acceptance of the revised Terms.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          10. Indemnification
        </Text>
        <Text variant="body">
          You agree to indemnify, defend, and hold harmless Nielsen Ossowski Creative LLC, its officers, directors, employees, and agents from any claims, liabilities, damages, or expenses arising from your use of the Website or violation of these Terms.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          11. Termination
        </Text>
        <Text variant="body">
          We may terminate or suspend your access to the Website at any time, without prior notice, for conduct that we believe violates these Terms, is harmful to other users, us, or third parties, or for any other reason.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          12. Governing Law
        </Text>
        <Text variant="body">
          These Terms and your use of the Website are governed by the laws of the State of Florida, without regard to its conflict of law rules. Any disputes related to these Terms or the Website will be resolved exclusively in Florida courts.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          13. Entire Agreement
        </Text>
        <Text variant="body">
          These Terms constitute the entire agreement between you and Nielsen Ossowski Creative LLC regarding your use of the Website and supersede any prior agreements.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          14. Severability and Waiver
        </Text>
        <Text variant="body">
          If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          15. Contact for Legal Inquiries
        </Text>
        <Text variant="body">
          For questions, concerns, or legal notices about these Terms or the Website, please reach out to Nielsen Ossowski Creative LLC at:
          <br />
          <span className="font-semibold">Email:</span>{" "}
          <a
            href="mailto:contact@nielsenossowski.com"
            className={cn("underline text-primary")}
          >
            contact@nielsenossowski.com
          </a>
          <br />
          <span className="font-semibold">Mailing Address:</span> 1317 Edgewater Dr STE 5758, Orlando, FL 32804
        </Text>
      </OneColumnGrid>
    </Section>
  );
}
