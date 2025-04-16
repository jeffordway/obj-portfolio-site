/**
 * Sanity client configuration with support for revalidation tags
 * This file provides a centralized client for all Sanity data fetching
 * Following official Sanity recommendations for Next.js App Router
 */
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "@/sanity/env";
import "server-only";

// Configuration for Sanity client
const clientConfig = {
  projectId,
  dataset,
  apiVersion,
  // Only use CDN in production to ensure fresh content during development
  useCdn: process.env.NODE_ENV === "production",
  // Configure stega - required for visual editing experience
  stega: {
    // Enable stega in development only for better performance in production
    enabled: process.env.NODE_ENV !== "production",
    // Required when stega is enabled - URL to your Sanity Studio
    studioUrl: `/studio`,
  },
};

// Create a standard Sanity client
export const client = createClient(clientConfig);

/**
 * Helper function for fetching data with proper typing and revalidation tags
 * This follows Sanity's recommended pattern for tag-based revalidation
 * @template T The expected return type
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  const isDevelopment = process.env.NODE_ENV === "development";

  return client.fetch<T>(query, params, {
    // In development: Use no-store to always fetch fresh data
    // In production: Use force-cache to enable tag-based revalidation
    cache: isDevelopment ? "no-store" : "force-cache",
    // In development: Revalidate on every request
    // In production: Use tags for selective revalidation
    next: isDevelopment ? { revalidate: 0 } : { tags },
  });
}
