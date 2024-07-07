import { z } from 'zod';

// Define Zod schemas for validation
const ProductItemSchema = z.object({
    productId: z.string().min(1, { message: 'Product ID is required' }),
    productName: z.string().min(1, { message: 'Product name is required' }),
    quantity: z.number().int().positive().min(1, { message: 'Quantity must be a positive integer' }),
    price: z.number().positive().min(0.01, { message: 'Price must be a positive number' })
});

const ShippingAddressSchema = z.object({
    street: z.string().min(1, { message: 'Street is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    country: z.string().min(1, { message: 'Country is required' })
});

const PaymentInfoSchema = z.object({
    method: z.string().min(1, { message: 'Payment method is required' })
});

const createOrderValidationSchema = z.object({
    orderId: z.string().min(1, { message: 'Order ID is required' }),
    userEmail: z.string().email({ message: 'Invalid email format' }),
    products: z.array(ProductItemSchema),
    totalQuantity: z.number().int().positive().min(1, { message: 'Total quantity must be a positive integer' }),
    totalAmount: z.number().positive().min(0.01, { message: 'Total amount must be a positive number' }),
    shippingAddress: ShippingAddressSchema,
    paymentInfo: PaymentInfoSchema
})

export const OrderSchema = {
    createOrderValidationSchema
}