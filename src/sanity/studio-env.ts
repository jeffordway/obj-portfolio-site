/**
 * Environment variables for Sanity Studio
 * 
 * These use the SANITY_STUDIO_ prefix as per Sanity best practices
 */

export const studioApiVersion =
  process.env.SANITY_STUDIO_API_VERSION || '2025-04-01'

export const studioDataset = process.env.SANITY_STUDIO_DATASET || 'production'

export const studioProjectId = process.env.SANITY_STUDIO_PROJECT_ID || 'hcajm3fl'

// For development, we can use a fallback value
export const studioHost = process.env.SANITY_STUDIO_HOST || 'jeffordway'
