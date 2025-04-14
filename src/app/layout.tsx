import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Barlow } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from "@/providers/ThemeProvider";
import { UsercentricsCookieConsent } from "@/components/analytics/UsercentricsCookieConsent";
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

// Separate viewport export for Next.js 15
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UsercentricsCookieConsent />
      <body className={`${primaryFont.className} ${primaryFont.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <SpeedInsights />
      </body>
    </html>
  );
}
