/**
 * SkillsDisplay Component
 *
 * Responsible for rendering a list of skills grouped by category.
 * Assumes data fetching happens externally and receives the data via props.
 *
 * @prop {SkillCategory[]} categoriesWithSkills - An array of skill categories, each containing skills.
 */
import React from 'react';
import { Text } from '@/components/ui/typography/Text';
import { Tag } from '@/components/ui/tag/Tag';
import { OneColumnGrid } from '@/components/ui/grid/OneColumnGrid';

// --- Data Types (Assuming structure from Sanity) ---

interface Skill {
  _id: string;
  title: string;
  description?: string; // Optional description for the tooltip
}

interface SkillCategory {
  _id: string;
  title: string;
  skills?: Skill[]; // Skills array might be optional or empty
}

// --- Component Props ---

interface SkillsDisplayProps {
  categoriesWithSkills?: SkillCategory[]; // Make the array optional to handle loading/error states upstream
}

// --- Component ---

export const SkillsDisplay = ({ categoriesWithSkills }: SkillsDisplayProps) => {
  // Handle loading or no data state
  if (!categoriesWithSkills || categoriesWithSkills.length === 0) {
    return (
      <Text variant="body-sm" className="italic">
        No skill categories found.
      </Text>
    );
  }

  return (
    // Use OneColumnGrid for consistent vertical spacing between categories
    <OneColumnGrid gap={8}>
      {categoriesWithSkills.map((category) => (
        // Use OneColumnGrid for layout within each category
        <OneColumnGrid key={category._id} gap={2} className="pb-2">
          {/* Category Title - Removed mb-4 */}
          <Text variant="heading">
            {category.title}
          </Text>

          {/* Skills Grid */}
          {category.skills && category.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2"> 
              {category.skills.map((skill) => (
                <Tag
                  key={skill._id}
                  label={skill.title}
                  tooltipContent={skill.description}
                />
              ))}
            </div>
          ) : (
            // Message if a category has no skills
            <Text variant="body-sm" className="italic">
              No skills listed for this category.
            </Text>
          )}
        </OneColumnGrid>
      ))}
    </OneColumnGrid>
  );
};

SkillsDisplay.displayName = 'SkillsDisplay';
