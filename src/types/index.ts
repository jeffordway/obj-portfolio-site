/**
 * Type definitions for the portfolio site
 */

// Base Sanity document type
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Category type
export interface Category extends SanityDocument {
  _type: 'category';
  title: string;
  slug: {
    current: string;
  };
}

// Skill type
export interface Skill extends SanityDocument {
  _type: 'skill';
  title: string;
  slug: {
    current: string;
  };
  description: string;
  category: {
    _type: 'reference';
    _ref: string;
  };
}

// Skill with expanded category reference
export interface SkillWithCategory extends Omit<Skill, 'category'> {
  category: Category;
}

// Project type
export interface Project extends SanityDocument {
  _type: 'project';
  title: string;
  slug: {
    current: string;
  };
  headline: string;
  skills: SkillWithCategory[];
  categories?: Category[];
  // Add other project fields as needed
}
