import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const category_schema = new Schema<TCategory>({
    category_image: { type: String, required: true },
    category_name: { type: String, required: true },
})

export const Category_model = model<TCategory>('Category', category_schema)


