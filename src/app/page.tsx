import { Text } from '@/components/ui/typography/Text';
import { OneColumnGrid } from '@/components/ui/grid/OneColumnGrid';

export default function ProjectPage() {
  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      {/* Using OneColumnGrid to stack examples vertically with spacing */}
      <OneColumnGrid alignItems="center" className="max-w-3xl mx-auto" gap="10"> {/* Wider gap */}

        {/* --- Display Presets --- */}
        <div className="w-full"> {/* Grouping related display texts */}
          <Text preset="eyebrow" as="p" align="center">Eyebrow Preset</Text>
          <Text preset="title" as="h1" align="center">Title Preset</Text>
          <Text preset="heading" as="h2" align="center">Heading Preset</Text>
          <Text preset="subtitle" as="p" align="center">Subtitle Preset - Provides additional context.</Text>
        </div>

        {/* --- Body Text Presets --- */}
        <div className="w-full space-y-4"> {/* Grouping body texts */}
           <Text preset="lead" align="center">
            Lead Preset: Usually used for the opening paragraph of a section to draw the reader in.
          </Text>
          <Text preset="body" align="center">
            Body Preset (Default): This is the standard paragraph text style used for most content. Lorem ipsum dolor sit amet.
          </Text>
          <Text preset="body-lg" align="center">
            Body Large Preset: A slightly larger version of the body text, useful for emphasis or specific layouts.
          </Text>
          <Text preset="body-sm" align="center">
            Body Small Preset: Smaller body text, often used for less critical information or denser layouts.
          </Text>
        </div>

        {/* --- Specific Style Presets --- */}
         <Text preset="quote" as="blockquote" align="left" className="w-full max-w-xl"> {/* Left align quote */}
          Quote Preset: "Used for quoting text. Typically italicized and indented."
          <Text preset="caption" as="cite" className="block mt-2 not-italic">- Source Attribution (using caption preset)</Text>
        </Text>

         <Text preset="label" align="center">
           Label Preset (e.g., FOR FORM FIELDS)
        </Text>

         <Text preset="caption" align="center">
           Caption Preset (e.g., for image captions or footnotes)
        </Text>

      </OneColumnGrid>
    </main>
  );
}