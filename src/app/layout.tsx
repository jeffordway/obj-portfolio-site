// --- Core Next.js Types & Fonts ---
import type { Metadata } from "next";
import { Barlow } from "next/font/google";

// --- Providers & Analytics ---
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  creator: "Jeff Ordway",
  publisher: "Jeff Ordway",
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
  weight: ["400", "500", "600", "700"], // only the weights the site uses; each extra weight is another download
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
      <body className={`${primaryFont.className} ${primaryFont.variable} antialiased`} suppressHydrationWarning>
        {/* Theme & Context Providers */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Anonymous, cookie-free visit and speed statistics from Vercel.
            If you add any other tracking tool, update the Privacy Policy page too. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
