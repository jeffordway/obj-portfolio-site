/**
 * Custom hook for deriving categories from skills in projects
 * This follows the DRY principle by automatically extracting categories
 */

import { useMemo } from 'react';
import { Project, Skill, Category } from '@/lib/sanity/queries';
import { deriveCategories } from '@/lib/utils/deriveCategories';

/**
 * Hook that enhances a project by deriving its categories from its skills
 * @param project The project to enhance with derived categories
 * @returns The enhanced project with derived categories
 */
export function useProjectWithDerivedCategories(project: Project | null): Project | null {
  return useMemo(() => {
    if (!project) return null;
    
    // If the project has skills but no categories, derive the categories from skills
    if (project.skills && (!project.categories || project.categories.length === 0)) {
      return {
        ...project,
        categories: deriveCategories(project.skills)
      };
    }
    
    // If the project already has categories, return it as is
    return project;
  }, [project]);
}

/**
 * Hook that enhances multiple projects by deriving their categories from their skills
 * @param projects Array of projects to enhance with derived categories
 * @returns Array of enhanced projects with derived categories
 */
export function useProjectsWithDerivedCategories(projects: Project[]): Project[] {
  return useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    return projects.map(project => {
      // If the project has skills but no categories, derive the categories from skills
      if (project.skills && (!project.categories || project.categories.length === 0)) {
        return {
          ...project,
          categories: deriveCategories(project.skills)
        };
      }
      
      // If the project already has categories, return it as is
      return project;
    });
  }, [projects]);
}
