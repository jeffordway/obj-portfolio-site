import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { Wrapper } from '../../../testUtils/testUtils';

// Mock next/image for Jest (if not already globally mocked)
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Omit next/image-only props that are not valid on <img />
    // eslint-disable-next-line jsx-a11y/alt-text
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  },
}));

describe('<Card />', () => {
  const defaultProps = {
    imageUrl: '/test.jpg',
    imageAlt: 'Test image',
    title: 'Test Card',
    description: 'This is a test card.',
    label: 'Test',
  };

  it('renders with required props', () => {
    render(<Card {...defaultProps} />, { wrapper: Wrapper });
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('This is a test card.')).toBeInTheDocument();
  });

  it('renders tags if provided', () => {
    render(
      <Card {...defaultProps} tags={['Alpha', 'Beta']} />, { wrapper: Wrapper }
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders as a link if href is provided', () => {
    render(<Card {...defaultProps} href="/details" />, { wrapper: Wrapper });
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/details');
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card {...defaultProps} className="custom-class" />, { wrapper: Wrapper });
    const container = screen.getByAltText('Test image').closest('div, a');
    expect(container).toHaveClass('custom-class');
  });

  it('renders children if passed', () => {
    render(
      <Card {...defaultProps}>
        <span data-testid="extra">Extra Content</span>
      </Card>,
      { wrapper: Wrapper }
    );
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });


  it('is accessible with alt text and role', () => {
    render(<Card {...defaultProps} />, { wrapper: Wrapper });
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    // The card is a region if no href, or a link if href
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  // Add more tests for hoverEffect, overlay, and edge cases as needed
});
