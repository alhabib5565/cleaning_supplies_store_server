import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { OrderService } from "./order.service"

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const orderData = req.body
    const result = await OrderService.createOrderIntoDB(orderData)

    res.status(200).json({
        success: true,
        message: 'Order create successful',
        data: result
    })
})

export const OrderController = {
    createOrder
}