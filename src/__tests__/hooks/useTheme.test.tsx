import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks/useTheme';
import React, { ReactNode } from 'react';

// Mock variables to control the next-themes behavior
let mockTheme = 'light';
const mockSetTheme = jest.fn((newTheme: string) => {
  mockTheme = newTheme;
});

// Mock the next-themes library
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

// Create a wrapper component for the tests
interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps): React.ReactElement => {
  return <>{children}</>;
};

describe('useTheme hook', () => {
  beforeEach(() => {
    // Reset mock state before each test
    mockTheme = 'light';
    mockSetTheme.mockClear();
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  it('should initialize with the correct values', () => {
    // Render the hook with the wrapper
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper });
    
    // Check initial values
    expect(result.current.theme).toBe('light');
    expect(typeof result.current.setTheme).toBe('function');
    // We can't reliably test the initial mounted state in Jest's environment
    // as it might already be true due to how React Testing Library works
    expect(typeof result.current.getNextTheme).toBe('function');
    expect(typeof result.current.cycleTheme).toBe('function');
    expect(typeof result.current.getCurrentThemeLabel).toBe('function');
    expect(typeof result.current.getNextThemeLabel).toBe('function');
  });

  it('should return the correct next theme', () => {
    // Test with light theme
    mockTheme = 'light';
    const { result, rerender } = renderHook(() => useTheme(), { wrapper: Wrapper });
    expect(result.current.getNextTheme()).toBe('dark');
    
    // Update mock to test with dark theme
    mockTheme = 'dark';
    rerender();
    expect(result.current.getNextTheme()).toBe('system');
    
    // Update mock to test with system theme
    mockTheme = 'system';
    rerender();
    expect(result.current.getNextTheme()).toBe('light');
  });

  it('should cycle through themes correctly', () => {
    // Start with light theme
    mockTheme = 'light';
    
    // Render the hook
    const { result, rerender } = renderHook(() => useTheme(), { wrapper: Wrapper });
    
    // Cycle from light to dark
    act(() => {
      result.current.cycleTheme();
    });
    
    // Check that setTheme was called with 'dark'
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
    
    // Update the mock theme and re-render
    mockTheme = 'dark';
    rerender();
    
    // Cycle from dark to system
    act(() => {
      result.current.cycleTheme();
    });
    
    // Check that setTheme was called with 'system'
    expect(mockSetTheme).toHaveBeenCalledWith('system');
    
    // Update the mock theme and re-render
    mockTheme = 'system';
    rerender();
    
    // Cycle from system to light
    act(() => {
      result.current.cycleTheme();
    });
    
    // Check that setTheme was called with 'light'
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('should return formatted theme labels', () => {
    // Test with light theme
    mockTheme = 'light';
    const { result, rerender } = renderHook(() => useTheme(), { wrapper: Wrapper });
    expect(result.current.getCurrentThemeLabel()).toBe('Light');
    expect(result.current.getNextThemeLabel()).toBe('Dark');
    
    // Update mock to test with dark theme
    mockTheme = 'dark';
    rerender();
    expect(result.current.getCurrentThemeLabel()).toBe('Dark');
    expect(result.current.getNextThemeLabel()).toBe('System');
    
    // Update mock to test with system theme
    mockTheme = 'system';
    rerender();
    expect(result.current.getCurrentThemeLabel()).toBe('System');
    expect(result.current.getNextThemeLabel()).toBe('Light');
  });

  it('should have a mounted state that can be used for conditional rendering', () => {
    // Render the hook
    const { result } = renderHook(() => useTheme(), { wrapper: Wrapper });
    
    // The mounted property should exist and be a boolean
    expect(typeof result.current.mounted).toBe('boolean');
  });
});
