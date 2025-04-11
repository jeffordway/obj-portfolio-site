/**
 * Debug endpoint to check environment variables in the deployment environment.
 */
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const secretIsSet = !!secret;
  const secretPreview = secret ? `${secret.substring(0, 3)}...${secret.substring(secret.length - 3)}` : 'Not Set';

  const responseData = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV, // Vercel specific env
    sanityWebhookSecret: {
      isSet: secretIsSet,
      preview: secretPreview, // Show only first/last 3 chars for verification
      length: secret?.length ?? 0
    }
  };

  console.log("Env Check Result:", JSON.stringify(responseData, null, 2));

  return NextResponse.json(responseData);
}
