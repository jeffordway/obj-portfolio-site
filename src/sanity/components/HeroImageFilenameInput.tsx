import { Stack, TextInput, Button, Card, Text } from '@sanity/ui';
import React from 'react';
import { useFormValue } from 'sanity';

/**
 * Sanity Studio v3 custom input for hero image filename
 * - Uses only props.value, props.onChange, props.parent
 * - No legacy PatchEvent or hooks
 * - Generates filename as {slug}-hero
 */
export default function HeroImageFilenameInput(props: any) {
  const { value, onChange, readOnly, path } = props;
  // Get the parent path (one level up) and then the slug field
  const parentPath = path.slice(0, -1);
  const slugObj = useFormValue([...parentPath, 'slug']) as { current?: string } | undefined;
  const slug = slugObj?.current;

  const handleGenerate = () => {
    if (slug) {
      onChange(`${slug}-hero`);
    }
  };

  return (
    <Stack space={3}>
      <TextInput
        value={value || ''}
        readOnly={readOnly}
        placeholder="Filename will appear here"
        onChange={e => onChange(e.currentTarget.value)}
      />
      <Card padding={2} radius={2} shadow={1}>
        <Button
          text="Generate from slug"
          disabled={!slug || readOnly}
          onClick={handleGenerate}
          tone="primary"
        />
        {!slug && (
          <Text size={1} muted style={{ marginTop: 8 }}>
            Set a slug first to enable filename generation.
          </Text>
        )}
      </Card>
    </Stack>
  );
}
