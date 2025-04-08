import React from 'react';
import { Metadata } from 'next';

// Layout & Typography
import { Section } from '@/components/layouts/Section';
import { Text } from '@/components/ui/typography/Text';

// Components to Showcase
import { Tooltip } from '@/components/ui/tooltip/Tooltip';
import { Button } from '@/components/ui/button/Button';
import { Tag } from '@/components/ui/tag/Tag'; // Import the Tag component

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Visual library of UI components for the obj-portfolio project.',
};

export default function DesignSystemPage() {
  return (
    <Section id="design-system" maxWidth="container">
      <Text variant="title">
        Design System
      </Text>

      {/* --- Tooltip Component --- */}
      <div className="mt-12 mb-12"> 
        <Text variant="heading">
          Tooltip
        </Text>
        <Text variant="body">
          Displays contextual information on hover. Wraps a trigger element.
        </Text>

        <div className="mt-6 flex flex-wrap items-center justify-start gap-8"> 
          {/* Example 1: Top Position (Default) */}
          <Tooltip content="Tooltip on top (default)">
            <Button variant="outline">Hover Me (Top)</Button>
          </Tooltip>

          {/* Example 2: Bottom Position */}
          <Tooltip content="Tooltip on bottom" side="bottom">
            <Button variant="outline">Hover Me (Bottom)</Button>
          </Tooltip>

          {/* Example 3: Left Position */}
          <Tooltip content="Tooltip on left" side="left">
            <Button variant="outline">Hover Me (Left)</Button>
          </Tooltip>

          {/* Example 4: Right Position */}
          <Tooltip content="Tooltip on right" side="right">
            <Button variant="outline">Hover Me (Right)</Button>
          </Tooltip>
        </div>
      </div>

      {/* --- Typography Section --- */}
      <div className="mt-12 mb-12">
        <Text variant="heading">Typography</Text>
        <Text variant="body">Examples of Text component variants.</Text>
        <div className="mt-6"> 
          <Text variant="title">Title Variant (h1)</Text>
          <Text variant="heading">Heading Variant (h3)</Text>
          <Text variant="subtitle">Subtitle Variant (h2)</Text>
          <Text variant="lead">Lead Variant (p): For introductory paragraphs.</Text>
          <Text variant="body">Body Variant (p): This is the default body text, suitable for longer content blocks.</Text>
          <Text variant="body-sm">Body Small Variant (p): Slightly smaller body text.</Text>
          <Text variant="quote">Quote Variant (blockquote): &quot;To be or not to be, that is the question.&quot;</Text>
          <Text variant="eyebrow">Eyebrow Variant (div)</Text>
          <Text variant="label">Label Variant (div)</Text>
          <Text variant="caption">Caption Variant (span): Used for image captions or small annotations.</Text>
        </div>
      </div>

      {/* --- Buttons Section --- */}
      <div className="mt-12 mb-12">
        <Text variant="heading">Buttons</Text>
        <Text variant="body">
          Examples of Button component variants, sizes, and states.
        </Text>

        {/* Variant Examples */}
        <div className="mt-6 mb-8">
          <Text variant="heading" as="h4">Variants</Text>
          <div className="mt-4 flex flex-wrap items-center gap-4"> 
            <Button variant="primary">Primary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </div>

        {/* Size Examples (Primary) */}
        <div className="mt-6 mb-8">
          <Text variant="heading" as="h4">Sizes (Primary)</Text>
          <div className="mt-4 flex flex-wrap items-center gap-4"> 
            <Button variant="primary" size="sm">Small Button</Button>
            <Button variant="primary" size="md">Medium Button</Button>
            <Button variant="primary" size="lg">Large Button (Default)</Button>
          </div>
        </div>

        {/* Size Examples (Outline) */}
        <div className="mt-6 mb-8">
          <Text variant="heading" as="h4">Sizes (Outline)</Text>
          <div className="mt-4 flex flex-wrap items-center gap-4"> 
            <Button variant="outline" size="sm">Small Button</Button>
            <Button variant="outline" size="md">Medium Button</Button>
            <Button variant="outline" size="lg">Large Button (Default)</Button>
          </div>
        </div>
        
        {/* State Examples */}
        <div className="mt-6 mb-8">
          <Text variant="heading" as="h4">States</Text>
          <div className="mt-4 flex flex-wrap items-center gap-4"> 
            <Button variant="primary" isLoading={true}>Loading...</Button>
            <Button variant="outline" disabled={true}>Disabled Outline</Button>
            {/* Assuming an icon component exists */}
            {/* <Button variant="primary" iconLeft={<IconName />}>Icon Left</Button> */} 
            {/* <Button variant="outline" iconRight={<IconName />}>Icon Right</Button> */} 
          </div>
        </div>
      </div>

      {/* --- Tags Section --- */}
      <div className="mt-12 mb-12">
        <Text variant="heading">Tags</Text>
        <Text variant="body">Displays labels or categories, with optional tooltips.</Text>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Tag label="Default Tag" />
          <Tag label="Tag with Tooltip" tooltipContent="This is helpful tooltip text!" />
          <Tag label="Another Tag" /> 
        </div>
      </div>

    </Section>
  );
}
