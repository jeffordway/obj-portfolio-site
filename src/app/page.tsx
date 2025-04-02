import { Text } from '@/components/ui/typography/Text';
import { OneColumnGrid } from '@/components/ui/grid/OneColumnGrid';
import { Button } from '@/components/ui/button/Button';
import { Container } from '@/components/layouts/Container';

export default function ProjectPage() {
  return (
    <main className="py-16 md:py-24">
      <Container>
        <OneColumnGrid alignItems="center" className="max-w-3xl mx-auto" gap={4}>

          {/* --- Display Text Presets --- */}

            <Text preset="eyebrow" as="p" align="center">Eyebrow Preset</Text>
            <Text preset="title" as="h1" align="center">Title Preset</Text>
            <Text preset="heading" as="h3" align="center">Heading Preset</Text>
            <Text preset="subtitle" as="h2" align="center">Subtitle Preset</Text>


          {/* --- Body Text Presets --- */}
   
            <Text preset="lead" align="center">
              Lead Preset: Usually used for the opening paragraph of a section to draw the reader in.
            </Text>
            <Text preset="body" align="center">
              Body Preset (Default): This is the standard paragraph text style used for most content. Lorem ipsum dolor sit amet.
            </Text>
            <Text preset="body-sm" align="center">
              Body Small Preset: Smaller body text, often used for less critical information or denser layouts.
            </Text>

          {/* --- Specific Text Style Presets --- */}
          <Text preset="quote" as="blockquote" align="left" className="w-full max-w-xl">
            Quote Preset: "Used for quoting text. Typically italicized and indented."
            <Text preset="caption" as="cite" className="block mt-2 not-italic">- Source Attribution (using caption preset)</Text>
          </Text>
          <Text preset="label" align="center">
            Label Preset (e.g., FOR FORM FIELDS)
          </Text>
          <Text preset="caption" align="center">
            Caption Preset (e.g., for image captions or footnotes)
          </Text>

          {/* --- Button Examples --- */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button variant="primary" size="lg">Primary LG</Button>
            <Button variant="primary" size="md">Primary MD</Button>
            <Button variant="primary" size="sm">Primary SM</Button>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" size="lg">Outline LG</Button>
            <Button variant="outline" size="md">Outline MD</Button>
            <Button variant="outline" size="sm">Outline SM</Button>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="link" size="lg">Link LG</Button>
            <Button variant="link" size="md">Link MD</Button>
            <Button variant="link" size="sm">Link SM</Button>
          </div>

        </OneColumnGrid>
      </Container>
    </main>
  );
}