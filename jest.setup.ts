// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock next/image since it's not available in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(({ src, alt }) => {
    return { src, alt, height: 100, width: 100 };
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  })),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({ get: jest.fn() })),
  useParams: jest.fn(() => ({})),
}));

// Mock the Sanity client
jest.mock('next-sanity', () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(),
  })),
  groq: jest.fn((query) => query),
}));

// Mock the Sanity image URL builder
jest.mock('@/sanity/lib/image', () => ({
  urlFor: jest.fn(() => ({
    width: jest.fn().mockReturnThis(),
    height: jest.fn().mockReturnThis(),
    quality: jest.fn().mockReturnThis(),
    url: jest.fn().mockReturnValue('https://example.com/mock-image.jpg'),
  })),
}));
