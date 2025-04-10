/**
 * Revalidation API endpoint for Sanity webhooks
 * This handles on-demand revalidation when content is published in Sanity
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
      console.error("Invalid webhook signature");
      return new Response("Invalid signature", { status: 401 });
    }

    // Ensure the body contains a document type
    if (!body?._type) {
      console.error("Webhook body missing _type");
      return new Response("Bad request - missing document type", { status: 400 });
    }

    // Revalidate based on document type
    revalidateTag(body._type);
    
    // Also revalidate specific content if slug is available
    if (body.slug?.current) {
      revalidateTag(`${body._type}-${body.slug.current}`);
    }

    // Return success response
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      type: body._type,
      slug: body.slug?.current
    });
  } catch (error: any) {
    console.error("Revalidation error:", error);
    return new Response(error.message, { status: 500 });
  }
}
