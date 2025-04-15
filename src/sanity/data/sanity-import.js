/**
 * Sanity Import Script
 * 
 * This script follows Sanity's best practices for importing data with references.
 * It first cleans the dataset of any existing data, then imports categories and skills
 * in the correct order with proper references.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths to data files
const categoriesPath = path.join(__dirname, 'categories.ndjson');
const skillsPath = path.join(__dirname, 'skills.ndjson');
const fixedSkillsPath = path.join(__dirname, 'skills-fixed.ndjson');

// Function to run a command and log output
function runCommand(command) {
  console.log(`\n> ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    return output;
  } catch (error) {
    console.error(`Command failed: ${error.message}`);
    return null;
  }
}

// Function to verify the dataset is clean
async function verifyCleanDataset() {
  console.log('=== VERIFYING CLEAN DATASET ===');
  
  // Check for existing categories
  const categoriesOutput = runCommand('npx sanity documents query \'*[_type == "category"]\'');
  const categoriesMatch = categoriesOutput.match(/\[\s*\{.*\}\s*\]/s);
  const categories = categoriesMatch ? JSON.parse(categoriesMatch[0]) : [];
  
  // Check for existing skills
  const skillsOutput = runCommand('npx sanity documents query \'*[_type == "skill"]\'');
  const skillsMatch = skillsOutput.match(/\[\s*\{.*\}\s*\]/s);
  const skills = skillsMatch ? JSON.parse(skillsMatch[0]) : [];
  
  if (categories.length > 0 || skills.length > 0) {
    console.log(`Found ${categories.length} categories and ${skills.length} skills in the dataset.`);
    console.log('Cleaning dataset before import...');
    
    // Delete skills first (since they reference categories)
    if (skills.length > 0) {
      console.log(`Deleting ${skills.length} skills...`);
      for (const skill of skills) {
        runCommand(`npx sanity documents delete "${skill._id}"`);
      }
    }
    
    // Then delete categories
    if (categories.length > 0) {
      console.log(`Deleting ${categories.length} categories...`);
      for (const category of categories) {
        runCommand(`npx sanity documents delete "${category._id}"`);
      }
    }
    
    console.log('Dataset cleaned successfully.');
  } else {
    console.log('Dataset is already clean. Ready for import.');
  }
}

// Function to update skills with proper category references
function prepareSkillsWithReferences() {
  console.log('\n=== PREPARING SKILLS WITH PROPER REFERENCES ===');
  
  // Read the skills file
  const skillsData = fs.readFileSync(skillsPath, 'utf8');
  const skills = skillsData.trim().split('\n');
  
  // Process each skill to ensure proper reference format
  const updatedSkills = skills.map(skillLine => {
    const skill = JSON.parse(skillLine);
    
    // Ensure the category reference is properly formatted
    if (skill.category && skill.category._ref) {
      // Make sure _type is set for the reference
      if (!skill.category._type) {
        skill.category._type = 'reference';
      }
    }
    
    return JSON.stringify(skill);
  });
  
  // Write the updated skills to a new file
  fs.writeFileSync(fixedSkillsPath, updatedSkills.join('\n'), 'utf8');
  console.log(`Prepared ${updatedSkills.length} skills for import`);
}

// Main function to import data
async function importData() {
  try {
    console.log('=== SANITY DATA IMPORT ===');
    
    // Step 1: Verify the dataset is clean
    await verifyCleanDataset();
    
    // Step 2: Import categories
    console.log('\n=== IMPORTING CATEGORIES ===');
    const categoryImportOutput = runCommand(`npx sanity dataset import ${categoriesPath} production --replace`);
    console.log(categoryImportOutput);
    
    // Step 3: Prepare skills with proper references
    prepareSkillsWithReferences();
    
    // Step 4: Import the skills
    console.log('\n=== IMPORTING SKILLS ===');
    const skillImportOutput = runCommand(`npx sanity dataset import ${fixedSkillsPath} production --replace`);
    console.log(skillImportOutput);
    
    // Step 5: Clean up
    console.log('\n=== CLEANING UP ===');
    fs.unlinkSync(fixedSkillsPath);
    console.log(`Removed temporary file: ${fixedSkillsPath}`);
    
    // Step 6: Verify import
    console.log('\n=== VERIFYING IMPORT ===');
    console.log('Checking categories:');
    const categoriesVerify = runCommand('npx sanity documents query \'*[_type == "category"] | count\'');
    console.log('Checking skills with their categories:');
    const skillsVerify = runCommand('npx sanity documents query \'*[_type == "skill"][0...5] {title, "category": category->title}\'');
    console.log(skillsVerify);
    
    console.log('\n=== IMPORT COMPLETED SUCCESSFULLY ===');
    
  } catch (error) {
    console.error('Error during import process:', error);
  }
}

// Run the import function
importData();
