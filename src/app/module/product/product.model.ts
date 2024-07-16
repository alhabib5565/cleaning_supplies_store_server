import { Schema, model } from 'mongoose';
import {
  TColor,
  TFlashSale,
  TProduct,
  TVariants,
  TWeight,
} from './product.interface';
import { PRODUCT_STATUS } from './product.constant';

const flashSaleSchema = new Schema<TFlashSale>(
  {
    flashSaleDiscountPercentage: { type: Number, required: true },
    flashSaleStartDate: { type: String, required: true },
    flashSaleEndDate: { type: String, required: true },
  },
  {
    _id: false,
  },
);
const colorSchema = new Schema<TColor>({
  _id: Schema.Types.ObjectId,
  hexCode: String,
  label: String,
});
// { _id: "6679b28ea6bd15736e6c2d30", label: "Blue", hexCode: "#0000FF" }
const variantsSchema = new Schema<TVariants>(
  {
    color: { type: [colorSchema] },
  },
  {
    _id: false,
  },
);

const weightSchema = new Schema<TWeight>({
  value: { type: Number, required: true },
  unit: { type: String, required: true },
});

const product_schema = new Schema<TProduct>(
  {
    productId: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    mainCategory: { type: String, required: true, ref: 'MainCategory' },
    category: { type: String, required: true, ref: 'Category' },
    subCategory: { type: String, required: true, ref: 'SubCategory' },
    description: { type: String, required: true },
    price: { type: Number, min: 1, required: true },
    totalQuantity: { type: Number, required: true, min: 1 },
    availableQuantity: { type: Number, required: true, min: 1 },
    thumbnail: { type: String, required: true },
    brand: { type: String },
    type: { type: String },
    discountPercentage: { type: Number },
    images: { type: [String] },
    variants: { type: variantsSchema },
    flashSale: { type: flashSaleSchema, required: false },
    weight: { type: weightSchema, required: false },
    features: { type: [String] },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.keys(PRODUCT_STATUS),
      default: 'Published',
    },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  {
    timestamps: true,
  },
);

// product_schema.pre('save', async function (next) {

//     const isCategoryExists = await Category.findOne({ category_name: this.category })
//     const isBrandExists = await Brand_model.findOne({ brand_name: this.brand })

//     if (!isBrandExists) {
//         throw new Error("Brand does not exist");
//     }
//     if (!isCategoryExists) {
//         throw new Error("Category does not exist");
//     }
//     next()
// })

export const Product_model = model<TProduct>('Products', product_schema);
