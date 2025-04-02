import { defineField, defineType } from "sanity";

// Project schema definition for Sanity Studio
export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    // Title field (required)
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // URL slug for the project (required)
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
    // Hero image for the project (required)
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    // Project images (16:9 ratio, one per column)
    defineField({
      name: "projectImages",
      title: "Project Images",
      description: "Add project images in 16:9 ratio (will display one per column)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessibility",
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
    // Additional images (1:1 ratio, two per column)
    defineField({
      name: "additionalImages",
      title: "Additional Images",
      description: "Add additional images in 1:1 ratio (will display two per column)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessibility",
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
    // Categories for the project (required)
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    }),
    // Skills used in the project (required)
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
      validation: (Rule) => Rule.required(),
    }),
    // Short headline for the project (required)
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    // GitHub repository link (optional)
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
          validation: Rule => Rule.uri({
            scheme: ["http", "https"]
          }),
        },
      ],
    }),
    // Prototype link (optional)
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
          validation: Rule => Rule.uri({
            scheme: ["http", "https"]
          }),
        },
        {
          name: "buttonText",
          title: "Button Text",
          type: "string",
          initialValue: "View Prototype",
        },
      ],
    }),
    // Rich text content for the project
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { 
          type: "block" 
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    // Project completion date
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
  ],
  // Preview configuration for the Sanity Studio
  preview: {
    select: {
      title: "title",
      media: "heroImage",
    },
  },
});
