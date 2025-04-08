import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tag } from '@/components/ui/tag/Tag';
import { Icon } from '@/components/ui/icon/Icon';
import { Tooltip } from '@/components/ui/tooltip/Tooltip';

// Mock the Icon component
jest.mock('@/components/ui/icon/Icon', () => ({
  Icon: jest.fn(() => <div data-testid="mock-icon">Icon</div>),
}));

// Mock the Tooltip component
jest.mock('@/components/ui/tooltip/Tooltip', () => {
  const mockTooltip = jest.fn(({ children, content }) => (
    <div data-testid="mock-tooltip">
      <div data-testid="tooltip-content">{content}</div>
      {children}
    </div>
  ));
  return {
    Tooltip: mockTooltip
  };
});

describe('Tag Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders label text correctly', () => {
    render(<Tag label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders with an icon when provided', () => {
    const MockIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    
    render(<Tag label="React" icon={<MockIcon />} />);
    
    // Check if the label is rendered
    expect(screen.getByText('React')).toBeInTheDocument();
    
    // Check if the icon is rendered
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders with a tooltip when tooltipContent is provided', () => {
    render(<Tag label="React" tooltipContent="A JavaScript library for building user interfaces" />);
    
    // Check if the label is rendered
    expect(screen.getByText('React')).toBeInTheDocument();
    
    // Check if the tooltip was called
    expect(Tooltip).toHaveBeenCalled();
    
    // Check if the tooltip content is rendered in our mock
    const tooltipContent = screen.getByTestId('tooltip-content');
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent.textContent).toBe('A JavaScript library for building user interfaces');
  });

  it('applies additional className when provided', () => {
    const { container } = render(<Tag label="React" className="custom-class" />);
    
    // The first child should be the tag container
    const tagElement = container.firstChild as HTMLElement;
    expect(tagElement).toHaveClass('custom-class');
  });

  it('renders correctly with slug-based icon from Sanity', () => {
    // This test simulates how the Tag would be used with data from Sanity
    // where the icon is derived from a slug
    
    // Create a mock icon component using the Icon component
    const SlugBasedIcon = <Icon name="react" size="sm" />;
    
    render(<Tag label="React" icon={SlugBasedIcon} />);
    
    // Check if the label is rendered
    expect(screen.getByText('React')).toBeInTheDocument();
    
    // Check if the icon is rendered (using our mocked Icon component)
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });
});
