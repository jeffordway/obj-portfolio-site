import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// --- Metadata & SEO ---
export const metadata: Metadata = {
  title: {
    template: "%s | Jeff Ordway - Portfolio",
    default: "Jeff Ordway - Portfolio",
  },
  description:
    "Hey, I'm Jeff Ordway, a creator with a passion for purpose and a knack for turning faith into action. I build tools to help you live boldly, serve purposefully, and pursue excellence.",
  authors: [{ name: "Jeff Ordway" }],
  creator: "Nielsen Ossowski Creative LLC",
  publisher: "Nielsen Ossowski Creative LLC",
  keywords: [
    "design",
    "development",
    "portfolio",
    "web development",
    "app development",
  ],
};

// --- Font Configuration ---
const primaryFont = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${primaryFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
