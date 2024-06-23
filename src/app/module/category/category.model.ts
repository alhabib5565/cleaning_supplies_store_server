import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";
import { STATUS } from "../../constant/constant";

const category_schema = new Schema<TCategory>({
    _id: { type: String, required: true },
    categoryId: { type: String, required: true, unique: true },
    mainCategory: { type: String, required: true, ref: 'MainCategory' },
    categoryName: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    status: { type: String, enum: Object.keys(STATUS), default: "Active" },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
})

export const Category = model<TCategory>('Category', category_schema)
