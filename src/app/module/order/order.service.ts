import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Product_model } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { generatOrderId } from './order.utils';
import { ORDER_STATUS_TRANSITIONS } from './order.constant';

const createOrderIntoDB = async (payload: TOrder) => {
  const productIds = payload.products.map((p) => p.productId);

  const dbProducts = await Product_model.find({
    productId: { $in: productIds },
  }).select('productId availableQuantity productName');

  const productMap = new Map(dbProducts.map((p) => [p.productId, p]));
  for (const product of payload.products) {
    const dbProduct = productMap.get(product.productId);

    if (!dbProduct) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product with Name ${product.productName} does not exist.`,
      );
    }

    if (dbProduct.availableQuantity <= 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Product with Name ${product.productName} is out of stock.`,
      );
    }
  }

  payload.orderId = await generatOrderId();

  const result = await Order.create(payload);
  return result;
};

const getAllOrder = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['userEmail', 'orderStatus', 'shippingAddress.city'];

  const modelQuery = new QueryBuilder(query, Order.find())
    .search(searchAbleFields)
    .filter()
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await modelQuery.modelQuery;

  return result;
};

const getSingleOrder = async (orderId: string) => {
  const result = await Order.findOne({ orderId });
  return result;
};

const updateOrder = async (orderId: string, payload: Partial<TOrder>) => {
  const isOrderExist = await Order.findOne({ orderId });

  if (!isOrderExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  /**
    Pending → Accepted
    Pending → Rejected
    Accepted → Shipped
    Shipped → Delivered
    Any → Cancelled
 */

  const currentOrderStatus = isOrderExist.orderStatus;
  const newOrderStatus = payload?.orderStatus;

  if (currentOrderStatus === 'Rejected') {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Order Already Rejected');
  }
  const allowedStatuses = ORDER_STATUS_TRANSITIONS[currentOrderStatus];

  if (newOrderStatus && !allowedStatuses.includes(newOrderStatus)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't change order status from ${currentOrderStatus} to ${newOrderStatus}`,
    );
  }

  const result = await Order.findOneAndUpdate({ orderId }, payload, {
    new: true,
  });

  return result;
};
export const OrderService = {
  createOrderIntoDB,
  getAllOrder,
  getSingleOrder,
  updateOrder,
};
