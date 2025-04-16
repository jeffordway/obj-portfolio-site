import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExternalLink } from './ExternalLink';

describe('<ExternalLink />', () => {
  const url = 'https://example.com';
  const label = 'Visit Example';

  it('renders children', () => {
    render(<ExternalLink href={url}>{label}</ExternalLink>);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('sets correct href, target, and rel attributes', () => {
    render(<ExternalLink href={url}>{label}</ExternalLink>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies custom className', () => {
    render(
      <ExternalLink href={url} className="custom-class">{label}</ExternalLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });

  it('uses provided aria-label and appends accessibility note', () => {
    render(
      <ExternalLink href={url} ariaLabel="Custom label">{label}</ExternalLink>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Custom label (opens in new tab)');
  });

  it('infers aria-label from string children and appends accessibility note', () => {
    render(<ExternalLink href={url}>{label}</ExternalLink>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', `${label} (opens in new tab)`);
  });

  it('does not set aria-label if children are not a string and no ariaLabel is given', () => {
    render(
      <ExternalLink href={url}><span data-testid="icon" /></ExternalLink>
    );
    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('aria-label');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ExternalLink href={url} onClick={handleClick}>{label}</ExternalLink>);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalled();
  });
});
