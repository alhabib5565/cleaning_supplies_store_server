import { Types } from "mongoose";

export type TProduct = {
    title: string;
    category: typeof Types.ObjectId;
    type: string;
    brand: typeof Types.ObjectId;
    description: string;
    price: number;
    discount_percentage?: number
    stock: number;
    thumbnail: string;
    images: string[];
    flash_sale?: TFlashSale
    weight?: string;
    features?: string[];
    rating: number;
    status: TStatus
}

export type TStatus = 'Published' | 'Upcoming'

export type TFlashSale = {
    sale_start: string;
    sale_end: string;
}
