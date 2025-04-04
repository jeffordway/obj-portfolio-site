"use client";

import * as React from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/TextArea";
import { Button } from "@/components/ui/button/Button"; 
import { Text } from "@/components/ui/typography/Text";
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
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<FormStatus>("idle");

  const handleChange =
    (fieldName: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, [fieldName]: value }));

      // Clear error for this field on change
      if (errors[fieldName]) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
    setStatus("submitting");
    
    // Check message length before validation
    // This allows typing beyond the limit but prevents submission
    if (formData.message.length > 500) {
      setErrors({
        message: "Message exceeds maximum length of 500 characters"
      });
      setStatus("idle");
      
      // Focus the message field
      document.querySelector<HTMLElement>('[name="message"]')?.focus();
      return;
    }

    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("idle");

      // Focus the first field with an error
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        const element = document.querySelector<HTMLElement>(
          `[name="${firstErrorField}"]`
        );
        element?.focus();
      }
      return;
    }

    // --- API Submission ---
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API error");
      }

      // Success
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form

      // Optional: Reset to idle after a delay
      // setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
      // Optional: Add a more specific error message to the state
      // setErrors({ form: error instanceof Error ? error.message : 'An unknown error occurred' });

      // Optional: Reset to idle after a delay
      // setTimeout(() => setStatus('idle'), 5000);
    }
  };

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
          onClick={() => setStatus("idle")} // Reset to show form again
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
        value={formData.name}
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
        value={formData.email}
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
        value={formData.subject}
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
        value={formData.message}
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
