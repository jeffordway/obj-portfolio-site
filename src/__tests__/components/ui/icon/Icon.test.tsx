import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from '@/components/ui/icon/Icon';
import { getIconComponent } from '@/lib/icons';

// Mock the icons module
jest.mock('@/lib/icons', () => ({
  getIconComponent: jest.fn(),
}));

describe('Icon Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders an icon using name prop with slug', () => {
    // Mock the getIconComponent to return a simple mock component
    const MockIcon = () => <div data-testid="mock-icon">Mock Icon</div>;
    (getIconComponent as jest.Mock).mockReturnValue(MockIcon);

    render(<Icon name="product-management" size="md" />);
    
    // Verify getIconComponent was called with the correct slug
    expect(getIconComponent).toHaveBeenCalledWith('product-management');
    
    // Verify the icon was rendered
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders nothing when icon name is invalid', () => {
    // Mock getIconComponent to return undefined for invalid icon name
    (getIconComponent as jest.Mock).mockReturnValue(undefined);

    const { container } = render(<Icon name="invalid-icon" size="md" />);
    
    // Verify getIconComponent was called with the invalid name
    expect(getIconComponent).toHaveBeenCalledWith('invalid-icon');
    
    // Verify nothing was rendered
    expect(container.firstChild).toBeNull();
  });

  it('renders a provided icon component directly', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    
    render(<Icon component={CustomIcon} size="md" />);
    
    // Verify the custom icon was rendered
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    
    // Verify getIconComponent was not called
    expect(getIconComponent).not.toHaveBeenCalled();
  });

  it('applies the correct size class', () => {
    const MockIcon = () => <div data-testid="mock-icon">Mock Icon</div>;
    (getIconComponent as jest.Mock).mockReturnValue(MockIcon);

    const { container } = render(<Icon name="product-management" size="lg" />);
    
    // Check if the container has the correct size class
    // The lg size maps to w-8 h-8 in the actual implementation
    expect(container.firstChild).toHaveClass('w-8 h-8');
  });

  it('applies additional className when provided', () => {
    const MockIcon = () => <div data-testid="mock-icon">Mock Icon</div>;
    (getIconComponent as jest.Mock).mockReturnValue(MockIcon);

    const { container } = render(
      <Icon name="product-management" size="md" className="text-red-500" />
    );
    
    // Check if the container has the additional class
    expect(container.firstChild).toHaveClass('text-red-500');
  });
});
