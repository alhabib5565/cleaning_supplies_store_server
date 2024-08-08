import { z } from 'zod';

// ProductFeedback Zod Schema with meaningful error messages
const createProductFeedbackSchema = z.object({
  productId: z
    .string()
    .min(1, { message: 'Product ID is required and cannot be empty.' }),
  // userId: z
  //   .string()
  //   .min(1, { message: 'User ID is required and cannot be empty.' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1.' })
    .max(5, { message: 'Rating must be at most 5.' }),
  review: z.string().min(1, { message: 'Review is required' }),
});

export const productFeedbackValidation = {
  createProductFeedbackSchema,
};
