/**
 * Icons library for the application
 * Uses Remix icons from @remixicon/react
 * 
 * This file provides:
 * - Type-safe access to icons via the IconName type
 * - Consistent mapping between icon names and components
 * - Helper functions for working with icons
 */
import {
  // Category icons
  RiLineChartLine,
  RiProductHuntLine,
  RiCodeSSlashFill,
  RiTerminalBoxLine,
  RiSmartphoneLine,
  RiGitBranchLine,
  RiPaletteLine,
  RiLayoutLine,
  RiTestTubeLine,
  RiTeamLine,
  
  // Skill icons
  RiBarChartBoxLine,
  RiChat3Line,
  RiCodeBoxLine,
  RiCodeLine,
  RiTaskLine,
  RiRoadMapLine,
  RiUserLine,
  RiReactjsLine,
  RiDatabase2Line,
  RiCss3Line,
  RiJavascriptLine,
  RiHtml5Line,
  RiPaintBrushLine,
  RiImageLine,
  RiPencilRuler2Line,
  RiBugLine,
  
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
 */
export type IconName =
  // Categories
  | "front-end-development"
  | "back-end-development"
  | "mobile-development"
  | "deployment-devops"
  | "uiux-design-tools"
  | "uiux-research-process"
  | "uiux-testing-standards"
  | "product-management"
  | "collaboration-tools"
  | "analytics-marketing"

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
  | "tailwind-css"
  | "jest"

  // Skills (Back-End Development)
  | "nodejs"
  | "mongodb"
  | "sql"
  | "supabase"
  | "sanity"
  | "express"
  | "sequelize"

  // Skills (Mobile Development)
  | "react-native"
  | "expo"
  | "ionic"

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
  | "user-personas"
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
  | "customer-engagement"
  | "functional-leadership"
  | "problem-solving"
  | "stakeholder-management"
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

  // Social media icons
  | "github"
  | "linkedin"
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
  // Categories
  "front-end-development": RiCodeSSlashFill,
  "back-end-development": RiTerminalBoxLine,
  "mobile-development": RiSmartphoneLine,
  "deployment-devops": RiGitBranchLine,
  "uiux-design-tools": RiPaletteLine,
  "uiux-research-process": RiLayoutLine,
  "uiux-testing-standards": RiTestTubeLine,
  "product-management": RiProductHuntLine,
  "collaboration-tools": RiTeamLine,
  "analytics-marketing": RiLineChartLine,

  // Skills (Front-End Development)
  html: RiHtml5Line,
  css: RiCss3Line,
  javascript: RiJavascriptLine,
  react: RiReactjsLine,
  nextjs: RiReactjsLine,
  typescript: RiCodeLine,
  bootstrap: RiLayoutLine,
  webflow: RiLayoutLine,
  axios: RiCodeLine,
  "tailwind-css": RiCss3Line,
  jest: RiBugLine,

  // Skills (Back-End Development)
  nodejs: RiTerminalBoxLine,
  mongodb: RiDatabase2Line,
  sql: RiDatabase2Line,
  supabase: RiDatabase2Line,
  sanity: RiDatabase2Line,
  express: RiTerminalBoxLine,
  sequelize: RiDatabase2Line,

  // Skills (Mobile Development)
  "react-native": RiReactjsLine,
  expo: RiSmartphoneLine,
  ionic: RiSmartphoneLine,

  // Skills (Deployment & DevOps)
  git: RiGitBranchLine,
  netlify: RiCodeLine,
  vercel: RiCodeLine,

  // Skills (UI/UX Design Tools)
  "adobe-illustrator": RiPaintBrushLine,
  "adobe-indesign": RiPaintBrushLine,
  "adobe-photoshop": RiImageLine,
  "adobe-xd": RiPaletteLine,
  figma: RiPaletteLine,

  // Skills (UI/UX Research & Process)
  "journey-mapping": RiRoadMapLine,
  prototyping: RiLayoutLine,
  "user-flows": RiRoadMapLine,
  "user-interviews": RiUserLine,
  "user-personas": RiUserLine,
  "user-research": RiUserLine,
  "user-surveys": RiChat3Line,
  "ux-writing": RiPencilRuler2Line,
  wireframing: RiLayoutLine,

  // Skills (UI/UX Testing & Standards)
  "ab-testing": RiTestTubeLine,
  accessibility: RiUserLine,
  "design-systems": RiPaletteLine,
  "usability-testing": RiUserLine,

  // Skills (Product Management)
  agile: RiRoadMapLine,
  kanban: RiLayoutLine,
  okrs: RiTaskLine,
  scrum: RiTeamLine,
  strategy: RiRoadMapLine,
  "customer-engagement": RiUserLine,
  "functional-leadership": RiTeamLine,
  "problem-solving": RiTaskLine,
  "stakeholder-management": RiUserLine,
  "feature-prioritization": RiTaskLine,
  "market-research": RiBarChartBoxLine,
  "product-lifecycle-management": RiRoadMapLine,
  "product-roadmap": RiRoadMapLine,
  "survey-monkey": RiChat3Line,
  "user-stories": RiUserLine,

  // Skills (Collaboration Tools)
  "google-workspace": RiCodeBoxLine,
  "microsoft-365": RiCodeBoxLine,
  slack: RiChat3Line,

  // Skills (Analytics & Marketing)
  "active-net": RiLineChartLine,
  "constant-contact": RiChat3Line,
  "google-analytics": RiBarChartBoxLine,
  mailchimp: RiChat3Line,
  seo: RiBarChartBoxLine,

  // Social Media icons
  github: RiGithubFill,
  linkedin: RiLinkedinBoxFill,
  twitter: RiTwitterXFill,
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
  trello: RiTrelloLine
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
  
  // Map legacy slugs to current ones (for backward compatibility)
  const legacyMappings: Record<string, IconName> = {
    // Old category names
    'analytics--collaboration': 'analytics-marketing',
    'software-development': 'front-end-development',
    'uiux-design': 'uiux-design-tools',
    
    // Old skill names
    'customer-engagement': 'product-management',
    'functional-leadership': 'product-management',
    'problem-solving': 'product-management',
    'stakeholder-management': 'product-management'
  };
  
  if (normalizedSlug in legacyMappings) {
    return iconMap[legacyMappings[normalizedSlug]];
  }
  
  // Direct lookup in the iconMap
  if (normalizedSlug in iconMap) {
    return iconMap[normalizedSlug as IconName];
  }
  
  // Case-insensitive match
  const iconKeys = Object.keys(iconMap) as IconName[];
  const matchingKey = iconKeys.find(key => key.toLowerCase() === normalizedSlug);
  if (matchingKey) {
    return iconMap[matchingKey];
  }
  
  return undefined;
}
