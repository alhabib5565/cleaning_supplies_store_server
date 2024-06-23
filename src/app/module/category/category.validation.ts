import { z } from 'zod';

const createCategoryValidationSchema = z.object({
    mainCategory: z.string().nonempty({ message: "Main Category Name cannot be empty" }),
    categoryName: z.string().nonempty({ message: "Category Name cannot be empty" }),
    imageURL: z.string().url({ message: "Invalid URL format for Image URL" }),
    metaTitle: z.string().optional(), // optional
    metaDescription: z.string().optional(), // optional
    isDeleted: z.boolean().default(false) // default false
})

export const categoryValidation = {
    createCategoryValidationSchema
}