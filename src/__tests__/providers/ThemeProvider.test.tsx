import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useTheme } from 'next-themes';

// Mock the next-themes library
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, ...props }: any) => (
    <div data-testid="mock-theme-provider" data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
  useTheme: jest.fn(),
}));

describe('ThemeProvider', () => {
  it('should render children', () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child').textContent).toBe('Test Child');
  });
  
  it('should pass correct default props to NextThemesProvider', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );
    
    const mockProvider = screen.getByTestId('mock-theme-provider');
    const passedProps = JSON.parse(mockProvider.getAttribute('data-props') || '{}');
    
    // Check that the default props are passed correctly
    expect(passedProps.attribute).toBe('class');
    expect(passedProps.defaultTheme).toBe('system');
    expect(passedProps.enableSystem).toBe(true);
    expect(passedProps.disableTransitionOnChange).toBeTruthy();
  });
  
  it('should allow overriding default props', () => {
    render(
      <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
        <div>Test Content</div>
      </ThemeProvider>
    );
    
    const mockProvider = screen.getByTestId('mock-theme-provider');
    const passedProps = JSON.parse(mockProvider.getAttribute('data-props') || '{}');
    
    // Check that the overridden props are passed correctly
    expect(passedProps.attribute).toBe('data-theme');
    expect(passedProps.defaultTheme).toBe('dark');
    expect(passedProps.enableSystem).toBe(false);
    expect(passedProps.disableTransitionOnChange).toBeTruthy();
  });
});
