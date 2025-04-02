import React from "react";

// Layout for the (studio) route group.
// It renders ONLY the children (the Studio page itself)
// to avoid nested <html>/<body> tags caused by next-sanity/studio.
// The root layout provides the actual <html> and <body>.
export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  // By returning only children, we rely on the RootLayout for html/body,
  // but this route-group layout should still prevent RootLayout's
  // Navbar and Footer from wrapping the Studio content.
  return <>{children}</>;
}
