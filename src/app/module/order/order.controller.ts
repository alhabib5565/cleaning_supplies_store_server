import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { OrderService } from './order.service';
import httpStatus from 'http-status';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req.user.userId;
  const orderData = req.body;
  const result = await OrderService.createOrderIntoDB(orderData);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Order create successful',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrder(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Orders retrieved successful',
    data: result,
  });
});

const getAllOrderByUserId = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrderByUserId(req.user.user_id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Your Orders retrieved successful',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getSingleOrder(req.params.orderId);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Single Order retrieved successful',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.updateOrder(req.params.orderId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Order update successful',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  getAllOrderByUserId,
};
