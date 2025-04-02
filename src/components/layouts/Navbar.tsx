"use client"; 

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { createPortal } from "react-dom";

import { NavItem } from "@/components/ui/navigation/NavItem";
import { ExternalLink } from "../ui/links/ExternalLink";
import { NavLogo } from "@/components/ui/navigation/NavLogo";
import { SocialIcon, SupportedIconName } from "../ui/social/SocialIcon";
import { Container } from "@/components/layouts/Container";

interface NavLink {
  href: string;
  label: string;
}

interface SocialLink {
  name: string;
  href: string;
  iconName: SupportedIconName;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/jeffordway", iconName: "github" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jeffordway/",
    iconName: "linkedin",
  },
  { name: "X", href: "https://x.com/indigohawk931", iconName: "X" },
];

export interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true); 
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const renderNavItems = (isMobile = false) =>
    navLinks.map((item) => (
      <NavItem
        key={item.href}
        href={item.href}
        isActive={pathname === item.href}
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={cn(
          isMobile ? "text-2xl" : "text-base"
        )}
      >
        {item.label}
      </NavItem>
    ));

  const renderSocialLinks = (isMobile = false) =>
    socialLinks.map((link) => (
      <ExternalLink
        key={link.name}
        href={link.href}
        ariaLabel={link.name}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        <SocialIcon iconName={link.iconName} size={20} />
      </ExternalLink>
    ));

  const MobileMenu = () => (
    <div className={cn(
      "fixed inset-0 z-[999]",
      "bg-background",
      "flex flex-col",
      "animate-fade-in"
    )}>
      <div className={cn(
        "flex justify-end",
        "p-8" // Use same padding as header button container
      )}>
        <button
          type="button"
          className={cn(
            "text-foreground/60 hover:text-foreground",
            "transition-colors"
            // Removed internal padding from button itself previously
          )}
          onClick={() => setMobileMenuOpen(false)} // Action: Close menu
          aria-label="Close menu"
        >
          <RiCloseLine size={24} />
        </button>
      </div>
      <nav className={cn(
        "flex-1 flex flex-col",
        "items-center justify-center",
        "gap-8"
      )}>
        {renderNavItems(true)}
      </nav>
      <div className={cn(
        "flex justify-center items-center",
        "space-x-8 p-8"
      )}>
        {renderSocialLinks(true)}
      </div>
    </div>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background",
        "backdrop-blur-md",
        className // Merge incoming classes last
      )}
    >
      <Container
        maxWidth="full" // Use full width for Navbar structure
        className={cn(
          // Apply layout classes to the Container
          "relative flex items-center justify-between",
          "h-20 md:h-32"
          // Responsive padding (p-4 lg:p-8) is now handled by Container itself
        )}
      >
        <nav className={cn(
          "hidden md:flex",
          "items-center",
          "space-x-6 lg:space-x-8"
        )}>
          {renderNavItems()}
        </nav>

        <div className={cn(
          "absolute left-1/2 top-1/2",
          "-translate-x-1/2 -translate-y-1/2",
          "flex items-center"
        )}>
          <NavLogo />
        </div>

        <div className={cn(
          "hidden md:flex",
          "items-center",
          "space-x-6 lg:space-x-8"
        )}>
          {renderSocialLinks()}
        </div>

        {/* Mobile Menu Button */}
        {/* Add padding to match overlay button container */}
        <div className={cn(
          "md:hidden flex-1 flex justify-end",
          "p-4" // Container for mobile button keeps its padding
        )}>
          <button
            type="button"
            className={cn(
              // Button padding was removed
              "text-foreground/60 hover:text-foreground",
              "transition-colors"
            )}
            onClick={() => setMobileMenuOpen(true)} // Only opens menu now
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} // Keep dynamic aria-label for state indication
            aria-expanded={mobileMenuOpen}
          >
            {/* Icon still changes based on state */}
            {mobileMenuOpen ? (
              <RiCloseLine size={24} />
            ) : (
              <RiMenuLine size={24} />
            )}
          </button>
        </div>
      </Container> {/* End of Container */}

      {mounted && mobileMenuOpen && createPortal(<MobileMenu />, document.body)}
    </header>
  );
};
