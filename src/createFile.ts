const fs = require("fs-extra");
const path = require("path");

/**
 * Creates a file with specified content at the given path and filename.
 * @param {string} dirPath - The directory path where the file should be created.
 * @param {string} fileName - The name of the file to be created.
 * @param {string} content - The content to be written to the file.
 */
export async function createFile(
  dirPath: string,
  fileName: string,
  content: string
): Promise<void> {
  try {
    const filePath = path.join(dirPath, fileName);
    await fs.writeFile(filePath, content);
    console.log(`File created successfully at ${filePath}`);
  } catch (error) {
    console.error("Failed to create the file:", error);
  }
}
