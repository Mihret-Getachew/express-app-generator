import * as path from "path";
import { createDirectory } from "./createDirectory";
import { PackageJson, createPackageJson } from "./createPackageJson";
import { createFile } from "./createFile";
import { dbConnectContent } from "./content/config/db_connect";
import { itemControllerContent } from "./content/controllers/item.controller";
import { bodyMiddlewareContent } from "./content/middleware/body.middleware";
import { itemModelContent } from "./content/models/item.model";
import { itemRoutesContent } from "./content/routers/item.routes";
import { errorTypeContent } from "./content/types/error";
import { responseTypeContent } from "./content/types/response";
import { runCommandInDirectory } from "./runCommand";
import { appContent } from "./content/app";

/**
 * Sets up the specified project structure including `package.json`.
 */
async function setupProjectStructure(rootPath: string): Promise<void> {
  const directories = [
    "types",
    "middleware",
    "controllers",
    "routers",
    "models",
    "config",
  ];

  // Create all directories
  for (const dir of directories) {
    await createDirectory(path.join(rootPath, dir));
  }

  // Define package.json content
  const packageJson: PackageJson = {
    name: "my-express-app",
    version: "1.0.0",
    description: "An Express app",
    main: "app.ts",
    scripts: {
      start: "ts-node app.ts",
      dev: "nodemon app.ts",
    },
    dependencies: {},
    devDependencies: {},
    keywords: ["node", "typescript", "express"],
    author: "Your Name",
    license: "MIT",
  };

  // Create package.json
  await createPackageJson(rootPath, packageJson);

  // Create app.ts
  await createFile(rootPath, "app.ts", appContent);

  // create README.md
  await createFile(
    rootPath,
    "README.md",
    "# Project README\nThis is a generated project."
  );

  // Create .env
  await createFile(
    rootPath,
    ".env",
    "MONGO_DB=your_mongo_db_connection_string\nNODE_ENV=development\nPORT=3000"
  );

  // Create config/db_connect.ts
  await createFile(
    path.join(rootPath, "config"),
    "db_connect.ts",
    dbConnectContent
  );

  // create controller/item.controller.ts
  await createFile(
    path.join(rootPath, "controllers"),
    "item.controller.ts",
    itemControllerContent
  );

  // create middleware/body.middleware.ts
  await createFile(
    path.join(rootPath, "middleware"),
    "body.middleware.ts",
    bodyMiddlewareContent
  );

  // create models/item.model.ts
  await createFile(
    path.join(rootPath, "models"),
    "item.model.ts",
    itemModelContent
  );

  // create routers/item.routes.ts
  await createFile(
    path.join(rootPath, "routers"),
    "item.routes.ts",
    itemRoutesContent
  );

  // create types/error.ts
  await createFile(path.join(rootPath, "types"), "error.ts", errorTypeContent);

  // create types/response.ts
  await createFile(
    path.join(rootPath, "types"),
    "response.ts",
    responseTypeContent
  );

  runCommandInDirectory(deps, rootPath);
  runCommandInDirectory(devDeps, rootPath);
  runCommandInDirectory("npm i --save-dev @types/cors", rootPath);
  runCommandInDirectory("npm i --save-dev @types/morgan", rootPath);
}

// Getting the root directory from command line argument
const rootDir = process.argv[2];

if (!rootDir) {
  console.error(
    "Please specify the root directory for the project as an argument."
  );
  process.exit(1);
}

setupProjectStructure(rootDir).catch((error) =>
  console.error("Setup failed:", error)
);

const deps = "npm install express cors dotenv helmet morgan mongoose";
const devDeps =
  "npm install -D typescript ts-node nodemon @types/node @types/express @types/mongoose @types/morgan @types/helmet @types/cors";
