import { z } from "zod";

const flashSaleSchema = z.object({
    sale_end: z.string({ required_error: "Sale end date is required" }),
    sale_start: z.string({ required_error: "Sale start date is required" }),
});

const variantsSchema = z.object({
    color: z.array(z.string()),
});

const PRODUCT_STATUS = {
    Published: "Published",
    Unpublished: "Unpublished",
    Draft: "Draft",
};

const createProductValidationSchema = z.object({
    productName: z.string({ required_error: "Product name is required" }),
    mainCategory: z.string({ required_error: "Main category is required" }),
    category: z.string({ required_error: "Category is required" }),
    subCategory: z.string({ required_error: "Sub-category is required" }),
    description: z.string({ required_error: "Description is required" }),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    totalQuantity: z.number().min(1, { message: "Total quantity must be at least 1" }),
    thumbnail: z.string({ required_error: "Thumbnail URL is required" }),
    discountPercentage: z.number().optional(),
    images: z.array(z.string()).optional(),
    brand: z.string().optional(),
    type: z.string().optional(),
    variants: variantsSchema.optional(),
    flash_sale: flashSaleSchema.optional(),
    weight: z.object({
        value: z.number(),
        unit: z.string()
    }).optional(),
    features: z.array(z.string()).optional(),
    rating: z.number().default(0).optional(),
    status: z.enum(Object.keys(PRODUCT_STATUS) as [keyof typeof PRODUCT_STATUS], {
        required_error: "Status is required",
    }).default('Published'),
});


export const ProductValidations = {
    createProductValidationSchema
};
