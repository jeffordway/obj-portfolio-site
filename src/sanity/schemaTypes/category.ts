import { defineField, defineType } from "sanity";

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
    // Optional description field
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
