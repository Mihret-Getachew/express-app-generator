export const itemControllerContent = `import { RequestHandler } from "express";
import { Item, ItemModel } from "../models/item.model";
import { StandardResponse } from "../types/response";

export const addItem: RequestHandler<
  unknown,
  StandardResponse<Item>,
  Item,
  unknown
> = async (req, res, next) => {
  try {
    const newItem = req.body;

    const result = await ItemModel.create(newItem);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getItems: RequestHandler<
  unknown,
  StandardResponse<Item[] | string>,
  unknown,
  { action: string; page: number }
> = async (req, res, next) => {
  try {
    const { page } = req.query;
    const size = 5;
    const result = await ItemModel.find()
      .skip(((page | 1) - 1) * size)
      .limit(size);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getItem: RequestHandler<
  { itemId: string },
  StandardResponse<Item | null>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const result = await ItemModel.findOne({ _id: itemId });

    res.json({ success: false, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteItem: RequestHandler<
  { itemId: string },
  StandardResponse<number>,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const result = await ItemModel.deleteOne({
      _id: itemId,
    });

    res.json({ success: true, data: result.deletedCount });
  } catch (error) {
    next(error);
  }
};

export const updateItem: RequestHandler<
  { itemId: string },
  StandardResponse<number>,
  Item,
  unknown
> = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const newItem = req.body;

    const result = await ItemModel.updateOne({ _id: itemId }, newItem);

    res.json({ success: false, data: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};
`;
