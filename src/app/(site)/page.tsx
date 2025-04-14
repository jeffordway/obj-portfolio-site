import type { Metadata } from "next";

// Layout components
import { HeroBackground } from "@/components/layouts/HeroBackground";
import { HeroContent } from "@/components/layouts/HeroContent";
import { Content } from "@/components/layouts/Content";
import { Section } from "@/components/layouts/Section";

// UI components
import { Text } from "@/components/ui/typography/Text";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Avatar } from "@/components/ui/avatar/Avatar";

// Sanity imports
import { getProjects } from "@/lib/sanity/queries";

// Assets
import avatarImage from "@/assets/avatar.png";

// Features
import { LazyProjects } from '@/components/features/LazyProjects';

const homeVideoPath = "/videos/home.mp4";

export const metadata: Metadata = {
  title: "Jeff Ordway - Purpose-Driven Design and Development",
  description:
    "I build tools to help you live boldly, serve purposefully, and pursue excellence.",
};

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <HeroBackground
          videoSrc={homeVideoPath}
          imageAlt="Home page background video"
        />

        <HeroContent className="flex flex-col items-center justify-center text-center">
          <Section maxWidth="container">
            <OneColumnGrid gap={4} alignItems="center" justifyContent="center">
              <Avatar src={avatarImage} alt="Jeff Ordway" size="lg" />
              <Text variant="title" align="center">
                Purpose-Driven Design and Development
              </Text>
              <Text variant="subtitle" align="center" className="mt-2">
                Hey, I&apos;m Jeff Ordway, a creator with a passion for purpose
                and a knack for turning faith into action. I build tools to help
                you live boldly, serve purposefully, and pursue excellence.
              </Text>
            </OneColumnGrid>
          </Section>
        </HeroContent>
      </div>

      <Content>
        {/* Projects Section - Using LazyProjects for lazy loading */}
        <LazyProjects projects={projects} />
      </Content>
    </>
  );
}
