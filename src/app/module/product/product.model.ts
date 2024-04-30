import { Schema, Types, model } from "mongoose";
import { TFlashSale, TProduct } from "./product.interface";
import { Category_model } from "../category/category.model";
import { Brand_model } from "../brand/brand.model";

const flash_sale_schema = new Schema<TFlashSale>({
    sale_end: { type: String, required: true },
    sale_start: { type: String, required: true },
})

const product_schema = new Schema<TProduct>({
    title: { type: String, required: true },
    category: {
        type: Types.ObjectId, required: true,
        ref: 'Category'
    },
    brand: {
        type: Types.ObjectId, required: true, ref: 'Brand'
    },
    type: { type: String, required: true },
    description: { type: String, required: true, },
    price: { type: Number, min: 1 },
    stock: { type: Number, required: true, min: 1 },
    thumbnail: { type: String },
    discount_percentage: { type: Number, default: 0 },
    images: { type: [String] },
    flash_sale: { type: flash_sale_schema, required: false, },
    weight: { type: String },
    features: { type: [String] },
    rating: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['Upcoming', 'Published'],
        default: 'Published'
    }
}, {
    timestamps: true,
})

product_schema.pre('save', async function () {

    const isCategoryExists = await Category_model.findOne({ _id: this.category })
    const isBrandExists = await Brand_model.findOne({ _id: this.brand })

    if (!isBrandExists) {
        throw new Error("Brand does not exist");
    }
    if (!isCategoryExists) {
        throw new Error("Category does not exist");
    }

})



export const Product_model = model<TProduct>('Products', product_schema)