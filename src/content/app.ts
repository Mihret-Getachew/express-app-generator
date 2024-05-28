export const appContent = `
import express, { NextFunction, Response, Request } from "express";
import helmet from "helmet";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import { DB_connect } from "./config/db_connect";
import path from "path";
import fs from "fs";
import ItemRouter from "./routers/item.routes";
import { ErrorWithStatus } from "./types/error";

const app = express();
DB_connect();

app.set(\`port\`, 3000);
app.set("x-powered-by", false);
app.use(helmet());
app.use(cors());

// setup logger
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV == "production") {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  console.error("Node Environment not set.");
}

// Setup routers
app.use("/items", ItemRouter);


app.all("*", (req, res, next) => {
  next(new ErrorWithStatus("Route not found", 404));
});
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).send(error.message);
  } else if (error instanceof Error) {
    res.status(500).send(error.message);
  } else {
    res.status(500).send("Unexpected error occurred");
  }
});

app.listen(app.get("port"), () => {
  console.log("Listening to 3000");
});
`;
