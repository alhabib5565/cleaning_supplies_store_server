import { Schema, Types, model } from "mongoose";
import { TFlashSale, TProduct } from "./product.interface";


const flash_sale_schema = new Schema<TFlashSale>({
    sale_end: { type: String, required: true },
    sale_start: { type: String, required: true },
})

const product_schema = new Schema<TProduct>({
    title: { type: String, required: true },
    category: { type: Types.ObjectId, required: true },
    type: { type: String, required: true },
    brand: { type: Types.ObjectId, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 1 },
    discount_percentage: { type: Number },
    rating: { type: Number, default: 0 },
    available_quantity: { type: Number, required: true, min: 1 },
    thumbnail: { type: String },
    images: { type: [String] },
    flash_sale: { type: flash_sale_schema },
    weight: { type: String },
    features: { type: [String] },
})


export const Product_model = model<TProduct>('Products', product_schema)