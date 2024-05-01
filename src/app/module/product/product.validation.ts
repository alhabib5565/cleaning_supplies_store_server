import { z } from "zod";


const createProductValidationSchema = z.object({
    title: z.string({ required_error: 'Title is required' }).trim(),
    category: z.string({
        required_error: "Category is required",
    }),
    type: z.string({
        required_error: "Type is required"
    }),
    brand: z.string({
        required_error: "Brand is required"
    }),
    description: z.string({ required_error: "Description is required" }).trim(),
    price: z.number({
        invalid_type_error: "Must be a number",
        required_error: 'Price is required'
    }).min(1, { message: "Price must be at least 1" }),
    stock: z.number({
        invalid_type_error: "Must be a number",
        required_error: 'Stock is required'
    }).min(1, { message: "Product stock  must be at least 1", }),
    status: z.enum(['Upcoming', 'Published']).optional(),
    thumbnail: z.string().optional(),
    discount_percentage: z.number().optional(),
    images: z.array(z.string()).optional(),
    weight: z.string().optional(),
    features: z.array(z.string()).optional(),
});

export const ProductValidations = {
    createProductValidationSchema
};
