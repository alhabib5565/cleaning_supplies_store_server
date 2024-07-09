import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderController } from './order.controller';
const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderController.createOrder,
);

router.get('/', OrderController.getAllOrder);

router.get('/:orderId', OrderController.getSingleOrder);

router.put('/:orderId', OrderController.updateOrder);

export const orderRouter = router;
