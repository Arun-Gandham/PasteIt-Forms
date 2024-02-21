#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to generate JSON data
function generateJSON() {
  const data = {
    message: 'Hello, world!',
    timestamp: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
}

// Function to write JSON data to file
function writeJSONFile(filePath, jsonData) {
  fs.writeFileSync(filePath, jsonData);
  console.log(`JSON file created at ${filePath}`);
}

// Main function
function main() {
  const rootPath = process.cwd(); // Get current working directory (root path)
  const jsonData = generateJSON(); // Generate JSON data
  const jsonFilePath = path.join(rootPath, 'output.json'); // Construct file path
  writeJSONFile(jsonFilePath, jsonData); // Write JSON data to file
}

// Call the main function
main();
