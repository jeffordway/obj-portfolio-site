import * as React from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layouts/Section";
import { navLinks, siteConfig } from "@/config/siteConfig"; // Updated import path and added siteConfig
import { NavItem } from "@/components/ui/navigation/NavItem";
import { SocialIcon } from "@/components/ui/social/SocialIcon";
import { ExternalLink } from "@/components/ui/links/ExternalLink";
import { Text } from "@/components/ui/typography/Text";

const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    const currentYear = new Date().getFullYear();

    // --- Helper Functions ---

    // Renders nav items marked showNavBar: true (simplified for footer)
    const renderPrimaryNavItems = () =>
      navLinks
        .filter((item) => item.showNavBar)
        .map((item) => (
          <NavItem key={item.href} href={item.href} className="text-base">
            {item.label}
          </NavItem>
        ));

    // Renders social links (adapted from Navbar, no isMobile needed)
    const renderSocialLinks = () =>
      Object.entries(siteConfig.links).map(([name, href]) => {
        const iconName = name === 'twitter' ? 'X' : name as keyof typeof siteConfig.links;
        return (
          <ExternalLink
            key={name}
            href={href}
            ariaLabel={`Follow on ${name}`}
            className={cn(
              "flex items-center gap-2",
            )}
          >
            <SocialIcon iconName={iconName} className="h-5 w-5" />
          </ExternalLink>
        );
      });

    // Renders nav items marked showNavBar: false (simplified for footer)
    const renderSecondaryNavItems = () =>
      navLinks
        .filter((item) => !item.showNavBar) // Filter for showNavBar: false
        .map((item) => (
          <NavItem key={item.href} href={item.href} className="text-sm">
            {item.label}
          </NavItem>
        ));

    // --- Component Return ---
    return (
      <footer 
        ref={ref} 
        className={cn("bg-background w-full", className)}
        {...props}
      >
        <Section maxWidth="container">
          <div className="flex flex-col items-center gap-4 pb-4 pt-8 md:pt-12">
            {/* Primary Navigation (showNavBar: true) */}
            <nav
              aria-label="Primary Footer Navigation"
              className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            >
              {renderPrimaryNavItems()}
            </nav>

            {/* Social Links - Uses renderSocialLinks */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {renderSocialLinks()}
            </div>

            {/* Footer Navigation (showNavBar: false) */}
            <nav
              aria-label="Footer Navigation"
              className="flex flex-wrap justify-center gap-x-4 gap-y-2" // Adjusted gap
            >
              {renderSecondaryNavItems()}
            </nav>

            {/* Copyright Notice */}
            <Text variant="caption" className="text-center pt-4">
              &copy; {currentYear} Nielsen Ossowski Creative LLC. All rights
              reserved.
            </Text>
          </div>
        </Section>
      </footer>
    );
  }
);

Footer.displayName = "Footer"; // Add display name for debugging

export { Footer }; // Use named export
