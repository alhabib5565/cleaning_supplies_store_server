import { Request, Response } from "express";
import { brand_service } from "./brand.service";

const create_brand = async (req: Request, res: Response) => {
    try {
        const brand = req.body
        const result = await brand_service.create_brand_into_DB(brand)

        res.status(200).json({
            success: true,
            message: 'brand create succesfull',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'brand create failed',
            error
        })
    }
}

export const brand_controller = {
    create_brand
}