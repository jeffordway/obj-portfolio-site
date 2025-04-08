import React from 'react';
import { render, screen } from '@testing-library/react';
import { PortableText } from '@/components/ui/typography/PortableTextRenderer';
import { Text } from '@/components/ui/typography/Text';
import type { PortableTextBlock } from '@portabletext/types';

// Define types for our mock implementation
interface MockSpan {
  _type: 'span';
  _key: string;
  text: string;
  marks?: string[];
}

interface MockBlock {
  _type: 'block';
  _key: string;
  style?: string;
  children?: MockSpan[];
  markDefs?: Array<Record<string, unknown>>;
}

interface MockListItem {
  _type: 'block';
  _key: string;
  children?: MockSpan[];
}

interface MockList {
  _type: 'list';
  _key: string;
  listItem?: string;
  children?: MockListItem[];
}

type MockPortableTextBlock = MockBlock | MockList;

interface MockComponentProps {
  children: React.ReactNode;
}

interface MockMarkComponentProps extends MockComponentProps {
  value: MockSpan;
}

interface MockComponents {
  block?: Record<string, React.FC<MockComponentProps>>;
  marks?: Record<string, React.FC<MockMarkComponentProps>>;
  list?: Record<string, React.FC<MockComponentProps>>;
  listItem?: Record<string, React.FC<MockComponentProps>>;
}

// Mock dependencies
jest.mock('@portabletext/react', () => ({
  PortableText: ({ value, components }: { value: MockPortableTextBlock[] | null | undefined; components: MockComponents }) => {
    if (!value || !Array.isArray(value)) return null;
    
    // Simple mock implementation that renders content based on the value structure
    return (
      <>
        {value.map((block, index) => {
          // Type guard for block type
          const isBlock = (b: unknown): b is MockBlock => 
            typeof b === 'object' && 
            b !== null && 
            '_type' in b && 
            b._type === 'block';
          
          const isList = (b: unknown): b is MockList => 
            typeof b === 'object' && 
            b !== null && 
            '_type' in b && 
            b._type === 'list';
          
          if (isBlock(block)) {
            const style = block.style || 'normal';
            const BlockComponent = components.block?.[style] || 
              (({ children }: MockComponentProps) => <div>{children}</div>);
            
            // Extract text content from spans
            const textContent = block.children
              ?.map((child, childIndex) => {
                if (child._type === 'span') {
                  // Handle marks if present
                  if (child.marks && child.marks.length > 0 && components.marks) {
                    const mark = child.marks[0]; // Just handle the first mark for simplicity
                    const MarkComponent = components.marks[mark];
                    if (MarkComponent) {
                      return <MarkComponent key={childIndex} value={child}>{child.text}</MarkComponent>;
                    }
                  }
                  return child.text;
                }
                return null;
              })
              .filter(Boolean);
            
            return <BlockComponent key={index}>{textContent}</BlockComponent>;
          } else if (isList(block)) {
            const listStyle = block.listItem || 'bullet';
            const ListComponent = components.list?.[listStyle] || 
              (({ children }: MockComponentProps) => <ul>{children}</ul>);
            
            return (
              <ListComponent key={index}>
                {block.children?.map((item, itemIndex) => {
                  const ListItemComponent = components.listItem?.[listStyle] || 
                    (({ children }: MockComponentProps) => <li>{children}</li>);
                  
                  const itemContent = item.children
                    ?.map(child => child.text)
                    .filter(Boolean);
                  
                  return <ListItemComponent key={itemIndex}>{itemContent}</ListItemComponent>;
                })}
              </ListComponent>
            );
          }
          
          // Fallback for unknown block types
          return <div key={index}>Unsupported block type</div>;
        })}
      </>
    );
  }
}));

// Mock the Text component
jest.mock('@/components/ui/typography/Text', () => ({
  Text: jest.fn(({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) => (
    <div data-testid={`text-${variant || 'default'}`} className={className}>
      {children}
    </div>
  ))
}));

// Mock next/link
jest.mock('next/link', () => 
  jest.fn(({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  ))
);

describe('PortableText Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders an empty wrapper when empty array is provided', () => {
    const { container } = render(<PortableText value={[]} />);
    // The component renders an empty wrapper div with the prose class
    expect(container.firstChild).toHaveClass('prose');
    expect(container.firstChild).toHaveClass('dark:prose-invert');
    // The wrapper should be empty
    expect(container.firstChild?.textContent).toBe('');
  });
  
  it('renders nothing when null value is provided', () => {
    // We need to cast to unknown and then to the expected type to test the null case
    // This is safer than using 'any' while still allowing us to test the null case
    const { container } = render(<PortableText value={null as unknown as PortableTextBlock[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a paragraph with normal text', () => {
    const value: MockPortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: '1a',
            text: 'This is a paragraph',
            marks: []
          }
        ],
        markDefs: []
      }
    ];

    render(<PortableText value={value as unknown as PortableTextBlock[]} />);
    expect(screen.getByTestId('text-body')).toBeInTheDocument();
    expect(screen.getByTestId('text-body')).toHaveTextContent('This is a paragraph');
  });

  it('renders a heading', () => {
    const value: MockPortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        style: 'h1',
        children: [
          {
            _type: 'span',
            _key: '1a',
            text: 'This is a heading',
            marks: []
          }
        ],
        markDefs: []
      }
    ];

    render(<PortableText value={value as unknown as PortableTextBlock[]} />);
    expect(screen.getByTestId('text-title')).toBeInTheDocument();
    expect(screen.getByTestId('text-title')).toHaveTextContent('This is a heading');
  });

  it('renders formatted text with marks', () => {
    const value: MockPortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: '1a',
            text: 'This is bold text',
            marks: ['strong']
          }
        ],
        markDefs: []
      }
    ];

    const { container } = render(<PortableText value={value as unknown as PortableTextBlock[]} />);
    expect(screen.getByTestId('text-body')).toBeInTheDocument();
    // Our mock doesn't fully simulate the marks rendering, but we can check if the text is there
    expect(screen.getByTestId('text-body')).toHaveTextContent('This is bold text');
  });

  it('renders a list', () => {
    const value: MockPortableTextBlock[] = [
      {
        _type: 'list',
        _key: '1',
        listItem: 'bullet',
        children: [
          {
            _type: 'block',
            _key: '1a',
            children: [
              {
                _type: 'span',
                _key: '1a1',
                text: 'Item 1',
                marks: []
              }
            ]
          },
          {
            _type: 'block',
            _key: '1b',
            children: [
              {
                _type: 'span',
                _key: '1b1',
                text: 'Item 2',
                marks: []
              }
            ]
          }
        ]
      }
    ];

    const { container } = render(<PortableText value={value as unknown as PortableTextBlock[]} />);
    // Since our mock is simplified, we're checking if the content is rendered
    expect(container.textContent).toContain('Item 1');
    expect(container.textContent).toContain('Item 2');
  });

  it('applies custom className when provided', () => {
    const value: MockPortableTextBlock[] = [
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: '1a',
            text: 'Text with custom class',
            marks: []
          }
        ],
        markDefs: []
      }
    ];

    const { container } = render(<PortableText value={value as unknown as PortableTextBlock[]} className="custom-class" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });
});
