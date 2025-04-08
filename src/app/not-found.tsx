import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { HeroBackground } from "@/components/layouts/HeroBackground";
import { HeroContent } from "@/components/layouts/HeroContent";
import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Text } from "@/components/ui/typography/Text";
import { Button } from "@/components/ui/button/Button";
import { RiArrowLeftLine } from "@remixicon/react";
import notFoundImage from "@/assets/not-found.jpeg";

export const metadata: Metadata = {
  title: "Page Not Found | Jeff Ordway",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <div className="relative">
        {/* Background Layer */}
        <HeroBackground 
          imageSrc={notFoundImage} 
          imageAlt="404 page not found background image"
        />
        
        {/* Content Layer */}
        <HeroContent showScrollIndicator={false}>
          <Section maxWidth="container">
            <OneColumnGrid gap={4} alignItems="center" justifyContent="center">
              <Text variant="title" align="center">
                404 - Page Not Found
              </Text>
              <Text variant="subtitle" align="center">
                Opps, sorry about that! It looks like you&apos;ve ventured into
                uncharted territory. Let&apos;s get you back on track.
              </Text>
              <Link href="/">
                <Button size="lg" iconLeft={<RiArrowLeftLine />}>Return Home</Button>
              </Link>
            </OneColumnGrid>
          </Section>
        </HeroContent>
      </div>
    </>
  );
}
