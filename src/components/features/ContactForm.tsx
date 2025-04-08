"use client";

import * as React from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/TextArea";
import { Button } from "@/components/ui/button/Button"; 
import { Text } from "@/components/ui/typography/Text";
import { useForm } from "@/hooks/useForm";
import {
  RiCheckLine,
  RiCloseLine,
  RiLoader4Line,
} from "@remixicon/react";

// --- Validation Schema ---
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message cannot exceed 500 characters" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type FormStatus = "idle" | "submitting" | "success" | "error";
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

// --- Component Props ---
export interface ContactFormProps {
  className?: string;
}

// --- Contact Form Component ---
export function ContactForm({ className }: ContactFormProps) {
  // Initialize the form using our custom hook
  const {
    values,
    errors,
    status,
    handleChange,
    handleSubmit,
    resetForm,
    setStatus
  } = useForm<ContactFormData>({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit: async (data) => {
      // Check message length before submission (custom validation)
      if (data.message.length > 500) {
        throw new Error("Message exceeds maximum length of 500 characters");
      }
      
      // API Submission
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API error");
      }
    },
  });

  // --- Render Logic ---

  if (status === "success") {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-success/10 text-success">
          <RiCheckLine className="w-8 h-8" />
        </div>
        <Text variant="heading" as="h3" className="mb-2">
          Message Sent!
        </Text>
        <Text variant="body" className="mb-6 text-foreground/80">
          Thank you for reaching out. I&apos;ll get back to you soon.
        </Text>
        <Button
          variant="outline"
          onClick={() => resetForm()} // Use resetForm from our hook
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-error/10 text-error">
          <RiCloseLine className="w-8 h-8" />
        </div>
        <Text variant="heading" as="h3" className="mb-2">
          Something Went Wrong
        </Text>
        <Text variant="body" className="mb-6 text-foreground/80">
          There was an error sending your message. Please try again.
          {/* Optional: Display specific error if available: errors.form */} 
        </Text>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Try Again
        </Button>
      </div>
    );
  }

  // --- Default Form View ---
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)} noValidate>
      <Input
        label="Name"
        name="name"
        id="contact-name"
        placeholder="Your name"
        value={values.name}
        onChange={handleChange("name")}
        error={errors.name}
        required
        disabled={status === "submitting"}
      />
      <Input
        label="Email"
        name="email"
        id="contact-email"
        type="email"
        placeholder="your.email@example.com"
        value={values.email}
        onChange={handleChange("email")}
        error={errors.email}
        required
        disabled={status === "submitting"}
      />
      <Input
        label="Subject"
        name="subject"
        id="contact-subject"
        placeholder="What is this regarding?"
        value={values.subject}
        onChange={handleChange("subject")}
        error={errors.subject}
        required
        disabled={status === "submitting"}
      />
      <Textarea
        label="Message"
        name="message"
        id="contact-message"
        placeholder="Your message here..."
        value={values.message}
        onChange={handleChange("message")}
        error={errors.message}
        rows={10}
        characterLimit={500}
        showCharCount
        helperText="Please be concise and specific about your inquiry."
        required
        disabled={status === "submitting"}
      />
      <div className="flex justify-start">
        <Button
          type="submit"
          variant="primary" 
          size="lg"
          disabled={status === "submitting"}
          className="min-w-[160px]" 
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center">
              <RiLoader4Line className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}

ContactForm.displayName = "ContactForm";
