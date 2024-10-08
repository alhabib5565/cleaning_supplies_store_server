import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Product_model } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { generatOrderId } from './order.utils';
import { ORDER_STATUS_TRANSITIONS } from './order.constant';
import { Types } from 'mongoose';

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
  console.log(await generatOrderId(), 'idg');
  payload.orderId = await generatOrderId();

  const result = await Order.create(payload);
  return result;
};

const getAllOrder = async (query: Record<string, unknown>) => {
  const searchAbleFields = [
    'recipient_name',
    'recipient_area',
    'union',
    'orderId',
  ];

  const modelQuery = new QueryBuilder(query, Order.find().populate('user'))
    .search(searchAbleFields)
    .filter()
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await modelQuery.countTotal();
  const result = await modelQuery.modelQuery;

  return { result, meta };
};

const getSingleOrder = async (orderId: string) => {
  const result = await Order.aggregate([
    {
      $match: { orderId },
    },
    {
      $lookup: {
        from: 'bd-divisions',
        foreignField: 'id',
        localField: 'division',
        as: 'division',
      },
    },
    {
      $unwind: {
        path: '$division',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'bd-districts',
        foreignField: 'id',
        localField: 'district',
        as: 'district',
      },
    },
    {
      $unwind: {
        path: '$district',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: '$district.division_id',
        orderData: { $first: '$$ROOT' },
      },
    },
    {
      $lookup: {
        from: 'bd-upazilas',
        foreignField: 'id',
        localField: 'orderData.upazila',
        as: 'orderData.upazila',
      },
    },
    {
      $unwind: {
        path: '$orderData.upazila',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'users',
        foreignField: '_id',
        localField: 'orderData.user',
        as: 'orderData.user',
      },
    },
    {
      $unwind: {
        path: '$orderData.user',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $replaceRoot: {
        newRoot: '$orderData',
      },
    },
  ]);
  return result[0];
};

const getAllOrderByUserId = async (user: string) => {
  const result = await Order.find({ user }).populate('user').sort('-createdAt');
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

const orderStatusOverviewForAUser = async (userId: string) => {
  const result = await Order.aggregate([
    {
      $match: { user: new Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: '$orderStatus',
        total: { $sum: 1 },
      },
    },
  ]);

  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  getAllOrderByUserId,
  orderStatusOverviewForAUser,
};
