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
  slug?: { current: string }; // Use slug instead of iconName
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
  // Disable CDN to ensure fresh data
  const client = createClient({ 
    apiVersion, 
    dataset, 
    projectId, 
    useCdn: false // Disable CDN to get latest content
  });

  // Remove the [0...6] limit to fetch all projects
  const query = `*[_type == "project"] | order(date desc) {
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
      slug
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
  // Fetch all projects but we'll implement client-side lazy loading
  const allProjects = await getProjects();

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
        <ProjectsGrid initialProjects={allProjects} />
      </Content>
    </>
  );
}

// Client-side component for lazy loading projects
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

function ProjectsGrid({ initialProjects }: { initialProjects: Project[] }) {
  // Initial batch size - show this many projects at first
  const INITIAL_BATCH_SIZE = 6;
  // How many more to load each time
  const LOAD_MORE_BATCH_SIZE = 6;
  
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [projectsToShow, setProjectsToShow] = useState(INITIAL_BATCH_SIZE);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  
  // Reference for the observer target element
  const observerTarget = useRef<HTMLDivElement>(null);
  
  // Initialize with the first batch of projects
  useEffect(() => {
    setVisibleProjects(initialProjects.slice(0, projectsToShow));
    setAllLoaded(projectsToShow >= initialProjects.length);
  }, [initialProjects, projectsToShow]);
  
  // Load more projects when scrolling to the observer target
  const loadMoreProjects = useCallback(() => {
    if (loading || allLoaded) return;
    
    setLoading(true);
    
    // Simulate a small delay to prevent rapid loading
    setTimeout(() => {
      const nextBatch = Math.min(projectsToShow + LOAD_MORE_BATCH_SIZE, initialProjects.length);
      setProjectsToShow(nextBatch);
      setLoading(false);
      setAllLoaded(nextBatch >= initialProjects.length);
    }, 300);
  }, [loading, allLoaded, projectsToShow, initialProjects.length, LOAD_MORE_BATCH_SIZE]);
  
  // Set up the intersection observer
  useEffect(() => {
    if (!observerTarget.current || allLoaded) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProjects();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the target is visible
    );
    
    observer.observe(observerTarget.current);
    
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMoreProjects, allLoaded]);
  
  return (
    <>
      <AutoGrid gap={8}>
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project) => (
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
                    category.slug?.current ? (
                      <Icon name={category.slug.current} size="sm" />
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
      
      {/* Loading indicator and observer target */}
      {!allLoaded && (
        <div ref={observerTarget} className="flex justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            <Text variant="body" className="text-muted-foreground">
              Loading more projects...
            </Text>
          </div>
        </div>
      )}
    </>
  );
}
