import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { OrderController } from './order.controller';
import { auth } from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/create-order',
  validateRequest(OrderValidations.createOrderValidationSchema),
  auth(),
  OrderController.createOrder,
);

router.get('/', OrderController.getAllOrder);

router.get('/:orderId', OrderController.getSingleOrder);

router.put('/:orderId', OrderController.updateOrder);
router.get('/your/orders', auth(), OrderController.getAllOrderByUserId);

export const orderRouter = router;
