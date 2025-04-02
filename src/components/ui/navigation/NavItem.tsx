import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const NavItem = ({
  href,
  children,
  isActive = false,
  className,
  onClick,
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "font-medium",
        "hover:scale-110",
        "transition-all duration-500 ease-in-out",
        isActive
          ? "text-foreground font-semibold"
          : "text-foreground/60 hover:text-foreground",
        className
      )}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
