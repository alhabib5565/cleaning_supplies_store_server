import { Schema, model } from "mongoose";
import { TSubCategory } from "./subCategory.interface";

const subCategorySchema = new Schema<TSubCategory>({
    _id: { type: String, required: true },
    mainCategoryName: { type: String, required: true, ref: 'MainCategory' },
    categoryName: { type: String, required: true, ref: 'Category' },
    subCategoryName: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export const SubCategory = model('SubCategory', subCategorySchema)