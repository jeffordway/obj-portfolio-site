import type { Metadata } from "next"; // Added
import { Text } from "@/components/ui/typography/Text";
import { OneColumnGrid } from "@/components/ui/grid/OneColumnGrid";
import { Section } from "@/components/layouts/Section";

// Added Metadata
export const metadata: Metadata = {
  title: "Home", // Or a more descriptive title for the homepage
  // Add description, keywords etc. if needed, inheriting from layout otherwise
};

// Renamed to HomePage (Optional)
export default function HomePage() {
  return (
      <Section>
        <OneColumnGrid
          alignItems="start"
          gap={4}
        >
          {/* --- Display Text Presets --- */}

        
          <Text variant="title" as="h1" >
            Title Preset
          </Text>
          <Text variant="heading" as="h3" >Heading Preset</Text>
          <Text variant="subtitle" as="h2" >Subtitle Preset</Text>

          {/* --- Body Text Presets --- */}

          <Text variant="lead" >
            Lead Preset: Usually used for the opening paragraph of a section to draw the reader in.
          </Text>
          <Text variant="body" >
            Body Preset (Default): This is the standard paragraph text style used for most content. Lorem ipsum dolor sit amet.
          </Text>
          <Text variant="body-sm" >
            Body Small Preset: Smaller body text, often used for less critical information or denser layouts.
          </Text>

          {/* --- Specific Text Style Presets --- */}
          <Text variant="quote" as="blockquote" >
            Quote Preset: "Used for quoting text. Typically italicized and indented."
            <Text variant="caption" as="cite" className="block mt-2 not-italic">- Source Attribution (using caption preset)</Text>
          </Text>
          <Text variant="label" >
            Label Preset (e.g., FOR FORM FIELDS)
          </Text>
          <Text variant="caption" >
            Caption Preset (e.g., for image captions or footnotes)
          </Text>
          <Text variant="eyebrow" as="p" >
            Eyebrow Preset
          </Text>
        </OneColumnGrid>
      </Section>
  );
}
