import { Request, Response } from "express"
import { product_services } from "./product.service"
import { catchAsync } from "../../utils/catchAsync"
import httpStatus from "http-status"


const create_product = catchAsync(async (req: Request, res: Response) => {
    const product = req.body
    const result = await product_services.create_product_into_DB(product)

    res.status(200).json({
        success: true,
        message: 'product create succesfull',
        data: result
    })
})

const get_all_products = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await product_services.get_all_products_from_DB(query)

    res.status(httpStatus.OK).json({
        success: true,
        message: 'products retrived succesfull',
        data: result
    })
})

export const product_controller = {
    create_product,
    get_all_products
}