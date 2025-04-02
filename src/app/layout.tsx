import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

// Font configuration
export const primaryFont = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

// Metadata & SEO
export const metadata: Metadata = {
  title: {
    template: "%s | Jeff Ordway - Portfolio",
    default: "Jeff Ordway - Portfolio",
  },
  description:
    "Purpose-driven design and development to help you live boldly, pursue excellence, and serve purposefully.",
  authors: [{ name: "Jeff Ordway" }],
  creator: "Jeff Ordway",
  publisher: "Jeff Ordway",
  keywords: [
    "design",
    "development",
    "portfolio",
    "web development",
    "purpose-driven",
  ],
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          primaryFont.variable,
          "font-sans antialiased bg-background text-foreground",
          // Removed flex flex-col min-h-screen, as individual layouts might handle this
        )}
      >
        {/* Navbar and Footer are removed - handled by (site) layout now */}
        {/* Root layout now just renders the children passed to it */}
        {/* (which will be either the SiteLayout or StudioLayout) */}
        {children}
      </body>
    </html>
  );
}