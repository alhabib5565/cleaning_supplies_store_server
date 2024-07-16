import { ORDER_STATUS } from './order.constant';

export type TOrder = {
  _id: string;
  orderId: string;
  recipient_name: string;
  recipient_phone: number;
  products: TProductItem[];
  totalPrice: number;
  orderStatus: TOrderStatus;
  division: string;
  district: string;
  upazila: string;
  union: string;
  recipient_area: string;
  item_type: string;
  delivery_type: string;
  paymentInfo: TPaymentInfo;
};

export type TOrderStatus = keyof typeof ORDER_STATUS;

export type TProductItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  thumbnail: string;
};

export type TShippingAddress = {
  division: string;
  district: string;
  upazila: string;
  union: string;
  recipient_area: string;
};

export type TPaymentInfo = {
  method: string;
};
