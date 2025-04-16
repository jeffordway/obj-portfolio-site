/**
 * Utility function to derive unique categories from a list of skills
 * This follows the DRY principle by avoiding manual category selection
 * and implements Sanity best practices for handling references
 */

import { Skill, Category } from '@/lib/sanity/queries';

/**
 * Extracts unique categories from an array of skills
 * @param skills Array of skills with their associated categories
 * @returns Array of unique categories sorted by title
 */
export function deriveCategories(skills: Skill[]): Category[] {
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return [];
  }

  // Create a map to track unique categories by ID
  const categoryMap = new Map<string, Category>();
  
  // Extract categories from skills and add to map
  skills.forEach(skill => {
    // Ensure the skill has a valid category reference
    if (skill?.category && typeof skill.category === 'object' && skill.category._id) {
      // Store the complete category object with all its properties
      // Only include properties that exist in the Category interface
      const category: Category = {
        _id: skill.category._id,
        title: skill.category.title || ''
      };
      
      // Add optional properties if they exist
      if ('description' in skill.category && typeof skill.category.description === 'string') {
        category.description = skill.category.description;
      }
      
      if ('slug' in skill.category && skill.category.slug && typeof skill.category.slug === 'object') {
        category.slug = skill.category.slug;
      }
      
      categoryMap.set(skill.category._id, category);
    }
  });
  
  // Convert map values to array and sort by title for consistent display
  return Array.from(categoryMap.values())
    .sort((a, b) => a.title.localeCompare(b.title));
}
