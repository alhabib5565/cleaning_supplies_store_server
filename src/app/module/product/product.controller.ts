import { Request, Response } from "express"
import { product_services } from "./product.service"
import { catchAsync } from "../../utils/catchAsync"


const create_product = catchAsync(async (req: Request, res: Response) => {
    const product = req.body
    const result = await product_services.create_product_into_DB(product)

    res.status(200).json({
        success: true,
        message: 'product create succesfull',
        data: result
    })
})

export const product_controller = {
    create_product
}