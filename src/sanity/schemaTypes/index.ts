import { type SchemaTypeDefinition } from "sanity";

// Import schema definitions
import category from "./category";
import skill from "./skill";
import project from "./project";

// Export all schema types for Sanity Studio
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, skill, project],
};
