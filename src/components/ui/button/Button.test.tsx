import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { Wrapper } from '../../../testUtils/testUtils';

describe('<Button />', () => {
  it('renders as a button by default', () => {
    render(
      <Button>Click Me</Button>,
      { wrapper: Wrapper }
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Click Me');
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('renders as a submit button', () => {
    render(
      <Button type="submit">Submit</Button>,
      { wrapper: Wrapper }
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('renders as a link when href is provided (internal)', () => {
    render(
      <Button href="/about">Go About</Button>,
      { wrapper: Wrapper }
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
    expect(link).toHaveTextContent('Go About');
  });

  it('renders as an external link', () => {
    render(
      <Button href="https://google.com">External</Button>,
      { wrapper: Wrapper }
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('applies all variants and sizes', () => {
    const variants = ['primary', 'outline', 'link', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    variants.forEach(variant => {
      sizes.forEach(size => {
        render(
          <Button variant={variant} size={size}>{`${variant}-${size}`}</Button>,
          { wrapper: Wrapper }
        );
        expect(screen.getByText(`${variant}-${size}`)).toBeInTheDocument();
      });
    });
  });

  it('renders left and right icons', () => {
    render(
      <Button iconLeft={<span data-testid="icon-left">L</span>} iconRight={<span data-testid="icon-right">R</span>}>
        IconBtn
      </Button>,
      { wrapper: Wrapper }
    );
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('shows spinner and disables when loading', () => {
    render(
      <Button isLoading>Loading</Button>,
      { wrapper: Wrapper }
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner
  });

  it('is disabled when disabled prop is set', () => {
    render(
      <Button disabled>Disabled</Button>,
      { wrapper: Wrapper }
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
  });

  it('forwards className and props', () => {
    render(
      <Button className="test-class" data-testid="btn">Props</Button>,
      { wrapper: Wrapper }
    );
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('test-class');
  });

  it('is accessible via keyboard', () => {
    render(
      <Button>Focusable</Button>,
      { wrapper: Wrapper }
    );
    const btn = screen.getByRole('button');
    btn.focus();
    expect(btn).toHaveFocus();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick}>Click</Button>,
      { wrapper: Wrapper }
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
