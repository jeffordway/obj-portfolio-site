import type { Metadata } from "next";
import { Hero } from "@/components/layouts/Hero";
import { Content } from "@/components/layouts/Content";
import { Section } from "@/components/layouts/Section";
import { Text } from "@/components/ui/typography/Text";
import homeVideo from "/videos/home.mp4";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Avatar } from "@/components/ui/avatar/Avatar";
import avatarImage from "@/assets/avatar.png";
import { AutoGrid } from "@/components/ui/grid/AutoGrid";
import { Card } from "@/components/ui/card/Card";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";

// Define types for Sanity data
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
  heroImage: any; // Sanity image type
  headline: string;
  categories: Category[];
}

export const metadata: Metadata = {
  title: "Jeff Ordway - Purpose-Driven Design and Development",
  description: "I build tools to help you live boldly, serve purposefully, and pursue excellence.",
};

export default async function HomePage() {
  // Fetch projects from Sanity
  const client = createClient({ apiVersion, dataset, projectId, useCdn });
  const projectsQuery = `*[_type == "project"] | order(date desc) [0...6] {
    _id,
    title,
    slug,
    heroImage,
    headline,
    "categories": categories[]->{
      _id,
      title,
      description,
      iconName
    }
  }`;

  let projects: Project[] = [];
  try {
    projects = await client.fetch(projectsQuery);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
  return (
    <>
      <Hero videoSrc={homeVideo}>
        <Section maxWidth="container">
          <OneColumnGrid gap={4} alignItems="center" justifyContent="center">
            <Avatar src={avatarImage} alt="Jeff Ordway" size="lg" />
            <Text variant="title" align="center">
              Purpose-Driven Design and Development
            </Text>

            <Text variant="subtitle" align="center" className="mt-2">
              Hey, I'm Jeff Ordway, a creator with a passion for purpose and a
              knack for turning faith into action. I build tools to help you
              live boldly, serve purposefully, and pursue excellence.
            </Text>
          </OneColumnGrid>
        </Section>
      </Hero>

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
                    href={`/${project.slug.current}`}
                    tags={
                      project.categories?.map((category) => (
                        <Tag
                          key={category._id}
                          label={category.title}
                          icon={category.iconName ? <Icon name={category.iconName} size="sm" /> : undefined}
                          tooltipContent={category.description}
                        />
                      ))
                    }
                    className="aspect-square w-full"
                  />
                ))
              ) : (
                // Fallback if no projects are found
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
