import { defineField, defineType, SlugValue } from "sanity";

// Category schema definition for Sanity Studio
export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    // Title field (required)
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // Slug field (auto-generated from title)
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
          .slice(0, 96)
      },
      validation: (Rule) => Rule.required(),
    }),
    // Optional description field
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    // Note: We're using the slug field for icon mapping instead of a separate icon field
  ],
  // Preview function to show the slug that will be used for icon mapping
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({ title, slug }: { title: string, slug?: { current?: string } }) {
      return {
        title,
        subtitle: slug?.current ? `Icon: ${slug.current}` : 'No slug generated',
      };
    },
  },
});
