#!/bin/bash

# Script to set up Sanity Studio environment variables for deployment
echo "Setting up Sanity Studio environment variables for deployment..."

# Create .env.development file with Sanity Studio variables
cat > .env.development << EOL
# Sanity Studio Environment Variables
SANITY_STUDIO_PROJECT_ID="hcajm3fl"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_HOST="jeffordway"
SANITY_STUDIO_API_VERSION="2025-04-01"
EOL

# Create .env.production file with Sanity Studio variables
cat > .env.production << EOL
# Sanity Studio Environment Variables
SANITY_STUDIO_PROJECT_ID="hcajm3fl"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_HOST="jeffordway"
SANITY_STUDIO_API_VERSION="2025-04-01"
EOL

echo "Environment files created successfully!"
echo "You can now run 'npx sanity deploy' to deploy your Sanity Studio."
