import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Force development mode to always fetch fresh data
const isDevelopment = process.env.NODE_ENV === 'development'

/**
 * Standard Sanity client for fetching data
 * - In development: Always fetches fresh data with no caching
 * - In production: Uses CDN for better performance
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Always disable CDN in development to get fresh data
  useCdn: !isDevelopment,
  // Disable stega in development for cleaner responses
  stega: !isDevelopment,
  // Force published content perspective
  perspective: 'published',
  // Disable token caching in development
  token: undefined,
  // Add a cache-busting parameter in development
  ...(isDevelopment && { 
    requestOptions: {
      cache: 'no-store',
      next: { revalidate: 0 }
    }
  })
})
