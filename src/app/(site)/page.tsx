import type { Metadata } from "next";

// Layout components
import { HeroBackground } from "@/components/layouts/HeroBackground";
import { HeroContent } from "@/components/layouts/HeroContent";
import { Content } from "@/components/layouts/Content";
import { Section } from "@/components/layouts/Section";

// UI components
import { Text } from "@/components/ui/typography/Text";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { AutoGrid } from "@/components/ui/grid/AutoGrid";
import { Avatar } from "@/components/ui/avatar/Avatar";
import { Card } from "@/components/ui/card/Card";

// Sanity imports
import { urlFor } from "@/sanity/lib/image";
import { getProjects, type Project } from "@/lib/sanity/queries";

// UI components
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

// Assets
import avatarImage from "@/assets/avatar.png";

// Import the LazyProjects component
import { LazyProjects } from '@/components/features/LazyProjects';

// Use direct path to public video file instead of next-video import
const homeVideoPath = "/videos/home.mp4";

// Types are now imported from @/lib/sanity/queries

export const metadata: Metadata = {
  title: "Jeff Ordway - Purpose-Driven Design and Development",
  description:
    "I build tools to help you live boldly, serve purposefully, and pursue excellence.",
};

// Projects are now fetched using the centralized getProjects function from @/lib/sanity/queries

// Enable revalidation every 60 seconds as a fallback
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
