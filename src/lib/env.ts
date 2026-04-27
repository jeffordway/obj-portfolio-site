import { z } from 'zod'

/**
 * Environment variable validation schema
 * This ensures all required environment variables are present and correctly typed
 */
const envSchema = z.object({
  // Sanity CMS
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Sanity Project ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Sanity Dataset is required"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional(),
  
  // Contact Form
  RESEND_API_KEY: z.string().min(1, "Resend API Key is required"),
  CONTACT_FORM_FROM_EMAIL: z.string().email("Invalid from email address"),
  CONTACT_FORM_TO_EMAIL: z.string().email("Invalid to email address"),
  
  // Analytics (optional)
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  
  // Site URLs
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
})

/**
 * Validate and export environment variables
 * This will throw an error at build time if required variables are missing
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => issue.path.join('.') || issue.message)
      console.error(
        '❌ Invalid or missing environment variables:\n',
        missingVars.join('\n')
      )
      throw new Error(
        `Invalid environment configuration. Missing or invalid: ${missingVars.join(', ')}`
      )
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Export types for use throughout the app
export type Env = z.infer<typeof envSchema>
