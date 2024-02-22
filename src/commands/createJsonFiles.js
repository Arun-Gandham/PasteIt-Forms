#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const { apiRoot } = require("../../config");
const axios = require("axios");

console.log(apiRoot);
// Function to generate JSON data
async function generateJSON() {
  let data;
  await axios.get("https://dummyjson.com/products/1").then(response => {
    // Extract the data from the response object
    data = response.data;

    // Log the data
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching data:', error.message);
  });
  // console.log(data);
  return JSON.stringify(data, null, 2);
}

// Function to write JSON data to file
async function writeJSONFile(filePath, jsonData) {
  await fs.writeFile(filePath, jsonData);
  console.log(`JSON file created at ${filePath}`);
}

async function createFolder(path) {
  await fs.mkdir(path, (err) => {
    if (err) {
      console.error(err);
      console.log("Failed to create directory.");
      return false;
    }
    console.log("Directory created successfully!");
    return true;
  });
}

async function deleteFilesInDirectory(directory) {
  try {
    const files = await fs.readdir(directory);

    // Delete each file sequentially
    for (const file of files) {
      const filePath = path.join(directory, file);
      await fs.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    }

    // After all files are deleted, remove the directory
    await fs.rmdir(directory);
    console.log(`Removed directory: ${directory}`);
  } catch (err) {
    console.error(`Error deleting files in directory ${directory}: ${err}`);
  }
}

// Main function
async function main() {
  const rootPath = process.cwd() + "/PasteIt-Forms"; // Get current working directory (root path)

  try {
    if (await fs.stat(rootPath)) {
      console.log(`${rootPath} exists. Removing old directory...`);
      await deleteFilesInDirectory(rootPath);
    }
  } catch (err) {
    // Directory doesn't exist or error occurred, nothing to delete
  }

  console.log("Creating new directory...");
  await createFolder(rootPath); // Create directory if it doesn't exist
  console.log("New directory created.");

  const jsonData = await generateJSON(); // Generate JSON data
  const jsonFilePath = path.join(rootPath, "output.json"); // Construct file path
  writeJSONFile(jsonFilePath, jsonData); // Write JSON data to file
}

main();
