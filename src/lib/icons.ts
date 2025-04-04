// No React import needed
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
} from '@remixicon/react';

// Import the type from @remixicon/react
import type { RemixiconComponentType } from '@remixicon/react';

// Define a type for the icon components
export type RemixIconType = RemixiconComponentType;

/**
 * Maps icon names from Sanity to their corresponding Remix icon components
 */
export const iconMap: Record<string, RemixIconType | undefined> = {
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
};

/**
 * Gets the icon component based on the icon name from Sanity
 * @param name The icon name from Sanity
 * @returns The corresponding Remix icon component or undefined if not found
 */
export function getIconComponent(name?: string): RemixIconType | undefined {
  if (!name) return undefined;
  return iconMap[name];
}
