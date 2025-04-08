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
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";

// UI components
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

// Assets
import avatarImage from "@/assets/avatar.png";

// Use direct path to public video file instead of next-video import
const homeVideoPath = "/videos/home.mp4";

/**
 * Types for Sanity data
 */
interface Category {
  _id: string;
  title: string;
  description?: string;
  iconName?: string;
}

interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  heroImage: { asset: { _ref: string } };
  headline: string;
  categories: Category[];
}

export const metadata: Metadata = {
  title: "Jeff Ordway - Purpose-Driven Design and Development",
  description:
    "I build tools to help you live boldly, serve purposefully, and pursue excellence.",
};

/**
 * Fetch projects from Sanity
 */
async function getProjects(): Promise<Project[]> {
  const client = createClient({ apiVersion, dataset, projectId, useCdn });
  
  const query = `*[_type == "project"] | order(date desc) [0...6] {
    _id,
    title,
    slug,
    heroImage { 
      ..., 
      asset->{
        _id,
        _ref, 
        _type,
        url
      }
    },
    headline,
    "categories": categories[]->{
      _id,
      title,
      description,
      iconName
    }
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

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
        {/* Projects Section */}
        <Section>
          <AutoGrid gap={8}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card
                  key={project._id}
                  title={project.title}
                  description={project.headline}
                  imageUrl={urlFor(project.heroImage).url()}
                  imageAlt={`${project.title} project screenshot`}
                  href={`/projects/${project.slug.current}`}
                  tags={project.categories?.map((category) => (
                    <Tag
                      key={category._id}
                      label={category.title}
                      icon={
                        category.iconName ? (
                          <Icon name={category.iconName} size="sm" />
                        ) : undefined
                      }
                      tooltipContent={category.description}
                    />
                  ))}
                  className="aspect-square w-full"
                />
              ))
            ) : (
              <Text variant="body" className="col-span-full text-center italic">
                No projects found. Check back soon for updates!
              </Text>
            )}
          </AutoGrid>
        </Section>
      </Content>
    </>
  );
}
