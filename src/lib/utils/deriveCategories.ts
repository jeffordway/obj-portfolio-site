/**
 * Utility function to derive unique categories from a list of skills
 * This follows the DRY principle by avoiding manual category selection
 */

import { Skill, Category } from '@/lib/sanity/queries';

/**
 * Extracts unique categories from an array of skills
 * @param skills Array of skills with their associated categories
 * @returns Array of unique categories
 */
export function deriveCategories(skills: Skill[]): Category[] {
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return [];
  }

  // Create a map to track unique categories by ID
  const categoryMap = new Map<string, Category>();
  
  // Extract categories from skills and add to map
  skills.forEach(skill => {
    if (skill.category && skill.category._id) {
      categoryMap.set(skill.category._id, skill.category);
    }
  });
  
  // Convert map values to array
  return Array.from(categoryMap.values());
}
