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
    // Server-only secret. Never use a NEXT_PUBLIC_ variable for this:
    // those can end up in the browser bundle.
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("SANITY_WEBHOOK_SECRET is not set. Refusing webhook.");
      return new Response("Server configuration error", { status: 500 });
    }

    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string } | undefined;
    }>(req, secret);

    // Reject anything that is not signed with our secret
    if (!isValidSignature) {
      console.error("Invalid signature for webhook");
      return new Response("Invalid signature", { status: 401 });
    }

    // Ensure the body contains a document type
    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate based on document type
    revalidateTag(body._type, {});

    // Also revalidate specific content if slug is available
    if (body.slug?.current) {
      revalidateTag(`${body._type}-${body.slug.current}`, {});
    }

    // For new content, we need to revalidate the relevant collection pages
    // This ensures new content appears on list pages without requiring a redeployment
    switch (body._type) {
      case "project":
        revalidateTag("projects-collection", {});
        break;
      case "category":
        revalidateTag("categories-collection", {});
        // Also revalidate projects since they display categories
        revalidateTag("projects-collection", {});
        break;
      case "skill":
        revalidateTag("skills-collection", {});
        break;
      default:
        revalidateTag("content", {});
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    // Log the detail on the server, but do not send it to the caller
    console.error("Revalidation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
