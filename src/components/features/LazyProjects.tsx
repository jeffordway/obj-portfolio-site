'use client';

import { useState, useEffect } from 'react';
import { AutoGrid } from '@/components/ui/grid/AutoGrid';
import { Card } from '@/components/ui/card/Card';
import { Tag } from '@/components/ui/tag/Tag';
import { Icon } from '@/components/ui/icon/Icon';
import { Text } from '@/components/ui/typography/Text';
import { urlFor } from '@/sanity/lib/image';

// Import the Project and Category interfaces
interface Category {
  _id: string;
  title: string;
  description?: string;
  slug?: { current: string };
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

export function LazyProjects({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Load more projects when user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        // Load 6 more projects when user is near the bottom
        setVisibleCount(prev => Math.min(prev + 6, projects.length));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);
  
  // Only show the first 'visibleCount' projects
  const visibleProjects = projects.slice(0, visibleCount);
  
  return (
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
  );
}
