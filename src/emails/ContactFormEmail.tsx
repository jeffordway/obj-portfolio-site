import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Link,
  Preview,
} from "@react-email/components";

interface ContactFormEmailProps {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
}

const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
  senderName,
  senderEmail,
  subject,
  message,
}) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>New Contact Form Submission</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Message: {subject}</Heading>
          <Text style={paragraph}>You received a new message from:</Text>
          <Text style={paragraph}>
            <strong>Name:</strong> {senderName}
          </Text>
          <Text style={paragraph}>
            <strong>Email:</strong>{" "}
            <Link href={`mailto:${senderEmail}`} style={linkStyle}>
              {senderEmail}
            </Link>
          </Text>
          <Text style={paragraph}>
            <strong>Subject:</strong> {subject}
          </Text>
          <Heading style={subHeading}>Message:</Heading>
          <Text style={messageBox}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
};

ContactFormEmail.displayName = "ContactFormEmail";

export default ContactFormEmail;

// Basic styles (inline for compatibility)
const main = {
  backgroundColor: "#fafafa",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #e5e7eb",
  borderRadius: "4px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "0",
  textAlign: "center" as const,
  padding: "20px 20px 10px 20px",
  color: "#18181b",
};

const subHeading = {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "32px",
  padding: "0 20px 10px 20px",
  color: "#18181b",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  padding: "0 20px",
  color: "#18181b",
};

// Style for the email link
const linkStyle = {
  color: "#0284c7",
  textDecoration: "underline",
};

const messageBox = {
  border: "1px solid #e5e7eb",
  borderRadius: "4px",
  padding: "15px",
  margin: "0 20px",
  fontSize: "14px",
  lineHeight: "20px",
  color: "#18181b",
  backgroundColor: "#f4f4f5",
  whiteSpace: "pre-wrap" as const,
};
