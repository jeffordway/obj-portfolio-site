import { defineField, defineType } from "sanity";

// Temporary Project schema for clean validation
export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessibility",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption for the image",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    }),
    defineField({
      name: "githubRepo",
      title: "GitHub Repository",
      description: "Link to the GitHub repository (optional)",
      type: "object",
      fields: [
        {
          name: "showButton",
          title: "Show GitHub Button",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "url",
          title: "GitHub URL",
          type: "url",
          validation: Rule => Rule.uri({ scheme: ["http", "https"] }),
        },
      ],
    }),
    defineField({
      name: "prototype",
      title: "Prototype",
      description: "Link to the prototype (optional)",
      type: "object",
      fields: [
        {
          name: "showButton",
          title: "Show Prototype Button",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "url",
          title: "Prototype URL",
          type: "url",
          validation: Rule => Rule.uri({ scheme: ["http", "https"] }),
        },
        {
          name: "buttonText",
          title: "Button Text",
          type: "string",
          initialValue: "View Prototype",
        },
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Required for accessibility and SEO",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectImages",
      title: "Project Images",
      description: "Add project images in 16:9 ratio (will display one per column)",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            storeOriginalFilename: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Required for accessibility and SEO",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              type: "string",
              title: "Title",
              description: "Optional title for the image (displayed on hover)",
            },
            {
              name: "headline",
              type: "string",
              title: "Headline",
              description: "Optional headline for the image (displayed on hover)",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "additionalImages",
      title: "Additional Images",
      description: "Add additional images in 1:1 ratio (will display two per column)",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            storeOriginalFilename: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Required for accessibility and SEO",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              type: "string",
              title: "Title",
              description: "Optional title for the image (displayed on hover)",
            },
            {
              name: "headline",
              type: "string",
              title: "Headline",
              description: "Optional headline for the image (displayed on hover)",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
    },
  },
});
