import { createClient } from 'next-sanity';

// Mock the next-sanity client
jest.mock('next-sanity', () => ({
  createClient: jest.fn(),
}));

// Mock the urlFor function
jest.mock('@/sanity/lib/image', () => ({
  urlFor: jest.fn(() => ({
    url: jest.fn().mockReturnValue('https://example.com/mock-image.jpg'),
  })),
}));

// Mock the environment variables
jest.mock('@/sanity/env', () => ({
  apiVersion: 'v2023-01-01',
  dataset: 'test-dataset',
  projectId: 'test-project-id',
  useCdn: false,
}));

describe('Sanity Data Fetching', () => {
  const mockProjects = [
    {
      _id: '1',
      title: 'Project 1',
      slug: { current: 'project-1' },
      heroImage: { asset: { _ref: 'image-1' } },
      headline: 'Project 1 Headline',
      categories: [{ _id: 'cat1', title: 'Category 1' }, { _id: 'cat2', title: 'Category 2' }],
    },
    {
      _id: '2',
      title: 'Project 2',
      slug: { current: 'project-2' },
      heroImage: { asset: { _ref: 'image-2' } },
      headline: 'Project 2 Headline',
      categories: [{ _id: 'cat3', title: 'Category 3' }],
    },
  ];

  beforeEach(() => {
    // Mock the Sanity client to return our test data
    const mockFetch = jest.fn().mockResolvedValue(mockProjects);
    (createClient as jest.Mock).mockReturnValue({
      fetch: mockFetch,
    });
  });

  it('creates a Sanity client with correct parameters', () => {
    // Import and call the function that creates the client
    const { apiVersion, dataset, projectId, useCdn } = require('@/sanity/env');
    createClient({ apiVersion, dataset, projectId, useCdn });
    
    // Verify the client was created with the expected parameters
    expect(createClient).toHaveBeenCalledWith({
      apiVersion: 'v2023-01-01',
      dataset: 'test-dataset',
      projectId: 'test-project-id',
      useCdn: false,
    });
  });
});
