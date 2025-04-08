import { Card } from "@/components/ui/card/Card";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";
import { urlFor } from "@/sanity/lib/image";

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

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard component for displaying project information
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
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
  );
}
