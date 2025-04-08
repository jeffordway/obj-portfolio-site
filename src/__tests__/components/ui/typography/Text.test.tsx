import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text, TextElement, TextVariant, TextAlign } from '@/components/ui/typography/Text';

describe('Text Component', () => {
  // Test default rendering
  it('renders with default props', () => {
    render(<Text>Default text</Text>);
    
    // Default should be a paragraph with body variant
    const element = screen.getByText('Default text');
    expect(element.tagName).toBe('P');
    expect(element).toHaveClass('text-base');
    expect(element).toHaveClass('leading-relaxed');
    expect(element).toHaveClass('text-left');
  });

  // Test different variants
  it.each([
    ['title', 'h1', 'text-xl'],
    ['subtitle', 'h2', 'text-2xl'],
    ['heading', 'h3', 'font-semibold'],
    ['lead', 'p', 'text-lg'],
    ['body', 'p', 'text-base'],
    ['body-sm', 'p', 'text-sm'],
    ['quote', 'blockquote', 'italic'],
    ['eyebrow', 'div', 'uppercase'],
    ['label', 'div', 'uppercase'],
    ['caption', 'span', 'text-xs'],
  ] as [TextVariant, string, string][])(
    'renders %s variant with correct element and styling',
    (variant, expectedTag, expectedClass) => {
      render(<Text variant={variant}>Test {variant}</Text>);
      
      const element = screen.getByText(`Test ${variant}`);
      expect(element.tagName).toBe(expectedTag.toUpperCase());
      expect(element).toHaveClass(expectedClass);
    }
  );

  // Test custom element override
  it.each([
    ['p', 'P'],
    ['span', 'SPAN'],
    ['div', 'DIV'],
    ['h1', 'H1'],
    ['h2', 'H2'],
    ['h3', 'H3'],
    ['h4', 'H4'],
    ['h5', 'H5'],
    ['h6', 'H6'],
    ['blockquote', 'BLOCKQUOTE'],
    ['figcaption', 'FIGCAPTION'],
    ['cite', 'CITE'],
  ] as [TextElement, string][])(
    'renders as %s element when specified',
    (element, expectedTag) => {
      render(<Text as={element}>Custom element</Text>);
      
      const renderedElement = screen.getByText('Custom element');
      expect(renderedElement.tagName).toBe(expectedTag);
    }
  );

  // Test alignment options
  it.each([
    ['left', 'text-left'],
    ['center', 'text-center'],
    ['right', 'text-right'],
    ['justify', 'text-justify'],
  ] as [TextAlign, string][])(
    'applies %s alignment correctly',
    (alignment, expectedClass) => {
      render(<Text align={alignment}>Aligned text</Text>);
      
      const element = screen.getByText('Aligned text');
      expect(element).toHaveClass(expectedClass);
    }
  );

  // Test truncation
  it('applies truncate class when truncate is true', () => {
    render(<Text truncate>Truncated text</Text>);
    
    const element = screen.getByText('Truncated text');
    expect(element).toHaveClass('truncate');
  });

  // Test custom className
  it('applies custom className', () => {
    render(<Text className="custom-class">Custom class text</Text>);
    
    const element = screen.getByText('Custom class text');
    expect(element).toHaveClass('custom-class');
  });

  // Test ref forwarding
  it('forwards ref to the DOM element', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Text ref={ref}>Ref text</Text>);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toBe('Ref text');
  });

  // Test combining multiple props
  it('combines multiple props correctly', () => {
    render(
      <Text 
        variant="heading" 
        as="h2" 
        align="center" 
        truncate 
        className="custom-class"
      >
        Combined props
      </Text>
    );
    
    const element = screen.getByText('Combined props');
    expect(element.tagName).toBe('H2');
    expect(element).toHaveClass('font-semibold'); // from heading variant
    expect(element).toHaveClass('text-center');
    expect(element).toHaveClass('truncate');
    expect(element).toHaveClass('custom-class');
  });

  // Test HTML attributes pass-through
  it('passes through HTML attributes', () => {
    render(
      <Text data-testid="text-element" id="text-id" title="Tooltip text">
        HTML attributes
      </Text>
    );
    
    const element = screen.getByText('HTML attributes');
    expect(element).toHaveAttribute('data-testid', 'text-element');
    expect(element).toHaveAttribute('id', 'text-id');
    expect(element).toHaveAttribute('title', 'Tooltip text');
  });
});
