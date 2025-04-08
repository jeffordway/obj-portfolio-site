// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { processContactForm } from '@/lib/contact';

// Define the POST handler for the API route
export async function POST(request: NextRequest) {
  try {
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