export const itemModelContent = `import { Schema, InferSchemaType, model } from "mongoose";
const ItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export type Item = InferSchemaType<typeof ItemSchema>;

export const ItemModel = model<Item>("item", ItemSchema);`;
