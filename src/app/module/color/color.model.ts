import { Schema, model } from "mongoose";
import { TColor } from "./color.interface";

const colorSchema = new Schema<TColor>({
    name: { type: String, required: true, unique: true },
    hexCode: { type: String, required: true, unique: true },
}, {
    timestamps: true
});

export const Color = model('Color', colorSchema);