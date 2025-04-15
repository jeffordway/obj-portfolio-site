/**
 * Sanity Import Script (Fixed)
 * 
 * This script follows Sanity's best practices for importing data with references.
 * It first imports categories, then imports skills with proper references to those categories.
 * 
 * Based on Sanity documentation: https://www.sanity.io/docs/importing-data
 */
const { execSync } = require('child_process');
const path = require('path');

// Paths to data files
const categoriesPath = path.join(__dirname, 'categories.ndjson');
const skillsPath = path.join(__dirname, 'skills.ndjson');

// Function to run a command and log output
function runCommand(command) {
  console.log(`\n> ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    return output;
  } catch (error) {
    console.error(`Command failed: ${error.message}`);
    throw error; // Re-throw to stop execution if a critical command fails
  }
}

// Main function to import data
async function importData() {
  try {
    console.log('=== SANITY DATA IMPORT ===');
    
    // Step 1: Import categories first (since they are referenced by skills)
    console.log('\n=== STEP 1: IMPORTING CATEGORIES ===');
    runCommand(`npx sanity dataset import ${categoriesPath} production --replace --allow-failing-assets`);
    console.log('Categories imported successfully.');
    
    // Step 2: Verify categories were imported correctly
    console.log('\n=== STEP 2: VERIFYING CATEGORIES ===');
    const categoriesOutput = runCommand('npx sanity documents query \'*[_type == "category"]{_id, title}\' --api-version=v2023-05-03');
    console.log(categoriesOutput);
    
    // Step 3: Import skills (which reference the categories)
    console.log('\n=== STEP 3: IMPORTING SKILLS ===');
    runCommand(`npx sanity dataset import ${skillsPath} production --replace --allow-failing-assets`);
    console.log('Skills imported successfully.');
    
    // Step 4: Verify skills were imported with proper category references
    console.log('\n=== STEP 4: VERIFYING SKILLS WITH CATEGORIES ===');
    const skillsOutput = runCommand('npx sanity documents query \'*[_type == "skill"][0...5]{title, "category": category->title}\' --api-version=v2023-05-03');
    console.log(skillsOutput);
    
    console.log('\n=== IMPORT COMPLETED SUCCESSFULLY ===');
    
  } catch (error) {
    console.error('Error during import process:', error);
    console.log('\nImport failed. Please check the error message above.');
  }
}

// Run the import function
importData();
