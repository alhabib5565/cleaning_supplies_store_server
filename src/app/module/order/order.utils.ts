import { Order } from './order.model';

export const generatOrderId = async () => {
  let currentId = '0';

  const lastOrderId = await Order.findOne({}, { orderId: 1 }).sort({
    createdAt: -1,
  });
  if (lastOrderId) {
    currentId = lastOrderId.orderId.substring(3);
  }
  return (Number(currentId) + 1).toString().padStart(4, '0');
};
