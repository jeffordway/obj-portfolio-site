/**
 * Debug endpoint for Sanity webhooks
 * This endpoint logs all request details to help diagnose webhook issues
 */
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  console.log("Webhook debug endpoint called", new Date().toISOString());
  
  try {
    // Get all headers
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    // Get the raw request body
    const rawBody = await req.text();
    
    // Try to parse the body as JSON
    let parsedBody = null;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch (e) {
      console.log("Body is not valid JSON");
    }
    
    // Get the signature from the headers
    const signature = req.headers.get("x-sanity-signature") || "";
    
    // Calculate our own signature for comparison
    let calculatedSignature = "";
    if (process.env.SANITY_WEBHOOK_SECRET) {
      calculatedSignature = crypto
        .createHmac("sha256", process.env.SANITY_WEBHOOK_SECRET)
        .update(Buffer.from(rawBody))
        .digest("hex");
    }
    
    // Compare signatures
    const signaturesMatch = signature === calculatedSignature;
    
    // Prepare the response
    const debugInfo = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      headers,
      rawBodyLength: rawBody.length,
      rawBodyPreview: rawBody.substring(0, 200) + (rawBody.length > 200 ? "..." : ""),
      parsedBody,
      signature: {
        received: signature,
        calculated: calculatedSignature,
        match: signaturesMatch,
        secretConfigured: !!process.env.SANITY_WEBHOOK_SECRET
      },
      environment: process.env.NODE_ENV
    };
    
    // Log the debug info
    console.log("Webhook debug info:", JSON.stringify(debugInfo, null, 2));
    
    // Return the debug info
    return NextResponse.json(debugInfo);
  } catch (error: any) {
    console.error("Webhook debug error:", error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
