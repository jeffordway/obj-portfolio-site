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
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string } | undefined;
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    // Verify the webhook signature
    if (!isValidSignature) {
      console.error("Invalid signature");
      return new Response("Invalid Signature", { status: 401 });
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
