import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './TextArea';
import { Wrapper } from '../../../testUtils/testUtils';

describe('<Textarea />', () => {
  const label = 'Message';
  const helperText = 'Write your message here';
  const errorText = 'Message required';

  it('renders without crashing', () => {
    render(<Textarea />, { wrapper: Wrapper });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Textarea label={label} />, { wrapper: Wrapper });
    expect(screen.getByText(label)).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    const labelEl = screen.getByText(label);
    expect(labelEl).toHaveAttribute('for', textarea.id);
  });

  it('renders with helper text', () => {
    render(<Textarea helperText={helperText} />, { wrapper: Wrapper });
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('renders with error text and sets aria attributes', () => {
    render(<Textarea error={errorText} />, { wrapper: Wrapper });
    expect(screen.getByText(errorText)).toBeInTheDocument();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby');
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent(errorText);
  });

  it('shows error border and ring when error is present', () => {
    render(<Textarea error={errorText} />, { wrapper: Wrapper });
    const textarea = screen.getByRole('textbox');
    expect(textarea.className).toMatch(/border-error/);
  });

  it('renders disabled state', () => {
    render(<Textarea disabled />, { wrapper: Wrapper });
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea.className).toMatch(/disabled/);
  });

  it('forwards className and containerClassName', () => {
    render(<Textarea className="custom-textarea" containerClassName="custom-container" data-testid="textarea" />, { wrapper: Wrapper });
    expect(screen.getByTestId('textarea')).toHaveClass('custom-textarea');
    const container = screen.getByTestId('textarea').parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('supports controlled usage', () => {
    const handleChange = jest.fn();
    render(<Textarea value="test" onChange={handleChange} />, { wrapper: Wrapper });
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('test');
    fireEvent.change(textarea, { target: { value: 'new' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('supports uncontrolled usage', () => {
    render(<Textarea defaultValue="default" />, { wrapper: Wrapper });
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('default');
  });

  it('shows character count when characterLimit is set', () => {
    render(<Textarea characterLimit={10} defaultValue="hello" />, { wrapper: Wrapper });
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('shows error when over character limit', () => {
    render(<Textarea characterLimit={5} defaultValue="toolong" />, { wrapper: Wrapper });
    expect(screen.getByText(/exceeds maximum length/i)).toBeInTheDocument();
    expect(screen.getByText('7/5')).toHaveClass('text-error');
  });
});
