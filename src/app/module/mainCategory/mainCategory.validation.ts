import { z } from 'zod';

const createMainCategoryValidationSchema = z.object({
    mainCategoryName: z.string().nonempty({ message: "Main category name is required" }),
    imageURL: z.string().nonempty({ message: "Image URL is required" }),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    isDeleted: z.boolean().default(false)
});

export const MainCategoryValidation = {
    createMainCategoryValidationSchema
}