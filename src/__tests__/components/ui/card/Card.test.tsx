import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/card/Card';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="next-image" />
  ),
}));

// Mock the Text component since we're only testing Card functionality
jest.mock('@/components/ui/typography/Text', () => ({
  Text: ({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) => (
    <div data-testid={`text-${variant || 'default'}`} className={className}>
      {children}
    </div>
  ),
}));

// Mock the Button component
jest.mock('@/components/ui/button/Button', () => ({
  Button: ({ children, variant, size, className, iconRight }: { 
    children: React.ReactNode; 
    variant?: string; 
    size?: string;
    className?: string;
    iconRight?: React.ReactNode;
  }) => (
    <button data-testid={`button-${variant || 'default'}`} className={className}>
      {children}
      {iconRight && <span data-testid="button-icon">{iconRight}</span>}
    </button>
  ),
}));

// Mock the Tag component
jest.mock('@/components/ui/tag/Tag', () => ({
  Tag: ({ label, showTooltip }: { label: string; showTooltip?: boolean }) => (
    <span data-testid="tag" data-show-tooltip={showTooltip?.toString()}>
      {label}
    </span>
  ),
}));

// Mock the RiArrowRightLine icon
jest.mock('@remixicon/react', () => ({
  RiArrowRightLine: () => <span data-testid="arrow-icon">→</span>,
}));

describe('Card Component', () => {
  const defaultProps = {
    imageUrl: 'https://example.com/test-image.jpg',
    imageAlt: 'Test image',
  };

  it('renders the image with correct props', () => {
    render(<Card {...defaultProps} />);
    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Test image');
    expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
  });

  it('renders as a link when href is provided', () => {
    render(<Card {...defaultProps} href="/test-link" />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-link');
  });

  it('renders title and description when provided', () => {
    render(
      <Card
        {...defaultProps}
        title="Test Title"
        description="Test Description"
      />
    );
    
    const title = screen.getByTestId('text-heading');
    const description = screen.getByTestId('text-body-sm');
    
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Test Title');
    expect(description).toBeInTheDocument();
    expect(description.textContent).toBe('Test Description');
  });

  it('renders tags when provided', () => {
    render(
      <Card
        {...defaultProps}
        title="Test Title"
        tags={['Tag1', 'Tag2']}
      />
    );
    
    const tags = screen.getAllByTestId('tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toBe('Tag1');
    expect(tags[1].textContent).toBe('Tag2');
  });

  it('renders a Learn More button when href is provided', () => {
    render(
      <Card
        {...defaultProps}
        title="Test Title"
        href="/test-link"
      />
    );
    
    const button = screen.getByTestId('button-ghost');
    const icon = screen.getByTestId('button-icon');
    
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain('Learn More');
    expect(icon).toBeInTheDocument();
  });

  it('does not render overlay when hoverEffect is false', () => {
    render(
      <Card
        {...defaultProps}
        title="Test Title"
        description="Test Description"
        hoverEffect={false}
      />
    );
    
    const title = screen.queryByTestId('text-heading');
    expect(title).not.toBeInTheDocument();
  });
});
