import { Order } from './order.model';

export const generatOrderId = async () => {
  let currentId = '0';

  const lastOrderId = await Order.findOne({}, { orderId: 1 }).sort({
    createdAt: -1,
  });

  console.log(lastOrderId, 'lastOrderId');
  if (lastOrderId) {
    currentId = lastOrderId.orderId;
  }
  return (Number(currentId) + 1).toString().padStart(4, '0');
};
