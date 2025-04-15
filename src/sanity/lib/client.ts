import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

/**
 * Standard Sanity client for fetching data
 * - Uses environment variables for configuration
 * - In development: Always fetches fresh data (no CDN caching)
 * - In production: Uses CDN for better performance
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn, // Controlled by environment setting in env.ts
  perspective: 'published',
})
