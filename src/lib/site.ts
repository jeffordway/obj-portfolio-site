/**
 * Site configuration and content types
 * Contains navigation links, social links, and other site-wide content
 */

// Import the IconName type from our icons library
import { type IconName } from "./icons";

// --- Type Interfaces ---
export interface NavLink {
  href: string;
  label: string;
  showNavBar: boolean;
}

/**
 * Represents a social media link with icon
 */
export interface SocialLink {
  /** Display name of the social platform */
  name: string;
  /** URL to the social profile */
  href: string;
  /** Icon name that matches our IconName type */
  iconName: IconName;
}

export interface ScriptureRef {
  text: string;
  url: string;
}

export interface CoreValue {
  title: string;
  description: string;
  scriptureRefs: ScriptureRef[];
}

/**
 * Site configuration interface
 */
export interface SiteConfig {
  /** Site name */
  name: string;
  /** Site description */
  description: string;
  /** Site URL */
  url: string;
  /** Author name */
  author: string;
  /** Copyright year */
  copyrightYear: number;
}

// --- Navigation Links ---
export const navLinks: NavLink[] = [
  { href: "/", label: "Projects", showNavBar: true },
  { href: "/about", label: "About", showNavBar: true },
  { href: "/contact", label: "Contact", showNavBar: true },
  { href: "/cookie-policy", label: "Cookie Policy", showNavBar: false },
  { href: "/privacy-policy", label: "Privacy Policy", showNavBar: false },
  { href: "/terms", label: "Terms", showNavBar: false },
  { href: "/disclaimer", label: "Disclaimer", showNavBar: false },
  //{ href: "/design-system", label: "Design System", showNavBar: false },
  { href: "/studio", label: "Studio", showNavBar: false },
];

/**
 * Social media links for the site
 */
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/jeffordway",
    iconName: "github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jeffordway/",
    iconName: "linkedin",
  },
  {
    name: "X",
    href: "https://x.com/indigohawk931",
    iconName: "X",
  },
];

/**
 * Site-wide configuration
 */
export const siteConfig: SiteConfig = {
  name: "Jeff Ordway",
  description:
    "I build tools to help you live boldly, serve purposefully, and pursue excellence.",
  url: "https://jeffordway.com",
  author: "Jeff Ordway",
  copyrightYear: new Date().getFullYear(),
};

// --- Core Values ---
export const coreValues: CoreValue[] = [
  {
    title: "Live Boldly",
    description:
      "Living boldly in faith, taking purposeful steps to reflect God's design and leave a legacy of impact.",
    scriptureRefs: [
      {
        text: "Joshua 1:9",
        url: "https://www.bible.com/bible/59/JOS.1.9",
      },
      {
        text: "Ephesians 6:10",
        url: "https://www.bible.com/bible/59/EPH.6.10",
      },
      {
        text: "2 Timothy 1:7",
        url: "https://www.bible.com/bible/59/2TI.1.7",
      },
    ],
  },
  {
    title: "Serve Purposefully",
    description:
      "Building authentic connections and serving others with strength and humility.",
    scriptureRefs: [
      {
        text: "Mark 10:45",
        url: "https://www.bible.com/bible/59/MRK.10.45",
      },
      {
        text: "Galatians 5:13",
        url: "https://www.bible.com/bible/59/GAL.5.13",
      },
      {
        text: "1 Peter 4:10",
        url: "https://www.bible.com/bible/59/1PE.4.10",
      },
    ],
  },
  {
    title: "Pursue Excellence",
    description:
      "Pursuing excellence with grit and grace, turning challenges into growth opportunities.",
    scriptureRefs: [
      {
        text: "Colossians 3:23",
        url: "https://www.bible.com/bible/59/COL.3.23",
      },
      {
        text: "Proverbs 22:29",
        url: "https://www.bible.com/bible/59/PRO.22.29",
      },
      {
        text: "Philippians 3:14",
        url: "https://www.bible.com/bible/59/PHP.3.14",
      },
    ],
  },
];
