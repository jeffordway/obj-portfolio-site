/**
 * SkillsDisplay Component
 *
 * Responsible for rendering a list of skills grouped by category.
 * Assumes data fetching happens externally and receives the data via props.
 *
 * @prop {ProjectSkill[]} skills - An array of skills, each containing category info.
 */
import React from "react";
import { Text } from "@/components/ui/typography/Text";
import { Tag } from "@/components/ui/tag/Tag";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";

// --- Data Types (Assuming structure from Sanity) ---

interface SkillCategory {
  _id: string;
  title: string;
}

interface ProjectSkill {
  _id: string;
  title: string;
  description?: string; // Optional description for the tooltip
  category: SkillCategory; // Each skill includes its category
}

// --- Component Props ---

interface SkillsDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of skills (each with category info) to display */
  skills?: ProjectSkill[];
  /** Optional custom gap between categories */
  gap?: number;
}

// Type for the internally grouped structure
type GroupedSkills = {
  [categoryTitle: string]: ProjectSkill[];
};

// --- Component ---

export const SkillsDisplay = ({
  skills,
  gap = 8,
  className,
  ...props
}: SkillsDisplayProps) => {
  // Handle loading or no data state
  if (!skills || skills.length === 0) {
    return (
      <Text variant="body-sm" className="italic">
        No skills listed for this project.
      </Text>
    );
  }

  // Group skills by category title
  const groupedSkills = skills.reduce<GroupedSkills>((acc, skill) => {
    const categoryTitle = skill.category?.title || "Uncategorized"; // Handle potential missing category
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = [];
    }
    acc[categoryTitle].push(skill);
    return acc;
  }, {});

  // Get sorted category titles
  const categoryTitles = Object.keys(groupedSkills).sort();

  return (
    // Use OneColumnGrid for consistent vertical spacing between categories
    <OneColumnGrid gap={gap} className={className} {...props}>
      {categoryTitles.map((categoryTitle) => (
        // Use OneColumnGrid for layout within each category
        <OneColumnGrid key={categoryTitle} gap={2}>
          {/* Category Title */}
          <Text variant="heading" className="pb-2">
            {categoryTitle}
          </Text>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-3">
            {groupedSkills[categoryTitle].map((skill) => (
              <Tag
                key={skill._id}
                label={skill.title}
                tooltipContent={skill.description}
              />
            ))}
          </div>
        </OneColumnGrid>
      ))}
    </OneColumnGrid>
  );
};

SkillsDisplay.displayName = "SkillsDisplay";
