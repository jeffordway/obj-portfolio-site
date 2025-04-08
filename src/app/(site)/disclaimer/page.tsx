import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Basic SEO metadata for this page
export const metadata: Metadata = {
  title: "Disclaimer | Jeff Ordway",
  description: "Legal disclaimer for Jeff Ordway's portfolio website.",
};

export default function DisclaimerPage() {
  return (
    <Section maxWidth="narrow" className="py-6 md:py-12">
      <OneColumnGrid gap={4}>
        <Text variant="title">Disclaimer</Text>
        <Text variant="caption" className="italic text-muted-foreground -mb-2">
          Effective Date: April 4, 2025{" "}
          {/* TODO: Update with actual effective date */}
        </Text>
        <Text variant="caption" className={cn("italic text-muted-foreground")}>
          Last Updated: April 4, 2025{" "}
          {/* TODO: Update with actual last updated date */}
        </Text>

        <Text variant="body">
          The website,jeffordway.com, is owned and operated by Nielsen Ossowski
          Creative LLC, a limited liability company registered in the State of
          Florida. The content on this website is provided for general
          informational purposes only. While we strive to keep the information
          accurate and current, Nielsen Ossowski Creative LLC makes no
          warranties or representations, express or implied, about its
          completeness, accuracy, or reliability. Your use of this website and
          its content is at your own risk.
        </Text>
        <Text variant="body">
          Nielsen Ossowski Creative LLC is not liable for any direct, indirect,
          incidental, or consequential damages resulting from your use of this
          website or its information.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          External Links Disclaimer
        </Text>
        <Text variant="body">
          This website may include links to third-party sites not controlled by
          Nielsen Ossowski Creative LLC. We do not endorse or take
          responsibility for the content or practices of these external sites.
          You access these links at your own risk.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Professional Advice Disclaimer
        </Text>
        <Text variant="body">
          The information on jeffordway.com is not intended as professional
          advice, including but not limited to legal, financial, medical, or any
          other specialized guidance. It should not substitute for consultation
          with qualified professionals. Nielsen Ossowski Creative LLC is not
          responsible for actions taken based on this website&apos;s content.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Testimonial Disclaimer
        </Text>
        <Text variant="body">
          Testimonials on jeffordway.com reflect the personal experiences of
          individual users and are not intended to represent or guarantee that
          every user will achieve similar results. Individual outcomes may vary.
          Testimonials are presented as submitted, except for corrections of
          grammar or spelling, and may be shortened for brevity without changing
          their meaning. Nielsen Ossowski Creative LLC does not compensate users
          for testimonials, and the views expressed are solely those of the
          individuals. Testimonials are not verified or endorsed by Nielsen
          Ossowski Creative LLC.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Privacy Policy
        </Text>
        <Text variant="body">
          For information on how we collect, use, and protect your personal
          data, please refer to our{" "}
          <Link href="/privacy-policy" className={cn("underline text-primary")}>
            Privacy Policy
          </Link>
          .
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Governing Law
        </Text>
        <Text variant="body">
          This disclaimer and your use of jeffordway.com are governed by the
          laws of the State of Florida.
        </Text>

        <Text variant="title" className={cn("mt-4 md:mt-6")}>
          Contact for Legal Inquiries
        </Text>
        <Text variant="body">
          For legal inquiries or notices regarding this website, please contact
          Nielsen Ossowski Creative LLC at:
          <br />
          <span className="font-semibold">Email:</span>{" "}
          <a
            href="mailto:contact@nielsenossowski.com"
            className={cn("underline text-primary")}
          >
            contact@nielsenossowski.com
          </a>
          <br />
          <span className="font-semibold">Mailing Address:</span> 1317 Edgewater
          Dr STE 5758, Orlando, FL 32804
        </Text>
      </OneColumnGrid>
    </Section>
  );
}
