import React from "react";
import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

// --- TypeScript Interfaces for Sanity Data ---

// Base type for Sanity images with required asset reference
interface SanityImageRef extends SanityImageObject {
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// Specific type for images used in the project, extending the base
interface ProjectImage extends SanityImageRef {
  alt?: string;
  title?: string;
  headline?: string;
}

interface SkillCategory {
  _id: string;
  title: string;
}

interface ProjectSkill {
  _id: string;
  title: string;
  description?: string;
  category: SkillCategory;
}

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  headline?: string;
  heroImage?: ProjectImage; // Optional hero image
  mainImage?: ProjectImage; // Optional main image (fallback)
  content?: PortableTextBlock[];
  githubRepo?: string;
  prototype?: { url?: string; buttonText?: string };
  skills?: ProjectSkill[];
  projectImages?: ProjectImage[];
  additionalImages?: ProjectImage[];
  date?: string; // Note: mapped from publishedAt in query, but not used in JSX
}

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
  const client = createClient({ apiVersion, dataset, projectId, useCdn });

  try {
    const project = await client.fetch<{
      title: string;
      headline?: string;
    } | null>(
      groq`*[_type == "project" && slug.current == $slug][0]{ title, headline }`,
      { slug }
    );

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
export default async function ProjectPage({
  params /*, searchParams */,
}: Props) {
  // Await the promise to get the actual slug value
  const { slug } = await params;
  const client = createClient({ apiVersion, dataset, projectId, useCdn });

  // Fetch full project data
  const projectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    headline,
    heroImage { 
      ..., 
      asset->{
        _id,
        _ref, 
        _type,
        url
      }
    },
    mainImage { 
      ..., 
      asset->{
        _id,
        _ref, 
        _type,
        url
      }
    },
    content,
    githubRepo,
    prototype,
    "skills": skills[]->{
      _id,
      title,
      description,
      "category": category->{
        _id,
        title
      }
    },
    projectImages[] { 
      ..., 
      asset->{
        _id,
        _ref, 
        _type,
        url
      }
    },
    additionalImages[] { 
      ..., 
      asset->{
        _id,
        _ref, 
        _type,
        url
      }
    },
    "date": publishedAt // Use publishedAt for date if available
  }`;

  const project = await client.fetch<Project | null>(projectQuery, { slug });

  // If project data is null or undefined, trigger 404
  if (!project) {
    notFound();
  }

  // Helper function to check if an image has a valid asset reference
  const hasValidAssetRef = (image: ProjectImage | undefined | null): image is ProjectImage & { asset: { _ref: string } } => {
    const isValid = !!image?.asset?._ref;
    if (!isValid && image) {
      console.log('Invalid image asset:', JSON.stringify(image));
    }
    return isValid;
  };

  // Determine the background image source, preferring heroImage
  // Pass the full Sanity image object instead of just the URL
  const backgroundImageSource = hasValidAssetRef(project.heroImage)
    ? project.heroImage // Use validated heroImage object
    : hasValidAssetRef(project.mainImage)
    ? project.mainImage // Use validated mainImage object
    : undefined;

  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <HeroBackground
          // Use a conditional check to ensure displayImage is valid before passing
          imageSrc={backgroundImageSource}
          imageAlt={project.title}
        />
        <HeroContent>
          <Section>
            <OneColumnGrid className="items-center text-center">
              <Text variant="title">{project.title}</Text>
              <Text variant="subtitle" align="center">
                {project.headline}
              </Text>

              {/* Project Links */}
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {project.prototype?.url && (
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
                {project.githubRepo && (
                  <ExternalLink
                    href={project.githubRepo}
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
                <Text variant="title">Skills Used</Text>
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
                  {project.projectImages.map((image, index) =>
                    hasValidAssetRef(image) ? ( // Check for valid asset ref
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
                    ) : null // Don't render Card if asset ref is invalid
                  )}
                </OneColumnGrid>
              )}

              {/* Additional Images (Grid) */}
              {project.additionalImages &&
                project.additionalImages.length > 0 && (
                  <OneColumnGrid gap={4}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {project.additionalImages.map((image, index) =>
                        hasValidAssetRef(image) ? ( // Check for valid asset ref
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
                        ) : null // Don't render Card if asset ref is invalid
                      )}
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
