import { z } from "zod";


const ProductSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(1, { message: "Price must be at least 1" }),
    stock: z.number().min(1, { message: "Product stock  must be at least 1", }),
    status: z.enum(['Upcoming', 'Published']).optional(),
    thumbnail: z.string().optional(),
    discount_percentage: z.number().optional(),
    images: z.array(z.string()).optional(),
    weight: z.string().optional(),
    features: z.array(z.string()).optional(),
});

export const ProductValidationSchema = ProductSchema;
