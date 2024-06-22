import { Schema, model } from "mongoose";
import { TSubCategory } from "./subCategory.interface";
import { STATUS } from "../../constant/constant";

const subCategorySchema = new Schema<TSubCategory>({
    _id: { type: String, required: true },
    subCategoryId: { type: String, required: true, unique: true },
    mainCategoryName: { type: String, required: true, ref: 'MainCategory' },
    categoryName: { type: String, required: true, ref: 'Category' },
    subCategoryName: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    status: { type: String, enum: Object.keys(STATUS), default: "Active" },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export const SubCategory = model('SubCategory', subCategorySchema)