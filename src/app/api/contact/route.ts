// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { processContactForm } from '@/lib/contact';

// Simple in-memory rate limiter
// In production, consider using Redis or a dedicated rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // 5 requests per minute

function getRateLimitKey(request: NextRequest): string {
  // Use IP address as the rate limit key
  // x-forwarded-for can be a comma-separated list. The first entry is the client.
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip') || 'unknown'
}

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (record.count >= MAX_REQUESTS) {
    return false
  }
  
  record.count++
  return true
}

// Define the POST handler for the API route
export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse the request body
    const body = await request.json();

    // Honeypot: real visitors never see or fill the "website" field.
    // Bots usually fill every field. Pretend it worked and send nothing.
    if (body && typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    }

    // Process the contact form submission
    const result = await processContactForm(
      body,
      process.env.RESEND_API_KEY,
      process.env.CONTACT_FORM_FROM_EMAIL,
      process.env.CONTACT_FORM_TO_EMAIL
    );

    // Log the result
    if (result.success) {
      console.log('Email sent successfully:', result.data);
    } else {
      console.error('Failed to send email:', result.error);
    }

    // Return the appropriate response
    return NextResponse.json(
      result.success
        ? { message: 'Email sent successfully!' }
        : {
            error: result.error?.message,
            // Field errors help the visitor fix the form. Server errors stay in the logs.
            details: result.status === 400 ? result.error?.details : undefined,
          },
      { status: result.status }
    );

  } catch (err) {
    // Handle unexpected errors
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}