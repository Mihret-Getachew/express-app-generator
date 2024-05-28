import * as fs from "fs-extra";
import * as path from "path";

export interface PackageJson {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  keywords: string[];
  author: string;
  license: string;
}

export async function createPackageJson(
  dirPath: string,
  content: PackageJson
): Promise<void> {
  const filePath = path.join(dirPath, "package.json");
  await fs.writeJson(filePath, content, { spaces: 2 });
  console.log(`package.json created successfully at ${filePath}`);
}
