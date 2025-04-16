import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';
import { Wrapper } from '../../../testUtils/testUtils';

describe('<Label />', () => {
  it('renders as a label element', () => {
    render(<Label htmlFor="test-input">Test Label</Label>, { wrapper: Wrapper });
    const label = screen.getByText('Test Label');
    expect(label.tagName.toLowerCase()).toBe('label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('renders children', () => {
    render(<Label htmlFor="input">Custom <span>Content</span></Label>, { wrapper: Wrapper });
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('forwards className', () => {
    render(<Label htmlFor="input" className="custom-label">Label</Label>, { wrapper: Wrapper });
    const label = screen.getByText('Label');
    expect(label).toHaveClass('custom-label');
  });

  it('forwards arbitrary props', () => {
    render(<Label htmlFor="input" data-testid="label-test">Label</Label>, { wrapper: Wrapper });
    expect(screen.getByTestId('label-test')).toBeInTheDocument();
  });

  it('supports ref forwarding', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref} htmlFor="input">Label</Label>, { wrapper: Wrapper });
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    expect(ref.current?.textContent).toBe('Label');
  });
});
