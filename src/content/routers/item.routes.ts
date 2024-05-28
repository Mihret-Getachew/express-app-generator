export const itemRoutesContent = `import express from "express";
import { parseBody } from "../middleware/body.middleware";
import {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} from "../controllers/item.controller";

const ItemRouter = express.Router({ mergeParams: true });

ItemRouter.post("/", parseBody(), addItem);
ItemRouter.get("/", getItems);
ItemRouter.get("/:itemId", getItem);
ItemRouter.delete("/:itemId", deleteItem);
ItemRouter.put("/:itemId", parseBody(), updateItem);

export default ItemRouter;
`;
