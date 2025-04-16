import React from "react";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, type Project, type ProjectImage } from "@/lib/sanity/queries";
import { HeroBackground } from "@/components/layouts/HeroBackground";
import { HeroContent } from "@/components/layouts/HeroContent";
import { Section } from "@/components/layouts/Section";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { TwoColumnGrid } from "@/components/ui/grid/TwoColumnGrid";
import { Text } from "@/components/ui/typography/Text";
import { Content } from "@/components/layouts/Content";
import { Button } from "@/components/ui/button/Button";
import { ExternalLink } from "@/components/ui/links/ExternalLink";
import { RiGithubFill, RiExternalLinkLine } from "@remixicon/react";
import { Card } from "@/components/ui/card/Card";
import { SkillsDisplay } from "@/components/features/SkillsDisplay";
import { PortableText } from "@/components/ui/typography/PortableTextRenderer";
import { siteConfig } from "@/lib/site";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageObject } from "@sanity/image-url/lib/types/types";

// Types are now imported from @/lib/sanity/queries

// Define Props type matching the documentation example (params/searchParams as Promises)
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// --- Metadata Generation ---

// Apply the Props type and use await for params
export async function generateMetadata({
  params,
  // searchParams // Include if needed later
}: Props): Promise<Metadata> {
  const { slug } = await params; // Await params here

  try {
    // Use the centralized getProjectBySlug function for metadata
    const project = await getProjectBySlug(slug);

    if (!project) {
      notFound(); // Trigger 404 if project not found
    }

    return {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.headline ?? siteConfig.description,
      openGraph: {
        title: `${project.title} | ${siteConfig.name}`,
        description: project.headline ?? siteConfig.description,
        type: "article",
        // Consider adding an openGraph image if available
      },
    };
  } catch (error) {
    console.error(
      `Error generating metadata for project slug "${slug}":`,
      error
    );
    notFound(); // Trigger 404 on fetch error
  }
}

// --- Page Component ---

// Apply the Props type (params is already awaited inside)
// Enable revalidation every 60 seconds as a fallback
export const revalidate = 60;

export default async function ProjectPage({
  params /*, searchParams */,
}: Props) {
  // Await the promise to get the actual slug value
  const { slug } = await params;

  // Use the centralized getProjectBySlug function
  const project = await getProjectBySlug(slug);

  // If project data is null or undefined, trigger 404
  if (!project) {
    notFound();
  }

  // Determine the background image source, preferring heroImage
  // Pass the full Sanity image object directly
  const backgroundImageSource = project.heroImage || project.mainImage;

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <HeroBackground
          // Use a conditional check to ensure displayImage is valid before passing
          imageSrc={backgroundImageSource}
          imageAlt={project.title}
        />
        <HeroContent className="flex flex-col items-center justify-center text-center">
          <Section maxWidth="container">
            <OneColumnGrid gap={4} alignItems="center" justifyContent="center">
              <Text variant="title">{project.title}</Text>
              <Text variant="subtitle" align="center">
                {project.headline}
              </Text>

              {/* Project Links */}
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {project.prototype?.showButton && project.prototype?.url && (
                  <ExternalLink
                    href={project.prototype.url}
                    ariaLabel={`View ${project.prototype.buttonText || "prototype"}`}
                    className="inline-block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      iconLeft={<RiExternalLinkLine />}
                    >
                      {project.prototype.buttonText || "View Prototype"}
                    </Button>
                  </ExternalLink>
                )}
                {project.githubRepo?.showButton && project.githubRepo?.url && (
                  <ExternalLink
                    href={project.githubRepo.url}
                    ariaLabel="View project on GitHub"
                    className="inline-block"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      iconLeft={<RiGithubFill />}
                    >
                      View on GitHub
                    </Button>
                  </ExternalLink>
                )}
              </div>
            </OneColumnGrid>
          </Section>
        </HeroContent>
      </div>

      {/* Main Content Area */}
      <Content>
        <Section maxWidth="container">
          <TwoColumnGrid firstColSpan={3} gap={8}>
            {/* Left Column: Skills */}
            <div className="sticky top-24 h-fit">
              {" "}
              {/* Make skills sticky */}
              <OneColumnGrid gap={4}>
                <Text variant="title">Technical Skills</Text>
                {project.skills && project.skills.length > 0 ? (
                  <SkillsDisplay skills={project.skills} />
                ) : (
                  <Text>No specific skills listed for this project.</Text>
                )}
              </OneColumnGrid>
            </div>

            {/* Right Column: Content and Images */}
            <OneColumnGrid gap={8}>
              {/* Project Content */}
              {project.content && project.content.length > 0 ? (
                <PortableText value={project.content} />
              ) : (
                <Text>No detailed content available for this project.</Text>
              )}

              {/* Project Images */}
              {project.projectImages && project.projectImages.length > 0 && (
                <OneColumnGrid gap={4}>
                  {project.projectImages.map((image: ProjectImage, index: number) => (
                    <Card
                      key={`${project._id}-projimg-${index}`}
                      imageUrl={urlFor(image).width(1200).quality(80).url()}
                      imageAlt={image.alt || `Project image ${index + 1}`}
                      title={image.title}
                      description={image.headline}
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className="w-full aspect-video"
                      hoverEffect={true}
                    />
                  ))}
                </OneColumnGrid>
              )}

              {/* Additional Images (Grid) */}
              {project.additionalImages &&
                project.additionalImages.length > 0 && (
                  <OneColumnGrid gap={4}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {project.additionalImages.map((image: ProjectImage, index: number) => (
                        <Card
                          key={`${project._id}-addimg-${index}`}
                          imageUrl={urlFor(image)
                            .width(800)
                            .height(800)
                            .quality(80)
                            .url()}
                          imageAlt={
                            image.alt || `Additional image ${index + 1}`
                          }
                          title={image.title}
                          description={image.headline}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full aspect-square"
                          hoverEffect={true}
                        />
                      ))}
                    </div>
                  </OneColumnGrid>
                )}
            </OneColumnGrid>
          </TwoColumnGrid>
        </Section>
      </Content>
    </>
  );
}
