import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { OrderValidations } from './order.validation'
import { OrderController } from './order.controller'
const router = express.Router()

router.post(
    '/create-order',
    validateRequest(OrderValidations.createOrderValidationSchema),
    OrderController.createOrder
)

export const orderRouter = router