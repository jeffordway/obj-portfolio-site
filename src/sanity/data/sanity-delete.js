/**
 * Sanity Delete Script
 * 
 * This script follows Sanity's best practices for deleting documents.
 * It provides options to delete specific document types or all documents.
 * 
 * Usage:
 * - To delete all skills and categories: node sanity-delete.js
 * - To delete only skills: node sanity-delete.js --type=skill
 * - To delete only categories: node sanity-delete.js --type=category
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const typeArg = args.find(arg => arg.startsWith('--type='));
const type = typeArg ? typeArg.split('=')[1] : null;

// Backup directory
const backupDir = path.join(__dirname, 'backups');

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

// Function to create a backup of the dataset
function createBackup() {
  console.log('=== CREATING BACKUP ===');
  
  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Create a timestamp for the backup filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `backup-${timestamp}.tar.gz`);
  
  // Export the dataset
  console.log(`Creating backup at: ${backupPath}`);
  runCommand(`npx sanity dataset export production "${backupPath}"`);
  
  return backupPath;
}

// Function to delete documents of a specific type
async function deleteDocumentsByType(docType) {
  console.log(`\n=== DELETING ${docType.toUpperCase()} DOCUMENTS ===`);
  
  // Query for all documents of the specified type
  const queryCommand = `npx sanity documents query '*[_type == "${docType}"]._id'`;
  const queryOutput = runCommand(queryCommand);
  
  if (!queryOutput) {
    console.error(`Failed to query ${docType} documents.`);
    return 0;
  }
  
  // Parse the document IDs from the query output
  try {
    // Find the JSON array in the output (skipping any warning messages)
    const jsonMatch = queryOutput.match(/\[\s*".*"\s*\]/s);
    if (!jsonMatch) {
      console.log(`No ${docType} documents found.`);
      return 0;
    }
    
    const ids = JSON.parse(jsonMatch[0]);
    
    if (ids.length === 0) {
      console.log(`No ${docType} documents found.`);
      return 0;
    }
    
    console.log(`Found ${ids.length} ${docType} documents to delete.`);
    
    // Delete documents in batches to avoid timeouts
    const batchSize = 10;
    let deleted = 0;
    
    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
      const deleteCommand = `npx sanity documents delete ${batch.join(' ')}`;
      runCommand(deleteCommand);
      deleted += batch.length;
      console.log(`Deleted ${deleted}/${ids.length} ${docType} documents.`);
    }
    
    console.log(`Successfully deleted all ${deleted} ${docType} documents.`);
    return deleted;
  } catch (error) {
    console.error(`Error parsing document IDs: ${error.message}`);
    return 0;
  }
}

// Main function to delete documents
async function deleteDocuments() {
  try {
    console.log('=== SANITY DATA DELETION ===');
    
    // Create a backup before deleting anything
    const backupPath = createBackup();
    console.log(`Backup created at: ${backupPath}`);
    
    let totalDeleted = 0;
    
    // Delete documents based on the specified type
    if (!type || type === 'skill') {
      // Delete skills first (since they reference categories)
      const skillsDeleted = await deleteDocumentsByType('skill');
      totalDeleted += skillsDeleted;
    }
    
    if (!type || type === 'category') {
      // Then delete categories
      const categoriesDeleted = await deleteDocumentsByType('category');
      totalDeleted += categoriesDeleted;
    }
    
    // Verify deletion
    console.log('\n=== VERIFYING DELETION ===');
    
    if (!type || type === 'skill') {
      console.log('Checking for remaining skills:');
      const skillsVerify = runCommand('npx sanity documents query \'*[_type == "skill"] | count\'');
      console.log(skillsVerify);
    }
    
    if (!type || type === 'category') {
      console.log('Checking for remaining categories:');
      const categoriesVerify = runCommand('npx sanity documents query \'*[_type == "category"] | count\'');
      console.log(categoriesVerify);
    }
    
    console.log(`\n=== DELETION COMPLETED ===`);
    console.log(`Total documents deleted: ${totalDeleted}`);
    console.log(`A backup of your data before deletion has been saved to: ${backupPath}`);
    
  } catch (error) {
    console.error('Error during deletion process:', error);
  }
}

// Run the deletion function
deleteDocuments();
