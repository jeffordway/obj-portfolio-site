import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { Wrapper } from '../../../testUtils/testUtils';

describe('<Input />', () => {
  const label = 'Username';
  const helperText = 'Enter your username';
  const errorText = 'This field is required';

  it('renders without crashing', () => {
    render(<Input />, { wrapper: Wrapper });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Input label={label} /> , { wrapper: Wrapper });
    expect(screen.getByText(label)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    const labelEl = screen.getByText(label);
    expect(labelEl).toHaveAttribute('for', input.id);
  });

  it('renders with helper text', () => {
    render(<Input helperText={helperText} />, { wrapper: Wrapper });
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('renders with error text and sets aria attributes', () => {
    render(<Input error={errorText} />, { wrapper: Wrapper });
    expect(screen.getByText(errorText)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent(errorText);
  });

  it('shows error border and ring when error is present', () => {
    render(<Input error={errorText} />, { wrapper: Wrapper });
    const input = screen.getByRole('textbox');
    expect(input.className).toMatch(/border-error/);
  });

  it('renders disabled state', () => {
    render(<Input disabled />, { wrapper: Wrapper });
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input.className).toMatch(/disabled/);
  });

  it('forwards className and containerClassName', () => {
    render(<Input className="custom-input" containerClassName="custom-container" data-testid="input" />, { wrapper: Wrapper });
    expect(screen.getByTestId('input')).toHaveClass('custom-input');
    // Check container
    const container = screen.getByTestId('input').parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('supports controlled usage', () => {
    const handleChange = jest.fn();
    render(<Input value="test" onChange={handleChange} />, { wrapper: Wrapper });
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test');
    fireEvent.change(input, { target: { value: 'new' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports uncontrolled usage', () => {
    render(<Input defaultValue="default" />, { wrapper: Wrapper });
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('default');
  });
});
