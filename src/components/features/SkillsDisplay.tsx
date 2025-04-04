/**
 * SkillsDisplay Component
 *
 * Responsible for rendering a list of skills grouped by category.
 * Assumes data fetching happens externally and receives the data via props.
 *
 * @prop {SkillCategory[]} categoriesWithSkills - An array of skill categories, each containing skills.
 */
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Tag } from "@/components/ui/tag/Tag";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Icon } from "@/components/ui/icon/Icon";

// --- Data Types (Assuming structure from Sanity) ---

interface Skill {
  _id: string;
  title: string;
  description?: string; // Optional description for the tooltip
}

interface SkillCategory {
  _id: string;
  title: string;
  iconName?: string; // Icon name from Sanity
  skills?: Skill[]; // Skills array might be optional or empty
}

// --- Component Props ---

interface SkillsDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of skill categories to display */
  categories?: SkillCategory[];
  /** Optional custom gap between categories */
  gap?: number;
}

// --- Component ---

export const SkillsDisplay = ({
  categories,
  gap = 8,
  className,
  ...props
}: SkillsDisplayProps) => {
  // Handle loading or no data state
  if (!categories || categories.length === 0) {
    return (
      <Text variant="body-sm" className="italic">
        No skill categories found.
      </Text>
    );
  }

  return (
    // Use OneColumnGrid for consistent vertical spacing between categories
    <OneColumnGrid gap={gap} className={className} {...props}>
      {categories.map((category) => (
        // Use OneColumnGrid for layout within each category
        <OneColumnGrid key={category._id} gap={2} className="pb-2">
          {/* Category Title with Icon */}
          <div className="flex items-center gap-2">
            <Text variant="heading">{category.title}</Text>
          </div>

          {/* Skills Grid */}
          {category.skills?.length ? (
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

SkillsDisplay.displayName = "SkillsDisplay";
