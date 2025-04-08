// src/app/api/send-email/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
import { z } from 'zod';
import ContactFormEmail from '@/emails/ContactFormEmail';

// Define the Zod schema for validation
const ContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message cannot exceed 500 characters.' }),
});

// Instantiate Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the POST handler for the API route
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the request body using Zod
    const validationResult = ContactFormSchema.safeParse(body);

    if (!validationResult.success) {
      // If validation fails, return detailed errors
      return NextResponse.json(
        { 
          error: 'Invalid input.', 
          details: validationResult.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    // Use validated data
    const { name, email, subject, message } = validationResult.data;

    // Determine the 'from' address
    const fromAddress = process.env.CONTACT_FORM_FROM_EMAIL || 'onboarding@resend.dev';
    // Determine the 'to' address
    const toAddress = process.env.CONTACT_FORM_TO_EMAIL;

    if (!toAddress) {
       console.error('CONTACT_FORM_TO_EMAIL environment variable is not set.');
       return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `Contact Form - Jeff Ordway Portfolio <${fromAddress}>`, 
      to: [toAddress], // The email address you want to receive messages at
      subject: `New message from ${name}: ${subject}`,
      replyTo: email, // Set the sender's email as the reply-to address
      react: React.createElement(ContactFormEmail, {
        senderName: name,
        senderEmail: email,
        subject,
        message,
      }),
    });

    // Handle potential errors from Resend
    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
    }

    // Return a success response
    console.log('Email sent successfully:', data);
    return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });

  } catch (err) {
    // Handle other errors (e.g., JSON parsing issues)
    console.error('API Route Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}