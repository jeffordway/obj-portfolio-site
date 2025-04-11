/**
 * Test endpoint for revalidation webhook
 * This allows us to verify that the revalidation API is accessible
 * Based on Sanity's official documentation: https://www.sanity.io/guides/sanity-webhooks-and-on-demand-revalidation-in-nextjs
 */
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    // Extract the tag from query parameters
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag') || 'project';
    
    // Revalidate the specified tag
    revalidateTag(tag);
    
    // Return success response with details
    return NextResponse.json({
      status: 200,
      revalidated: true,
      tag,
      now: Date.now(),
      message: `Successfully revalidated tag: ${tag}`,
      webhookSecret: process.env.SANITY_WEBHOOK_SECRET ? 'Configured (hidden)' : 'Not configured',
      env: process.env.NODE_ENV
    });
  } catch (error: any) {
    // Return error response with details
    console.error("Revalidation test error:", error);
    return new Response(error.message, { status: 500 });
  }
}
