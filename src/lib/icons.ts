/**
 * Icons library for the application
 * Uses Remix icons from @remixicon/react
 */
import {
  // Analytics & Collaboration icons
  RiLineChartLine,
  RiTeamLine,
  RiChat3Line,
  RiPresentationLine,
  
  // Product Management icons
  RiProductHuntLine,
  RiTaskLine,
  RiCalendarLine,
  RiRoadMapLine,
  
  // Software Development icons
  RiCodeSSlashFill,
  RiTerminalBoxLine,
  RiGitBranchLine,
  RiDatabase2Fill,
  
  // UI/UX Design icons
  RiPencilRuler2Line,
  RiPaletteLine,
  RiLayoutLine,
  RiUserLine,
  
  // Social Media icons
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
} from '@remixicon/react';

// Import the type from @remixicon/react
import type { RemixiconComponentType } from '@remixicon/react';

// Define a type for the icon components
export type RemixIconType = RemixiconComponentType;

/**
 * Type for supported icon names
 * This helps with type safety when referencing icons by name
 */
export type IconName = 
  // Skill icons
  | 'RiLineChartLine' | 'RiTeamLine' | 'RiChat3Line' | 'RiPresentationLine'
  | 'RiProductHuntLine' | 'RiTaskLine' | 'RiCalendarLine' | 'RiRoadMapLine'
  | 'RiCodeSSlashFill' | 'RiTerminalBoxLine' | 'RiGitBranchLine' | 'RiDatabase2Fill'
  | 'RiPencilRuler2Line' | 'RiPaletteLine' | 'RiLayoutLine' | 'RiUserLine'
  // Social media icons
  | 'github' | 'linkedin' | 'X' | 'twitter';

/**
 * Maps icon names to their corresponding Remix icon components
 */
export const iconMap: Record<IconName, RemixIconType> = {
  // Analytics & Collaboration icons
  'RiLineChartLine': RiLineChartLine,
  'RiTeamLine': RiTeamLine,
  'RiChat3Line': RiChat3Line,
  'RiPresentationLine': RiPresentationLine,
  
  // Product Management icons
  'RiProductHuntLine': RiProductHuntLine,
  'RiTaskLine': RiTaskLine,
  'RiCalendarLine': RiCalendarLine,
  'RiRoadMapLine': RiRoadMapLine,
  
  // Software Development icons
  'RiCodeSSlashFill': RiCodeSSlashFill,
  'RiTerminalBoxLine': RiTerminalBoxLine,
  'RiGitBranchLine': RiGitBranchLine,
  'RiDatabase2Fill': RiDatabase2Fill,
  
  // UI/UX Design icons
  'RiPencilRuler2Line': RiPencilRuler2Line,
  'RiPaletteLine': RiPaletteLine,
  'RiLayoutLine': RiLayoutLine,
  'RiUserLine': RiUserLine,
  
  // Social Media icons
  'github': RiGithubFill,
  'linkedin': RiLinkedinBoxFill,
  'X': RiTwitterXFill,
  'twitter': RiTwitterXFill, // Alias for backward compatibility
};

/**
 * Gets the icon component based on the icon name
 * @param name The icon name from our IconName type
 * @returns The corresponding Remix icon component or undefined if not found
 */
export function getIconComponent(name?: string): RemixIconType | undefined {
  if (!name) return undefined;
  // Type guard to ensure name is a valid IconName
  return (Object.keys(iconMap) as IconName[]).includes(name as IconName) 
    ? iconMap[name as IconName] 
    : undefined;
}
