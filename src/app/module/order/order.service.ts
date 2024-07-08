import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Product_model } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const productIds = payload.products.map((p) => p.productId);

  const dbProducts = await Product_model.find({
    productId: { $in: productIds },
  }).select('productId availableQuantity productName');

  const productMap = new Map(dbProducts.map((p) => [p.productId, p]));
  console.log(productMap);
  for (const product of payload.products) {
    const dbProduct = productMap.get(product.productId);

    if (!dbProduct) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product with ID ${product.productName} does not exist.`,
      );
    }

    if (dbProduct.availableQuantity <= 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Product with ID ${product.productName} is out of stock.`,
      );
    }
  }

  const result = await Order.create(payload);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
