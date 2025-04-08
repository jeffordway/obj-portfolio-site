import { defineField, defineType } from "sanity";

// Skill schema definition for Sanity Studio
export default defineType({
  name: "skill",
  title: "Skill",
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
    // Category reference field (required)
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    // Note: We're using the slug field for icon mapping instead of a separate icon field
    // Optional description field
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      category: 'category.title',
    },
    prepare({ title, slug, category }: { 
      title: string, 
      slug?: { current?: string },
      category?: string
    }) {
      return {
        title,
        subtitle: category ? `${category} ${slug?.current ? `• Icon: ${slug.current}` : ''}` : 
                            (slug?.current ? `Icon: ${slug.current}` : 'No slug generated'),
      };
    },
  },
});
