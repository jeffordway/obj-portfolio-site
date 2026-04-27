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
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown'
  return ip
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
        ? { message: 'Email sent successfully!', data: result.data }
        : { error: result.error?.message, details: result.error?.details },
      { status: result.status }
    );

  } catch (err) {
    // Handle unexpected errors
    console.error('API Route Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}