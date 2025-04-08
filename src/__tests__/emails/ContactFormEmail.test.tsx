import React from 'react';
import { render } from '@testing-library/react';
import ContactFormEmail from '@/emails/ContactFormEmail';

// Mock the react-email components
jest.mock('@react-email/components', () => ({
  Html: ({ children, lang }: { children: React.ReactNode; lang: string }) => (
    <div data-testid="html" data-lang={lang}>
      {children}
    </div>
  ),
  Head: () => <div data-testid="head" />,
  Body: ({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) => (
    <div data-testid="body" style={style}>
      {children}
    </div>
  ),
  Container: ({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) => (
    <div data-testid="container" style={style}>
      {children}
    </div>
  ),
  Heading: ({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) => (
    <h1 data-testid="heading" style={style}>
      {children}
    </h1>
  ),
  Text: ({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) => (
    <p data-testid="text" style={style}>
      {children}
    </p>
  ),
  Link: ({ children, href, style }: { children: React.ReactNode; href: string; style: React.CSSProperties }) => (
    <a data-testid="link" href={href} style={style}>
      {children}
    </a>
  ),
  Preview: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="preview">{children}</div>
  ),
}));

describe('ContactFormEmail Component', () => {
  const mockProps = {
    senderName: 'John Doe',
    senderEmail: 'john@example.com',
    subject: 'Test Subject',
    message: 'This is a test message.',
  };

  it('renders with the correct structure', () => {
    const { getByTestId } = render(<ContactFormEmail {...mockProps} />);
    
    // Check if all the main components are rendered
    expect(getByTestId('html')).toBeInTheDocument();
    expect(getByTestId('head')).toBeInTheDocument();
    expect(getByTestId('body')).toBeInTheDocument();
    expect(getByTestId('container')).toBeInTheDocument();
    expect(getByTestId('preview')).toBeInTheDocument();
  });

  it('displays the correct subject in the heading', () => {
    const { getAllByTestId } = render(<ContactFormEmail {...mockProps} />);
    
    // The first heading should contain the subject
    const headings = getAllByTestId('heading');
    expect(headings[0].textContent).toContain(mockProps.subject);
  });

  it('displays the sender information correctly', () => {
    const { getAllByTestId } = render(<ContactFormEmail {...mockProps} />);
    
    const textElements = getAllByTestId('text');
    
    // Check if sender name is displayed
    const nameElement = textElements.find(el => 
      el.textContent?.includes('Name:') && el.textContent?.includes(mockProps.senderName)
    );
    expect(nameElement).toBeInTheDocument();
    
    // Check if sender email is displayed
    const emailElement = textElements.find(el => 
      el.textContent?.includes('Email:')
    );
    expect(emailElement).toBeInTheDocument();
    
    // Check if the email link is correct
    const linkElement = getAllByTestId('link')[0];
    expect(linkElement.getAttribute('href')).toBe(`mailto:${mockProps.senderEmail}`);
    expect(linkElement.textContent).toBe(mockProps.senderEmail);
  });

  it('displays the message content correctly', () => {
    const { getAllByTestId } = render(<ContactFormEmail {...mockProps} />);
    
    const textElements = getAllByTestId('text');
    
    // Check if any text element contains the message
    const hasMessage = textElements.some(el => el.textContent === mockProps.message);
    expect(hasMessage).toBe(true);
  });

  it('has the correct preview text', () => {
    const { getByTestId } = render(<ContactFormEmail {...mockProps} />);
    
    const previewElement = getByTestId('preview');
    expect(previewElement.textContent).toBe('New Contact Form Submission');
  });
});
