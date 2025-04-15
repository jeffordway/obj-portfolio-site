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
  RiTerminalBoxLine,
  RiSmartphoneLine,
  RiRobotLine,
  RiGitBranchLine,
  RiTestTubeLine,
  RiTeamLine,
  RiBugLine,

  // Analytics & Collaboration icons
  RiChat3Line,
  RiCodeBoxLine,
  RiCodeLine,
  RiBarChartBoxLine,

  // Product Management icons
  RiTaskLine,
  RiRoadMapLine,
  RiUserLine,

  // Software Development icons
  RiReactjsLine,
  RiDatabase2Line,
  RiCss3Line,
  RiJavascriptLine,
  RiHtml5Line,

  // UI/UX Design icons
  RiPaintBrushLine,
  RiLayoutLine,
  RiImageLine,
  RiPencilRuler2Line,

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
} from "@remixicon/react";

// Import the type from @remixicon/react
import type { RemixiconComponentType } from "@remixicon/react";

// Define a type for the icon components
export type RemixIconType = RemixiconComponentType;

/**
 * Type for supported icon names
 * This helps with type safety when referencing icons by name
 */
export type IconName =
  // Categories
  | "front-end-development"
  | "back-end-development"
  | "mobile-development"
  | "applied-ai"
  | "deployment-devops"
  | "uiux-design-tools"
  | "uiux-research-process"
  | "uiux-testing-standards"
  | "product-management"
  | "collaboration-tools"
  | "analytics-marketing"
  | "testing-frameworks"

  // Skills (Front-End Development)
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "nextjs"
  | "typescript"
  | "bootstrap"
  | "webflow"
  | "axios"
  | "handlebars"
  | "tailwind-css"
  | "open-weather-api"
  | "google-maps-api"

  // Skills (Back-End Development)
  | "nodejs"
  | "mongodb"
  | "sql"
  | "supabase"
  | "sanity"
  | "express"
  | "sequelize"
  | "json-server"
  | "jwt-authentication"

  // Skills (Mobile Development)
  | "react-native"
  | "expo"
  | "ionic"

  // Skills (Applied AI)
  | "chatbot-development"
  | "generative-ai-integration"
  | "prompt-engineering"
  | "vercel-ai-sdk"

  // Skills (Deployment & DevOps)
  | "git"
  | "netlify"
  | "vercel"

  // Skills (UI/UX Design Tools)
  | "adobe-illustrator"
  | "adobe-indesign"
  | "adobe-photoshop"
  | "adobe-xd"
  | "figma"

  // Skills (UI/UX Research & Process)
  | "journey-mapping"
  | "prototyping"
  | "user-flows"
  | "user-interviews"
  | "user-research"
  | "user-surveys"
  | "ux-writing"
  | "wireframing"

  // Skills (UI/UX Testing & Standards)
  | "ab-testing"
  | "accessibility"
  | "design-systems"
  | "usability-testing"

  // Skills (Product Management)
  | "agile"
  | "kanban"
  | "okrs"
  | "scrum"
  | "strategy"
  | "ai-driven-user-engagement"
  | "ai-feature-validation"
  | "ai-workflow-automation"
  | "feature-prioritization"
  | "market-research"
  | "product-lifecycle-management"
  | "product-roadmap"
  | "survey-monkey"
  | "user-stories"

  // Skills (Collaboration Tools)
  | "google-workspace"
  | "microsoft-365"
  | "slack"
  | "trello"

  // Skills (Analytics & Marketing)
  | "active-net"
  | "constant-contact"
  | "google-analytics"
  | "mailchimp"
  | "seo"

  // Skills (Testing Frameworks)
  | "jest"

  // Legacy icon names (for backward compatibility)
  | "RiLineChartLine"
  | "RiTeamLine"
  | "RiChat3Line"
  | "RiPresentationLine"
  | "RiProductHuntLine"
  | "RiTaskLine"
  | "RiCalendarLine"
  | "RiRoadMapLine"
  | "RiCodeSSlashFill"
  | "RiTerminalBoxLine"
  | "RiGitBranchLine"
  | "RiDatabase2Fill"
  | "RiPencilRuler2Line"
  | "RiPaletteLine"
  | "RiLayoutLine"
  | "RiUserLine"

  // Social media icons
  | "github"
  | "linkedin"
  | "X"
  | "twitter"
  | "facebook"
  | "instagram"
  | "youtube"
  | "twitch"
  | "discord"
  | "medium"
  | "stackoverflow"
  | "dribbble"
  | "behance"
  | "pinterest"
  | "trello";

/**
 * Maps icon names to their corresponding Remix icon components
 */
export const iconMap: Record<IconName, RemixIconType> = {
  // Categories (unique icons)
  "front-end-development": RiCodeSSlashFill,
  "back-end-development": RiTerminalBoxLine,
  "mobile-development": RiSmartphoneLine,
  "applied-ai": RiRobotLine,
  "deployment-devops": RiGitBranchLine,
  "uiux-design-tools": RiPaletteLine,
  "uiux-research-process": RiLayoutLine,
  "uiux-testing-standards": RiTestTubeLine,
  "product-management": RiProductHuntLine,
  "collaboration-tools": RiTeamLine,
  "analytics-marketing": RiLineChartLine,
  "testing-frameworks": RiBugLine,

  // Front-End Development Skills
  html: RiHtml5Line,
  css: RiCss3Line,
  javascript: RiJavascriptLine,
  react: RiReactjsLine,
  nextjs: RiReactjsLine,
  typescript: RiCodeLine,
  bootstrap: RiLayoutLine,
  webflow: RiLayoutLine,
  axios: RiCodeLine,
  handlebars: RiCodeLine,
  "tailwind-css": RiCss3Line,
  "open-weather-api": RiCodeLine,
  "google-maps-api": RiCodeLine,

  // Back-End Development Skills
  nodejs: RiTerminalBoxLine,
  mongodb: RiDatabase2Line,
  sql: RiDatabase2Line,
  supabase: RiDatabase2Line,
  sanity: RiDatabase2Line,
  express: RiTerminalBoxLine,
  sequelize: RiDatabase2Line,
  "json-server": RiDatabase2Line,
  "jwt-authentication": RiCodeLine,

  // Mobile Development Skills
  "react-native": RiReactjsLine,
  expo: RiSmartphoneLine,
  ionic: RiSmartphoneLine,

  // Applied AI Skills
  "chatbot-development": RiRobotLine,
  "generative-ai-integration": RiRobotLine,
  "prompt-engineering": RiRobotLine,
  "vercel-ai-sdk": RiRobotLine,

  // Deployment & DevOps Skills
  git: RiGitBranchLine,
  netlify: RiCodeLine,
  vercel: RiCodeLine,

  // UI/UX Design Tools
  "adobe-illustrator": RiPaintBrushLine,
  "adobe-indesign": RiPaintBrushLine,
  "adobe-photoshop": RiImageLine,
  "adobe-xd": RiPaletteLine,
  figma: RiPaletteLine,

  // UI/UX Research & Process
  "journey-mapping": RiRoadMapLine,
  prototyping: RiLayoutLine,
  "user-flows": RiRoadMapLine,
  "user-interviews": RiUserLine,
  "user-research": RiUserLine,
  "user-surveys": RiChat3Line,
  "ux-writing": RiPencilRuler2Line,
  wireframing: RiLayoutLine,

  // UI/UX Testing & Standards
  "ab-testing": RiTestTubeLine,
  accessibility: RiUserLine,
  "design-systems": RiPaletteLine,
  "usability-testing": RiUserLine,

  // Product Management Skills
  agile: RiRoadMapLine,
  kanban: RiLayoutLine,
  okrs: RiTaskLine,
  scrum: RiTeamLine,
  strategy: RiRoadMapLine,
  "ai-driven-user-engagement": RiTaskLine,
  "ai-feature-validation": RiTaskLine,
  "ai-workflow-automation": RiTaskLine,
  "feature-prioritization": RiTaskLine,
  "market-research": RiBarChartBoxLine,
  "product-lifecycle-management": RiRoadMapLine,
  "product-roadmap": RiRoadMapLine,
  "survey-monkey": RiChat3Line,
  "user-stories": RiUserLine,

  // Collaboration Tools
  "google-workspace": RiCodeBoxLine,
  "microsoft-365": RiCodeLine,
  slack: RiChat3Line,
  trello: RiTrelloLine,

  // Analytics & Marketing
  "active-net": RiLineChartLine,
  "constant-contact": RiChat3Line,
  "google-analytics": RiBarChartBoxLine,
  mailchimp: RiChat3Line,
  seo: RiBarChartBoxLine,

  // Testing Frameworks
  jest: RiBugLine,

  // Legacy icon names (for backward compatibility)
  RiLineChartLine: RiLineChartLine,
  RiTeamLine: RiTeamLine,
  RiChat3Line: RiChat3Line,
  RiPresentationLine: RiPresentationLine,
  RiProductHuntLine: RiProductHuntLine,
  RiTaskLine: RiTaskLine,
  RiCalendarLine: RiCalendarLine,
  RiRoadMapLine: RiRoadMapLine,
  RiCodeSSlashFill: RiCodeSSlashFill,
  RiTerminalBoxLine: RiTerminalBoxLine,
  RiGitBranchLine: RiGitBranchLine,
  RiDatabase2Fill: RiDatabase2Fill,
  RiPencilRuler2Line: RiPencilRuler2Line,
  RiPaletteLine: RiPaletteLine,
  RiLayoutLine: RiLayoutLine,
  RiUserLine: RiUserLine,

  // Social Media icons
  github: RiGithubFill,
  linkedin: RiLinkedinBoxFill,
  X: RiTwitterXFill,
  twitter: RiTwitterXFill, // Alias for backward compatibility
  facebook: RiFacebookBoxFill,
  instagram: RiInstagramLine,
  youtube: RiYoutubeFill,
  twitch: RiTwitchFill,
  discord: RiDiscordFill,
  medium: RiMediumFill,
  stackoverflow: RiStackOverflowLine,
  dribbble: RiDribbbleLine,
  behance: RiBehanceLine,
  pinterest: RiPinterestLine,
};

/**
 * Converts a string to a slug format (lowercase with hyphens)
 * @param input The string to convert to slug format
 * @returns The slugified string
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
    .trim();
}

/**
 * Gets the icon component based on the slug name
 * @param slug The slug name from Sanity document
 * @returns The corresponding Remix icon component or undefined if not found
 */
export function getIconComponent(slug?: string): RemixIconType | undefined {
  if (!slug) return undefined;
  
  // Normalize the slug (lowercase, trim)
  const normalizedSlug = slug.toLowerCase().trim();
  
  // Direct lookup in the iconMap
  if (normalizedSlug in iconMap) {
    return iconMap[normalizedSlug as IconName];
  }
  
  // Check if the slug is a valid icon name after normalization
  const iconKeys = Object.keys(iconMap) as IconName[];
  const matchingKey = iconKeys.find(key => key.toLowerCase() === normalizedSlug);
  if (matchingKey) {
    return iconMap[matchingKey];
  }
  
  // For backward compatibility, check if it's a legacy icon name
  if (slug.startsWith("Ri") && iconKeys.includes(slug as IconName)) {
    return iconMap[slug as IconName];
  }
  
  // If not found, log for debugging and return undefined
  console.debug(`Icon not found for slug: ${slug}`);
  return undefined;
}
