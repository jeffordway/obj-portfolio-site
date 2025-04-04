import React from 'react';
import { Tag } from '@/components/ui/tag/Tag';
import { Icon } from '@/components/ui/icon/Icon';
import { Text } from '@/components/ui/typography/Text';
import { OneColumnGrid } from '@/components/ui/grid/OneColumnGrid';

/**
 * Example component demonstrating Tag and Icon integration
 */
export const TagIconExample = () => {
  return (
    <OneColumnGrid gap={4}>
      <Text variant="heading">Tags with Icons</Text>
      
      <div className="flex flex-wrap gap-2">
        {/* Basic tag without icon */}
        <Tag 
          label="Basic Tag" 
        />
        
        {/* Tag with icon using the Icon component */}
        <Tag 
          label="React" 
          icon={<Icon name="RiCodeSSlashFill" size="sm" />}
          tooltipContent="React.js Framework" 
        />
        
        {/* Tag with primary colored icon */}
        <Tag 
          label="Design" 
          icon={<Icon name="RiPaletteLine" size="sm" variant="primary" />}
          tooltipContent="UI/UX Design" 
        />
        
        {/* Tag with custom styling */}
        <Tag 
          label="Database" 
          icon={<Icon name="RiDatabase2Fill" size="sm" />}
          tooltipContent="Database Management" 
          className="bg-primary/10 text-primary hover:bg-primary/20"
        />
      </div>
      
      <Text variant="body-sm">
        The examples above demonstrate how Tags and Icons can be combined for rich, 
        informative UI elements. The Icon component is passed directly to the Tag&apos;s 
        icon prop, and sizing/coloring is handled appropriately.
      </Text>
    </OneColumnGrid>
  );
};

TagIconExample.displayName = 'TagIconExample';
