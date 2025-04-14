/**
 * Sanity CRUD operations
 * 
 * This file contains all the query functions for fetching data from Sanity.
 * Following Sanity's best practices for organizing queries and revalidation tags.
 */
import { sanityFetch } from '@/lib/sanity';
import { type PortableTextBlock } from '@portabletext/types';
import { type SanityImageObject } from '@sanity/image-url/lib/types/types';

// --- Type Definitions ---

export interface Category {
  _id: string;
  title: string;
  description?: string;
  slug?: { current: string };
}

// Base type for Sanity images with required asset reference
export interface SanityImageRef extends SanityImageObject {
  asset: {
    _ref: string;
    _type: string;
  };
}

// Specific type for images used in the project
export interface ProjectImage extends SanityImageRef {
  alt?: string;
  title?: string;
  headline?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  headline?: string;
  heroImage?: ProjectImage;
  mainImage?: ProjectImage;
  content?: PortableTextBlock[];
  githubRepo?: { showButton?: boolean; url?: string };
  prototype?: { showButton?: boolean; url?: string; buttonText?: string };
  skills?: {
    _id: string;
    title: string;
    description?: string;
    category: {
      _id: string;
      title: string;
    };
  }[];
  projectImages?: ProjectImage[];
  additionalImages?: ProjectImage[];
  date?: string;
  categories?: Category[];
}

export interface Skill {
  _id: string;
  title: string;
  description?: string;
  slug?: { current: string };
  category: {
    _id: string;
    title: string;
    slug?: { current: string };
  };
}

export interface AboutPageData {
  _id: string;
  title: string;
  headline: string;
  aboutContent: PortableTextBlock[];
  bentoItems: any[]; // Define a more specific type if needed
}

// --- Revalidation Tag Constants ---
// Using constants ensures consistency across the application

export const TAGS = {
  // Collection tags
  PROJECTS: 'project',
  PROJECTS_COLLECTION: 'projects-collection',
  CATEGORIES: 'category',
  CATEGORIES_COLLECTION: 'categories-collection',
  SKILLS: 'skill',
  SKILLS_COLLECTION: 'skills-collection',
  ABOUT_PAGE: 'aboutPage',
  CONTENT: 'content',
  
  // Helper function to get a specific content tag
  specificContent: (type: string, slug: string) => `${type}-${slug}`
};

// --- Query Functions ---

/**
 * Fetch all projects
 * @returns Array of projects
 */
export async function getProjects(): Promise<Project[]> {
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
    return await sanityFetch<Project[]>({
      query,
      tags: [TAGS.PROJECTS, TAGS.PROJECTS_COLLECTION, TAGS.CONTENT]
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

/**
 * Fetch a single project by slug
 * @param slug The project slug
 * @returns The project or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
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
      slug,
      "category": category->{
        _id,
        title,
        slug
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
    "date": publishedAt,
    "categories": categories[]->{ 
      _id,
      title,
      description,
      slug
    }
  }`;

  try {
    return await sanityFetch<Project | null>({
      query,
      params: { slug },
      tags: [
        TAGS.PROJECTS, 
        TAGS.specificContent(TAGS.PROJECTS, slug),
        TAGS.CONTENT
      ]
    });
  } catch (error) {
    console.error(`Failed to fetch project with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all skills with their categories
 * @returns Array of skills
 */
export async function getSkills(): Promise<Skill[]> {
  const query = `*[_type == "skill"]{
    _id,
    title,
    description,
    slug,
    "category": category->{ 
      _id,
      title,
      slug
    }
  } | order(category.title asc, title asc)`;

  try {
    return await sanityFetch<Skill[]>({
      query,
      tags: [
        TAGS.SKILLS, 
        TAGS.SKILLS_COLLECTION, 
        TAGS.CATEGORIES, 
        TAGS.CATEGORIES_COLLECTION, 
        TAGS.CONTENT
      ]
    });
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
}

/**
 * Fetch the about page data
 * @returns The about page data or null if not found
 */
export async function getAboutPageData(): Promise<AboutPageData | null> {
  const query = `*[_type == "aboutPage"][0]{
    _id,
    title,
    headline,
    aboutContent,
    "bentoItems": bentoGridItems[]->{
      _id,
      title,
      description,
      imageUrl,
      imageAlt,
      href,
      className,
      imagePriority
    }
  }`;

  try {
    return await sanityFetch<AboutPageData>({
      query,
      tags: [TAGS.ABOUT_PAGE, TAGS.CONTENT]
    });
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return null;
  }
}
