/**
 * Environment variables for Sanity configuration
 * 
 * For Next.js frontend: Uses NEXT_PUBLIC_ prefixed variables
 * For Sanity Studio: Uses SANITY_STUDIO_ prefixed variables
 */

// For Next.js frontend
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

/**
 * Set to true to enable CDN caching for Sanity content
 * Use false for development to get the latest content
 */
export const useCdn = process.env.NODE_ENV === 'production'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
