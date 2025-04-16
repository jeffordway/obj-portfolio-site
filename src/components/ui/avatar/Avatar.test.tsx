import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { Wrapper } from '../../../testUtils/testUtils';

describe('<Avatar />', () => {
  const alt = 'User Avatar';
  const src = '/test-avatar.jpg';

  it('renders an image when src is provided', () => {
    render(<Avatar src={src} alt={alt} />, { wrapper: Wrapper });
    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass('object-cover');
  });

  it('renders a placeholder when src is missing', () => {
    render(<Avatar alt={alt} />, { wrapper: Wrapper });
    const placeholder = screen.getByRole('img');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute('aria-label', alt);
  });

  it('applies the correct size classes', () => {
    render(<Avatar src={src} alt={alt} size="lg" />, { wrapper: Wrapper });
    const wrapperEl = screen.getByAltText(alt).closest('span');
    expect(wrapperEl).toHaveStyle({ width: '120px', height: '120px' });
  });

  it('applies the correct border width classes', () => {
    render(<Avatar src={src} alt={alt} borderWidth="md" />, { wrapper: Wrapper });
    const wrapperEl = screen.getByAltText(alt).closest('span');
    expect(wrapperEl).toHaveClass('border-4');
  });

  it('forwards className and props to span', () => {
    render(<Avatar src={src} alt={alt} className="custom-avatar" data-testid="avatar-span" />, { wrapper: Wrapper });
    const wrapperEl = screen.getByTestId('avatar-span');
    expect(wrapperEl).toHaveClass('custom-avatar');
  });

  it('forwards image props to Image', () => {
    render(<Avatar src={src} alt={alt} priority quality={90} />, { wrapper: Wrapper });
    const img = screen.getByAltText(alt);
    // We can't check Next.js Image internals, but we can check that the image is rendered
    expect(img).toBeInTheDocument();
  });

  it('is accessible with role and aria-label for placeholder', () => {
    render(<Avatar alt={alt} />, { wrapper: Wrapper });
    const placeholder = screen.getByRole('img');
    expect(placeholder).toHaveAttribute('aria-label', alt);
  });
});
