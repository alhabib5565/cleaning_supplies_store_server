import { model, Schema } from 'mongoose';
import { TOrder, TPaymentInfo, TProductItem } from './order.interface';
import { ORDER_STATUS } from './order.constant';

// Define Mongoose schema
const ProductItemSchema = new Schema<TProductItem>({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

const PaymentInfoSchema = new Schema<TPaymentInfo>({
  method: { type: String, default: 'Cash On Delivery' },
});

const OrderSchema = new Schema<TOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    recipient_name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    recipient_phone: { type: Number, required: true },
    products: { type: [ProductItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: Object.keys(ORDER_STATUS),
      default: 'Pending',
    },
    division: { type: String, required: true },
    district: { type: String, required: true },
    upazila: { type: String, required: true },
    union: { type: String, required: true },
    recipient_area: { type: String, required: true },
    paymentInfo: { type: PaymentInfoSchema },
  },
  { timestamps: true },
);

export const Order = model('Order', OrderSchema);
