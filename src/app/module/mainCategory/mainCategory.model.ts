import { Schema, model } from "mongoose";
import { TMainCategory } from "./mainCategory.interface";
import { STATUS } from "../../constant/constant";


const mainCategorySchema = new Schema<TMainCategory>({
    _id: { type: String, required: true },
    mainCategoryId: { type: String, required: true, unique: true },
    mainCategoryName: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    status: { type: String, enum: Object.keys(STATUS), default: "Active" },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export const MainCategory = model('MainCategory', mainCategorySchema)