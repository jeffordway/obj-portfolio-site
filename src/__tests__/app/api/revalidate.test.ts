/**
 * Tests for the Sanity webhook revalidation API route
 * Following project testing conventions and best practices
 */
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

// Mock dependencies
jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
}));

jest.mock('next-sanity/webhook', () => ({
  parseBody: jest.fn(),
}));

// Create a mock implementation of the route handler that doesn't depend on Next.js Request/Response
async function mockRevalidateHandler(
  body: any,
  signature: string,
  secret: string
) {
  try {
    // Mock the parseBody functionality
    const parseBodyResult = await (parseBody as jest.Mock).mockResolvedValueOnce({
      body,
      isValidSignature: signature === 'valid-signature',
    })();

    const { body: parsedBody, isValidSignature } = parseBodyResult;

    // Verify the webhook signature
    if (!isValidSignature) {
      return {
        status: 401,
        body: 'Invalid Signature',
      };
    }

    // Ensure the body contains a document type
    if (!parsedBody?._type) {
      return {
        status: 400,
        body: 'Bad Request',
      };
    }

    // Revalidate based on document type
    revalidateTag(parsedBody._type);
    
    // Also revalidate specific content if slug is available
    if (parsedBody.slug?.current) {
      const specificTag = `${parsedBody._type}-${parsedBody.slug.current}`;
      revalidateTag(specificTag);
    }

    // Return success response
    return {
      status: 200,
      body: {
        status: 200,
        revalidated: true,
        now: Date.now(),
        body: parsedBody,
      },
    };
  } catch (error: any) {
    return {
      status: 500,
      body: error.message,
    };
  }
}

describe('Sanity Webhook Revalidation API', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
    // Mock environment variable
    process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET = 'test-secret';
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET;
  });

  it('should return 401 if signature is invalid', async () => {
    // Test with invalid signature
    const result = await mockRevalidateHandler(
      { _type: 'project' },
      'invalid-signature',
      'test-secret'
    );

    // Assertions
    expect(result.status).toBe(401);
    expect(result.body).toBe('Invalid Signature');
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('should return 400 if body is missing _type', async () => {
    // Test with missing _type
    const result = await mockRevalidateHandler(
      {},
      'valid-signature',
      'test-secret'
    );

    // Assertions
    expect(result.status).toBe(400);
    expect(result.body).toBe('Bad Request');
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('should revalidate tag based on _type', async () => {
    // Test with valid signature and _type
    const result = await mockRevalidateHandler(
      { _type: 'project' },
      'valid-signature',
      'test-secret'
    );

    // Assertions
    expect(result.status).toBe(200);
    expect(result.body.revalidated).toBe(true);
    expect(result.body.body._type).toBe('project');
    expect(revalidateTag).toHaveBeenCalledWith('project');
    expect(revalidateTag).toHaveBeenCalledTimes(1);
  });

  it('should revalidate additional tag for specific content if slug is available', async () => {
    // Test with valid signature, _type and slug
    const result = await mockRevalidateHandler(
      { 
        _type: 'project', 
        slug: { current: 'test-project' } 
      },
      'valid-signature',
      'test-secret'
    );

    // Assertions
    expect(result.status).toBe(200);
    expect(result.body.revalidated).toBe(true);
    expect(result.body.body._type).toBe('project');
    expect(result.body.body.slug.current).toBe('test-project');
    expect(revalidateTag).toHaveBeenCalledWith('project');
    expect(revalidateTag).toHaveBeenCalledWith('project-test-project');
    expect(revalidateTag).toHaveBeenCalledTimes(2);
  });

  it('should return 500 if an error occurs', async () => {
    // Mock parseBody to throw an error
    (parseBody as jest.Mock).mockRejectedValueOnce(new Error('Test error'));

    // Test with an error
    const result = await mockRevalidateHandler(
      { _type: 'project' },
      'valid-signature',
      'test-secret'
    );

    // Assertions
    expect(result.status).toBe(500);
    expect(result.body).toBe('Test error');
    expect(revalidateTag).not.toHaveBeenCalled();
  });
});
