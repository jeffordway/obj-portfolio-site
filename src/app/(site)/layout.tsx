import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";
import React from "react";
import { cn } from "@/lib/utils";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={cn("flex-grow relative pt-20 md:pt-28")}>
        {children}
      </main>{" "}
      <ThemeToggle />
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}
