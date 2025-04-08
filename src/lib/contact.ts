import { Resend } from 'resend';
import * as React from 'react';
import { z } from 'zod';
import ContactFormEmail from '@/emails/ContactFormEmail';

// Define the Zod schema for validation
export const ContactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message cannot exceed 500 characters.' }),
});

// Define the types for our function
export type ContactFormData = z.infer<typeof ContactFormSchema>;

export type ContactFormResult = {
  success: boolean;
  data?: {
    id: string;
    [key: string]: unknown;
  } | null;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status: number;
};

/**
 * Process a contact form submission
 * @param formData The form data to process
 * @param resendApiKey The Resend API key
 * @param fromEmail The email address to send from
 * @param toEmail The email address to send to
 * @returns A result object with success status, data, error, and HTTP status code
 */
export async function processContactForm(
  formData: unknown,
  resendApiKey: string | undefined,
  fromEmail: string | undefined,
  toEmail: string | undefined
): Promise<ContactFormResult> {
  try {
    // Validate the form data using Zod
    const validationResult = ContactFormSchema.safeParse(formData);

    if (!validationResult.success) {
      // If validation fails, return detailed errors
      return {
        success: false,
        error: {
          message: 'Invalid input.',
          details: validationResult.error.flatten().fieldErrors,
        },
        status: 400,
      };
    }

    // Use validated data
    const { name, email, subject, message } = validationResult.data;

    // Check for required configuration
    if (!resendApiKey) {
      return {
        success: false,
        error: {
          message: 'Server configuration error: Missing API key',
        },
        status: 500,
      };
    }

    if (!toEmail) {
      return {
        success: false,
        error: {
          message: 'Server configuration error: Missing recipient email',
        },
        status: 500,
      };
    }

    // Determine the 'from' address
    const fromAddress = fromEmail || 'onboarding@resend.dev';

    // Instantiate Resend with the API key
    const resend = new Resend(resendApiKey);

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `Contact Form - Jeff Ordway Portfolio <${fromAddress}>`,
      to: [toEmail],
      subject: `New message from ${name}: ${subject}`,
      replyTo: email,
      react: React.createElement(ContactFormEmail, {
        senderName: name,
        senderEmail: email,
        subject,
        message,
      }),
    });

    // Handle potential errors from Resend
    if (error) {
      return {
        success: false,
        error: {
          message: 'Failed to send email',
          details: { error: [error.message] },
        },
        status: 500,
      };
    }

    // Return a success response with proper type handling
    return {
      success: true,
      data: data ? {
        id: data.id,
        // Include other properties from data except id to avoid duplication
        ...(Object.entries(data)
          .filter(([key]) => key !== 'id')
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}))
      } : null,
      status: 200,
    };
  } catch (err) {
    // Handle other errors
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return {
      success: false,
      error: {
        message: 'Internal Server Error',
        details: { error: [errorMessage] },
      },
      status: 500,
    };
  }
}
