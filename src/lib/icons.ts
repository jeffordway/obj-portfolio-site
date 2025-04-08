/**
 * Icons library for the application
 * Uses Remix icons from @remixicon/react
 */
import {
  // Category icons
  RiLineChartLine,
  RiProductHuntLine,
  RiCodeSSlashFill,
  RiPaletteLine,
  
  // Analytics & Collaboration icons
  RiChat3Line,
  RiCodeBoxLine,
  RiCodeLine,
  RiBarChartBoxLine,
  
  // Product Management icons
  RiTeamLine,
  RiTaskLine,
  RiRoadMapLine,
  RiUserLine,
  
  // Software Development icons
  RiReactjsLine,
  RiDatabase2Line,
  RiTerminalBoxLine,
  RiGitBranchLine,
  RiCss3Line,
  RiJavascriptLine,
  RiHtml5Line,
  RiSmartphoneLine,
  
  // UI/UX Design icons
  RiPaintBrushLine,
  RiLayoutLine,
  RiFlowChart,
  RiPencilRuler2Line,
  RiImageLine,
  
  // Legacy icons (for backward compatibility)
  RiPresentationLine,
  RiCalendarLine,
  RiDatabase2Fill,
  
  // Social Media icons
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
  RiFacebookBoxFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiTwitchFill,
  RiDiscordFill,
  RiMediumFill,
  RiStackOverflowLine,
  RiDribbbleLine,
  RiBehanceLine,
  RiPinterestLine,
  RiTrelloLine,
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
  // Category names
  | 'product-management'
  | 'software-development'
  | 'uiux-design'
  | 'analytics-collaboration'
  
  // Analytics & Collaboration Skills
  | 'constant-contact' | 'google-workspace' | 'microsoft-365' | 'active-net'
  | 'slack' | 'seo' | 'google-analytics' | 'mailchimp'
  
  // Product Management Skills
  | 'market-research' | 'user-stories' | 'stakeholder-management' | 'survey-monkey'
  | 'functional-leadership' | 'strategy' | 'product-roadmap' | 'scrum'
  | 'kanban' | 'agile' | 'okrs' | 'feature-prioritization'
  | 'product-lifecycle-management' | 'customer-engagement'
  
  // Software Development Skills
  | 'nextjs' | 'mongodb' | 'css' | 'ionic' | 'react' | 'react-native'
  | 'nodejs' | 'webflow' | 'javascript' | 'sql' | 'supabase' | 'expo'
  | 'html' | 'typescript' | 'git'
  
  // UI/UX Design Skills
  | 'journey-mapping' | 'adobe-illustrator' | 'user-research' | 'ab-testing'
  | 'prototyping' | 'usability-testing' | 'user-flows' | 'adobe-indesign'
  | 'design-systems' | 'wireframing' | 'adobe-photoshop' | 'accessibility'
  | 'user-interviews' | 'ux-writing' | 'adobe-xd' | 'figma' | 'user-surveys'
  
  // Legacy icon names (for backward compatibility)
  | 'RiLineChartLine' | 'RiTeamLine' | 'RiChat3Line' | 'RiPresentationLine'
  | 'RiProductHuntLine' | 'RiTaskLine' | 'RiCalendarLine' | 'RiRoadMapLine'
  | 'RiCodeSSlashFill' | 'RiTerminalBoxLine' | 'RiGitBranchLine' | 'RiDatabase2Fill'
  | 'RiPencilRuler2Line' | 'RiPaletteLine' | 'RiLayoutLine' | 'RiUserLine'
  
  // Social media icons
  | 'github' | 'linkedin' | 'X' | 'twitter' | 'facebook' | 'instagram'
  | 'youtube' | 'twitch' | 'discord' | 'medium' | 'stackoverflow'
  | 'dribbble' | 'behance' | 'pinterest' | 'trello';

/**
 * Maps icon names to their corresponding Remix icon components
 */
export const iconMap: Record<IconName, RemixIconType> = {
  // Category icons (slugified names)
  'product-management': RiProductHuntLine,
  'software-development': RiCodeSSlashFill,
  'uiux-design': RiPaletteLine,
  'analytics-collaboration': RiLineChartLine,
  
  // Analytics & Collaboration Skills
  'constant-contact': RiChat3Line,
  'google-workspace': RiCodeBoxLine,
  'microsoft-365': RiCodeLine,
  'active-net': RiLineChartLine,
  'slack': RiChat3Line,
  'seo': RiBarChartBoxLine,
  'google-analytics': RiBarChartBoxLine,
  'mailchimp': RiChat3Line,
  
  // Product Management Skills
  'market-research': RiBarChartBoxLine,
  'user-stories': RiUserLine,
  'stakeholder-management': RiTeamLine,
  'survey-monkey': RiChat3Line,
  'functional-leadership': RiUserLine,
  'strategy': RiRoadMapLine,
  'product-roadmap': RiRoadMapLine,
  'scrum': RiTeamLine,
  'kanban': RiLayoutLine,
  'agile': RiRoadMapLine,
  'okrs': RiTaskLine,
  'feature-prioritization': RiTaskLine,
  'product-lifecycle-management': RiRoadMapLine,
  'customer-engagement': RiUserLine,
  
  // Software Development Skills
  'nextjs': RiReactjsLine,
  'mongodb': RiDatabase2Line,
  'css': RiCss3Line,
  'ionic': RiCodeSSlashFill,
  'react': RiReactjsLine,
  'react-native': RiReactjsLine,
  'nodejs': RiTerminalBoxLine,
  'webflow': RiLayoutLine,
  'javascript': RiJavascriptLine,
  'sql': RiDatabase2Line,
  'supabase': RiDatabase2Line,
  'expo': RiSmartphoneLine,
  'html': RiHtml5Line,
  'typescript': RiCodeLine,
  'git': RiGitBranchLine,
  
  // UI/UX Design Skills
  'journey-mapping': RiRoadMapLine,
  'adobe-illustrator': RiPaintBrushLine,
  'user-research': RiUserLine,
  'ab-testing': RiLayoutLine,
  'prototyping': RiLayoutLine,
  'usability-testing': RiUserLine,
  'user-flows': RiFlowChart,
  'adobe-indesign': RiPaintBrushLine,
  'design-systems': RiPaletteLine,
  'wireframing': RiLayoutLine,
  'adobe-photoshop': RiImageLine,
  'accessibility': RiUserLine,
  'user-interviews': RiUserLine,
  'ux-writing': RiPencilRuler2Line,
  'adobe-xd': RiPaletteLine,
  'figma': RiPaletteLine,
  'user-surveys': RiChat3Line,
  
  // Legacy icon names (for backward compatibility)
  'RiLineChartLine': RiLineChartLine,
  'RiTeamLine': RiTeamLine,
  'RiChat3Line': RiChat3Line,
  'RiPresentationLine': RiPresentationLine,
  'RiProductHuntLine': RiProductHuntLine,
  'RiTaskLine': RiTaskLine,
  'RiCalendarLine': RiCalendarLine,
  'RiRoadMapLine': RiRoadMapLine,
  'RiCodeSSlashFill': RiCodeSSlashFill,
  'RiTerminalBoxLine': RiTerminalBoxLine,
  'RiGitBranchLine': RiGitBranchLine,
  'RiDatabase2Fill': RiDatabase2Fill,
  'RiPencilRuler2Line': RiPencilRuler2Line,
  'RiPaletteLine': RiPaletteLine,
  'RiLayoutLine': RiLayoutLine,
  'RiUserLine': RiUserLine,
  
  // Social Media icons
  'github': RiGithubFill,
  'linkedin': RiLinkedinBoxFill,
  'X': RiTwitterXFill,
  'twitter': RiTwitterXFill, // Alias for backward compatibility
  'facebook': RiFacebookBoxFill,
  'instagram': RiInstagramLine,
  'youtube': RiYoutubeFill,
  'twitch': RiTwitchFill,
  'discord': RiDiscordFill,
  'medium': RiMediumFill,
  'stackoverflow': RiStackOverflowLine,
  'dribbble': RiDribbbleLine,
  'behance': RiBehanceLine,
  'pinterest': RiPinterestLine,
  'trello': RiTrelloLine
};

/**
 * Converts a string to a slug format (lowercase with hyphens)
 * @param input The string to convert to slug format
 * @returns The slugified string
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .trim();
}

/**
 * Gets the icon component based on the slug name
 * @param slug The slug name from Sanity document
 * @returns The corresponding Remix icon component or undefined if not found
 */
export function getIconComponent(slug?: string): RemixIconType | undefined {
  if (!slug) return undefined;
  
  // Check if the slug is a valid icon name
  if ((Object.keys(iconMap) as IconName[]).includes(slug as IconName)) {
    return iconMap[slug as IconName];
  }
  
  // For backward compatibility, check if it's a legacy icon name
  // This handles cases where the slug might be a full icon name like "RiLineChartLine"
  if (slug.startsWith('Ri') && (Object.keys(iconMap) as IconName[]).includes(slug as IconName)) {
    return iconMap[slug as IconName];
  }
  
  // If not found, return undefined
  return undefined;
}
