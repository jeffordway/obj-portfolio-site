"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { createPortal } from "react-dom";

// Changed to absolute imports
import { NavItem } from "@/components/ui/navigation/NavItem";
import { ExternalLink } from "@/components/ui/links/ExternalLink";
import { NavLogo } from "@/components/ui/navigation/NavLogo";
import { SocialIcon } from "@/components/ui/social/SocialIcon";
import { Section } from "@/components/layouts/Section";
import { navLinks, siteConfig } from "@/config/siteConfig";

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
    navLinks
      .filter((item) => item.showNavBar)
      .map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          isActive={pathname === item.href}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={cn(
            isMobile ? "text-2xl" : "text-base"
            // Add any other base styling shared between mobile/desktop if needed
          )}
        >
          {item.label}
        </NavItem>
      ));

  const renderSocialLinks = (isMobile = false) =>
    Object.entries(siteConfig.links).map(([name, href]) => (
      <ExternalLink
        key={name}
        href={href}
        ariaLabel={`Follow on ${name}`} // Consistent aria-label
        className={cn(
          "flex items-center gap-2", // Base flex alignment
          isMobile ? "text-xl" : "text-base", // Example size adjustment
        )}
      >
        <SocialIcon
          iconName={name as keyof typeof siteConfig.links}
          className={cn(isMobile ? "h-6 w-6" : "h-5 w-5")}
        />
        {/* Name span removed for mobile view - only icons needed */}
      </ExternalLink>
    ));

  // Portal component for the mobile menu
  const MobileMenuPortal = ({ children }: { children: React.ReactNode }) => {
    if (!mounted) return null; // Ensure portal only mounts client-side
    return createPortal(children, document.body);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-[100] w-full bg-transparent", // Change to fixed with higher z-index
          className,
        )}
      >
        {/* Desktop Header (hidden on mobile) */}
        <Section className="hidden md:flex items-center h-28">
          <nav
            className="flex-1 basis-0 justify-start flex items-center gap-6"
            aria-label="Main Navigation"
          >
            {renderNavItems()}
          </nav>
          <NavLogo />
          <div className="flex-1 basis-0 justify-end flex items-center gap-4">
            {renderSocialLinks()}
          </div>
        </Section>

        {/* Mobile Header (hidden on desktop) */}
        <Section className="flex md:hidden items-center justify-between h-20">
          {/* Spacer to balance the button */}
          <div className="w-8" aria-hidden="true" />
          <NavLogo />
          <button
            className="flex items-center justify-center rounded-md p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <RiCloseLine size={24} />
            ) : (
              <RiMenuLine size={24} />
            )}
          </button>
        </Section>
      </header>

      {/* Mobile Menu Portal */}
      <MobileMenuPortal>
        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-0 z-40 flex flex-col bg-background/90 px-6 pt-24 pb-12 transition-transform duration-300 ease-in-out md:hidden",
            "justify-center items-center",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Mobile Navigation */}
          <nav
            className="flex flex-col items-center gap-8"
            aria-label="Mobile Main Navigation"
          >
            {renderNavItems(true)}
          </nav>

          {/* Mobile Social Links - Horizontal Row */}
          <div className="mt-12 flex flex-row justify-center gap-8">
            {renderSocialLinks(true)}
          </div>
        </div>
      </MobileMenuPortal>
    </>
  );
};

// Add display name
Navbar.displayName = "Navbar";
