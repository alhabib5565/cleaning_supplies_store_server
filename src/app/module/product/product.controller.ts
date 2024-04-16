import { Request, Response } from "express"
import { product_services } from "./product.service"


const create_product = async (req: Request, res: Response) => {
    try {
        const product = req.body
        const result = await product_services.create_product_into_DB(product)

        res.status(200).json({
            success: true,
            message: 'product create succesfull',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'product create failed',
            error
        })
    }

}

export const product_controller = {
    create_product
}