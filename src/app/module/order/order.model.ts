import { model, Schema } from "mongoose";
import { TOrder, TPaymentInfo, TProductItem, TShippingAddress } from "./order.interface";
import { ORDER_STATUS } from "./order.constant";

// Define Mongoose schema
const ProductItemSchema = new Schema<TProductItem>({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const ShippingAddressSchema = new Schema<TShippingAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
});

const PaymentInfoSchema = new Schema<TPaymentInfo>({
    method: { type: String, required: true }
});

const OrderSchema = new Schema<TOrder>({
    orderId: { type: String, required: true },
    userEmail: { type: String, required: true },
    products: { type: [ProductItemSchema], required: true },
    totalQuantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, enum: Object.keys(ORDER_STATUS), default: 'Pending' },
    shippingAddress: { type: ShippingAddressSchema, required: true },
    paymentInfo: { type: PaymentInfoSchema, required: true }
}, { timestamps: true });

export const Order = model('Order', OrderSchema)