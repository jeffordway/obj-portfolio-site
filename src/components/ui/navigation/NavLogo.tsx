import Link from "next/link";
import React from "react";
import { MyLogo } from "@/components/ui/icon/MyLogo";
import { cn } from "@/lib/utils";

export function NavLogo() {
  return (
    <Link href="/">
      <MyLogo
        className={cn(
          "h-14 w-auto md:h-18 md:w-auto",
          "text-foreground hover:text-accent",
          "hover:scale-110",
          "transition-all duration-500 ease-in-out"
        )}
        title="My Custom Logo"
      />
    </Link>
  );
}
