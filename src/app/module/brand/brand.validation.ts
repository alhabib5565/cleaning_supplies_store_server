import { z } from 'zod';

const createBrandValidationSchema = z.object({
    brand_name: z.string({
        required_error: 'Brand name is required'
    }).max(40, { message: 'Brand name can not be more than 40 character' }),
    brand_image: z.string().optional()
})

export const brandValidation = {
    createBrandValidationSchema
}