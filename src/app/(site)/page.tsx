import type { Metadata } from "next"; // Added
import { Hero } from "@/components/layouts/Hero";
import { Content } from "@/components/layouts/Content"; // Import Content
import { Section } from "@/components/layouts/Section";
import { Text } from "@/components/ui/typography/Text"; // Import Text for placeholder
import homeVideo from "/videos/home.mp4"; // Import the video file
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Avatar } from "@/components/ui/avatar/Avatar";
import avatarImage from "@/assets/avatar.png"; // Import the image file

// Added Metadata
export const metadata: Metadata = {};

// Renamed to HomePage (Optional)
export default function HomePage() {
  return (
    <>
      {/* Fixed Hero Background */}
      <Hero videoSrc={homeVideo}>
        <Section maxWidth="container">
          <OneColumnGrid gap={4} alignItems="center" justifyContent="center">
            <Avatar src={avatarImage} alt="Jeff Ordway" size="lg" />
            <Text variant="title" align="center">
              Purpose-Driven Design and Development
            </Text>
            <Text variant="subtitle" align="center">
              Hey, I'm Jeff Ordway, a creator with a passion for purpose and a
              knack for turning faith into action. I build tools to help you
              live boldly, pursue excellence, and serve purposefully.
            </Text>
          </OneColumnGrid>
        </Section>
      </Hero>

      {/* Use the Content component to wrap scrolling content */}
      <Content>
        {/* Add your page content here - Example Sections */}
        <Section>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Section Title</h2>
            <p>This content will scroll over the fixed Hero background.</p>
            <p>Add your actual content here.</p>
          </div>
        </Section>

        <Section>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold">Another Section</h2>
            <p>More content that scrolls over the Hero.</p>
          </div>
        </Section>
      </Content>
    </>
  );
}
