/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

// According to Sanity best practices, we should use SANITY_STUDIO_ prefixed variables
// But we also support the existing NEXT_PUBLIC_ variables for backward compatibility
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'hcajm3fl'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const studioHost = process.env.SANITY_STUDIO_HOST || process.env.NEXT_PUBLIC_SANITY_STUDIO_HOST || 'jeffordway'

export default defineCliConfig({ 
  api: { projectId, dataset },
  // Set the hostname for Sanity Studio deployment
  studioHost,
  autoUpdates: true,
})
