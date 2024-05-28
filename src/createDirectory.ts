const fs = require("fs-extra");

/**
 * Creates a directory at the specified path if it does not already exist.
 * @param {string} dirPath - The path of the directory to create.
 */
/**
 * Creates a directory at the specified path if it does not already exist.
 */
export async function createDirectory(dirPath: string): Promise<void> {
  try {
    await fs.ensureDir(dirPath);
    console.log(`Directory created or already exists at: ${dirPath}`);
  } catch (error) {
    console.error("Failed to create the directory:", error);
  }
}
