import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { Wrapper } from '../../../testUtils/testUtils';

describe('<Checkbox />', () => {
  const label = 'Accept Terms';

  it('renders without crashing', () => {
    render(<Checkbox />, { wrapper: Wrapper });
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Checkbox label={label} />, { wrapper: Wrapper });
    expect(screen.getByText(label)).toBeInTheDocument();
    // Label text should be associated with the input
    const input = screen.getByRole('checkbox');
    expect(input.id).toBeTruthy();
    const labelEl = screen.getByText(label).closest('label');
    expect(labelEl).toContainElement(input);
  });

  it('renders checked state (controlled)', () => {
    render(<Checkbox checked={true} onChange={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders unchecked state (controlled)', () => {
    render(<Checkbox checked={false} onChange={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('supports uncontrolled usage', () => {
    render(<Checkbox defaultChecked onChange={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when toggled', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />, { wrapper: Wrapper });
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    render(<Checkbox disabled />, { wrapper: Wrapper });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('forwards boxClassName and className to the correct elements', () => {
    render(
      <Checkbox boxClassName="custom-box" className="custom-label" label={label} />, { wrapper: Wrapper }
    );
    const input = screen.getByRole('checkbox');
    // Visual box is the next sibling of the input's parent
    const visualBox = input.parentElement?.querySelector('div > div');
    expect(visualBox).toHaveClass('custom-box');
    // Root label
    const labelEl = input.closest('label');
    expect(labelEl).toHaveClass('custom-label');
  });

  it('checkmark icon is visible only when checked', () => {
    const { rerender } = render(<Checkbox checked={false} />, { wrapper: Wrapper });
    let icon = screen.getByRole('checkbox').parentElement?.querySelector('svg');
    expect(icon).toHaveClass('opacity-0');
    rerender(<Checkbox checked={true} onChange={() => {}} />);
    icon = screen.getByRole('checkbox').parentElement?.querySelector('svg');
    expect(icon).toHaveClass('opacity-100');
  });

  it('receives focus via keyboard navigation (tab)', () => {
    render(<Checkbox label={label} />, { wrapper: Wrapper });
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });


  it('has correct aria attributes', () => {
    render(<Checkbox label={label} checked disabled onChange={() => {}} />, { wrapper: Wrapper });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
  });

  it('label click toggles the checkbox and fires onChange', () => {
    const handleChange = jest.fn();
    render(<Checkbox label={label} onChange={handleChange} />, { wrapper: Wrapper });
    const labelEl = screen.getByText(label);
    fireEvent.click(labelEl);
    expect(handleChange).toHaveBeenCalled();
  });

  it('uses custom id if provided', () => {
    render(<Checkbox label={label} id="custom-id" />, { wrapper: Wrapper });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.id).toBe('custom-id');
    // Label htmlFor should match
    const labelEl = screen.getByText(label).closest('label');
    expect(labelEl).toHaveAttribute('for', 'custom-id');
  });

  it('forwards extra props (data-testid, aria-label)', () => {
    render(<Checkbox data-testid="my-checkbox" aria-label="My Checkbox" />, { wrapper: Wrapper });
    const checkbox = screen.getByTestId('my-checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'My Checkbox');
  });

  // If error/helper text is supported, add tests here (pseudo-example):
  // it('renders error/helper text and associates with input', () => {
  //   render(<Checkbox label={label} error="Required" helperText="Helpful info" />, { wrapper: Wrapper });
  //   expect(screen.getByText('Required')).toBeInTheDocument();
  //   expect(screen.getByText('Helpful info')).toBeInTheDocument();
  //   const checkbox = screen.getByRole('checkbox');
  //   expect(checkbox).toHaveAttribute('aria-describedby');
  // });
});
