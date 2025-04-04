import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import React from "react";
import { cn } from "@/lib/utils"; 

// Layout for the main public-facing site routes.
// It wraps the page content with the Navbar and Footer,
// ensuring proper layout structure (sticky footer).
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    // This div establishes the flex column context for the sticky footer
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* The flex-grow class ensures this main content area pushes the footer down */}
      {/* Add responsive padding-top based on Navbar height */}
      <main className={cn("flex-grow relative pt-20 md:pt-28")}>{children}</main> {/* Add pt-20 md:pt-28 */}
      
      {/* Footer with higher z-index to appear over fixed Hero */}
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}
