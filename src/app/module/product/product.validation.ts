import { z } from 'zod';

const addFlashSaleFormValidationSchema = z.object({
  flashSaleDiscountPercentage: z
    .number({
      invalid_type_error: 'Please provide a valid number',
    })
    .min(1, { message: 'Discount percentage cannot be less than 1' })
    .max(100, { message: 'Discount percentage cannot be more than 100' }),
  flashSaleStartDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date',
  }),
  flashSaleEndDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date',
  }),
});
// .refine(
//   (data) =>
//     new Date(data.flashSaleEndDate) > new Date(data.flashSaleStartDate),
//   {
//     message: 'End date must be after start date',
//     path: ['flashSaleEndDate'],
//   },
// );

const variantsSchema = z.object({
  color: z.array(
    z.object({
      _id: z.string(),
      label: z.string(),
      hexCode: z.string(),
    }),
  ),
});
const PRODUCT_STATUS = {
  Published: 'Published',
  Unpublished: 'Unpublished',
  Draft: 'Draft',
};

const createProductValidationSchema = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  mainCategory: z.string({ required_error: 'Main category is required' }),
  category: z.string({ required_error: 'Category is required' }),
  subCategory: z.string({ required_error: 'Sub-category is required' }),
  description: z.string({ required_error: 'Description is required' }),
  price: z.number().min(1, { message: 'Price must be at least 1' }),
  totalQuantity: z
    .number()
    .min(1, { message: 'Total quantity must be at least 1' }),
  thumbnail: z.string({ required_error: 'Thumbnail URL is required' }),
  discountPercentage: z.number().optional(),
  images: z.array(z.string()).optional(),
  brand: z.string().optional(),
  type: z.string().optional(),
  variants: variantsSchema.optional(),
  flashSale: addFlashSaleFormValidationSchema.optional(),
  weight: z
    .object({
      value: z.number(),
      unit: z.string(),
    })
    .optional(),
  features: z.array(z.string()).optional(),
  rating: z.number().default(0).optional(),
  status: z
    .enum(Object.keys(PRODUCT_STATUS) as [keyof typeof PRODUCT_STATUS], {
      required_error: 'Status is required',
    })
    .default('Published'),
});

export const ProductValidations = {
  createProductValidationSchema,
  addFlashSaleFormValidationSchema,
};
