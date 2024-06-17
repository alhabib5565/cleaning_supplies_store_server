import { Schema, model } from "mongoose";
import { TMainCategory } from "./mainCategory.interface";


const mainCategorySchema = new Schema<TMainCategory>({
    _id: { type: String, required: true },
    mainCategoryName: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export const MainCategory = model('MainCategory', mainCategorySchema)