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
    // Category reference field (required)
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    // Optional description field
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
