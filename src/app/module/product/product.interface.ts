import { Types } from "mongoose";

export type TProduct = {
    title: string;
    category: typeof Types.ObjectId;
    type: string;
    brand: typeof Types.ObjectId;
    description: string;
    price: number;
    discount_percentage?: number
    rating: number;
    available_quantity: number;
    thumbnail: string;
    images: string[];
    flash_sale?: TFlashSale
    weight?: string;
    features?: string[];
}

export type TFlashSale = {
    sale_start: string;
    sale_end: string;
}
