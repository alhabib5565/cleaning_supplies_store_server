import { z } from 'zod';

const ProductItemSchema = z.object({
  productId: z.string().nonempty({ message: 'Product ID is required' }),
  productName: z.string().nonempty({ message: 'Product name is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  thumbnail: z.string().min(0, { message: 'Thumbnail is required' }),
});

// Define Zod schema for Order
export const createOrderValidationSchema = z.object({
  recipient_name: z
    .string()
    .nonempty({ message: 'Recipient name is required' }),
  recipient_phone: z.string().min(11, {
    message: 'Recipient phone number must be at least 11 characters',
  }),
  products: z
    .array(ProductItemSchema)
    .nonempty({ message: 'Products list cannot be empty' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total Price must be a positive number' }),
  division: z.string().nonempty({ message: 'Division is required' }),
  district: z.string().nonempty({ message: 'District is required' }),
  upazila: z.string().nonempty({ message: 'Upazila is required' }),
  union: z.string().nonempty({ message: 'Union is required' }),
  recipient_area: z
    .string()
    .nonempty({ message: 'Recipient area is required' }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
