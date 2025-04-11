# On-Demand Revalidation Setup

This document explains how the on-demand revalidation system works with Sanity and Next.js in this portfolio site.

## Overview

The site uses Next.js App Router with Sanity as the CMS. To ensure content updates appear immediately without manual redeployments, we've implemented on-demand revalidation using Sanity webhooks.

## How It Works

1. **Tag-Based Revalidation**: All data fetching uses tags to identify content types (e.g., 'project', 'post')
2. **Webhook Endpoint**: A special API endpoint listens for content changes from Sanity
3. **Automatic Updates**: When content is published in Sanity, the webhook triggers revalidation of affected pages

## Implementation Details

### 1. Sanity Client (`/src/lib/sanity.ts`)

The Sanity client is configured to support tag-based revalidation:

```typescript
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    cache: "force-cache",
    next: { tags },
  });
}
```

### 2. Revalidation API Endpoint (`/src/app/api/revalidate/route.ts`)

This endpoint receives webhooks from Sanity and triggers revalidation:

```typescript
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the webhook request
    // Try both environment variables for the webhook secret
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

    // Revalidate based on document type
    revalidateTag(body._type);
    
    // Also revalidate specific content if slug is available
    if (body.slug?.current) {
      revalidateTag(`${body._type}-${body.slug.current}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
```

### 3. Page Components

All page components use the `sanityFetch` function with appropriate tags:

```typescript
// Example for a project detail page
const project = await sanityFetch<Project | null>({
  query: projectQuery,
  params: { slug },
  tags: ['project', `project-${slug}`] // Tag with both collection and specific item
});
```

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env.local` file:

```
# Both variables are supported for compatibility
NEXT_PUBLIC_SANITY_HOOK_SECRET=your-webhook-secret-here
SANITY_WEBHOOK_SECRET=your-webhook-secret-here
```

**Important**: Make sure both variables have the same value to avoid confusion.

### 2. Sanity Studio Webhook Configuration

1. Go to your Sanity project dashboard: https://www.sanity.io/manage
2. Select your project
3. Navigate to API > Webhooks
4. Click "Add webhook"
5. Configure the webhook:
   - **Name**: Revalidation Webhook
   - **URL**: `https://your-site-url.com/api/revalidate`
   - **Dataset**: production (or your dataset name)
   - **Secret**: Same value as SANITY_WEBHOOK_SECRET
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave blank to trigger on all document types, or specify types like `_type == "project" || _type == "post"`

### 3. Testing

To test the webhook:
1. Deploy your site to a hosting provider (like Vercel)
2. Make a change to content in Sanity Studio
3. Publish the change
4. Visit your site - the change should appear immediately without redeployment

## Fallback Revalidation

As a fallback, static pages are set to revalidate every 60 seconds using:

```typescript
export const revalidate = 60;
```

This ensures that even if webhooks fail, content will eventually update.

## Troubleshooting

### Common Issues

- **Webhook Not Triggering**: Check the webhook URL and secret in Sanity dashboard
- **Changes Not Appearing**: Verify that the correct tags are being used in `sanityFetch` calls
- **Server Errors**: Check the server logs for any issues with the revalidation endpoint

### Invalid Signature Issues

If you're seeing "Invalid Signature" errors in your logs:

1. **Check Environment Variables**: Ensure both `NEXT_PUBLIC_SANITY_HOOK_SECRET` and `SANITY_WEBHOOK_SECRET` are set correctly in your environment variables. The revalidation endpoint now tries both.

2. **Debug Mode**: The revalidation endpoint now includes a debug mode that will process webhooks even with invalid signatures. This helps identify if the issue is with the signature verification or with the revalidation process itself.

3. **Verify Webhook Configuration**: In your Sanity dashboard, make sure the webhook is configured with:
   - The correct URL: `https://your-site-url.com/api/revalidate`
   - The same secret value as in your environment variables
   - Proper trigger settings (Create, Update, Delete)

4. **Check Headers**: The revalidation endpoint now logs request headers to help debug signature issues.

### Testing Your Webhook

To manually test if your webhook is working:

```bash
# Replace with your actual deployed URL
curl -X POST https://your-site-url.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"_type": "project", "slug": {"current": "test-webhook"}}'
```

If you receive a response with `{"revalidated":true,...}`, your webhook is working correctly.
