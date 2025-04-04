import * as React from 'react';
import { Card } from '@/components/ui/card/Card';
import ProjectGrid from '@/components/ui/grid/ProjectGrid';
import { StaticImageData } from 'next/image';

// Define the structure for project items
export interface ProjectItem {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  imageAlt: string;
  href?: string;
  tags?: string[];
  imagePriority?: boolean;
}

interface ProjectListProps {
  projects: ProjectItem[];
  className?: string;
}

/**
 * ProjectList component for displaying a grid of project cards.
 * Uses the ProjectGrid component to create a responsive two-column layout.
 */
export const ProjectList: React.FC<ProjectListProps> = ({ 
  projects,
  className 
}) => {
  return (
    <ProjectGrid className={className} gap="lg">
      {projects.map((project) => (
        <Card
          key={project.id}
          title={project.title}
          description={project.description}
          imageUrl={project.imageUrl}
          imageAlt={project.imageAlt}
          href={project.href}
          tags={project.tags}
          imagePriority={project.imagePriority}
          className="h-full"
        />
      ))}
    </ProjectGrid>
  );
};

export default ProjectList;
