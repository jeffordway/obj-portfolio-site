import React from "react";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
} from "@remixicon/react";

type RemixIconType = React.ComponentType<{
  size?: string | number;
  className?: string;
}>;

// Type defining the allowed icon names
export type SupportedIconName = "github" | "linkedin" | "X";

// Props interface for the SocialIcon component
interface SocialIconProps {
  iconName: SupportedIconName;
  size?: number;
  className?: string;
}

// Component to render a specific Remix social icon
export const SocialIcon: React.FC<SocialIconProps> = ({
  iconName,
  size = 20, // Default size
  className,
}) => {
  // Map names to the imported Remix icon components
  const icons: { [key in SupportedIconName]: RemixIconType } = {
    github: RiGithubFill,
    linkedin: RiLinkedinBoxFill,
    X: RiTwitterXFill,
  };

  // Select the component based on the prop
  const IconComponent = icons[iconName];

  // Fallback for invalid icon name (logs warning in dev)
  if (!IconComponent) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[SocialIcon] Invalid iconName provided: ${iconName}`);
    }
    return null;
  }

  // Render the selected icon component
  return <IconComponent size={size} className={className} aria-hidden="true" />;
};
