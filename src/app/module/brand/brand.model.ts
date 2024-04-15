import { Schema, model } from "mongoose";
import { TBrand } from "./brand.interface";

const brand_schema = new Schema<TBrand>({
    brand_image: { type: String, required: true },
    brand_name: { type: String, required: true },
})

export const Brand_model = model<TBrand>('Brand', brand_schema)