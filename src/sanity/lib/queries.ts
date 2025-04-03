import { groq } from "next-sanity";
import { PortableTextBlock } from "@portabletext/react";
import { client } from "./client";

// Type definitions for Sanity content schemas

// Skill type definition
export interface SanitySkill {
  _id: string;
  title: string;
  description?: string; // Optional description field
}

// Category with related skills
export interface SanityCategoryWithSkills {
  _id: string;
  title: string;
  skills: SanitySkill[];
}

// Project type definition from Sanity schema
export interface SanityProject {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  headline: string;
  heroImage: {
    asset: {
      _ref: string;
    };
  };
  categories: {
    _id: string;
    title: string;
  }[];
  skills: {
    _id: string;
    title: string;
  }[];
  githubRepo?: {
    showButton: boolean;
    url: string;
  };
  prototype?: {
    showButton: boolean;
    url: string;
    buttonText: string;
  };
  projectImages?: {
    asset: {
      _ref: string;
    };
    alt?: string;
    title?: string;
    headline?: string;
  }[];
  additionalImages?: {
    asset: {
      _ref: string;
    };
    alt?: string;
    title?: string;
    headline?: string;
  }[];
  date?: string;
  /**
   * Rich text content from Sanity as Portable Text blocks
   */
  content?: PortableTextBlock[];
}

// GROQ queries for fetching data from Sanity

// Query to fetch all categories with their related skills
const categoriesWithSkillsQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "skills": *[_type == "skill" && references(^._id)] | order(title asc) {
      _id,
      title,
      description
    }
  }
`;

// Query to fetch all projects ordered by date
const projectsQuery = groq`
  *[_type == "project"] | order(date desc) {
    _id,
    title,
    slug,
    headline,
    heroImage,
    categories[]->{ _id, title },
    skills[]->{ _id, title },
    githubRepo,
    prototype,
    projectImages,
    additionalImages,
    date
  }
`;

// Query to fetch a specific project by its slug
const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    headline,
    heroImage,
    categories[]->{ _id, title },
    skills[]->{ _id, title },
    githubRepo,
    prototype,
    projectImages,
    additionalImages,
    date,
    content
  }
`;

// Helper functions to fetch data from Sanity

/**
 * Fetches all skill categories with their related skills
 */
export async function getCategoriesWithSkills(): Promise<SanityCategoryWithSkills[]> {
  return await client.fetch<SanityCategoryWithSkills[]>(categoriesWithSkillsQuery);
}

/**
 * Fetches all projects ordered by date (newest first)
 */
export async function getAllProjects(): Promise<SanityProject[]> {
  return await client.fetch<SanityProject[]>(projectsQuery);
}

/**
 * Fetches a specific project by its slug
 */
export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return await client.fetch<SanityProject | null>(projectBySlugQuery, { slug });
}
