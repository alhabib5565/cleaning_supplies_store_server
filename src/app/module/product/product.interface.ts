import { Types } from 'mongoose';
import { PRODUCT_STATUS } from './product.constant';

export type TStatus = keyof typeof PRODUCT_STATUS;

export type TFlashSale = {
  flashSaleDiscountPercentage: number;
  flashSaleStartDate: Date;
  flashSaleEndDate: Date;
};

export type TColor = { _id: Types.ObjectId; label: string; hexCode: string };

export type TVariants = {
  color?: TColor[];
};
export type TWeight = {
  value: number;
  unit: string;
};
export type TProduct = {
  productId: string;
  productName: string;
  mainCategory: string;
  category: string;
  subCategory: string;
  description: string;
  price: number;
  discountPercentage?: number;
  totalQuantity: number;
  availableQuantity: number;
  thumbnail: string;
  images: string[];
  rating: number;
  ratingCount: number;
  status: TStatus;
  variants?: TVariants;
  brand?: string;
  type?: string;
  flashSale?: TFlashSale;
  weight?: TWeight;
  features?: string[];
  metaTitle?: string;
  metaDescription?: string;
};
