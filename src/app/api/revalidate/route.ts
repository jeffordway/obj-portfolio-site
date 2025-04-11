/**
 * Revalidation API endpoint for Sanity webhooks
 * This handles on-demand revalidation when content is published in Sanity
 * Based on Sanity's official documentation: https://www.sanity.io/guides/sanity-webhooks-and-on-demand-revalidation-in-nextjs
 */
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the webhook request
    // Try both environment variables for the webhook secret
    // NEXT_PUBLIC_SANITY_HOOK_SECRET is recommended in Sanity docs
    // SANITY_WEBHOOK_SECRET might be used in some configurations
    const secret = process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET || process.env.SANITY_WEBHOOK_SECRET;
    
    console.log(`Webhook received for revalidation. Using secret: ${secret ? 'Secret exists' : 'No secret found'}`); 
    
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string } | undefined;
    }>(req, secret);

    // Verify the webhook signature
    if (!isValidSignature) {
      console.error("Invalid signature for webhook");
      console.log(`Request headers: ${JSON.stringify(Object.fromEntries(req.headers.entries()))}`);
      
      // For debugging purposes, we'll still process the webhook
      // Remove this in production once everything is working
      console.log("DEBUG MODE: Processing webhook despite invalid signature");
    } else {
      console.log("Valid signature confirmed for webhook");
    }

    // Ensure the body contains a document type
    if (!body?._type) {
      console.error("Bad request - missing document type");
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate based on document type
    console.log(`Revalidating tag: ${body._type}`);
    revalidateTag(body._type);
    
    // Also revalidate specific content if slug is available
    if (body.slug?.current) {
      const specificTag = `${body._type}-${body.slug.current}`;
      console.log(`Revalidating specific tag: ${specificTag}`);
      revalidateTag(specificTag);
    }
    
    // For new content, we need to revalidate the relevant collection pages
    // This ensures new content appears on list pages without requiring a redeployment
    switch (body._type) {
      case 'project':
        console.log('Revalidating projects collection');
        revalidateTag('projects-collection');
        break;
      case 'category':
        console.log('Revalidating categories collection');
        revalidateTag('categories-collection');
        // Also revalidate projects since they display categories
        revalidateTag('projects-collection');
        break;
      case 'skill':
        console.log('Revalidating skills collection');
        revalidateTag('skills-collection');
        break;
      default:
        // For any other content type, revalidate a general content tag
        console.log(`Revalidating general content for type: ${body._type}`);
        revalidateTag('content');
    }

    // Return success response
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body
    });
  } catch (error: any) {
    console.error("Revalidation error:", error);
    return new Response(error.message, { status: 500 });
  }
}
