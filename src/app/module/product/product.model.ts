import { Schema, model } from "mongoose";
import { TFlashSale, TProduct, TVariants } from "./product.interface";
import { PRODUCT_STATUS } from "./product.constant";

const flashSaleSchema = new Schema<TFlashSale>({
    sale_end: { type: String, required: true },
    sale_start: { type: String, required: true },
}, {
    _id: false
})

const variantsSchema = new Schema<TVariants>({
    color: { type: [Schema.Types.ObjectId] }
}, {
    _id: false
})

const product_schema = new Schema<TProduct>({
    productName: { type: String, required: true },
    mainCategory: { type: String, required: true, ref: 'MainCategory' },
    category: { type: String, required: true, ref: 'Category' },
    subCategory: { type: String, required: true, ref: 'SubCategory' },
    description: { type: String, required: true, },
    price: { type: Number, min: 1, required: true },
    totalQuantity: { type: Number, required: true, min: 1 },
    availableQuantity: { type: Number, required: true, min: 1 },
    thumbnail: { type: String, required: true },
    brand: { type: String },
    type: { type: String },
    discount_percentage: { type: Number },
    images: { type: [String] },
    variants: { type: variantsSchema },
    flash_sale: { type: flashSaleSchema, required: false, },
    weight: { type: String },
    features: { type: [String] },
    rating: { type: Number, default: 0 },
    status: {
        type: String,
        enum: Object.keys(PRODUCT_STATUS),
        default: 'Published'
    },
    metaTitle: { type: String },
    metaDescription: { type: String },
}, {
    timestamps: true,
})

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



export const Product_model = model<TProduct>('Products', product_schema)