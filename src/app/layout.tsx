// --- Core Next.js Types & Fonts ---
import type { Metadata } from "next";
import { Barlow } from "next/font/google";

// --- Providers & Analytics ---
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleTagManager } from '@next/third-parties/google';

// --- Global Styles ---
import "@/styles/globals.css";

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

// --- Viewport (Next.js 15+) ---
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// --- Font Configuration ---
const primaryFont = Barlow({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

// --- Root Layout ---
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Analytics & Tag Managers (head-level) */}
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
      <body className={`${primaryFont.className} ${primaryFont.variable} antialiased`}>
        {/* Theme & Context Providers */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Analytics Scripts */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
