import { z } from 'zod';

const createCategoryValidationSchema = z.object({
    category_name: z.string({
        required_error: 'Category name is required'
    }).max(40, { message: 'Category name cat not be more than 40 character' }).trim(),
    category_image: z.string().optional()
})

export const categoryValidation = {
    createCategoryValidationSchema
}