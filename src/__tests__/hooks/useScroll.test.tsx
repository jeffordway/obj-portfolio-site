import { renderHook, act } from '@testing-library/react';
import { useScroll } from '@/hooks/useScroll';
import React, { ReactNode } from 'react';

// Setup for tests

// Enable fake timers
jest.useFakeTimers();

// Create a wrapper component for the tests
interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps): React.ReactElement => {
  return <>{children}</>;
};

describe('useScroll hook', () => {
  // Mock window properties and methods
  const originalScrollY = window.scrollY;
  const originalInnerHeight = window.innerHeight;
  
  // Mock document properties
  const originalDocumentHeight = Object.getOwnPropertyDescriptor(
    document.documentElement, 
    'scrollHeight'
  );
  
  // Mock scroll methods
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  
  // Mock querySelector
  document.querySelector = jest.fn().mockImplementation((selector) => {
    return {
      scrollIntoView: jest.fn(),
    };
  });
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Reset window properties
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });
    
    // Reset document properties
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });
  });
  
  afterAll(() => {
    // Restore original properties
    Object.defineProperty(window, 'scrollY', {
      value: originalScrollY,
      writable: true,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      writable: true,
    });
    
    if (originalDocumentHeight) {
      Object.defineProperty(
        document.documentElement, 
        'scrollHeight', 
        originalDocumentHeight
      );
    }
  });
  
  it('should initialize with the correct values', () => {
    const { result } = renderHook(() => useScroll(), { wrapper: Wrapper });
    
    // Check initial values
    expect(result.current.scrollY).toBe(0);
    expect(result.current.direction).toBe('none');
    expect(result.current.isScrolled).toBe(false);
    expect(result.current.reachedBottom).toBe(false);
    expect(typeof result.current.scrollTo).toBe('function');
    expect(typeof result.current.scrollToTop).toBe('function');
    expect(typeof result.current.scrollToBottom).toBe('function');
  });
  
  it('should update scroll values when scrolling', () => {
    const { result, rerender } = renderHook(() => useScroll({
      scrollThreshold: 50,
    }), { wrapper: Wrapper });
    
    // Initial state should have scrollY at 0
    expect(result.current.scrollY).toBe(0);
    expect(result.current.direction).toBe('none');
    expect(result.current.isScrolled).toBe(false);
    
    // First scroll event - set scrollY to 0 to establish a baseline
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0 });
      window.dispatchEvent(new Event('scroll'));
      jest.runAllTimers();
    });
    
    // Second scroll event - scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100 });
      window.dispatchEvent(new Event('scroll'));
      jest.runAllTimers();
    });
    
    // Check that scrollY is updated and isScrolled is true
    expect(result.current.scrollY).toBe(100);
    expect(result.current.isScrolled).toBe(true);
    
    // Third scroll event - scroll up
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 30 });
      window.dispatchEvent(new Event('scroll'));
      jest.runAllTimers();
    });
    
    // Check that scrollY is updated and isScrolled is false
    expect(result.current.scrollY).toBe(30);
    expect(result.current.isScrolled).toBe(false);
  });
  
  it('should detect when reaching the bottom of the page', () => {
    const { result } = renderHook(() => useScroll({
      bottomThreshold: 100,
    }), { wrapper: Wrapper });
    
    act(() => {
      // Set up window properties to simulate bottom of page
      // documentHeight (2000) - windowHeight (800) - bottomThreshold (100) = 1100
      Object.defineProperty(window, 'scrollY', { value: 1100 });
      
      // Trigger scroll event
      window.dispatchEvent(new Event('scroll'));
      
      // Run any pending animation frames
      jest.runAllTimers();
    });
    
    // Check if reached bottom
    expect(result.current.reachedBottom).toBe(true);
  });
  
  it('should call window.scrollTo when scrollToTop is called', () => {
    const { result } = renderHook(() => useScroll(), { wrapper: Wrapper });
    
    // Call scrollToTop
    act(() => {
      result.current.scrollToTop();
    });
    
    // Check if window.scrollTo was called with correct parameters
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
  
  it('should call window.scrollTo when scrollToBottom is called', () => {
    const { result } = renderHook(() => useScroll(), { wrapper: Wrapper });
    
    // Mock document scrollHeight
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000 });
    
    // Call scrollToBottom
    act(() => {
      result.current.scrollToBottom();
    });
    
    // Check if window.scrollTo was called with correct parameters
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 2000,
      behavior: 'smooth',
    });
  });
  
  it('should call scrollIntoView when scrollTo is called with an element', () => {
    const { result } = renderHook(() => useScroll(), { wrapper: Wrapper });
    
    // Create a mock element
    const mockElement = document.createElement('div');
    
    // Call scrollTo with element
    act(() => {
      result.current.scrollTo(mockElement);
    });
    
    // Check if scrollIntoView was called with correct parameters
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });
  
  it('should call scrollIntoView when scrollTo is called with a selector', () => {
    // Mock the scrollIntoView function
    const mockScrollIntoView = jest.fn();
    
    // Override the querySelector implementation for this test
    document.querySelector = jest.fn().mockImplementation(() => ({
      scrollIntoView: mockScrollIntoView
    }));
    
    const { result } = renderHook(() => useScroll(), { wrapper: Wrapper });
    
    // Call scrollTo with selector
    act(() => {
      result.current.scrollTo('#test-element');
    });
    
    // Check if querySelector and scrollIntoView were called
    expect(document.querySelector).toHaveBeenCalledWith('#test-element');
    expect(mockScrollIntoView).toHaveBeenCalled();
  });
  
  it('should respect custom thresholds', () => {
    const { result } = renderHook(() => useScroll({
      scrollThreshold: 100,
      bottomThreshold: 200,
    }), { wrapper: Wrapper });
    
    // Simulate scrolling just below the threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 90 });
      window.dispatchEvent(new Event('scroll'));
      jest.runAllTimers();
    });
    
    // Check that isScrolled is still false
    expect(result.current.isScrolled).toBe(false);
    
    // Simulate scrolling above the threshold
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 110 });
      window.dispatchEvent(new Event('scroll'));
      jest.runAllTimers();
    });
    
    // Check that isScrolled is now true
    expect(result.current.isScrolled).toBe(true);
  });
});
