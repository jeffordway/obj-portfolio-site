// Script to fetch all skills from Sanity
const { createClient } = require('@sanity/client');

// Initialize the Sanity client
const client = createClient({
  projectId: 'hcajm3fl', // From your Sanity.io project
  dataset: 'production',
  apiVersion: '2025-04-01', // Use the API version you saw in the Vision query
  useCdn: false, // We want fresh data
});

// GROQ query to get all skills with their categories
const query = `*[_type == "skill"] {
  title,
  "categoryTitle": category->title
}`;

// Execute the query
client.fetch(query)
  .then((skills) => {
    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.categoryTitle]) {
        acc[skill.categoryTitle] = [];
      }
      acc[skill.categoryTitle].push(skill.title);
      return acc;
    }, {});

    console.log('Skills grouped by category:');
    console.log(JSON.stringify(skillsByCategory, null, 2));
  })
  .catch((err) => {
    console.error('Error fetching skills:', err);
  });
