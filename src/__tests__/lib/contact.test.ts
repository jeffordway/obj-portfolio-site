import { processContactForm } from '@/lib/contact';
import { Resend } from 'resend';

// Mock the Resend library
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockImplementation(() => {
          // Mock successful response by default
          return Promise.resolve({
            data: { id: 'test-email-id' },
            error: null,
          });
        }),
      },
    })),
  };
});

// Mock the ContactFormEmail component
jest.mock('@/emails/ContactFormEmail', () => {
  return {
    __esModule: true,
    default: ({ senderName, senderEmail, subject, message }: {
      senderName: string;
      senderEmail: string;
      subject: string;
      message: string;
    }) => null,
  };
});

describe('Contact Form Processing', () => {
  // Setup and teardown for environment variables
  const originalEnv = process.env;
  
  beforeEach(() => {
    jest.resetModules();
    process.env = { 
      ...originalEnv,
      RESEND_API_KEY: 'test-api-key',
      CONTACT_FORM_FROM_EMAIL: 'test-from@example.com',
      CONTACT_FORM_TO_EMAIL: 'test-to@example.com',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('should successfully process valid form data', async () => {
    // Valid form data
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with sufficient length.',
    };

    // Process the form data
    const result = await processContactForm(
      formData,
      'test-api-key',
      'test-from@example.com',
      'test-to@example.com'
    );

    // Check the result
    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
    expect(result.data).toBeDefined();
    expect(result.data?.id).toBe('test-email-id');
  });

  it('should return validation errors for invalid data', async () => {
    // Invalid form data
    const formData = {
      name: '',
      email: 'invalid-email',
      subject: '',
      message: 'Short',
    };

    // Process the form data
    const result = await processContactForm(
      formData,
      'test-api-key',
      'test-from@example.com',
      'test-to@example.com'
    );

    // Check the result
    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
    expect(result.error?.message).toBe('Invalid input.');
    expect(result.error?.details).toBeDefined();
    
    // Check specific validation errors
    const details = result.error?.details;
    expect(details?.name).toBeDefined();
    expect(details?.email).toBeDefined();
    expect(details?.message).toBeDefined();
  });

  it('should handle missing API key', async () => {
    // Valid form data
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with sufficient length.',
    };

    // Process the form data with missing API key
    const result = await processContactForm(
      formData,
      undefined,
      'test-from@example.com',
      'test-to@example.com'
    );

    // Check the result
    expect(result.success).toBe(false);
    expect(result.status).toBe(500);
    expect(result.error?.message).toBe('Server configuration error: Missing API key');
  });

  it('should handle missing recipient email', async () => {
    // Valid form data
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with sufficient length.',
    };

    // Process the form data with missing recipient email
    const result = await processContactForm(
      formData,
      'test-api-key',
      'test-from@example.com',
      undefined
    );

    // Check the result
    expect(result.success).toBe(false);
    expect(result.status).toBe(500);
    expect(result.error?.message).toBe('Server configuration error: Missing recipient email');
  });

  it('should handle Resend API errors', async () => {
    // Mock the Resend library to return an error
    const mockSend = jest.fn().mockResolvedValue({
      data: null,
      error: {
        message: 'Resend API error',
        name: 'ResendError',
        statusCode: 400,
      },
    });
    
    (Resend as jest.Mock).mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    }));

    // Valid form data
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with sufficient length.',
    };

    // Process the form data
    const result = await processContactForm(
      formData,
      'test-api-key',
      'test-from@example.com',
      'test-to@example.com'
    );

    // Check the result
    expect(result.success).toBe(false);
    expect(result.status).toBe(500);
    expect(result.error?.message).toBe('Failed to send email');
    expect(result.error?.details?.error).toContain('Resend API error');
  });

  it('should handle unexpected errors', async () => {
    // Mock the Resend library to throw an error
    (Resend as jest.Mock).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    // Valid form data
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with sufficient length.',
    };

    // Process the form data
    const result = await processContactForm(
      formData,
      'test-api-key',
      'test-from@example.com',
      'test-to@example.com'
    );

    // Check the result
    expect(result.success).toBe(false);
    expect(result.status).toBe(500);
    expect(result.error?.message).toBe('Internal Server Error');
    expect(result.error?.details?.error).toContain('Unexpected error');
  });
});
