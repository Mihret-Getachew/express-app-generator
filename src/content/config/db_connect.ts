export const dbConnectContent = `import mongoose from "mongoose";
import "dotenv/config";

export function DB_connect() {
  if (process.env.Mongo_DB) {
    mongoose
      .connect(process.env.Mongo_DB)
      .then((_) => console.log("Mongo DB connected.. "))
      .catch((error) => console.log(\`Mongo DB connection error \${error}\`));
  } else {
    throw Error("DB Url not defined.");
  }
}
`;
