import { Types } from "mongoose";
import { PRODUCT_STATUS } from "./product.constant";

export type TStatus = keyof typeof PRODUCT_STATUS

export type TFlashSale = {
    sale_start: string;
    sale_end: string;
}

export type TVariants = {
    color?: Types.ObjectId[]
}
export type TProduct = {
    productName: string;
    mainCategory: string
    category: string;
    subCategory: string,
    description: string;
    price: number;
    discount_percentage?: number
    totalQuantity: number;
    availableQuantity: number;
    thumbnail: string;
    images: string[];
    rating: number;
    status: TStatus
    variants?: TVariants
    brand?: string;
    type?: string;
    flash_sale?: TFlashSale
    weight?: string;
    features?: string[];
    metaTitle?: string
    metaDescription?: string
}
